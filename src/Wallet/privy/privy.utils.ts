// src/hooks/useWalletBalances.ts (or update your Wallet/Index)
import { response_message } from "@/components/utilities/utils";
import { useSmartWallets } from "@privy-io/react-auth/smart-wallets";
import { RootState } from "@/redux/store";
import { useWallets, usePrivy } from "@privy-io/react-auth";
import axios from "axios";
import { ethers, formatUnits } from "ethers";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { polygonAmoy, polygon } from "viem/chains";
import { createPublicClient, http } from "viem";
import { ERC_20_ABI } from "../wallet.abi";
import { setWalletType } from "@/redux/slice/users";

// ------------------------------------------------------------------------------------------------ [  ]
// ------------------------------------------------------------------------------------------------ [  ]
export const TEST_NET = process.env.NEXT_PUBLIC_NETWORK === "Test-Net";

export const USDC_ADDRESS = ethers.getAddress(
  TEST_NET
    ? (process.env.NEXT_PUBLIC_USDC_TESTNET as string).toLowerCase()
    : (process.env.NEXT_PUBLIC_USDC_MAINNET as string).toLowerCase(),
);

export const USDT_ADDRESS = ethers.getAddress(
  TEST_NET
    ? (process.env.NEXT_PUBLIC_USDT_TESTNET as string).toLowerCase()
    : (process.env.NEXT_PUBLIC_USDT_MAINNET as string).toLowerCase(),
);

export const CONTRACT_ADDRESS = ethers.getAddress(
  TEST_NET
    ? (process.env.NEXT_PUBLIC_CONTRACT_TESTNET as string).toLowerCase()
    : (process.env.NEXT_PUBLIC_CONTRACT_MAINNET as string).toLowerCase(),
);

export const ALCHEMY_URL = String(
  TEST_NET
    ? process.env.NEXT_PUBLIC_ALCHEMY_TESTNET_KEY
    : process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_KEY,
);

export const CHAIN_ID = TEST_NET ? 80002 : 137;
export const NETWORK = ethers.Network.from(CHAIN_ID);

export const PUBLIC_CLIENT = createPublicClient({
  chain: TEST_NET ? polygonAmoy : polygon,
  transport: http(ALCHEMY_URL),
});


// ------------------------------------------------------------------------------------------------ [  ]
// ------------------------------------------------------------------------------------------------ [  ]

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export function useLogOut() {
  const { logout } = usePrivy();
  const dispatch = useDispatch();

  const disconnect_wallet = async () => {
    await logout().finally(() => {
      dispatch(setWalletType("pending"));
    });
  };

  return {
    disconnect_wallet: disconnect_wallet,
  };
}

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export function useGetSmartWallet() {
  const { user, ready: privyReady } = usePrivy();
  const smartWalletsHook = useSmartWallets();
  const getClientForChain = smartWalletsHook?.getClientForChain;

  const [smartClient, setSmartClient] = useState<any>(null);
  const { wallet_type } = useSelector((state: RootState) => state.user);

  // Return empty if not using smart wallet to avoid unnecessary logic
  const isSmartMode = wallet_type === "smart-wallet";

  useEffect(() => {
    if (!isSmartMode || !privyReady || !user) return;

    // If it's undefined, let's see if we can use the default wallet as a signer
    const wallet = user.linkedAccounts.find(
      (a: any) => a.type === "embedded" || a.type === "wallet",
    );

    if (!wallet) {
      console.error(
        "❌ No signer found (Embedded or External). Smart Wallet cannot init.",
      );
      return;
    }

    const initClient = async () => {
      try {
        if (typeof getClientForChain === "function") {
          // Privy's getClientForChain handles the internal logic of picking the best signer
          const client = await getClientForChain({ id: CHAIN_ID });
          if (client) {
            setSmartClient(client);
            console.log("✅ Smart Wallet Client Initialized");
          }
        }
      } catch (err) {
        console.error("Initialization failed:", err);
      }
    };

    initClient();
  }, [
    privyReady,
    user?.linkedAccounts?.length,
    getClientForChain,
    isSmartMode,
  ]);

  // SAFE FIND: Added ?. before linkedAccounts
  const smartWalletAccount = user?.linkedAccounts?.find(
    (acc): acc is any => acc.type === "smart_wallet",
  );

  return {
    smartClient: smartClient,
    smartAddress: smartWalletAccount?.address || null,
    isReady: privyReady && !!smartClient,
  };
}

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export function useGetEmbeddedWallet() {
  const { wallets, ready } = useWallets();
  const { logout, authenticated } = usePrivy(); // Get logout function
  const { wallet } = useSelector((state: RootState) => state.user);
  const [isSwitching, setIsSwitching] = useState(false);

  const selected_wallet = wallets.find(
    (w) => w.address.toLowerCase() === wallet?.account?.toLowerCase(),
  );

  // 🟢 FAILSAFE: If ready, but no wallet matches our Redux state, log them out
  // 🟢 IMPROVED FAILSAFE
  useEffect(() => {
    // Only run this logic if:
    // 1. Privy is ready and authenticated
    // 2. We actually have a wallet address in Redux we are looking for
    // 3. The search finished and found nothing
    const hasReduxAddress = !!wallet?.account;

    if (
      ready &&
      authenticated &&
      wallets.length > 0 &&
      hasReduxAddress &&
      !selected_wallet
    ) {
      console.warn(
        "⚠️ Wallet mismatch detected. Redux expected:",
        wallet?.account,
        "but Privy has:",
        wallets.map((w) => w.address),
      );
      logout();
    }
  }, [ready, authenticated, wallets, selected_wallet, logout, wallet?.account]);

  // 2. Network Switch Logic (Keep your existing useEffect here...)
  useEffect(() => {
    if (
      !ready ||
      !selected_wallet ||
      isSwitching ||
      selected_wallet.chainId === `eip155:${CHAIN_ID}`
    )
      return;

    const performSwitch = async () => {
      try {
        setIsSwitching(true);
        await ensureCorrectNetwork(selected_wallet);
      } catch (err) {
        console.error("Network switch failed:", err);
      } finally {
        setIsSwitching(false);
      }
    };
    performSwitch();
  }, [selected_wallet?.chainId, ready, isSwitching]);

  if (!ready || wallets.length === 0) return null;

  return selected_wallet || null;
}

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export function useGetWallet() {
  const { wallet_type } = useSelector((state: RootState) => state.user);

  const smart = useGetSmartWallet();
  const embedded = useGetEmbeddedWallet();

  // 🟢 We return a standardized object so your components don't break
  const isSmart = wallet_type === "smart-wallet";

  // console.log("\n\n\n\n");
  // console.log("++++++++++++++++++++++++++++++");
  // console.log("++++++++++++++++++++++++++++++");
  // console.log("++++++++++++++++++++++++++++++");
  // console.log("Wallet-Type: ", wallet_type);
  // console.log("Embedded: ", embedded);
  // console.log("Is-Smart: ", isSmart);
  // console.log("Smart: ", smart);

  return {
    // The actual address (Works for both)
    address: isSmart ? smart.smartAddress : embedded?.address,

    // The tool used for WRITING to the blockchain
    // For Smart: The Viem Client | For Embedded: The Wallet Object
    connector: isSmart ? smart.smartClient : embedded,

    // Metadata
    type: wallet_type,
    isReady: isSmart ? smart.isReady : !!embedded,

    // Helper to check which one we are using
    isSmartAccount: isSmart,
  };
}

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
const waitForProviderSync = (wallet: any, targetChainId: number) => {
  return new Promise<void>(async (resolve, reject) => {
    const timeout = setTimeout(() => reject("Wallet sync timed out"), 10000);

    try {
      const provider = await wallet.getEthereumProvider();

      // We check the internal provider state directly
      const check = async () => {
        const currentChain = await provider.request({ method: "eth_chainId" });
        const currentId = parseInt(currentChain as string, 16);

        if (currentId === targetChainId) {
          clearTimeout(timeout);
          resolve();
        } else {
          // If not ready, wait 500ms and check again
          setTimeout(check, 500);
        }
      };

      check();
    } catch (err) {
      reject(err);
    }
  });
};

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export async function ensureCorrectNetwork(wallet: any) {
  if (wallet.chainId !== `eip155:${CHAIN_ID}`) {
    console.log(
      `🔄 Switching network from ${wallet.chainId} to ${CHAIN_ID}...`,
    );

    // 1. Trigger the switch
    await wallet.switchChain(CHAIN_ID);

    // 2. Use our targeted sync utility to block until the provider actually pivots
    await waitForProviderSync(wallet, CHAIN_ID);

    console.log("✅ Network switched and synchronized.");
  }
}
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export function UseWalletBalances() {
  const { ready } = usePrivy();
  const [balances, setBalances] = useState({
    native: "0.00",
    usdc: "0.00",
    usdt: "0.00",
    isLoading: true,
  });

  const connectedWallet = useGetWallet();

  const fetchBalances = useCallback(async () => {
    // 🟢 Strict Guard: Exit immediately if basic requirements aren't met
    if (!ready || !connectedWallet?.address) {
      setBalances((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    try {
      // 🟢 THE FIX: Use ALCHEMY_URL instead of connectedWallet.getEthereumProvider()
      // This bypasses the "80002" wallet issue entirely for READ operations.
      const ethersProvider = new ethers.JsonRpcProvider(ALCHEMY_URL);

      const abi = ["function balanceOf(address) view returns (uint256)"];
      const usdcContract = new ethers.Contract(
        USDC_ADDRESS,
        abi,
        ethersProvider,
      );
      const usdtContract = new ethers.Contract(
        USDT_ADDRESS,
        abi,
        ethersProvider,
      );

      const [nativeBal, usdcBal, usdtBal] = await Promise.all([
        ethersProvider.getBalance(connectedWallet.address),
        usdcContract.balanceOf(connectedWallet.address).catch(() => 0n),
        usdtContract.balanceOf(connectedWallet.address).catch(() => 0n),
      ]);

      setBalances({
        native: Number(ethers.formatUnits(nativeBal, 18)).toFixed(2),
        usdc: Number(ethers.formatUnits(usdcBal, 6)).toFixed(2),
        usdt: Number(ethers.formatUnits(usdtBal, 6)).toFixed(2),
        isLoading: false,
      });
    } catch (error) {
      console.error("Balance Fetch Error:", error);
      setBalances((prev) => ({ ...prev, isLoading: false }));
    }
  }, [ready, connectedWallet.address]);

  useEffect(() => {
    if (!ready || !connectedWallet?.address) return;

    fetchBalances();
    const interval = setInterval(fetchBalances, 30000);
    return () => clearInterval(interval);
  }, [ready, connectedWallet.address, fetchBalances]);

  // console.log("Use-Wallet-Ballance");
  // console.log("Use-Wallet-Ballance");
  // console.log("Use-Wallet-Ballance");
  // console.log("Use-Wallet-Ballance");
  // console.log("Use-Wallet-Ballance");
  // console.log(balances);

  // console.log("\n\nFetching for Address:", connectedWallet?.address);
  // console.log("Using USDC Contract:", USDC_ADDRESS);
  // console.log("Current Wallet Chain:", connectedWallet?.chainId);

  return balances;
}

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export async function Get_Merged_Wallet_History(address: string) {
  try {
    const commonParams = {
      fromBlock: "0x0",
      toBlock: "latest",
      category: ["external", "erc20"],
      excludeZeroValue: true,
    };

    // Parallel fetch for Incoming and Outgoing
    const [outgoing, incoming] = await Promise.all([
      axios.post(ALCHEMY_URL, {
        jsonrpc: "2.0",
        id: 1,
        method: "alchemy_getAssetTransfers",
        params: [{ ...commonParams, fromAddress: address }],
      }),
      axios.post(ALCHEMY_URL, {
        jsonrpc: "2.0",
        id: 2,
        method: "alchemy_getAssetTransfers",
        params: [{ ...commonParams, toAddress: address }],
      }),
    ]);

    const outTxs = (outgoing.data.result.transfers || []).map((tx: any) => ({
      ...tx,
      displayType: "Sent",
      isOutgoing: true,
    }));

    const inTxs = (incoming.data.result.transfers || []).map((tx: any) => ({
      ...tx,
      displayType: "Received",
      isOutgoing: false,
    }));

    // Merge and sort by time (latest first)
    return [...outTxs, ...inTxs].sort(
      (a, b) => parseInt(b.blockNum, 16) - parseInt(a.blockNum, 16),
    );
  } catch (error) {
    console.error("Merged History Error:", error);
    return [];
  }
}

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export const FetchAllTokens = async (
  address: string,
): Promise<{
  pol: string;
  usdc: string;
  // usdt: string;
}> => {
  try {
    const response = await fetch(ALCHEMY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([
        // 1. Check Native POL
        {
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getBalance",
          params: [address, "latest"],
        },
        // 2. Check USDC & USDT specifically
        {
          jsonrpc: "2.0",
          id: 2,
          method: "alchemy_getTokenBalances",
          params: [address, [USDC_ADDRESS]],
          // params: [address, [USDC_ADDRESS, USDT_ADDRESS]],
        },
      ]),
    });

    const [polRes, tokenRes] = await response.json();

    return {
      pol: formatUnits(BigInt(polRes.result), 18),
      usdc: formatUnits(
        BigInt(tokenRes.result.tokenBalances[0].tokenBalance),
        6,
      ),
      // usdt: formatUnits(
      //   BigInt(tokenRes.result.tokenBalances[1].tokenBalance),
      //   6,
      // ),
    };
  } catch (error) {
    console.log("error");
    console.log("error");
    console.log("error");
    console.log("error");
    console.log("error");
    console.log(error);

    return {
      pol: "0.0",
      usdc: "0.0",
      // usdt: "0.0",
    };
  }
};

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export const GetPrices = async (
  address: string,
  balances: {
    pol: string;
    usdc: string;
    // usdt: string;
  },
): Promise<{
  total_usd: string;
  breakdown: {
    pol: string;
    usdc: string;
    // usdt: string;
  };
  token: {
    pol: string;
    usdc: string;
    // usdt: string;
  };
}> => {
  try {
    // 1. Fetch current prices
    // Note: 'polygon-ecosystem-token' is the correct ID for POL in 2026
    const priceRes = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=polygon-ecosystem-token,usd-coin,tether&vs_currencies=usd",
    );
    const prices = await priceRes.json();

    const polPrice = prices["polygon-ecosystem-token"].usd;
    const usdcPrice = prices["usd-coin"].usd;
    // const usdtPrice = prices["tether"].usd;

    // 2. Calculate individual values
    const polValue = parseFloat(balances.pol) * polPrice;
    const usdcValue = parseFloat(balances.usdc) * usdcPrice;
    // const usdtValue = parseFloat(balances.usdt) * usdtPrice;

    return {
      // total_usd: (polValue + usdcValue + usdtValue).toFixed(2),
      total_usd: (polValue + usdcValue).toFixed(2),
      breakdown: {
        pol: polValue.toFixed(2),
        usdc: usdcValue.toFixed(2),
        // usdt: usdtValue.toFixed(2),
      },
      token: {
        pol: polPrice.toFixed(2),
        usdc: usdcPrice.toFixed(2),
        // usdt: usdtPrice.toFixed(2),
      },
    };
  } catch (error) {
    return {
      total_usd: "0.0",
      breakdown: {
        pol: "0.0",
        usdc: "0.0",
        // usdt: "0.0",
      },
      token: {
        pol: "0.0",
        usdc: "0.0",
        // usdt: "0.0",
      },
    };
  }
};
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export async function Get_Transaction_Details(txHash: string) {
  const MATIC_TO_USD = 0.75;
  const provider = new ethers.JsonRpcProvider(ALCHEMY_URL, NETWORK, {
    staticNetwork: NETWORK,
  });

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
      (log) => log.topics[0] === transferTopic,
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
          provider,
        );

        const decoded = tokenContract.interface.decodeEventLog(
          "Transfer",
          tokenTransferLog.data,
          tokenTransferLog.topics,
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
      (log) => log.topics[0] === factoryTopic,
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
          factoryLog.topics,
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

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export async function Get_Wallet_History(address: string) {
  try {
    // 1. Prepare the Alchemy request
    const data = JSON.stringify({
      jsonrpc: "2.0",
      id: 0,
      method: "alchemy_getAssetTransfers",
      params: [
        {
          fromBlock: "0x0",
          toBlock: "latest",
          fromAddress: address, // Outgoing
          // toAddress: address, // 👈 Swap to this for Incoming history
          category: ["external", "erc20"], // MATIC + USDC/USDT
          excludeZeroValue: true,
          order: "desc", // Latest first
        },
      ],
    });

    const response = await axios.post(ALCHEMY_URL, data);
    return response.data.result.transfers || [];
  } catch (error) {
    console.error("History Fetch Error:", error);
    return [];
  }
}

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export const Get_Token_Logo = (symbol: string, address: string) => {
  const normalized_address = address?.toLowerCase();

  // 1. Force Official Logos for known Symbols (Works for Mainnet & Testnet)
  if (symbol === "USDC") {
    return "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359/logo.png";
  }

  if (symbol === "USDT") {
    return "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0xc2132D05D31c914a87C6611C10748AEb04B58e8F/logo.png";
  }

  // 2. POL / MATIC Variants
  const polVariants = [
    "0x269f9d68fe7bafc6d9284d47f709692b634c043c",
    "0x0000000000000000000000000000000000001010",
  ];

  if (
    symbol === "POL" ||
    symbol === "MATIC" ||
    polVariants.includes(normalized_address)
  ) {
    return "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png";
  }

  // 3. Fallback to Dynamic GitHub Lookup (Mainnet only)
  try {
    const checksumAddress = ethers.getAddress(address);
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/${checksumAddress}/logo.png`;
  } catch {
    return ""; // Will trigger your TokenLogo fallback UI
  }
};

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export const Get_Token_Logo_Alchemy = async (tokenAddress: string) => {
  try {
    const response = await axios.post(ALCHEMY_URL, {
      jsonrpc: "2.0",
      id: 1,
      method: "alchemy_getTokenMetadata",
      params: [tokenAddress],
    });
    return response.data.result.logo; // This returns the CDN URL for the logo
  } catch (error) {
    return null;
  }
};

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export async function smart_wait_for_receipt_universal(
  smartClient: any,
  userOpHash: string,
  initialNonce: bigint,
  tokenAddress: string,
  initialBalance: bigint,
  onAttempt?: (retryCount: number) => void,
) {
  const MAX_RETRIES = 25;
  const smartAddress = smartClient.account.address;

  for (let retries = 0; retries < MAX_RETRIES; retries++) {
    // --- CHECK 1: Receipt (Isolated) ---
    try {
      const receipt = await smartClient.getUserOperationReceipt({
        hash: userOpHash,
      });
      if (receipt?.receipt) {
        return {
          status: true,
          data: receipt,
          hash: receipt.receipt.transactionHash, // On-chain Tx Hash
          source: "receipt",
          error: null,
        };
      }
    } catch (e) {
      // Receipt not found yet, this is expected. Do nothing and let the loop continue.
    }

    // --- CHECK 2: Nonce (Always runs even if Receipt fails) ---
    try {
      const currentNonce = await smartClient.account.getNonce();
      if (currentNonce > initialNonce) {
        console.log("⚡ Nonce moved! Success.");
        return {
          status: true,
          data: null,
          hash: userOpHash, // Return the UserOp hash as fallback
          source: "nonce",
          error: null,
        };
      }
    } catch (e) {
      console.error("Nonce check failed", e);
    }

    // --- CHECK 3: Balance (Runs every 2nd attempt) ---
    if (retries % 2 === 0) {
      try {
        const currentBalance = (await PUBLIC_CLIENT.readContract({
          address: tokenAddress as `0x${string}`,
          abi: ERC_20_ABI,
          functionName: "balanceOf",
          args: [smartAddress],
        })) as bigint;

        if (currentBalance < initialBalance) {
          console.log("💰 Balance dropped! Success.");
          return {
            status: true,
            data: null,
            hash: userOpHash,
            source: "balance",
            error: null,
          };
        }
      } catch (e) {
        console.error("Balance check failed", e);
      }
    }

    console.log("[ Retries ]: ", retries);
    if (onAttempt) onAttempt(retries + 1);
    await new Promise((r) => setTimeout(r, 2000));
  }

  // Final Fallback
  const finalNonce = await smartClient.account.getNonce();
  if (finalNonce > initialNonce) {
    return {
      status: true,
      data: null,
      hash: userOpHash,
      source: "final_nonce",
      error: null,
    };
  }

  return {
    status: "unknown",
    message: "Timeout reached.",
    hash: userOpHash,
    error: null,
  };
}
