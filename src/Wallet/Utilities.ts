import { response_message } from "@/components/utilities/utils";
import { getWalletClient, getPublicClient } from "@wagmi/core";
import { wagmiAdapter } from "./config/Configuration";
import { ethers } from "ethers";

export async function getSignerOrProvider(useSigner = false) {
  try {
    if (useSigner) {
      // ✅ Get signer from connected wallet
      const walletClient = await getWalletClient(wagmiAdapter.wagmiConfig);
      if (!walletClient) throw new Error("Wallet not connected.");

      const provider = new ethers.BrowserProvider(walletClient.transport);
      const signer = await provider.getSigner();
      return signer;
    }

    // ✅ READ-ONLY (no signer)
    const publicClient = getPublicClient(wagmiAdapter.wagmiConfig);
    if (!publicClient) throw new Error("No public client available.");

    // 🧩 Get the configured network (Polygon in your case)
    const polygon = wagmiAdapter.wagmiConfig.chains.find(
      (c) => c.name.toLowerCase() === "polygon"
    );

    if (!polygon) throw new Error("Polygon network not found in config.");

    const rpcUrl =
      publicClient.transport?.url ||
      polygon.rpcUrls?.default?.http?.[0] ||
      polygon.rpcUrls?.public?.http?.[0];

    if (!rpcUrl) throw new Error("No RPC URL found for Polygon.");

    console.log("🔗 Using RPC URL:", rpcUrl);

    const provider = new ethers.JsonRpcProvider(rpcUrl);
    return provider;
  } catch (error) {
    console.error("❌ getSignerOrProvider error:", error);
    throw error;
  }
}

// ------------------------------------------------------------------- [  ]
// ------------------------------------------------------------------- [  ]
// ------------------------------------------------------------------- [  ]
const ERC20_ABI = [
  "function transfer(address to, uint amount) returns (bool)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address account) view returns (uint256)",
];

export async function Send_ERC20(
  tokenAddress: string,
  to: string,
  amount: string, // e.g. "10"
  currency: string
) {
  try {
    // ✅ Get connected wallet from Reown/Wagmi
    const walletClient = await getWalletClient(wagmiAdapter.wagmiConfig);
    if (!walletClient) {
      return response_message({
        message: "Please connect your wallet first.",
        option: "wrn",
      });
    }

    // ✅ Use wallet client’s transport with Ethers.js
    const provider = new ethers.BrowserProvider(walletClient.transport);
    const signer = await provider.getSigner();
    const from = await signer.getAddress();

    // ✅ Ensure token address is valid
    if (!ethers.isAddress(tokenAddress)) {
      return response_message({
        message: "Invalid token address.",
        option: "err",
      });
    }

    // ✅ Load ERC20 contract
    const token = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
    const decimals = await token.decimals();

    // ✅ Convert human-readable to smallest unit
    const parsedAmount = ethers.parseUnits(amount, decimals);

    // ✅ Check balance first
    const balance = await token.balanceOf(from);
    if (balance < parsedAmount) {
      response_message({
        message: `Insufficient balance. You only have ${ethers.formatUnits(
          balance,
          decimals
        )} ${currency}.`,
        option: "err",
      });
      return { status: false };
    }

    // ✅ Send tokens
    response_message({
      message: `Sending ${amount} ${currency}...`,
      option: "wrn",
    });

    const tx = await token.transfer(to, parsedAmount);
    console.log("Transaction hash:", tx.hash);

    const receipt = await tx.wait();

    response_message({
      message: `Transfer successful!`,
      option: "scc",
    });

    console.log("====================================");
    console.log("Transaction Receipt:", receipt);
    console.log("====================================");

    return { status: true, data: receipt };
  } catch (err: any) {
    console.error("Transfer failed:", err);

    response_message({
      message:
        err?.reason ||
        err?.shortMessage ||
        err?.message ||
        "Transfer failed: Transaction canceled.",
      option: "err",
    });

    return { status: false, error: err };
  }
}
