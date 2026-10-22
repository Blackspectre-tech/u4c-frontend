"use client";

import { response_message } from "@/components/utilities/utils";
import {
  FetchAllTokens,
  Get_Merged_Wallet_History,
  GetPrices,
  PUBLIC_CLIENT,
  smart_wait_for_receipt_universal,
  useGetWallet,
} from "./privy/privy.utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setHideBalance } from "@/redux/slice/users";
import { useSendTransaction } from "@privy-io/react-auth";
import { encodeFunctionData, erc20Abi, parseUnits, isAddress } from "viem";
import { checkDeployment } from "./ConnectSmartContract";
import {
  useCreateLinkioOfframpMutation,
  useCreateLinkioOnrampMutation,
  useGetLinkioBanksMutation,
  useGetLinkioDepositWalletsMutation,
  useGetLinkioRatesMutation,
  useGetLinkioTransactionMutation,
  useGetLinkioTransactionHistoryMutation,
  useGetLinkioVendorsMutation,
  useGetLinkioVerifyAccountNumberMutation,
} from "@/redux/api/_main";
import { modal_type, LinkioVendor, LinkioBank } from "./components/types";
import { AccountCheck } from "./components/AccountVerification";
import { ONRAMP_MIN_NGN, OFFRAMP_MIN_USDC } from "./components/constants";
import DashboardScreen from "./components/DashboardScreen";
import ReceiveScreen from "./components/ReceiveScreen";
import TransferScreen from "./components/TransferScreen";
import ComingSoonScreen from "./components/ComingSoonScreen";
import OnrampScreen, { OnrampForm } from "./components/OnrampScreen";
import OfframpScreen, { OfframpForm } from "./components/OfframpScreen";
import HistoryScreen, { HistoryTab } from "./components/HistoryScreen";

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// This component owns all the state and business logic (wallet data,
// transfers, Linkio onramp/offramp) and just picks which screen component to
// render. The screens themselves live in ./components and are pure
// presentation — see that folder if you're after the JSX for a given screen.
export default function EmbeddedWallet({
  is_loading,
  open_modal,
  address,
  close,
}: {
  open_modal: () => void;
  is_loading: boolean;
  close: () => void;
  address: string;
}) {
  const { hide_balance, wallet_type, online } = useSelector(
    (state: RootState) => state.user,
  );
  const [validAddress, setValidAddress] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<any[]>([]);
  const [deployed, setDeployed] = useState<boolean>(true);
  const [open, setOpen] = useState<modal_type>("dashboard");
  const [refetch, setRefetch] = useState<boolean>(false);
  const { sendTransaction } = useSendTransaction();
  const use_wallet = useGetWallet();

  const [formData, setFormData] = useState<{
    amount: number;
    token: string | null;
    receiver_address: string;
  }>({
    amount: 0,
    token: null,
    receiver_address: "",
  });
  const [wallet, setWallet] = useState<any>({
    pol: "0.0",
    usdc: "0.0",
    usdt: "0.0",
  });
  const [price, setPrice] = useState<any>({
    total_usd: "0.0",
    breakdown: {
      pol: "0.0",
      usdc: "0.0",
      usdt: "0.0",
    },
    token: {
      pol: "0.0",
      usdc: "0.0",
      usdt: "0.0",
    },
  });
  const dispatch = useDispatch();

  // Onramp, offramp and transaction-history are the only Linkio endpoints
  // that require a logged-in session. `online` (not a raw localStorage
  // token check) is what the rest of the app treats as "logged in" — it's
  // what the nav bar's Signin/profile switch goes by — so this has to match
  // or it'll say "logged in" while a stale token sits in localStorage from
  // an earlier session.
  const is_logged_in = online === true;

  // ----------------------------------------------------------------- [ Linkio: onramp / offramp ]
  const [Get_Linkio_Vendors, { isLoading: vendorsLoading }] =
    useGetLinkioVendorsMutation();
  const [Get_Linkio_Banks] = useGetLinkioBanksMutation();
  const [Get_Linkio_Rates] = useGetLinkioRatesMutation();
  const [Create_Onramp, { isLoading: onrampLoading }] =
    useCreateLinkioOnrampMutation();
  const [Create_Offramp, { isLoading: offrampLoading }] =
    useCreateLinkioOfframpMutation();
  const [Get_Linkio_Transaction, { isLoading: transactionLoading }] =
    useGetLinkioTransactionMutation();
  const [Get_Linkio_Transaction_History] =
    useGetLinkioTransactionHistoryMutation();
  const [Get_Linkio_Deposit_Wallets] = useGetLinkioDepositWalletsMutation();
  const [Get_Linkio_Verify_Account] = useGetLinkioVerifyAccountNumberMutation();

  const [vendors, setVendors] = useState<LinkioVendor[]>([]);
  const [banks, setBanks] = useState<LinkioBank[]>([]);
  const [onrampRate, setOnrampRate] = useState<Record<string, number> | null>(
    null,
  );
  const [offrampRate, setOfframpRate] = useState<Record<string, number> | null>(
    null,
  );

  // The Polygon address Linkio wants offramp'd crypto sent to. Fetched once
  // when the offramp screen opens.
  const [offrampDepositAddress, setOfframpDepositAddress] = useState<
    string | null
  >(null);

  const empty_account_check: AccountCheck = {
    loading: false,
    name: null,
    error: false,
  };
  const [onrampAccountCheck, setOnrampAccountCheck] =
    useState<AccountCheck>(empty_account_check);
  const [offrampAccountCheck, setOfframpAccountCheck] =
    useState<AccountCheck>(empty_account_check);

  const [onrampForm, setOnrampForm] = useState<OnrampForm>({
    amount: "",
    vendor: null,
    bank_name: "",
    bank_code: "",
    account_number: "",
  });
  const [onrampResult, setOnrampResult] = useState<any>(null);

  const [offrampForm, setOfframpForm] = useState<OfframpForm>({
    amount: "",
    bank_name: "",
    bank_code: "",
    account_number: "",
    account_name: "",
  });
  const [offrampResult, setOfframpResult] = useState<any>(null);
  // "Pay Now" on the offramp result screen — sends the USDC to Linkio's
  // deposit address, reusing the same Embedded_Transfer/Smart_Transfer the
  // Send flow already uses.
  const [offrampPaying, setOfframpPaying] = useState(false);
  const [offrampPaid, setOfframpPaid] = useState(false);

  const [transactionResult, setTransactionResult] = useState<any>(null);

  // The three tabs on the History screen: the existing on-chain wallet
  // history, plus the new Linkio onramp/offramp transaction history (the
  // only Linkio endpoint that actually requires auth).
  const [historyTab, setHistoryTab] = useState<HistoryTab>("wallet");
  const [onrampHistory, setOnrampHistory] = useState<any[]>([]);
  const [onrampHistoryLoading, setOnrampHistoryLoading] = useState(false);
  const [onrampHistoryNeedsLogin, setOnrampHistoryNeedsLogin] = useState(false);
  const [offrampHistory, setOfframpHistory] = useState<any[]>([]);
  const [offrampHistoryLoading, setOfframpHistoryLoading] = useState(false);
  const [offrampHistoryNeedsLogin, setOfframpHistoryNeedsLogin] =
    useState(false);

  // Lazily load whatever each screen needs, the first time it's opened.
  useEffect(() => {
    if (open === "onramp" && vendors.length === 0) {
      (async () => {
        const result = await Get_Linkio_Vendors({ params: {} });

        console.log("[ Vendors ]: ", result);
        // Confirmed 2026-10-22: now that the backend returns live vendor
        // data instead of test data, the key is capitalized `Vendors` —
        // same shift that happened to banks' `Banks` key earlier.
        setVendors((result as any)?.data?.Vendors || []);
      })();
    }

    if ((open === "onramp" || open === "offramp") && banks.length === 0) {
      (async () => {
        const result = await Get_Linkio_Banks({ params: {} });

        console.log("[ Banks ]: ", result);
        // Confirmed 2026-10-21: the real key is capitalized `Banks`.
        setBanks((result as any)?.data?.Banks || []);
      })();
    }

    if (open === "offramp" && !offrampDepositAddress) {
      (async () => {
        const result = await Get_Linkio_Deposit_Wallets({ params: {} });

        console.log("[ Deposit-Wallets ]: ", result);
        const wallets = (result as any)?.data?.Wallets || [];
        const polygon = wallets.find(
          (w: any) => String(w?.network).toLowerCase() === "polygon",
        );
        if (polygon?.address) setOfframpDepositAddress(polygon.address);
      })();
    }

    if (open === "onramp" && !onrampRate) {
      (async () => {
        const result = await Get_Linkio_Rates({
          params: { trx_type: "onramp" },
        });

        console.log("[ Onramp-Rates ]: ", result);
        if (!("error" in (result as any))) setOnrampRate((result as any).data);
      })();
    }

    if (open === "offramp" && !offrampRate) {
      (async () => {
        const result = await Get_Linkio_Rates({
          params: { trx_type: "offramp" },
        });

        console.log("[ Oframp-Rates ]: ", result);
        if (!("error" in (result as any))) setOfframpRate((result as any).data);
      })();
    }

    return () => {};
  }, [open]);

  // Verify the typed account number against the selected bank, half a
  // second after the user stops typing (so it doesn't fire on every
  // keystroke). Needs both a bank_code (from the bank dropdown) and a full
  // 10-digit account number.
  useEffect(() => {
    if (!onrampForm.bank_code || onrampForm.account_number.length !== 10) {
      setOnrampAccountCheck(empty_account_check);
      return;
    }

    const timeout = setTimeout(async () => {
      setOnrampAccountCheck({ loading: true, name: null, error: false });

      const result = await Get_Linkio_Verify_Account({
        params: {
          account_number: onrampForm.account_number,
          bank_code: onrampForm.bank_code,
        },
      });

      const name = (result as any)?.data?.data?.account_name || null;
      setOnrampAccountCheck({ loading: false, name, error: !name });
    }, 500);

    return () => clearTimeout(timeout);
  }, [onrampForm.bank_code, onrampForm.account_number]);

  useEffect(() => {
    if (!offrampForm.bank_code || offrampForm.account_number.length !== 10) {
      setOfframpAccountCheck(empty_account_check);
      return;
    }

    const timeout = setTimeout(async () => {
      setOfframpAccountCheck({ loading: true, name: null, error: false });

      const result = await Get_Linkio_Verify_Account({
        params: {
          account_number: offrampForm.account_number,
          bank_code: offrampForm.bank_code,
        },
      });

      const name = (result as any)?.data?.data?.account_name || null;
      setOfframpAccountCheck({ loading: false, name, error: !name });

      // Offramp sends account_name to Linkio, so pre-fill it with the
      // verified name — the user can still edit it if needed.
      if (name) setOfframpForm((prev) => ({ ...prev, account_name: name }));
    }, 500);

    return () => clearTimeout(timeout);
  }, [offrampForm.bank_code, offrampForm.account_number]);

  // Load onramp/offramp history the first time its tab is opened. Confirmed
  // 2026-10-19: it's a standard DRF-paginated list, { count, next, previous,
  // results: [...] } — read `.results` first, with a couple of fallbacks
  // kept around in case onramp/offramp ever differ from each other.
  useEffect(() => {
    if (open !== "history") return;

    if (historyTab === "onramp" && onrampHistory.length === 0) {
      if (!is_logged_in) {
        setOnrampHistoryNeedsLogin(true);
      } else {
        setOnrampHistoryLoading(true);
        (async () => {
          const result = await Get_Linkio_Transaction_History({
            params: { wallet_address: address, transaction_type: "ONRAMP" },
          });
          setOnrampHistoryLoading(false);
          console.log("[ Onramp-History ]: ", result);

          if ("error" in (result as any)) {
            setOnrampHistoryNeedsLogin(true);
            return;
          }

          const data = (result as any)?.data;
          setOnrampHistory(
            Array.isArray(data?.results)
              ? data.results
              : Array.isArray(data?.transactions)
                ? data.transactions
                : Array.isArray(data)
                  ? data
                  : [],
          );
        })();
      }
    }

    if (historyTab === "offramp" && offrampHistory.length === 0) {
      if (!is_logged_in) {
        setOfframpHistoryNeedsLogin(true);
      } else {
        setOfframpHistoryLoading(true);
        (async () => {
          const result = await Get_Linkio_Transaction_History({
            params: { wallet_address: address, transaction_type: "OFFRAMP" },
          });
          setOfframpHistoryLoading(false);

          console.log("[ Offramp-History ]: ", result);

          if ("error" in (result as any)) {
            setOfframpHistoryNeedsLogin(true);
            return;
          }

          const data = (result as any)?.data;
          setOfframpHistory(
            Array.isArray(data?.results)
              ? data.results
              : Array.isArray(data?.transactions)
                ? data.transactions
                : Array.isArray(data)
                  ? data
                  : [],
          );
        })();
      }
    }

    return () => {};
  }, [open, historyTab]);

  // Linkio's own errors (e.g. "below minimum") come back in a different
  // shape than our backend's own field-validation errors, so check both. If
  // it's specifically a minimum-amount violation, surface the real number
  // from the response rather than a generic message, in case our own
  // ONRAMP_MIN_NGN/OFFRAMP_MIN_USDC constants ever drift from Linkio's.
  const extract_linkio_error = (result: any): string => {
    const data = result?.error?.data;

    if (
      data?.code === "TXN_MINIMUM_VIOLATION" &&
      data?.details?.minimum_allowed
    )
      return `Minimum amount is ${data.details.minimum_allowed}.`;

    return data?.errors?.[0]?.detail || data?.message || "Something went wrong";
  };

  const submit_onramp = async () => {
    if (!onrampForm.amount || Number(onrampForm.amount) <= 0)
      return response_message({ message: "Enter an amount", option: "wrn" });
    if (Number(onrampForm.amount) < ONRAMP_MIN_NGN)
      return response_message({
        message: `Minimum amount is ₦${ONRAMP_MIN_NGN.toLocaleString()}.`,
        option: "wrn",
      });
    if (!onrampForm.vendor)
      return response_message({ message: "Select a vendor", option: "wrn" });
    if (!onrampForm.bank_code || !onrampForm.account_number)
      return response_message({
        message: "Select your bank and enter your account number",
        option: "wrn",
      });
    if (!onrampAccountCheck.name)
      return response_message({
        message: "We couldn't verify this account number",
        option: "wrn",
      });

    const result = await Create_Onramp({
      body: {
        currency: "NGN",
        amount: String(onrampForm.amount),
        vendor_bank: onrampForm.vendor.vendorBank,
        vendor_number: onrampForm.vendor.vendorNumber,
        vendor_name: onrampForm.vendor.venderName,
        wallet_address: address,
        bank_name: onrampForm.bank_name,
        account_number: onrampForm.account_number,
        network: "polygon",
        stables: "USDC",
      },
    });

    if ("error" in (result as any))
      return response_message({
        message: extract_linkio_error(result),
        option: "err",
      });

    setOnrampResult(
      (result as any)?.data?.transaction || (result as any)?.data,
    );
  };

  const submit_offramp = async () => {
    if (!offrampForm.amount || Number(offrampForm.amount) <= 0)
      return response_message({ message: "Enter an amount", option: "wrn" });
    if (Number(offrampForm.amount) < OFFRAMP_MIN_USDC)
      return response_message({
        message: `Minimum amount is ${OFFRAMP_MIN_USDC} USDC.`,
        option: "wrn",
      });
    if (!offrampForm.bank_code || !offrampForm.account_number)
      return response_message({
        message: "Select your payout bank and enter your account number",
        option: "wrn",
      });
    if (!offrampAccountCheck.name)
      return response_message({
        message: "We couldn't verify this account number",
        option: "wrn",
      });
    if (!offrampForm.account_name)
      return response_message({
        message: "Enter the account name",
        option: "wrn",
      });

    const result = await Create_Offramp({
      body: {
        currency: "NGN",
        amount: String(offrampForm.amount),
        wallet_address: address,
        bank_name: offrampForm.bank_name,
        account_number: offrampForm.account_number,
        account_name: offrampForm.account_name,
        network: "polygon",
        stables: "USDC",
      },
    });

    if ("error" in (result as any))
      return response_message({
        message: extract_linkio_error(result),
        option: "err",
      });

    setOfframpResult(
      (result as any)?.data?.transaction || (result as any)?.data,
    );
  };

  const check_linkio_transaction = async (trx_ref: string) => {
    const result = await Get_Linkio_Transaction({ params: { trx_ref } });
    console.log("[ Transaction-Result ]: ", result);

    if ("error" in (result as any))
      return response_message({
        message: "Unable to check status right now, try again shortly.",
        option: "wrn",
      });

    setTransactionResult(
      (result as any)?.data?.transactions || (result as any)?.data,
    );
  };

  const reset_onramp = () => {
    setOnrampForm({
      amount: "",
      vendor: null,
      bank_name: "",
      bank_code: "",
      account_number: "",
    });
    setOnrampResult(null);
    setTransactionResult(null);
    setOnrampAccountCheck(empty_account_check);
  };

  const reset_offramp = () => {
    setOfframpForm({
      amount: "",
      bank_name: "",
      bank_code: "",
      account_number: "",
      account_name: "",
    });
    setOfframpResult(null);
    setTransactionResult(null);
    setOfframpAccountCheck(empty_account_check);
    setOfframpPaying(false);
    setOfframpPaid(false);
  };

  useEffect(() => {
    (async () => {
      const wallet = await FetchAllTokens(address);
      const price = await GetPrices(address, wallet);
      // const history = await Get_Wallet_History(address);
      const history = await Get_Merged_Wallet_History(address);
      const deployed_ = await checkDeployment(address);

      setPrice(price);
      setWallet(wallet);
      setHistory(history);
      setDeployed(deployed_);
    })();

    return () => {};
  }, [refetch, address]);

  // ------------------------------------------------------------------------------------------------------------------- [  ]
  // ------------------------------------------------------------------------------------------------------------------- [  ]
  // ------------------------------------------------------------------------------------------------------------------- [  ]
  // ------------------------------------------------------------------------------------------------------------------- [  ]
  // Takes explicit args (rather than reading formData directly) so it can
  // also be used to pay an offramp request's deposit address, not just the
  // Transfer screen's own recipient field.
  const Embedded_Transfer = async (
    token: string | null,
    amount: number,
    recipient: string,
  ) => {
    try {
      // 1.
      if (!token) {
        response_message({
          message: "Select token first",
          option: "wrn",
        });

        return false;
      } else if (amount < 1) {
        response_message({
          message: "Invalid Amount",
          option: "wrn",
        });

        return false;
      }

      // 2. Balance Validation (CRITICAL FIX)
      const currentBalance =
        token === "POLYGON"
          ? Number(wallet?.pol)
          : token === "USDC"
            ? Number(wallet?.usdc)
            : 0;

      if (Number(amount) > currentBalance) {
        response_message({
          message: `Insufficient ${token} balance. You have ${currentBalance}`,
          option: "wrn",
        });

        return false;
      }

      // 2. Validate Address before even trying
      if (!isAddress(recipient)) {
        throw new Error("Invalid recipient address");
      }

      // 3. Dynamic Decimals and Address Logic
      // POL is the native token, so it doesn't have a contract address for a simple transfer
      if (token === "POLYGON") {
        await sendTransaction({
          to: recipient as `0x${string}`,
          value: parseUnits(String(amount), 18), // Native POL uses 18 decimals
        });
      } else {
        // Handle ERC20 (USDC/USDT)
        const isUSDC = token === "USDC";
        const tokenAddress = isUSDC
          ? "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359"
          : "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";

        const data = encodeFunctionData({
          abi: erc20Abi,
          functionName: "transfer",
          args: [recipient as `0x${string}`, parseUnits(String(amount), 6)], // USDC/USDT use 6
        });

        await sendTransaction({
          to: tokenAddress as `0x${string}`,
          data: data,
          value: 0n,
        });
      }

      return true;
    } catch (err) {
      console.error("Smart Transfer failed:", err);
      response_message({ message: "Transfer Failed", option: "err" });

      return false;
    }
  };

  // ------------------------------------------------------------------------------------------------------------------- [  ]
  // ------------------------------------------------------------------------------------------------------------------- [  ]
  // ------------------------------------------------------------------------------------------------------------------- [  ]
  // ------------------------------------------------------------------------------------------------------------------- [  ]
  const Smart_Transfer = async (
    token: string | null,
    amount: number,
    recipient: string,
  ) => {
    // 1. Validations
    if (!token) {
      response_message({ message: "Select token first", option: "wrn" });

      return false;
    } else if (amount <= 0) {
      response_message({ message: "Invalid amount", option: "wrn" });

      return false;
    } else if (!isAddress(recipient)) {
      response_message({ message: "Invalid recipient address", option: "wrn" });

      return false;
    }

    // 2. Balance Validation (CRITICAL FIX)
    const currentBalance =
      token === "POLYGON"
        ? Number(wallet?.pol)
        : token === "USDC"
          ? Number(wallet?.usdc)
          : 0;

    if (Number(amount) > currentBalance) {
      response_message({
        message: `Insufficient ${token} balance. You have ${currentBalance}`,
        option: "wrn",
      });

      return false;
    }

    try {
      let hash;
      const smartAddress = use_wallet.address; //
      const account = use_wallet.connector;
      const isUSDC = token === "USDC";
      const tokenAddress = isUSDC
        ? "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359"
        : "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";

      // 2. Capture initial state for the watcher
      const [initialNonce, initialBalance] = await Promise.all([
        // Get the nonce via the public client instead of the connector
        PUBLIC_CLIENT.getTransactionCount({
          address: smartAddress as `0x${string}`,
        }),

        token === "POLYGON"
          ? PUBLIC_CLIENT.getBalance({ address: smartAddress as `0x${string}` })
          : PUBLIC_CLIENT.readContract({
              address: tokenAddress as `0x${string}`,
              abi: erc20Abi,
              functionName: "balanceOf",
              args: [smartAddress as `0x${string}`],
            }),
      ]);

      // 3. Execute through the Smart Client
      if (token === "POLYGON") {
        hash = await account.sendTransaction({
          to: recipient as `0x${string}`,
          value: parseUnits(String(amount), 18),
        });
      } else {
        const data = encodeFunctionData({
          abi: erc20Abi,
          functionName: "transfer",
          args: [recipient as `0x${string}`, parseUnits(String(amount), 6)],
        });

        hash = await account.sendTransaction({
          to: tokenAddress as `0x${string}`,
          data: data,
        });
      }

      // 4. Use the Universal Watcher to confirm the success
      const result = await smart_wait_for_receipt_universal(
        account,
        hash,
        BigInt(initialNonce),
        token === "POLYGON" ? "" : tokenAddress,
        initialBalance as bigint,
      );

      if (result.status === true) return result.status;
      else return false;
    } catch (err) {
      console.error("Smart Transfer failed:", err);
      response_message({ message: "Transfer Failed", option: "err" });

      return false;
    }
  };

  // ------------------------------------------------------------------------------------------------------------------- [  ]
  // ------------------------------------------------------------------------------------------------------------------- [  ]
  // ------------------------------------------------------------------------------------------------------------------- [  ]
  // ------------------------------------------------------------------------------------------------------------------- [  ]
  // "Pay Now" on the offramp result screen. Sends the USDC the user just
  // requested to sell straight to Linkio's Polygon deposit address, reusing
  // the same transfer logic the Send flow uses — just with explicit args
  // instead of reading the Transfer screen's own formData.
  const pay_offramp_deposit = async () => {
    if (!offrampDepositAddress) {
      return response_message({
        message: "Deposit address isn't available yet, try again shortly.",
        option: "wrn",
      });
    }

    setOfframpPaying(true);

    try {
      let status = false;

      if (wallet_type === "embedded-wallet")
        status = await Embedded_Transfer(
          "USDC",
          Number(offrampForm.amount),
          offrampDepositAddress,
        );
      else if (wallet_type === "smart-wallet")
        status = await Smart_Transfer(
          "USDC",
          Number(offrampForm.amount),
          offrampDepositAddress,
        );

      if (status === true) {
        response_message({
          message: "Payment sent. We'll process your payout shortly.",
          option: "scc",
        });
        setOfframpPaid(true);
        setRefetch((prev) => !prev); // refresh wallet balance — funds just left
      }
    } finally {
      setOfframpPaying(false);
    }
  };

  // ------------------------------------------------------------------------------------------------------------------- [  ]
  // ------------------------------------------------------------------------------------------------------------------- [  ]
  // ------------------------------------------------------------------------------------------------------------------- [  ]
  // ------------------------------------------------------------------------------------------------------------------- [  ]
  const CustomTransfer = async () => {
    setIsLoading(true);

    try {
      console.log("[ wallet_type ]: ", wallet_type);
      let status = false;

      if (wallet_type === "embedded-wallet")
        status = await Embedded_Transfer(
          formData.token,
          formData.amount,
          formData.receiver_address,
        );
      else if (wallet_type === "smart-wallet")
        status = await Smart_Transfer(
          formData.token,
          formData.amount,
          formData.receiver_address,
        );

      if (status === true) {
        response_message({ message: "Transfer Successful", option: "scc" });
        setRefetch((prev) => !prev);
        setOpen("dashboard");
      }
    } catch (err) {
      console.error("Transfer failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800/40 backdrop-blur-sm z-1000 flex items-center justify-center px-5 sm:px-0">
      {open === "dashboard" && (
        <DashboardScreen
          close={close}
          is_loading={is_loading}
          is_logged_in={is_logged_in}
          open_modal={open_modal}
          hide_balance={hide_balance}
          onToggleHideBalance={() => dispatch(setHideBalance(!hide_balance))}
          price={price}
          wallet={wallet}
          onNavigate={setOpen}
        />
      )}

      {open === "receive" && (
        <ReceiveScreen address={address} onBack={() => setOpen("dashboard")} />
      )}

      {open === "transfer" && (
        <TransferScreen
          wallet={wallet}
          formData={formData}
          setFormData={setFormData}
          validAddress={validAddress}
          setValidAddress={setValidAddress}
          isLoading={isLoading}
          onSubmit={CustomTransfer}
          onBack={() => setOpen("dashboard")}
        />
      )}

      {open === "fund" && (
        <ComingSoonScreen onBack={() => setOpen("dashboard")} />
      )}

      {open === "onramp" && (
        <OnrampScreen
          onBack={() => {
            reset_onramp();
            setOpen("dashboard");
          }}
          needsLogin={!is_logged_in}
          vendors={vendors}
          vendorsLoading={vendorsLoading}
          banks={banks}
          rate={onrampRate}
          form={onrampForm}
          setForm={setOnrampForm}
          accountCheck={onrampAccountCheck}
          result={onrampResult}
          loading={onrampLoading}
          transactionResult={transactionResult}
          transactionLoading={transactionLoading}
          onSubmit={submit_onramp}
          onCheckTransaction={check_linkio_transaction}
        />
      )}

      {open === "offramp" && (
        <OfframpScreen
          onBack={() => {
            reset_offramp();
            setOpen("dashboard");
          }}
          needsLogin={!is_logged_in}
          banks={banks}
          rate={offrampRate}
          form={offrampForm}
          setForm={setOfframpForm}
          accountCheck={offrampAccountCheck}
          depositAddress={offrampDepositAddress}
          result={offrampResult}
          loading={offrampLoading}
          transactionResult={transactionResult}
          transactionLoading={transactionLoading}
          onSubmit={submit_offramp}
          onCheckTransaction={check_linkio_transaction}
          onPayDeposit={pay_offramp_deposit}
          paying={offrampPaying}
          paid={offrampPaid}
        />
      )}

      {open === "history" && (
        <HistoryScreen
          activeTab={historyTab}
          onChangeTab={setHistoryTab}
          history={history}
          onrampHistory={onrampHistory}
          onrampHistoryLoading={onrampHistoryLoading}
          onrampHistoryNeedsLogin={onrampHistoryNeedsLogin}
          offrampHistory={offrampHistory}
          offrampHistoryLoading={offrampHistoryLoading}
          offrampHistoryNeedsLogin={offrampHistoryNeedsLogin}
          onBack={() => setOpen("dashboard")}
        />
      )}
    </div>
  );
}
