import { response_message } from "@/components/utilities/utils";
import { getWalletClient } from "@wagmi/core";
import { wagmiAdapter } from "./config/Configuration";
import { getSignerOrProvider } from "./Utilities";
import { ethers } from "ethers";

// ------------------------------------------------------------------- [  ]
// ------------------------------------------------------------------- [  ]
const CONTRACT_ADDRESS = "0x89732089FAe1067437e71Fc5Debcd1E9f376483a";
// ------------------------------------------------------------------- [  ]
// ------------------------------------------------------------------- [  ]

// ✅ Connect to contract with provider/signer
// ------------------------------------------------------------------- [  ]
// ------------------------------------------------------------------- [  ]
async function connectToContract({ useSigner = false } = {}) {
  const signerOrProvider = await getSignerOrProvider(useSigner);

  const contractABI = [
    "function createCampaign(uint8 currencyType, address token, uint256 _goal, uint256 _durationInDays, string[] milestoneNames, uint256[] milestoneAmounts) external returns (uint256)",
    "function pledgeToken(uint256 id, uint256 grossAmount, uint256 tipAmount) external returns (uint256)",
    "function withdrawMilestone(uint256 id, uint256 index) external",
    "function refund(uint256 id) external",
    "function platformWallet() view returns (address)",
    "function getMilestone(uint256 id, uint256 index) view returns (string name, uint256 amount)",
    "function getCampaignCore(uint256 id) view returns (tuple(uint256 id, address creator, address token, uint256 goal, uint256 pledged, uint8 currencyType))",
  ];

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractABI,
    signerOrProvider
  );

  return contract;
}

// ✅ Generic call (read/write)
// ------------------------------------------------------------------- [  ]
// ------------------------------------------------------------------- [  ]
export async function callContractFunction<T = any>(
  functionName: string,
  args: any[] = [],
  readOnly = true
): Promise<T | null> {
  try {
    const contract = await connectToContract({ useSigner: !readOnly });

    if (typeof contract[functionName] !== "function") {
      throw new Error(`Function "${functionName}" not found on contract`);
    }

    if (readOnly) {
      return (await contract[functionName](...args)) as T;
    } else {
      const tx = await contract[functionName](...args);
      console.log("Tx sent:", tx.hash);

      const receipt = await tx.wait();
      console.log("Tx confirmed:", receipt);

      return receipt as T;
    }
  } catch (err: any) {
    console.error(`Error calling ${functionName}:`, err);
    throw new Error(err?.reason || err?.message || "Contract call failed.");
  }
}

// ------------------------------------------------------------------- [  ]
// ------------------------------------------------------------------- [  ]
export async function Platform_Address() {
  return await callContractFunction<string>("platformWallet", [], true);
}

// ------------------------------------------------------------------- [  ]
// ------------------------------------------------------------------- [  ]
export async function Get_Milestone(id: number, index: number) {
  return await callContractFunction<[string, bigint]>(
    "getMilestone",
    [id, index],
    true
  );
}

// ------------------------------------------------------------------- [  ]
// ------------------------------------------------------------------- [  ]
export async function Create_Campaign({
  currencyType,
  token,
  goal,
  durationInDays,
  milestoneNames,
  milestoneAmounts,
}: {
  currencyType: number;
  token: string;
  goal: number;
  durationInDays: number;
  milestoneNames: Array<string>;
  milestoneAmounts: Array<number>;
}) {
  const goal_ = ethers.parseUnits(String(goal), 6); // example: 100 tokens = 100000000
  const milestoneAmounts_ = milestoneAmounts.map((amt) =>
    ethers.parseUnits(String(amt), 6)
  );

  const body = [
    currencyType,
    token,
    goal_,
    durationInDays,
    milestoneNames,
    milestoneAmounts_,
  ];

  console.log("====================================");
  console.log(body);
  console.log("====================================");

  try {
    const result = await callContractFunction(
      "createCampaign",
      [...body],
      false // 🚨 must be false => use signer
    );

    return { status: true, result: result };
  } catch (err: any) {
    response_message({
      message: err || "Something went wrong?",
      option: "err",
    });

    console.log("Pledge_Token error:", err);
    return null;
  }
}

// ------------------------------------------------------------------- [  ]
// ------------------------------------------------------------------- [  ]
export async function Withdraw_Milestone({
  id,
  index,
}: {
  id: number;
  index: number;
}) {
  try {
    const result = await callContractFunction(
      "withdrawMilestone",
      [id, index],
      false // 👈 write operation
    );

    return { status: true, result: result };
  } catch (err: any) {
    response_message({
      message: err || "Something went wrong?",
      option: "err",
    });

    console.log("Pledge_Token error:", err);
    return null;
  }
}

// ------------------------------------------------------------------- [  ]
// ------------------------------------------------------------------- [  ]
export async function Get_Campaign_Core(id: number) {
  try {
    const result = await callContractFunction<any>(
      "getCampaignCore",
      [id],
      true
    );

    if (!result) return null;

    // ethers v6 returns tuple-like array + object with named keys
    console.log("CampaignCore:", result);

    // If your struct includes token address, you can extract it
    const tokenAddress = result.token ?? result[2];
    console.log("Campaign token:", tokenAddress);

    return result;
  } catch (err: any) {
    response_message({
      message: err || "Something went wrong?",
      option: "err",
    });

    console.log("Pledge_Token error:", err);
    return null;
  }
}

// ------------------------------------------------------------------- [  ]
// ------------------------------------------------------------------- [  ]
export const erc20ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
];

export async function Pledge_Token({
  id,
  grossAmount,
  tipAmount,
  token, // 👈 ERC20 token address (from core[2])
}: {
  id: number;
  grossAmount: number;
  tipAmount: number;
  token: string;
}) {
  try {
    // ✅ Use Reown/Wagmi wallet client instead of window.ethereum
    const walletClient = await getWalletClient(wagmiAdapter.wagmiConfig);
    if (!walletClient) {
      return response_message({
        message: "Please connect your wallet first.",
        option: "wrn",
      });
    }

    // ✅ Wrap the walletClient in an ethers provider
    const provider = new ethers.BrowserProvider(walletClient.transport);
    const signer = await provider.getSigner();

    // ✅ Load the ERC20 token contract with the Reown signer
    const erc20 = new ethers.Contract(token, erc20ABI, signer);

    // ✅ Fetch token decimals
    const decimals = await erc20.decimals();

    // ✅ Convert human-friendly numbers to smallest units
    const grossAmount_ = ethers.parseUnits(String(grossAmount), decimals);
    const tipAmount_ = ethers.parseUnits(String(tipAmount), decimals);
    const sumAmount_ = ethers.parseUnits(
      String(Number(grossAmount) + Number(tipAmount)),
      decimals
    );

    const body = [id, grossAmount_, tipAmount_];

    console.log("====================================");
    console.log("Token:", token);
    console.log("Decimals:", decimals);
    console.log("Pledge body:", body);
    console.log("====================================");

    // ✅ Check allowance
    const account = await signer.getAddress();
    const allowance = await erc20.allowance(account, CONTRACT_ADDRESS);

    console.log("Current allowance:", ethers.formatUnits(allowance, decimals));

    if (allowance < sumAmount_) {
      console.log("Allowance too low, approving first...");
      response_message({
        message: "Waiting for token approval...",
        option: "wrn",
      });

      const approveTx = await erc20.approve(CONTRACT_ADDRESS, sumAmount_);
      await approveTx.wait();
      console.log("✅ Approval confirmed");
    }

    // ✅ Now call pledgeToken with the contract signer
    const result = await callContractFunction(
      "pledgeToken",
      body,
      false // signer mode
    );

    return { status: true, result };
  } catch (err: any) {
    console.error("Pledge_Token error:", err);
    response_message({
      message: err?.reason || err?.message || "Something went wrong?",
      option: "err",
    });
    return null;
  }
}

// ------------------------------------------------------------------- [  ]
// ------------------------------------------------------------------- [  ]
export async function Refund_Campaign({ id }: { id: number }) {
  try {
    const result = await callContractFunction(
      "refund",
      [id],
      false // 👈 write operation → signer required
    );

    return { status: true, result };
  } catch (err: any) {
    response_message({
      message: err?.reason || err?.message || "Something went wrong?",
      option: "err",
    });

    console.log("Refund_Campaign error:", err);
    return { status: false, error: err };
  }
}

// ------------------------------------------------------------------- [  ]
// ------------------------------------------------------------------- [  ]

const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com");

// Optional — static MATIC/USD rate or fetch dynamically
const MATIC_TO_USD = 0.75; // or fetch from CoinGecko API

export async function Get_Transaction_Details(txHash: string) {
  const tx = await provider.getTransaction(txHash);
  const receipt = await provider.getTransactionReceipt(txHash);
  if (!tx || !receipt) throw new Error("Transaction not found");

  let type = "unknown";
  let tokenName = null;
  let tokenSymbol = null;
  let amount = 0;
  let recipient: string | null = null;
  let decimals = 18;
  let tokenAddress = null;

  // 🧱 Case 1: Contract creation
  if (!tx.to) {
    type = "campaign_creation";
  }

  // 🪙 Case 2: Native MATIC transfer
  else if (tx.data === "0x" && tx.value && tx.value > 0n) {
    type = "matic_transfer";
    amount = Number(ethers.formatEther(tx.value));
    recipient = tx.to;
    tokenName = "Polygon";
    tokenSymbol = "MATIC";
  }

  // 💰 Case 3: ERC-20 transfer (check logs)
  else {
    type = "token_transfer";

    const transferTopic = ethers.id("Transfer(address,address,uint256)");

    const tokenTransferLog = receipt.logs.find(
      (log) => log.topics[0] === transferTopic
    );

    if (tokenTransferLog) {
      try {
        const tokenContract = new ethers.Contract(
          tokenTransferLog.address,
          [
            "event Transfer(address indexed from, address indexed to, uint256 value)",
            "function name() view returns (string)",
            "function symbol() view returns (string)",
            "function decimals() view returns (uint8)",
          ],
          provider
        );

        const decoded = tokenContract.interface.decodeEventLog(
          "Transfer",
          tokenTransferLog.data,
          tokenTransferLog.topics
        );

        recipient = decoded.to;
        tokenAddress = tokenTransferLog.address;

        // 🧠 Safely fetch decimals (default to 18 if it fails)
        try {
          decimals = await tokenContract.decimals();
        } catch {
          decimals = 18;
        }

        tokenName = await tokenContract.name().catch(() => null);
        tokenSymbol = await tokenContract.symbol().catch(() => null);

        // 🧮 Correct amount formatting
        amount = parseFloat(ethers.formatUnits(decoded.value, decimals));
      } catch (e) {
        console.warn("ERC-20 decode failed:", e);
      }
    }
  }

  // 🧩 Case 4: Campaign creation via factory event
  if (type === "unknown" || type === "token_transfer") {
    const factoryTopic = ethers.id("CampaignCreated(uint256,address,address)");
    const factoryLog = receipt.logs.find(
      (log) => log.topics[0] === factoryTopic
    );

    if (factoryLog) {
      type = "campaign_creation";
      try {
        const iface = new ethers.Interface([
          "event CampaignCreated(uint256 id, address campaignAddress, address creator)",
        ]);
        const decoded = iface.decodeEventLog(
          "CampaignCreated",
          factoryLog.data,
          factoryLog.topics
        );

        recipient = decoded.campaignAddress; // ✅ The deployed campaign contract
      } catch (e) {
        console.warn("Failed to decode CampaignCreated:", e);
      }
    }
  }

  // ⚙️ Gas fee
  const gasUsed = receipt.gasUsed ?? 0n;
  const gasPrice = tx.gasPrice ?? 0n;
  const gasFeeWei = gasUsed * gasPrice;
  const gasFeeMatic = Number(ethers.formatEther(gasFeeWei));
  const gasFeeUsd = Number((gasFeeMatic * MATIC_TO_USD).toFixed(4));

  // 🕒 Timestamp
  let timestamp = null;
  const block = receipt.blockNumber
    ? await provider.getBlock(receipt.blockNumber)
    : null;
  if (block) timestamp = new Date(block.timestamp * 1000).toISOString();

  return {
    type,
    from: tx.from,
    to: recipient,
    tokenAddress,
    blockNumber: receipt.blockNumber,
    amount,
    tokenName,
    tokenSymbol,
    status: receipt.status === 1 ? "success" : "failed",
    gasUsed: Number(gasUsed),
    gasPriceGwei: ethers.formatUnits(gasPrice, "gwei") + " Gwei",
    gasFeeMatic,
    gasFeeUsd,
    timestamp,
    explorerUrl: `https://polygonscan.com/tx/${txHash}`,
  };
}
