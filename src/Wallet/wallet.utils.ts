import { response_message } from "@/components/utilities/utils";
import { ethers } from "ethers";
import { ConnectedWallet } from "@privy-io/react-auth";
import {
  ALCHEMY_URL,
  ensureCorrectNetwork,
  NETWORK,
  TEST_NET,
} from "./privy/privy.utils";

// ------------------------------------------------------------------------------------------------ [  ]
// ------------------------------------------------------------------------------------------------ [  ]
export const Get_Gas_Overrides = async (provider: ethers.Provider) => {
  if (!TEST_NET) return {}; // Return empty object for Mainnet (let wallet decide)

  try {
    const feeData = await provider.getFeeData();

    // Amoy requires a minimum of 25 Gwei tip (Priority Fee)
    const fee = feeData.maxFeePerGas;
    const minTip = ethers.parseUnits("25", "gwei");
    const condition = fee && feeData.maxFeePerGas > minTip;
    const custom_gas = (fee as bigint) + ethers.parseUnits("5", "gwei");

    // Max Fee should be at least the Tip + some base fee (e.g., 30 Gwei total)
    const maxFee = condition ? custom_gas : ethers.parseUnits("30", "gwei");

    return { maxPriorityFeePerGas: minTip, maxFeePerGas: maxFee };
  } catch (err) {
    return {
      maxPriorityFeePerGas: ethers.parseUnits("25", "gwei"),
      maxFeePerGas: ethers.parseUnits("30", "gwei"),
    };
  }
};
// ------------------------------------------------------------------------------------------------ [  ]
// ------------------------------------------------------------------------------------------------ [  ]

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export function Wallet_Error_Message(err: any) {
  // 1. Try to decode Custom Errors from the ABI (e.g., "MilestoneCrowdfund__NoContribution")
  // Ethers v6 attaches this to the 'revert' property if the ABI is loaded
  if (err?.revert) {
    const errorName = err.revert.name;

    // Clean up the name: "MilestoneCrowdfund__NoContribution" -> "No Contribution"
    const cleanName = errorName
      .replace("MilestoneCrowdfund__", "")
      .replace(/([A-Z])/g, " $1")
      .trim();

    return `Contract: ${cleanName}`;
  }

  // 2. Handle standard Wallet/RPC errors
  if (err?.code === "ACTION_REJECTED") return "Transaction cancelled by user.";
  if (err?.code === "INSUFFICIENT_FUNDS")
    return "You don't have enough MATIC for gas fees.";

  // 3. Fallback for "Estimate Gas" failures (where the contract would revert)
  if (err?.message?.includes("execution reverted"))
    return "The transaction would fail. Please ensure the campaign requirements are met.";
  if (err.name === "WaitForUserOperationReceiptTimeoutError")
    return "Transaction is processing. Please check your balance in a moment.";

  return "An unexpected wallet error occurred. Please try again.";
}

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export async function getSignerOrProvider(
  useSigner = false,
  wallet?: ConnectedWallet,
) {
  try {
    if (useSigner) {
      if (!wallet) throw new Error("Wallet not provided for signer.");

      await ensureCorrectNetwork(wallet);
      // ✅ Use getEthereumProvider (the correct method name)
      const eip1193Provider = await wallet.getEthereumProvider();

      // ✅ Wrap the EIP-1193 provider in ethers v6 BrowserProvider
      const provider = new ethers.BrowserProvider(eip1193Provider, NETWORK);
      return await provider.getSigner();
    }

    // READ-ONLY
    return new ethers.JsonRpcProvider(ALCHEMY_URL, NETWORK, {
      staticNetwork: NETWORK,
    });
  } catch (error) {
    console.error("❌ getSignerOrProvider error:", error);
    throw error;
  }
}
