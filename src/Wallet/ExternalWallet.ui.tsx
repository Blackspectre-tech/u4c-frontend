"use client";

import { IoClose, IoCopy, IoWallet } from "react-icons/io5";
import Image from "next/image";
import {
  format_currency,
  response_message,
} from "@/components/utilities/utils";
import { GoArrowDownLeft } from "react-icons/go";
import { FetchAllTokens, GetPrices } from "./privy/privy.utils";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FaEye, FaEyeSlash, FaPaste } from "react-icons/fa";
import { setHideBalance } from "@/redux/slice/users";
import { PiCopySimple } from "react-icons/pi";
import { useSendTransaction } from "@privy-io/react-auth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const image = [
  "/icons/polygon-logo.png",
  "/icons/usdc-logo.png",
  "/icons/usdt-logo.png",
];

type modal_type = "dashboard" | "copy" | "transfer";

export default function ExternalWallet({
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
  const { hide_balance } = useSelector((state: RootState) => state.user);
  const [open, setOpen] = useState<modal_type>("dashboard");
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

      setPrice(price);
      setWallet(wallet);
    })();

    return () => {};
  }, []);

  const copy_to_clipboard = async () => {
    const scc_msg = "Wallet address copied.";
    const err_msg = "Something went wrong.";

    if (!navigator.clipboard) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = address;
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

    navigator.clipboard.writeText(address).then(
      () => response_message({ message: scc_msg, option: "scc" }),
      () => response_message({ message: err_msg, option: "wrn" }),
    );
  };

  // console.log("\n[ ***** ]");
  // console.log("wallet::: ", wallet);
  // console.log("price::: ", price);
  // console.log("formData::: ", formData);
  console.log("address::: ", address);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white/20 backdrop-blur-sm z-1000 flex items-center justify-center px-5 sm:px-0">
      {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
      {open === "dashboard" && (
        <div className="w-full sm:w-120">
          <div className="bg-white relative rounded-2xl shadow-xl p-7">
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
              <div className="bg-gray-200 flex justify-center gap-2 rounded-2xl p-1">
                <button
                  onClick={() => setOpen("copy")}
                  className={`flex flex-col items-center cursor-pointer gap-1 rounded-xl text-gray-800 py-2 px-5`}
                >
                  <PiCopySimple className={"text-xl"} />{" "}
                  <p className="text-sm">Copy</p>
                </button>

                <button
                  onClick={() => setOpen("copy")}
                  className={`flex flex-col items-center cursor-pointer gap-1 rounded-xl text-gray-800 py-2 px-5`}
                >
                  <GoArrowDownLeft className={"text-xl"} />{" "}
                  <p className="text-sm">Recieve</p>
                </button>

                {/* <button
                  onClick={() => setOpen("transfer")}
                  className={`flex flex-col items-center cursor-pointer gap-1 rounded-xl text-gray-800 py-2 px-5`}
                >
                  <GoArrowUpRight className={"text-xl"} />{" "}
                  <p className="text-sm">Send</p>
                </button> */}
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
      {open === "copy" && (
        <div className="w-full sm:w-100">
          <div className="bg-white relative rounded-2xl shadow-xl p-7">
            <div
              onClick={() => setOpen("dashboard")}
              className="absolute cursor-pointer top-7 right-7"
            >
              <IoClose className={"text-xl"} />
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
              <p className="flex-1 line-clamp-1">{address}</p>

              <button
                onClick={copy_to_clipboard}
                className={`flex justify-center cursor-pointer gap-1 bg-gray-500 text-white rounded-xl px-4 py-3`}
              >
                <IoCopy className={"text-xl"} />{" "}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
