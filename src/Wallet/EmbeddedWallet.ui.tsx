"use client";

import { IoClose, IoCopy, IoWallet } from "react-icons/io5";
import Image from "next/image";
import {
  capitalize,
  format_currency,
  response_message,
  truncate_balance,
} from "@/components/utilities/utils";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  FetchAllTokens,
  Get_Merged_Wallet_History,
  Get_Token_Logo,
  Get_Wallet_History,
  GetPrices,
  PUBLIC_CLIENT,
  smart_wait_for_receipt_universal,
  useGetWallet,
} from "./privy/privy.utils";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FaEye, FaEyeSlash, FaPaste, FaQuestion } from "react-icons/fa";
import { setHideBalance, setWalletType } from "@/redux/slice/users";
import { PiHandWithdraw, PiMoneyWavy } from "react-icons/pi";
import CustomSelector from "@/components/SelectTag";
import { useSendTransaction } from "@privy-io/react-auth";
import { encodeFunctionData, erc20Abi, parseUnits, isAddress } from "viem";
import { RiListSettingsFill } from "react-icons/ri";
import { MdKeyboardBackspace } from "react-icons/md";
import { FaCircleQuestion } from "react-icons/fa6";
import { checkDeployment } from "./ConnectSmartContract";
import { IoMdSwap } from "react-icons/io";

// ------------------------------------------------------------------------------------------------ [  ]
// ------------------------------------------------------------------------------------------------ [  ]
const image = [
  "/icons/polygon-logo.png",
  "/icons/usdc-logo.png",
  "/icons/usdt-logo.png",
];

type modal_type = "dashboard" | "receive" | "history" | "fund" | "transfer";

// ------------------------------------------------------------------------------------------------ [  ]
// ------------------------------------------------------------------------------------------------ [  ]

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
const HistoryTokenLogo = ({
  symbol,
  address,
}: {
  symbol: string;
  address: string;
}) => {
  const [hasError, setHasError] = useState(false);

  // Get the URL from your helper
  const logoUrl = Get_Token_Logo(symbol, address);

  // If the helper returned an empty string or the Image component failed to load
  if (hasError || !logoUrl) {
    return (
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
        <FaQuestion className="text-sm text-gray-400" />
      </div>
    );
  }

  return (
    <Image
      src={logoUrl}
      alt={symbol}
      width={35}
      height={35}
      className="rounded-full"
      // 🟢 This correctly triggers a re-render for THIS specific image
      onError={() => setHasError(true)}
    />
  );
};

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
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
  const { hide_balance, wallet_type } = useSelector(
    (state: RootState) => state.user,
  );
  const [validAddress, setValidAddress] = useState<boolean>(false);
  const [imageFallback, setImgFallback] = useState<number | null>(null);
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
  const copy_to_clipboard = async (value: string) => {
    const scc_msg = "Address copied.";
    const err_msg = "Something went wrong.";

    if (!navigator.clipboard) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = value;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        response_message({ message: scc_msg, option: "scc" });
      } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
        response_message({ message: err_msg, option: "wrn" });
      }
      document.body.removeChild(textArea);
      return;
    }

    navigator.clipboard.writeText(value).then(
      () => response_message({ message: scc_msg, option: "scc" }),
      () => response_message({ message: err_msg, option: "wrn" }),
    );
  };

  // ------------------------------------------------------------------------------------------------------------------- [  ]
  // ------------------------------------------------------------------------------------------------------------------- [  ]
  // ------------------------------------------------------------------------------------------------------------------- [  ]
  // ------------------------------------------------------------------------------------------------------------------- [  ]
  const copy_from_clipboard = async () => {
    const scc_msg = "Wallet address pasted successfully.";
    const err_msg = "Something went wrong.";

    try {
      // 1. Request text from clipboard
      const text = await navigator.clipboard.readText();
      setFormData((prev) => ({ ...prev, receiver_address: text }));

      if (isAddress(text)) setValidAddress(true);
      else setValidAddress(false);
      // response_message({ message: scc_msg, option: "scc" });
    } catch (err) {
      // This happens if the user denies the 'Paste' permission popup
      console.error("Failed to read clipboard: ", err);
      // response_message({ message: err_msg, option: "wrn" });
    }
  };

  // ------------------------------------------------------------------------------------------------------------------- [  ]
  // ------------------------------------------------------------------------------------------------------------------- [  ]
  // ------------------------------------------------------------------------------------------------------------------- [  ]
  // ------------------------------------------------------------------------------------------------------------------- [  ]
  const Embedded_Transfer = async () => {
    try {
      const { token, amount, receiver_address: recipient } = formData;

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
  const Smart_Transfer = async () => {
    const { token, amount, receiver_address: recipient } = formData;

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
  function truncate(text: string, first = 1) {
    if (text.length <= 10) return text;
    return first === 1 ? text.slice(0, 5) : text.slice(-5);
  }

  // ------------------------------------------------------------------------------------------------------------------- [  ]
  // ------------------------------------------------------------------------------------------------------------------- [  ]
  // ------------------------------------------------------------------------------------------------------------------- [  ]
  // ------------------------------------------------------------------------------------------------------------------- [  ]
  const CustomTransfer = async () => {
    setIsLoading(true);

    try {
      console.log("[ wallet_type ]: ", wallet_type);
      let status = false;

      if (wallet_type === "embedded-wallet") status = await Embedded_Transfer();
      else if (wallet_type === "smart-wallet") status = await Smart_Transfer();

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

  // console.log("\n\n\n[ ************************************ ]");
  // console.log("[ ************************************ ]");
  // console.log("[ ************************************ ]");
  // console.log("[ ************************************ ]");
  // console.log("is-wallet-deployed::: ", deployed);
  // console.log("price::: ", price);
  // console.log("history::: ", history);
  // console.log("address::: ", address);
  // console.log("formData::: ", formData);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white/20 backdrop-blur-sm z-1000 flex items-center justify-center px-5 sm:px-0">
      {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
      {open === "dashboard" && (
        <div className="flex flex-col items-center w-full sm:w-150">
          {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
          {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
          {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
          {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
          {/* <WalletSelection
            wallet_type={wallet_type}
            action={(value: "embedded-wallet" | "smart-wallet") => {
              dispatch(setWalletType(value));
            }}
          /> */}

          <div className="w-full bg-white relative rounded-2xl shadow-xl p-7">
            <div
              onClick={close}
              className="absolute cursor-pointer top-7 right-7"
            >
              <IoClose className={"text-xl"} />
            </div>

            <div className="w-full">
              <div className="flex items-center justify-center gap-3">
                <h1 className="text-gray-500 text-sm">Total balance</h1>

                {hide_balance ? (
                  <FaEye
                    onClick={() => dispatch(setHideBalance(false))}
                    className={`cursor-pointer text-[0.95rem]`}
                  />
                ) : (
                  <FaEyeSlash
                    onClick={() => dispatch(setHideBalance(true))}
                    className={`cursor-pointer text-[0.95rem]`}
                  />
                )}
              </div>

              <h1 className="text-center text-4xl mt-3">
                {hide_balance
                  ? "**********"
                  : `$ ${format_currency(Number(price?.total_usd))}`}
              </h1>
            </div>

            <div className="flex justify-center mt-5">
              <div className="bg-gray-200 flex flex-wrap justify-center gap-2 rounded-2xl p-1">
                <button
                  onClick={() => setOpen("receive")}
                  className={`flex flex-col items-center cursor-pointer gap-1 rounded-xl text-gray-800 py-2 px-5`}
                >
                  <GoArrowDownLeft className={"text-xl"} />{" "}
                  <p className="text-sm">receive</p>
                </button>

                <button
                  onClick={() => setOpen("transfer")}
                  className={`flex flex-col items-center cursor-pointer gap-1 rounded-xl text-gray-800 py-2 px-5`}
                >
                  <GoArrowUpRight className={"text-xl"} />{" "}
                  <p className="text-sm">Send</p>
                </button>

                <button
                  onClick={() => setOpen("fund")}
                  className={`flex flex-col items-center cursor-pointer gap-1 rounded-xl text-gray-800 py-2 px-5`}
                >
                  <PiMoneyWavy className={"text-xl"} />{" "}
                  <p className="text-sm">Fund</p>
                </button>

                <button
                  onClick={() => setOpen("fund")}
                  className={`flex flex-col items-center cursor-pointer gap-1 rounded-xl text-gray-800 py-2 px-5`}
                >
                  <PiHandWithdraw className={"text-xl"} />{" "}
                  <p className="text-sm">Withdraw</p>
                </button>

                <button
                  onClick={() => setOpen("fund")}
                  className={`flex flex-col items-center cursor-pointer gap-1 rounded-xl text-gray-800 py-2 px-5`}
                >
                  <IoMdSwap className={"text-xl"} />{" "}
                  <p className="text-sm">Swap</p>
                </button>

                <button
                  onClick={() => setOpen("history")}
                  className={`flex flex-col items-center cursor-pointer gap-1 rounded-xl text-gray-800 py-2 px-5`}
                >
                  <RiListSettingsFill className={"text-xl"} />{" "}
                  <p className="text-sm">History</p>
                </button>
              </div>
            </div>

            <div className="w-[30%] border-b border-gray-200 mt-5 mb-10 mx-auto"></div>

            <div className="flex flex-col gap-5 mt-10 px-3">
              <div className="flex justify-between items-center gap-2">
                <Image
                  src={image[0]}
                  alt=""
                  width={35}
                  height={35}
                  className=""
                />

                <div className="flex flex-1 justify-between items-center gap-4">
                  <div className="">
                    <h1 className="text-[1.0rem] font-semibold">Polygon</h1>
                    <h1 className="text-[0.9rem] text-gray-600">
                      {price?.token?.pol} $
                    </h1>
                  </div>

                  <div className="">
                    <h1 className="text-lg font-semibold">
                      {format_currency(Number(wallet?.pol))}
                    </h1>
                    <h1 className="text-[0.9rem] text-gray-600">
                      {price?.breakdown?.pol} $
                    </h1>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center gap-2">
                <Image
                  src={image[1]}
                  alt=""
                  width={35}
                  height={35}
                  className=""
                />

                <div className="flex flex-1 justify-between items-center gap-4">
                  <div className="">
                    <h1 className="text-[1.0rem] font-semibold">USDC</h1>
                    <h1 className="text-[0.9rem] text-gray-600">
                      {price?.token?.usdc} $
                    </h1>
                  </div>

                  <div className="">
                    <h1 className="text-lg font-semibold">
                      {format_currency(Number(wallet?.usdc))}
                    </h1>
                    <h1 className="text-[0.9rem] text-gray-600">
                      {price?.breakdown?.usdc} $
                    </h1>
                  </div>
                </div>
              </div>

              {/* <div className="flex justify-between items-center gap-2">
                <Image
                  src={image[2]}
                  alt=""
                  width={35}
                  height={35}
                  className=""
                />

                <div className="flex flex-1 justify-between items-center gap-4">
                  <div className="">
                    <h1 className="text-[1.0rem] font-semibold">USDT</h1>
                    <h1 className="text-[0.9rem] text-gray-600">
                      {price?.token?.usdt} $
                    </h1>
                  </div>

                  <div className="">
                    <h1 className="text-lg font-semibold">
                      {format_currency(Number(wallet?.usdt))}
                    </h1>
                    <h1 className="text-[0.9rem] text-gray-600">
                      {price?.breakdown?.usdt} $
                    </h1>
                  </div>
                </div>
              </div> */}
            </div>

            <div className="flex justify-center gap-5 mt-10">
              <button
                onClick={open_modal}
                className={`w-[70%] flex justify-center items-center gap-1 gradient-cto rounded-xl px-5 py-3`}
              >
                {is_loading && (
                  <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem] mr-1" />
                )}
                <IoWallet className={"text-xl"} />{" "}
                <p className="text-[0.9rem]">Disconnect</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
      {open === "receive" && (
        <div className="w-full sm:w-120">
          <div className="bg-white relative rounded-2xl shadow-xl p-7">
            <div
              onClick={() => setOpen("dashboard")}
              className="absolute cursor-pointer top-7 left-7"
            >
              <MdKeyboardBackspace className={"text-xl"} />
            </div>

            <div className="w-full flex items-center justify-center mt-10">
              <QRCodeSVG
                value={address}
                size={230}
                level="H" // High error correction (good for phone screens)
                includeMargin={false}
              />
            </div>

            <div className="w-[30%] border-b border-gray-200 mt-5 mb-5 mx-auto"></div>

            <div className="bg-gray-200 flex justify-between items-center rounded-xl gap-5 mt-10 py-2 pr-2 pl-4">
              <p className="flex-1 line-clamp-1 text-primary text-xl">
                {truncate(address)} <span className="text-black">.....</span>{" "}
                {truncate(address, 0)}
              </p>

              <button
                onClick={() => copy_to_clipboard(address)}
                className={`flex justify-center cursor-pointer gap-1 bg-gray-500 text-white rounded-xl px-4 py-3`}
              >
                <IoCopy className={"text-xl"} />{" "}
              </button>
            </div>

            <p className="text-red-600 text-sm text-center mt-5">
              Please note that this is the native USDC on the POLYGON network,
              please verify the contract address before depositing
            </p>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
      {open === "transfer" && (
        <div className="w-full sm:w-120">
          <div className="bg-white relative rounded-2xl shadow-xl p-7">
            <div
              onClick={() => setOpen("dashboard")}
              className="absolute cursor-pointer top-7 left-7"
            >
              <MdKeyboardBackspace className={"text-xl"} />
            </div>

            <div className="w-full">
              <div className="flex items-center justify-center gap-3">
                <h1 className="text-gray-500 text-sm capitalize">
                  {formData.token || "Token"} Balance
                </h1>
              </div>

              <h1 className="text-center text-4xl mt-3">
                {truncate_balance(
                  Number(
                    formData.token === "POLYGON"
                      ? wallet?.pol
                      : formData.token === "USDC"
                        ? wallet?.usdc
                        : // : formData.token === "USDT"
                          //   ? wallet?.usdt
                          "0.0",
                  ),
                  6,
                )}
              </h1>
            </div>

            <div className="mt-10">
              <div className="">
                <CustomSelector
                  optionsList={[
                    "POLYGON_0",
                    "USDC_1",
                    // "USDT_2"
                  ]}
                  placeholder="Currency"
                  changeEvent={(selected) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      token: String(selected?.value ?? "").split("_")[0],
                    }))
                  }
                  mapOption={(val: string) => ({
                    value: val,
                    name: val,
                    label: (
                      <div className="flex items-center gap-1">
                        <div className="min-w-10 min-h-[2.63rem] rounded-l-md flex justify-center items-center">
                          <Image
                            src={
                              image[
                                Number(
                                  val
                                    ?.replace("POLYGON_", "")
                                    ?.replace("USDC_", "") ||
                                    // ?.replace("USDT_", "")
                                    0,
                                )
                              ]
                            }
                            alt=""
                            width={25}
                            height={25}
                          />
                        </div>
                        <p>{val?.replace("_0", "")?.replace("_1", "")}</p>
                      </div>
                    ),
                  })}
                />
              </div>

              <div className="">
                <input
                  required
                  type="number"
                  value={formData.amount}
                  onChange={(val) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      amount: val.target.value,
                    }))
                  }
                  // placeholder="**********"
                  className="w-full px-5 py-3 border border-black/15 hover:border-black/30 outline-0 rounded-lg mt-3"
                />
              </div>
            </div>

            <div className="w-[30%] border-b border-gray-200 mt-5 mb-5 mx-auto"></div>

            <div className="bg-gray-200 flex flex-col min-[380px]:flex-row justify-between items-center rounded-xl gap-5 mt-10 py-2 pr-2 pl-2 min-[380px]:pl-4">
              <input
                className="w-full min-[380px]:w-auto flex-1 line-clamp-1 bg-transparent outline-0 p-3 min-[380px]:p-0"
                placeholder="receivers address..."
                value={formData.receiver_address}
                onChange={(val) => {
                  const address_ = val.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    receiver_address: address_,
                  }));

                  if (isAddress(address_)) setValidAddress(true);
                  else setValidAddress(false);
                }}
                type="text"
              />

              <button
                onClick={copy_from_clipboard}
                className={`w-full min-[380px]:w-auto flex justify-center cursor-pointer gap-1 bg-gray-500 text-white rounded-lg px-4 py-3`}
              >
                <FaPaste className={"text-xl"} />{" "}
              </button>
            </div>

            <div className="flex items-center justify-center mt-5">
              <button
                onClick={CustomTransfer}
                disabled={!validAddress}
                className={`w-full flex justify-center items-center gap-1 ${validAddress ? "gradient-cto" : "bg-gray-500 text-white"} rounded-xl px-5 py-4`}
              >
                {isLoading && (
                  <AiOutlineLoading3Quarters className="button_loading_ text-[1.3rem]" />
                )}
                <IoWallet className={"text-xl"} />{" "}
                <p className="text-[0.9rem]">Transfer</p>
              </button>
            </div>

            <p className="text-red-600 text-sm text-center mt-5">
              Please note that this is the native USDC on the POLYGON network,
              please verify the contract address before depositing.
            </p>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
      {open === "fund" && (
        <div className="w-full sm:w-120">
          <div className="bg-white relative rounded-2xl shadow-xl p-7">
            <div
              onClick={() => setOpen("dashboard")}
              className="absolute cursor-pointer top-7 left-7"
            >
              <MdKeyboardBackspace className={"text-xl"} />
            </div>

            <div className="w-full flex flex-col items-center justify-center mt-10">
              <h1 className="text-2xl font-semibold text-gray-400">
                Comming Soon
              </h1>
              <div className="w-[30%] border-b border-gray-200 mt-5 mb-5 mx-auto"></div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
      {open === "history" && (
        <div className="w-full sm:w-120">
          <div className="bg-white relative rounded-2xl shadow-xl p-7">
            <div
              onClick={() => setOpen("dashboard")}
              className="absolute cursor-pointer top-7 left-7"
            >
              <MdKeyboardBackspace className={"text-xl"} />
            </div>

            <h1 className="text-center text-2xl mt-5">Transaction History</h1>

            <div className="w-[30%] border-b border-gray-200 mt-5 mb-5 mx-auto"></div>

            <div className="max-h-100 overflow-y-auto flex flex-col gap-5 mt-5">
              {history.map((val, ind) => (
                <div
                  key={ind}
                  className="flex justify-between items-center gap-2"
                >
                  <HistoryTokenLogo
                    symbol={val?.asset}
                    address={val?.rawContract.address}
                  />

                  <div className="flex flex-1 justify-between items-center gap-4">
                    <div className="">
                      <h1 className="text-[1.0rem] font-semibold">
                        {val?.asset}
                      </h1>

                      <div className="text-[0.9rem] text-gray-600 flex items-center gap-2">
                        {/* <span className="font-semibold">From:</span> */}

                        <div
                          onClick={() => copy_to_clipboard(val?.hash)}
                          className="flex items-center gap-1 cursor-pointer"
                        >
                          <IoCopy className={"text-sm"} />
                          <span>{val?.hash?.slice(0, 4)}...</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <h1 className="text-lg font-semibold">
                        {format_currency(Number(val?.value))}
                      </h1>
                      <h1
                        className={`text-[0.7rem] rounded-sm ${val?.displayType === "Received" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} px-3 py-[0.20rem]`}
                      >
                        {val?.displayType}
                      </h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

{
  /* -------------------------------------------------------------------------------------------------------------------------------------------- */
}
{
  /* -------------------------------------------------------------------------------------------------------------------------------------------- */
}
{
  /* -------------------------------------------------------------------------------------------------------------------------------------------- */
}
{
  /* -------------------------------------------------------------------------------------------------------------------------------------------- */
}
function WalletSelection({
  wallet_type,
  action,
}: {
  wallet_type: string;
  action: (val: "embedded-wallet" | "smart-wallet") => void;
}) {
  return (
    <div className="w-[90%] bg-white rounded-2xl p-4 mb-5">
      <div className="flex items-center gap-1 mb-3">
        <FaCircleQuestion className="text-lg text-gray-400" />
        <h1 className="font-semibold">Wallet-Type:</h1>
      </div>

      <div className="w-full bg-gray-200 rounded-full">
        <CustomSelector
          optionsList={["Embedded-Wallet", "Smart-Wallet"]}
          control_class={"w-full"}
          control_style={{
            // borderRadius: "0.5rem",
            border: "none",
            padding: "0.30rem 0.65rem",
            backgroundColor: "",
            outline: "0",
            stroke: "0",
            width: "100%",
            placeholder: "",
            flex: 1,
          }}
          placeholder={capitalize(wallet_type?.replace("-", " "))}
          changeEvent={(selected) => {
            if (!selected) return;

            // console.log("selected");
            // console.log("selected");
            // console.log("selected");
            // console.log(selected);

            action(selected?.value as "embedded-wallet" | "smart-wallet");
          }}
          mapOption={(val) => ({
            value: val,
            name: val,
            label: (
              <div className="flex items-center text-[1rem]">
                <p>{val}</p>
              </div>
            ),
          })}
        />
      </div>
    </div>
  );
}
