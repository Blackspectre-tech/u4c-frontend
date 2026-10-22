"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  IoCheckmarkCircleOutline,
  IoCopy,
  IoWarningOutline,
} from "react-icons/io5";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { PiHandWithdraw } from "react-icons/pi";
import { format_currency } from "@/components/utilities/utils";
import CustomSelector from "@/components/SelectTag";
import AccountVerification, { AccountCheck } from "./AccountVerification";
import { copy_to_clipboard } from "./clipboard";
import { OFFRAMP_MIN_USDC } from "./constants";
import LoginPrompt from "./LoginPrompt";
import ModalShell from "./ModalShell";
import { LinkioBank } from "./types";

export type OfframpForm = {
  amount: string;
  bank_name: string;
  bank_code: string;
  account_number: string;
  account_name: string;
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-medium text-gray-600 pl-1 mb-1.5">
      {children}
    </p>
  );
}

function OfframpScreen({
  onBack,
  needsLogin,
  banks,
  rate,
  form,
  setForm,
  accountCheck,
  depositAddress,
  result,
  loading,
  transactionResult,
  transactionLoading,
  onSubmit,
  onCheckTransaction,
  onPayDeposit,
  paying,
  paid,
}: {
  onBack: () => void;
  needsLogin: boolean;
  banks: LinkioBank[];
  rate: Record<string, number> | null;
  form: OfframpForm;
  setForm: React.Dispatch<React.SetStateAction<OfframpForm>>;
  accountCheck: AccountCheck;
  depositAddress: string | null;
  result: any;
  loading: boolean;
  transactionResult: any;
  transactionLoading: boolean;
  onSubmit: () => void;
  onCheckTransaction: (trx_ref: string) => void;
  onPayDeposit: () => void;
  paying: boolean;
  paid: boolean;
}) {
  const amount = Number(form.amount || 0);
  const belowMinimum = amount > 0 && amount < OFFRAMP_MIN_USDC;
  const estimate = rate?.USDCNGN && amount > 0 ? amount * rate.USDCNGN : 0;

  return (
    <ModalShell onBack={onBack}>
      {needsLogin ? (
        <LoginPrompt message="Kindly login to withdraw funds." />
      ) : !result ? (
        <>
          <h1 className="text-center font-bold text-xl">Withdraw to Bank</h1>
          <p className="text-center text-gray-500 text-sm mt-1">
            Sell USDC from your wallet, receive a bank payout.
          </p>

          <div className="flex items-center justify-between rounded-2xl bg-gray-50 border border-gray-100 px-4 py-3 mt-6">
            <span className="flex items-center gap-2 text-sm text-gray-500">
              <MdOutlineCurrencyExchange className="text-[1rem]" />
              Exchange rate
            </span>
            {rate?.USDCNGN ? (
              <span className="text-sm font-semibold">
                1 USDC ≈ ₦{format_currency(rate.USDCNGN)}
              </span>
            ) : (
              <span className="text-sm text-gray-400 flex items-center gap-2">
                <AiOutlineLoading3Quarters className="animate-spin text-xs" />
                Loading...
              </span>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <div>
              <FieldLabel>Amount (USDC)</FieldLabel>
              <input
                required
                type="number"
                placeholder="0"
                value={form.amount}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, amount: e.target.value }))
                }
                className={`w-full px-5 py-3 border outline-0 rounded-xl ${
                  belowMinimum
                    ? "border-red-300 focus:border-red-400"
                    : "border-black/15 hover:border-black/30"
                }`}
              />

              {belowMinimum ? (
                <p className="text-sm text-red-600 mt-2 pl-1">
                  Minimum is {OFFRAMP_MIN_USDC} USDC — enter a higher amount.
                </p>
              ) : (
                <p className="text-sm text-gray-500 mt-2 pl-1">
                  {amount > 0
                    ? `≈ ₦${format_currency(estimate)}`
                    : `Minimum ${OFFRAMP_MIN_USDC} USDC`}
                </p>
              )}
            </div>

            <div>
              <FieldLabel>Payout bank</FieldLabel>

              <div className="border border-black/15 hover:border-black/30 rounded-xl">
                <CustomSelector
                  optionsList={banks}
                  placeholder={
                    banks.length === 0 ? "Loading banks..." : "Select your bank"
                  }
                  control_class=""
                  control_style={{
                    border: "none",
                    backgroundColor: "transparent",
                    padding: "0.45rem 0.75rem",
                  }}
                  changeEvent={(selected) => {
                    const bank = banks.find(
                      (b) => b.value === selected?.value,
                    );
                    setForm((prev) => ({
                      ...prev,
                      bank_name: bank?.name || "",
                      bank_code: bank?.value || "",
                    }));
                  }}
                  mapOption={(b: LinkioBank) => ({
                    value: b.value,
                    name: b.name,
                    label: (
                      <div className="flex items-center gap-1">
                        <p>{b.name}</p>
                      </div>
                    ),
                  })}
                />
              </div>
            </div>

            <div>
              <FieldLabel>Account number</FieldLabel>
              <input
                type="text"
                inputMode="numeric"
                maxLength={10}
                placeholder="0123456789"
                value={form.account_number}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    account_number: e.target.value.replace(/\D/g, ""),
                  }))
                }
                className="w-full px-5 py-3 border border-black/15 hover:border-black/30 outline-0 rounded-xl"
              />
              <AccountVerification check={accountCheck} />
            </div>

            <div>
              <FieldLabel>Account name</FieldLabel>
              <input
                type="text"
                placeholder="Filled in once your account is verified"
                value={form.account_name}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    account_name: e.target.value,
                  }))
                }
                className="w-full px-5 py-3 border border-black/15 hover:border-black/30 outline-0 rounded-xl"
              />
            </div>
          </div>

          <div className="flex items-center justify-center mt-7">
            <button
              onClick={onSubmit}
              disabled={loading || belowMinimum}
              className="w-full flex justify-center items-center gap-1 cursor-pointer gradient-cto rounded-2xl px-5 py-4 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading && (
                <AiOutlineLoading3Quarters className="button_loading_ text-[1.3rem]" />
              )}
              <p className="text-[0.9rem]">Continue</p>
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
              <PiHandWithdraw className="text-[1.5rem] text-amber-600" />
            </div>
            <h1 className="font-bold text-lg mt-3">Request created</h1>
            <p className="text-gray-500 text-sm mt-1">
              Status:{" "}
              <span className="font-semibold">
                {result?.transaction_status || "Pending"}
              </span>
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 p-4 flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Selling</span>
              <span className="font-semibold">{result?.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">You'll receive</span>
              <span className="font-semibold">{result?.payout_amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payout bank</span>
              <span className="font-semibold">{result?.bank_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Reference</span>
              <span className="font-semibold">{result?.reference}</span>
            </div>
          </div>

          {depositAddress ? (
            <div>
              <div className="flex items-center justify-between pl-1 mb-1.5">
                <p className="text-sm font-medium text-gray-600">
                  Pay {result?.amount} to this address
                </p>
                <span className="text-xs font-semibold text-gray-400">
                  Network: Polygon
                </span>
              </div>

              <div className="bg-gray-100 flex justify-between items-center rounded-2xl gap-3 py-2 pr-2 pl-4">
                <p className="flex-1 line-clamp-1 text-primary text-sm">
                  {depositAddress}
                </p>

                <button
                  onClick={() => copy_to_clipboard(depositAddress)}
                  className="flex justify-center items-center cursor-pointer gap-1 bg-gray-700 hover:bg-gray-800 text-white rounded-xl w-10 h-10"
                >
                  <IoCopy className={"text-base"} />
                </button>
              </div>

              {paid ? (
                <div className="flex items-center gap-3 rounded-2xl bg-green-50 border border-green-200 text-green-700 p-4 mt-3">
                  <IoCheckmarkCircleOutline className="text-[1.2rem] min-w-5" />
                  <p className="text-sm">
                    Payment sent. It may take a moment to reflect — use
                    "Check status" below to follow its progress.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-start gap-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 p-4 mt-3">
                    <IoWarningOutline className="text-[1.2rem] min-w-5 mt-0.5" />
                    <p className="text-sm">
                      Only send USDC on the Polygon network to this address.
                      Sending anything else, or on a different network, may
                      result in permanent loss of funds.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onPayDeposit}
                    disabled={paying}
                    className="w-full flex justify-center items-center gap-1 cursor-pointer gradient-cto rounded-2xl px-5 py-4 disabled:opacity-60 disabled:cursor-not-allowed mt-3"
                  >
                    {paying && (
                      <AiOutlineLoading3Quarters className="button_loading_ text-[1.3rem]" />
                    )}
                    <p className="text-[0.9rem]">Pay Now</p>
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-start gap-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 p-4">
              <IoWarningOutline className="text-[1.2rem] min-w-5 mt-0.5" />
              <p className="text-sm">
                Your request has been created, but we couldn't load the
                deposit address right now — hold onto your reference above,
                the team will follow up with next steps.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() => onCheckTransaction(result?.reference)}
            disabled={transactionLoading}
            className="w-full flex justify-center items-center gap-1 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-2xl px-5 py-3 disabled:opacity-60"
          >
            {transactionLoading && (
              <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
            )}
            <p className="text-sm font-semibold">Check status</p>
          </button>

          {transactionResult && (
            <div className="rounded-2xl bg-gray-50 p-4 flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Latest status</span>
                <span className="font-semibold">
                  {transactionResult?.transaction_status || "Unknown"}
                </span>
              </div>
              {transactionResult?.transaction_date && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Updated</span>
                  <span className="font-semibold">
                    {transactionResult.transaction_date}
                  </span>
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={onBack}
            className="w-full text-center text-sm text-gray-500 cursor-pointer"
          >
            Done
          </button>
        </div>
      )}
    </ModalShell>
  );
}

export default OfframpScreen;
