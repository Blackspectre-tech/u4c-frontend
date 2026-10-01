import { ethers } from "ethers";
import { Get_Gas_Overrides, Wallet_Error_Message } from "./wallet.utils"; // Ensure this uses getEthereumProvider
import { ConnectedWallet } from "@privy-io/react-auth";
import { response_message } from "@/components/utilities/utils";
import {
  ALCHEMY_URL,
  CONTRACT_ADDRESS,
  ensureCorrectNetwork,
  NETWORK,
} from "./privy/privy.utils";
import { ABI, Treasury_ABI } from "./wallet.abi";

// ------------------------------------------------------------------------------------------------ [  ]
// ------------------------------------------------------------------------------------------------ [  ]
// ABI --- Smart Contract Function
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
// ------------------------------------------------------------------------------------------------ [  ]
// ------------------------------------------------------------------------------------------------ [  ]

// ✅ Connect to contract with provider/signer
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export async function connectToContract(
  useSigner = false,
  wallet?: ConnectedWallet,
) {
  console.log("Connecting to contract. Signer required:", useSigner);

  if (useSigner && wallet) {
    await ensureCorrectNetwork(wallet);
    const eip1193Provider = await wallet.getEthereumProvider();

    // 🟢 FIX: Create a provider that is LOCKED to the network
    // This prevents the "80002 => 137" flip error
    const provider = new ethers.BrowserProvider(eip1193Provider, NETWORK, {
      staticNetwork: NETWORK,
    });

    const signer = await provider.getSigner();

    // DEBUG: If this logs "undefined", getSigner() failed
    console.log(
      "\n\n\n\n\Signer address:",
      await signer.getAddress(),
      "\n\n\n\n",
    );

    // return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
    return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  }

  // Read-only logic stays the same
  const provider = new ethers.JsonRpcProvider(ALCHEMY_URL, NETWORK, {
    staticNetwork: NETWORK,
  });

  // return new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
}

// ✅ Generic call (read/write)
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export async function callContractFunction<T = any>(
  functionName: string,
  args: any[] = [],
  readOnly = true,
  wallet?: ConnectedWallet, // 👈 Pass this down
): Promise<T | null> {
  console.log("\n\n\n\n================= [ args ]: ");
  console.log("=================");
  console.log(wallet);
  console.log(args);

  try {
    const contract = await connectToContract(!readOnly, wallet);

    if (readOnly) {
      return (await contract[functionName](...args)) as T;
    } else {
      // 🟢 Apply gas pump for Testnet write operations
      const gasOverrides = await Get_Gas_Overrides(
        contract.runner?.provider as ethers.Provider,
      );

      const override = Object.keys(gasOverrides).length > 0;

      console.log("\n\noverride");
      console.log("override");
      console.log(override);

      console.log("\n\ngasOverrides");
      console.log("gasOverrides");
      console.log(gasOverrides);

      const tx = override
        ? await contract[functionName](...args, {
            ...gasOverrides,
            gasLimit: 1000000,
          })
        : await contract[functionName](...args, { gasLimit: 1000000 });

      const receipt = await tx.wait();
      return receipt as T;
    }
  } catch (err: any) {
    console.log("\n\n\n[ callContractFunction ]");
    console.log("[ callContractFunction ]");
    console.log("[ callContractFunction ]\n\n");

    throw err;
  }
}

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export async function Platform_Address() {
  return await callContractFunction<string>("platformWallet", [], true);
}

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export async function Get_Milestone(id: number, index: number) {
  return await callContractFunction<[string, bigint]>(
    "getMilestone",
    [id, index],
    true,
  );
}

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export async function Get_User_Pledge(id: number, donorAddress: string) {
  try {
    // 1. Ensure the ID is a BigInt for the contract
    const campaignId = BigInt(id);

    // 2. Call the 'getPledge' function from your ABI
    const result = await callContractFunction<bigint>(
      "getPledge",
      [campaignId, donorAddress],
      true, // readOnly = true
    );

    // 3. The contract returns a uint256. If it's null, assume 0.
    return result ? result : 0n;
  } catch (err: any) {
    console.error("Get_User_Pledge error:", err);
    return 0n;
  }
}

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export async function Get_Campaign_Details(id: number) {
  try {
    const campaignId = BigInt(id);

    // console.log("campaignId");
    // console.log("campaignId");
    // console.log("campaignId");
    // console.log("campaignId");
    // console.log(campaignId);
    // console.log(id);

    const result = await callContractFunction<any>(
      "getCampaign",
      [campaignId],
      true,
    );

    if (!result) return null;

    // 🟢 Don't log 'result' directly yet!
    // Accessing a simple uint256 at the start of the tuple is safer for debugging.
    // 🟢 Step-by-step access to find the "landmine"
    // console.log(")))))))))))))))))))))))))))))))))))))");
    // console.log(")))))))))))))))))))))))))))))))))))))");
    // console.log(")))))))))))))))))))))))))))))))))))))");
    // console.log(")))))))))))))))))))))))))))))))))))))");
    // console.log(")))))))))))))))))))))))))))))))))))))");
    // console.log("Field 0 (ID):", result[0].toString());
    // console.log("Field 8 (Claimed):", result[8]);
    // console.log("Field 9 (Context):", result[9]); // If it crashes here, index 9/10 is the issue.

    // If your struct includes token address, you can extract it
    // const tokenAddress = result.token ?? result[2];
    // console.log("Campaign token:", tokenAddress);

    return result;
  } catch (err: any) {
    response_message({
      message: Wallet_Error_Message(err),
      option: "err",
    });
    return null;
  }
}

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export async function Create_Campaign({
  currencyType,
  token,
  goal,
  durationDays, // Changed from durationInDays
  milestoneNames,
  milestoneBps, // Changed from milestoneAmounts
  contextData = "", // New field from screenshot
  offchainId = "", // New field from screenshot
  wallet,
}: {
  currencyType: number;
  token: string;
  goal: number;
  durationDays: number;
  milestoneNames: Array<string>;
  milestoneBps: Array<number>;
  contextData: string;
  offchainId: string;
  wallet: any;
}) {
  const goal_ = ethers.parseUnits(String(goal), 6); // example: 100 tokens = 100000000

  const body = {
    currencyType,
    token,
    goal: goal_,
    durationDays,
    milestoneNames,
    milestoneBps,
    contextData,
    offchainId,
  };

  console.log("====================================");
  console.log("====================================");
  console.log("====================================");
  console.log("====================================");
  console.log("====================================");
  console.log(body);
  console.log("====================================");

  try {
    const result = await callContractFunction(
      "createCampaign",
      [body],
      false, // 🚨 must be false => use signer
      wallet,
    );

    return { status: true, result: result };
  } catch (err: any) {
    console.log("Pledge_Token error:", err);
    return { status: false, error: Wallet_Error_Message(err) };
  }
}

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export async function Withdraw_Milestone({
  id,
  index,
  wallet,
}: {
  id: number;
  index: number;
  wallet: any;
}) {
  try {
    const result = await callContractFunction(
      "withdrawMilestone",
      [id, index],
      false, // 👈 write operation
      wallet,
    );

    return { status: true, result: result };
  } catch (err: any) {
    console.log("Pledge_Token error:", err);
    return { status: false, error: Wallet_Error_Message(err) };
  }
}

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export async function Pledge_Token({
  id,
  grossAmount,
  tipAmount,
  token,
  wallet,
}: {
  id: number;
  grossAmount: number;
  tipAmount: number;
  token: string;
  wallet: any;
}) {
  try {
    // 1. Get the contract instance (this handles the chain switching for you)
    const contract = await connectToContract(true, wallet);
    const signer = contract.runner as ethers.Signer;
    const provider = signer.provider as ethers.Provider;

    // 2. Use the SAME signer/provider for the Token Contract
    const erc20 = new ethers.Contract(token, erc20ABI, signer);
    const decimals = await erc20.decimals();

    const grossAmount_ = ethers.parseUnits(String(grossAmount), decimals);
    const tipAmount_ = ethers.parseUnits(String(tipAmount), decimals);
    const totalNeeded = grossAmount_ + tipAmount_;

    // 3. Allowance Check
    const account = await signer.getAddress();
    const allowance = await erc20.allowance(account, CONTRACT_ADDRESS);

    if (allowance < totalNeeded) {
      response_message({ message: "Approving tokens...", option: "wrn" });
      const gasOverrides = await Get_Gas_Overrides(provider);
      const approveTx = await erc20.approve(
        CONTRACT_ADDRESS,
        totalNeeded,
        gasOverrides,
      );
      await approveTx.wait();
    }

    // 4. Call the contract using the same function we already fixed
    const result = await callContractFunction(
      "pledgeToken",
      [BigInt(id), grossAmount_, tipAmount_],
      false,
      wallet,
    );

    return { status: true, result };
  } catch (err: any) {
    console.error("Pledge Error:", err);
    return { status: false, error: Wallet_Error_Message(err) };
  }
}

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export async function Refund_Campaign({
  id,
  wallet,
}: {
  id: number;
  wallet: any;
}) {
  try {
    const result = await callContractFunction(
      "claimRefund",
      [id],
      false, // 👈 write operation → signer required
      wallet,
    );

    return { status: true, result };
  } catch (err: any) {
    console.log("Refund_Campaign error:", err.message);
    return { status: false, error: Wallet_Error_Message(err) };
  }
}

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export async function Finalize_Campaign({
  id,
  wallet,
}: {
  id: number;
  wallet: any;
}) {
  try {
    if (!wallet) throw new Error("Wallet not connected");

    // This uses the helper we already built that handles switching to Chain 137 or 80002
    const result = await callContractFunction(
      "finalize", // The name from your screenshot
      [BigInt(id)],
      false, // Is not a view function
      wallet,
    );

    return { status: true, result };
  } catch (err: any) {
    console.error("Finalize Error:", err);
    return { status: false, error: Wallet_Error_Message(err) };
  }
}

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export async function Donate_To_Treasury(
  tokenAddress: string,
  to: string,
  amount: string,
  currency: string,
  wallet: any,
) {
  try {
    if (!wallet)
      return response_message({ message: "Connect wallet", option: "wrn" });

    // 2. Ensure the wallet is actually on Amoy
    await ensureCorrectNetwork(wallet);

    // 3. Normalize the token address (Fixes potential 0x return issues)
    const checksummedToken = ethers.getAddress(tokenAddress);
    const checksummedRecipient = ethers.getAddress(to);

    const eip1193Provider = await wallet.getEthereumProvider();

    // 4. CRITICAL: Pass 'network' to the BrowserProvider constructor
    // This prevents ethers from probing for the network and failing
    const provider = new ethers.BrowserProvider(eip1193Provider, NETWORK);
    const signer = await provider.getSigner();

    // 5. Connect Contract with the validated signer
    const token = new ethers.Contract(checksummedToken, Treasury_ABI, signer);

    console.log(`Checking decimals for ${currency} at ${checksummedToken}...`);

    // If this still fails, the address provided is NOT a contract on Amoy
    const decimals = await token.decimals();
    const parsedAmount = ethers.parseUnits(amount, decimals);

    const from = await signer.getAddress();
    const balance = await token.balanceOf(from);

    if (balance < parsedAmount) {
      response_message({
        message: `Insufficient balance. You have ${ethers.formatUnits(balance, decimals)} ${currency}.`,
        option: "err",
      });
      return { status: false };
    }

    response_message({
      message: `Sending ${amount} ${currency}...`,
      option: "wrn",
    });

    // 🟢 Get the overrides (will be {} on Mainnet)
    const gasOverrides = await Get_Gas_Overrides(provider);

    // 🟢 Pass the overrides as the last argument
    const tx = await token.transfer(
      checksummedRecipient,
      parsedAmount,
      gasOverrides,
    );
    const receipt = await tx.wait();

    response_message({ message: `Transfer successful!`, option: "scc" });
    return { status: true, data: receipt };
  } catch (err: any) {
    console.error("Detailed Send_ERC20 Error:", err);
    response_message({ message: Wallet_Error_Message(err), option: "err" });

    return { status: false, error: err };
  }
}
