"use client";

import { format_currency, format_date } from "@/components/utilities/utils";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { IoCopy } from "react-icons/io5";
import { PiEmptyBold, PiHandWithdraw, PiMoneyWavy } from "react-icons/pi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { copy_to_clipboard } from "./clipboard";
import HistoryTokenLogo from "./HistoryTokenLogo";
import LoginPrompt from "./LoginPrompt";
import ModalShell from "./ModalShell";

export type HistoryTab = "wallet" | "onramp" | "offramp";

const tabs: { key: HistoryTab; label: string }[] = [
  { key: "wallet", label: "Wallet" },
  { key: "onramp", label: "Onramp" },
  { key: "offramp", label: "Offramp" },
];

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      <PiEmptyBold className="text-[1.8rem] text-gray-300" />
      <p className="text-gray-500 text-sm mt-3">{message}</p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      <AiOutlineLoading3Quarters className="animate-spin text-[1.4rem] text-gray-300" />
      <p className="text-gray-500 text-sm mt-3">Loading...</p>
    </div>
  );
}

// Colour the status badge on onramp/offramp rows. Values from Linkio have
// been seen both as "Pending" (single transaction lookup) and uppercase
// ("SUCCESSFUL") in the status filter docs, so normalize before matching.
function statusClass(status: string) {
  const s = (status || "").toUpperCase();
  if (s === "SUCCESSFUL") return "bg-green-100 text-green-700";
  if (s === "FAILED") return "bg-red-100 text-red-700";
  return "bg-amber-100 text-amber-700"; // pending / unknown
}

// Onramp and offramp history rows, confirmed 2026-10-19 against a real
// paginated response ({ count, next, previous, results: [...] }). `amount`
// and `payout_amount` already come as strings with their unit included
// (e.g. "15000 NGN", "10.89 USDC"), so they're rendered as-is rather than
// run through format_currency.
function LinkioHistoryRow({
  type,
  item,
}: {
  type: "onramp" | "offramp";
  item: any;
}) {
  const reference = item?.reference || item?.transaction_reference || "";
  const amount = item?.amount || "";
  const payout = item?.payout_amount || "";
  const status = item?.status || item?.transaction_status || "Pending";
  const created_at = item?.created_at || item?.updated_at;

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-100 p-3">
      <div
        className={`w-11 h-11 min-w-11 rounded-full flex items-center justify-center ${
          type === "onramp"
            ? "bg-[#33b2ba]/10 text-[#1b5f64]"
            : "bg-amber-100 text-amber-700"
        }`}
      >
        {type === "onramp" ? <PiMoneyWavy /> : <PiHandWithdraw />}
      </div>

      <div className="flex flex-1 justify-between items-center gap-4">
        <div className="">
          <h1 className="text-[1.0rem] font-semibold">{amount}</h1>

          {reference && (
            <div
              onClick={() => copy_to_clipboard(reference)}
              className="flex items-center gap-1 cursor-pointer text-[0.9rem] text-gray-500"
            >
              <IoCopy className={"text-xs"} />
              <span>{reference.slice(0, 10)}...</span>
            </div>
          )}

          {created_at && (
            <p className="text-xs text-gray-400 mt-0.5">
              {format_date(new Date(created_at))}
            </p>
          )}
        </div>

        <div className="flex flex-col items-end gap-1">
          {payout && <h1 className="text-lg font-semibold">{payout}</h1>}
          <span
            className={`text-[0.7rem] rounded-full ${statusClass(status)} px-2 py-[0.20rem]`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}

function HistoryScreen({
  activeTab,
  onChangeTab,
  history,
  onrampHistory,
  onrampHistoryLoading,
  onrampHistoryNeedsLogin,
  offrampHistory,
  offrampHistoryLoading,
  offrampHistoryNeedsLogin,
  onBack,
}: {
  activeTab: HistoryTab;
  onChangeTab: (tab: HistoryTab) => void;
  history: any[];
  onrampHistory: any[];
  onrampHistoryLoading: boolean;
  onrampHistoryNeedsLogin: boolean;
  offrampHistory: any[];
  offrampHistoryLoading: boolean;
  offrampHistoryNeedsLogin: boolean;
  onBack: () => void;
}) {
  return (
    <ModalShell title="Transaction History" onBack={onBack}>
      <div className="flex items-center gap-1 bg-gray-100 rounded-2xl p-1 mt-5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChangeTab(tab.key)}
            className={`flex-1 rounded-xl text-sm font-semibold py-2 cursor-pointer ${
              activeTab === tab.key
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {activeTab === "wallet" &&
          (history.length === 0 ? (
            <EmptyState message="No transactions yet." />
          ) : (
            <div className="max-h-100 overflow-y-auto flex flex-col gap-3">
              {history.map((val, ind) => {
                const received = val?.displayType === "Received";

                return (
                  <div
                    key={ind}
                    className="flex items-center gap-3 rounded-2xl border border-gray-100 p-3"
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

                        <div
                          onClick={() => copy_to_clipboard(val?.hash)}
                          className="flex items-center gap-1 cursor-pointer text-[0.9rem] text-gray-500"
                        >
                          <IoCopy className={"text-xs"} />
                          <span>{val?.hash?.slice(0, 4)}...</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <h1 className="text-lg font-semibold">
                          {format_currency(Number(val?.value))}
                        </h1>
                        <span
                          className={`flex items-center gap-1 text-[0.7rem] rounded-full ${received ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} px-2 py-[0.20rem]`}
                        >
                          {received ? (
                            <GoArrowDownLeft />
                          ) : (
                            <GoArrowUpRight />
                          )}
                          {val?.displayType}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

        {activeTab === "onramp" &&
          (onrampHistoryNeedsLogin ? (
            <LoginPrompt message="Kindly login to view your onramp transactions." />
          ) : onrampHistoryLoading ? (
            <LoadingState />
          ) : onrampHistory.length === 0 ? (
            <EmptyState message="No onramp transactions yet." />
          ) : (
            <div className="max-h-100 overflow-y-auto flex flex-col gap-3">
              {onrampHistory.map((item, ind) => (
                <LinkioHistoryRow key={ind} type="onramp" item={item} />
              ))}
            </div>
          ))}

        {activeTab === "offramp" &&
          (offrampHistoryNeedsLogin ? (
            <LoginPrompt message="Kindly login to view your offramp transactions." />
          ) : offrampHistoryLoading ? (
            <LoadingState />
          ) : offrampHistory.length === 0 ? (
            <EmptyState message="No offramp transactions yet." />
          ) : (
            <div className="max-h-100 overflow-y-auto flex flex-col gap-3">
              {offrampHistory.map((item, ind) => (
                <LinkioHistoryRow key={ind} type="offramp" item={item} />
              ))}
            </div>
          ))}
      </div>
    </ModalShell>
  );
}

export default HistoryScreen;
