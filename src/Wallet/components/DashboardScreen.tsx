"use client";

import Image from "next/image";
import { format_currency } from "@/components/utilities/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { IoMdSwap } from "react-icons/io";
import { IoLockClosedOutline, IoWallet } from "react-icons/io5";
import { PiHandWithdraw, PiMoneyWavy } from "react-icons/pi";
import { RiListSettingsFill } from "react-icons/ri";
import ModalShell from "./ModalShell";
import { modal_type } from "./types";

const image = [
  "/icons/polygon-logo.png",
  "/icons/usdc-logo.png",
  "/icons/usdt-logo.png",
];

function DashboardScreen({
  close,
  is_loading,
  is_logged_in,
  open_modal,
  hide_balance,
  onToggleHideBalance,
  price,
  wallet,
  onNavigate,
}: {
  close: () => void;
  is_loading: boolean;
  is_logged_in: boolean;
  open_modal: () => void;
  hide_balance: boolean;
  onToggleHideBalance: () => void;
  price: any;
  wallet: any;
  onNavigate: (screen: modal_type) => void;
}) {
  // The six quick actions on the dashboard screen. Swap still leads to the
  // "coming soon" screen — flagged with `soon` so that's obvious instead of
  // a surprise. Fund/Withdraw need a logged-in session (their screens block
  // on this too), flagged with `needsLogin` so that's obvious *before* the
  // user clicks in — the rate shown on those screens is a public endpoint,
  // so without this hint a logged-out user could fill in the whole form
  // before finding out they can't submit it.
  const quickActions: {
    key: string;
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    soon?: boolean;
    needsLogin?: boolean;
  }[] = [
    {
      key: "receive",
      label: "Receive",
      icon: <GoArrowDownLeft />,
      onClick: () => onNavigate("receive"),
    },
    {
      key: "send",
      label: "Send",
      icon: <GoArrowUpRight />,
      onClick: () => onNavigate("transfer"),
    },
    {
      key: "fund",
      label: "Fund",
      icon: <PiMoneyWavy />,
      onClick: () => onNavigate("onramp"),
      needsLogin: !is_logged_in,
    },
    {
      key: "withdraw",
      label: "Withdraw",
      icon: <PiHandWithdraw />,
      onClick: () => onNavigate("offramp"),
      needsLogin: !is_logged_in,
    },
    {
      key: "swap",
      label: "Swap",
      icon: <IoMdSwap />,
      onClick: () => onNavigate("fund"),
      soon: true,
    },
    {
      key: "history",
      label: "History",
      icon: <RiListSettingsFill />,
      onClick: () => onNavigate("history"),
    },
  ];

  return (
    <ModalShell onClose={close}>
      {/* <WalletSelection
        wallet_type={wallet_type}
        action={(value: "embedded-wallet" | "smart-wallet") => {
          dispatch(setWalletType(value));
        }}
      /> */}

      <div className="w-full rounded-3xl bg-[#33b2ba]/5 border border-[#33b2ba]/15 py-7 px-5 text-center">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-gray-500 text-sm font-medium">Total balance</h1>

          {hide_balance ? (
            <button
              type="button"
              onClick={onToggleHideBalance}
              className="w-6 h-6 rounded-full bg-white flex items-center justify-center cursor-pointer"
            >
              <FaEye className="text-[0.75rem]" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onToggleHideBalance}
              className="w-6 h-6 rounded-full bg-white flex items-center justify-center cursor-pointer"
            >
              <FaEyeSlash className="text-[0.75rem]" />
            </button>
          )}
        </div>

        <h1 className="text-4xl font-bold mt-2">
          {hide_balance ? (
            <span className="tracking-widest">**********</span>
          ) : (
            <>
              <span className="text-gray-400 text-xl align-top">$</span>{" "}
              <span id="gradient-txt">
                {format_currency(Number(price?.total_usd))}
              </span>
            </>
          )}
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-6">
        {quickActions.map((action) => (
          <button
            key={action.key}
            type="button"
            onClick={action.onClick}
            className="relative flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-gray-100 py-4 cursor-pointer"
          >
            {action.soon && (
              <span className="absolute top-2 right-2 text-[0.6rem] font-semibold rounded-full px-2 py-0.5 bg-[#f4901e]/10 text-[#b96a0f] border border-[#f4901e]/30">
                Soon
              </span>
            )}

            {action.needsLogin && (
              <span className="absolute top-2 right-2 flex items-center gap-1 text-[0.6rem] font-semibold rounded-full px-2 py-0.5 bg-gray-200 text-gray-600">
                <IoLockClosedOutline className="text-[0.65rem]" />
                Login
              </span>
            )}

            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-[1.1rem] ${
                action.soon || action.needsLogin
                  ? "bg-gray-200 text-gray-500"
                  : "gradient-cto-two text-white"
              }`}
            >
              {action.icon}
            </div>

            <p
              className={`text-sm font-medium ${action.soon || action.needsLogin ? "text-gray-400" : "text-gray-800"}`}
            >
              {action.label}
            </p>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 mt-8">
        <div className="flex items-center gap-3 rounded-2xl border border-gray-100 p-3">
          <div className="w-11 h-11 min-w-11 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden">
            <Image src={image[0]} alt="" width={28} height={28} />
          </div>

          <div className="flex flex-1 justify-between items-center gap-4">
            <div className="">
              <h1 className="text-[1.0rem] font-semibold">Polygon</h1>
              <h1 className="text-[0.9rem] text-gray-500">
                {price?.token?.pol} $
              </h1>
            </div>

            <div className="text-right">
              <h1 className="text-lg font-semibold">
                {format_currency(Number(wallet?.pol))}
              </h1>
              <h1 className="text-[0.9rem] text-gray-500">
                {price?.breakdown?.pol} $
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-gray-100 p-3">
          <div className="w-11 h-11 min-w-11 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden">
            <Image src={image[1]} alt="" width={28} height={28} />
          </div>

          <div className="flex flex-1 justify-between items-center gap-4">
            <div className="">
              <h1 className="text-[1.0rem] font-semibold">USDC</h1>
              <h1 className="text-[0.9rem] text-gray-500">
                {price?.token?.usdc} $
              </h1>
            </div>

            <div className="text-right">
              <h1 className="text-lg font-semibold">
                {format_currency(Number(wallet?.usdc))}
              </h1>
              <h1 className="text-[0.9rem] text-gray-500">
                {price?.breakdown?.usdc} $
              </h1>
            </div>
          </div>
        </div>

        {/* <div className="flex items-center gap-3 rounded-2xl border border-gray-100 p-3">
          <div className="w-11 h-11 min-w-11 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden">
            <Image src={image[2]} alt="" width={28} height={28} />
          </div>

          <div className="flex flex-1 justify-between items-center gap-4">
            <div className="">
              <h1 className="text-[1.0rem] font-semibold">USDT</h1>
              <h1 className="text-[0.9rem] text-gray-500">
                {price?.token?.usdt} $
              </h1>
            </div>

            <div className="text-right">
              <h1 className="text-lg font-semibold">
                {format_currency(Number(wallet?.usdt))}
              </h1>
              <h1 className="text-[0.9rem] text-gray-500">
                {price?.breakdown?.usdt} $
              </h1>
            </div>
          </div>
        </div> */}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={open_modal}
          className={`w-[70%] flex justify-center items-center gap-1 gradient-cto rounded-2xl px-5 py-3 cursor-pointer`}
        >
          {is_loading && (
            <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem] mr-1" />
          )}
          <IoWallet className={"text-xl"} />{" "}
          <p className="text-[0.9rem]">Disconnect</p>
        </button>
      </div>
    </ModalShell>
  );
}

export default DashboardScreen;
