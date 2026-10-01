import { ethers } from "ethers";
import { Get_Gas_Overrides, Wallet_Error_Message } from "./wallet.utils"; // Ensure this uses getEthereumProvider
import { ConnectedWallet } from "@privy-io/react-auth";
import { response_message } from "@/components/utilities/utils";
import {
  ALCHEMY_URL,
  CONTRACT_ADDRESS,
  NETWORK,
  PUBLIC_CLIENT,
  smart_wait_for_receipt_universal,
} from "./privy/privy.utils";
import {
  ABI,
  ERC_20_ABI,
  Smart_Treasury_ABI,
  Treasury_ABI,
} from "./wallet.abi";
import { encodeFunctionData, getAddress, parseUnits, formatUnits } from "viem";
import { polygonAmoy } from "viem/chains";

// ------------------------------------------------------------------------------------------------ [  ]
// ------------------------------------------------------------------------------------------------ [  ]

// Helper to check deployment using Viem
export const checkDeployment = async (address: string) => {
  const code = await PUBLIC_CLIENT.getBytecode({
    address: address as `0x${string}`,
  });

  if (!code || code === "0x") {
    console.log("Empty: Smart Wallet is NOT deployed.");
    return false;
  }
  console.log("Smart Wallet is deployed and active!");
  return true;
};

// ------------------------------------------------------------------------------------------------ [  ]
// ------------------------------------------------------------------------------------------------ [  ]

// ✅ Generic call (read/write)
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export async function callSmartContractFunction<T = any>(
  functionName: string,
  args: any[] = [],
  readOnly = true,
  smartClient?: any,
  tokenAddress?: string, // New: Optional for balance tracking
): Promise<any> {
  try {
    if (readOnly) {
      return await PUBLIC_CLIENT.readContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: ABI,
        functionName,
        args,
      });
    }

    if (!smartClient) throw new Error("Smart Wallet client missing.");

    const smartAddress = smartClient.account.address;

    // --- INITIALIZATION ---
    // We grab the baseline state before sending the transaction
    const [initialNonce, initialBalance] = await Promise.all([
      smartClient.account.getNonce(),
      tokenAddress
        ? PUBLIC_CLIENT.readContract({
            address: tokenAddress as `0x${string}`,
            abi: ERC_20_ABI,
            functionName: "balanceOf",
            args: [smartAddress],
          })
        : Promise.resolve(BigInt(0)),
    ]);

    // --- EXECUTION ---
    const hash = await smartClient.writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: ABI,
      functionName,
      args,
    });

    console.log(`🚀 [${functionName}] UserOp Hash:`, hash);

    // --- WATCHING ---
    // If no tokenAddress is provided, it will still work via Nonce/Receipt checks
    return await smart_wait_for_receipt_universal(
      smartClient,
      hash,
      initialNonce as bigint,
      tokenAddress || CONTRACT_ADDRESS, // Fallback to contract address if no token
      initialBalance as bigint,
    );
  } catch (err: any) {
    console.error(`Contract Call Error [${functionName}]:`, err);
    throw err;
  }
}

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export async function Smart_Create_Campaign({ body, smartClient }: any) {
  try {
    const result = await callSmartContractFunction(
      "createCampaign",
      [body],
      false,
      smartClient,
    );
    return { status: true, result };
  } catch (err: any) {
    return { status: false, error: Wallet_Error_Message(err) };
  }
}

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export async function Smart_Refund_Campaign({ id, smartClient }: any) {
  try {
    const result = await callSmartContractFunction(
      "claimRefund",
      [BigInt(id)],
      false,
      smartClient,
    );
    return { status: true, result };
  } catch (err: any) {
    return { status: false, error: Wallet_Error_Message(err) };
  }
}

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export async function Smart_Withdraw_Milestone({
  id,
  index,
  smartClient,
}: any) {
  try {
    const result = await callSmartContractFunction(
      "withdrawMilestone",
      [BigInt(id), BigInt(index)],
      false,
      smartClient,
    );
    return { status: true, result };
  } catch (err: any) {
    return { status: false, error: Wallet_Error_Message(err) };
  }
}

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export async function Smart_Pledge_Token({
  id,
  grossAmount,
  tipAmount,
  token,
  smartClient,
}: any) {
  try {
    // 1. Parallelize the metadata fetch using Viem's multicall (Faster than Ethers)
    const [decimals] = await PUBLIC_CLIENT.multicall({
      contracts: [
        {
          address: token as `0x${string}`,
          abi: ERC_20_ABI,
          functionName: "decimals",
        },
      ],
    });

    const d = (decimals.result as number) || 18;
    const pledgeAmount = ethers.parseUnits(String(grossAmount), d);
    const tipAmountParsed = ethers.parseUnits(String(tipAmount), d);
    const totalNeeded = pledgeAmount + tipAmountParsed;

    const smartAddress = smartClient.account.address;

    // --- INITIALIZATION START ---
    // We fetch the "Before" state of the wallet
    const [initialNonce, initialBalance] = await Promise.all([
      smartClient.account.getNonce(),
      PUBLIC_CLIENT.readContract({
        address: token as `0x${string}`,
        abi: ERC_20_ABI,
        functionName: "balanceOf",
        args: [smartAddress],
      }),
    ]);
    // --- INITIALIZATION END ---

    const calls = [
      {
        to: token as `0x${string}`,
        data: encodeFunctionData({
          abi: ERC_20_ABI,
          functionName: "approve",
          args: [CONTRACT_ADDRESS, totalNeeded],
        }),
      },
      {
        to: CONTRACT_ADDRESS as `0x${string}`,
        data: encodeFunctionData({
          abi: ABI,
          functionName: "pledgeToken",
          args: [BigInt(id), pledgeAmount, tipAmountParsed],
        }),
      },
    ];

    console.log(
      "\n\n\nDEBUG PLEDGE:",
      {
        id: id,
        token: token,
        initialNonce: initialNonce,
        initialBalance: initialBalance,
      },
      "\n\n\n",
    );

    // 2. Send the transaction
    const hash = await smartClient.sendTransaction({ calls });
    console.log("🟢 Initial Nonce:", initialNonce.toString());
    console.log("🚀 UserOp Hash received:", hash);

    // 3. Watch for Receipt OR Nonce change
    return await smart_wait_for_receipt_universal(
      smartClient,
      hash,
      initialNonce as bigint,
      token,
      initialBalance as bigint,
    );
  } catch (err: any) {
    return { status: false, error: Wallet_Error_Message(err) };
  }
}

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export async function Smart_Finalize_Campaign({
  id,
  smartClient,
}: {
  id: number;
  smartClient: any;
}) {
  try {
    if (!smartClient)
      throw new Error("Smart Wallet client is required to finalize.");

    // This calls the unified handler which now includes the Triple-Check Watcher
    const result = await callSmartContractFunction(
      "finalize",
      [BigInt(id)],
      false, // write operation
      smartClient,
    );

    // If the watcher confirmed via Nonce or Receipt, status will be true
    return {
      status: result.status === "unknown" ? "unknown" : true,
      result,
    };
  } catch (err: any) {
    console.error("Finalize Error:", err);
    return { status: false, error: Wallet_Error_Message(err) };
  }
}

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export async function Smart_Donate_To_Treasury_Smart({
  tokenAddress,
  to,
  amount,
  smartClient,
}: any) {
  try {
    if (!smartClient) return { status: false, error: "Client not initialized" };

    const checksummedToken = getAddress(tokenAddress);
    const smartAddress = smartClient.account.address;

    // Fetch decimals and balance for validation
    const [decimals, initialBalance] = await Promise.all([
      PUBLIC_CLIENT.readContract({
        address: checksummedToken,
        abi: Smart_Treasury_ABI,
        functionName: "decimals",
      }),
      PUBLIC_CLIENT.readContract({
        address: checksummedToken,
        abi: Smart_Treasury_ABI,
        functionName: "balanceOf",
        args: [smartAddress],
      }),
      smartClient.account.getNonce(), // Fetch nonce for the watcher
    ]);

    const initialNonce = await smartClient.account.getNonce();
    const parsedAmount = parseUnits(amount, Number(decimals));

    if ((initialBalance as bigint) < parsedAmount) {
      return { status: false, error: "Insufficient funds." };
    }

    // Execute transfer
    const hash = await smartClient.writeContract({
      address: checksummedToken,
      abi: Smart_Treasury_ABI,
      functionName: "transfer",
      args: [getAddress(to), parsedAmount],
      gas: BigInt(200000),
    });

    // Watch with Balance + Nonce + Receipt
    return await smart_wait_for_receipt_universal(
      smartClient,
      hash,
      initialNonce,
      checksummedToken,
      initialBalance as bigint,
    );
  } catch (err: any) {
    return { status: false, error: Wallet_Error_Message(err) };
  }
}
