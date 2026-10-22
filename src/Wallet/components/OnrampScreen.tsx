"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoCopy } from "react-icons/io5";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { PiMoneyWavy } from "react-icons/pi";
import { format_currency } from "@/components/utilities/utils";
import CustomSelector from "@/components/SelectTag";
import AccountVerification, { AccountCheck } from "./AccountVerification";
import { copy_to_clipboard } from "./clipboard";
import { ONRAMP_MIN_NGN } from "./constants";
import InfoNote from "./InfoNote";
import LoginPrompt from "./LoginPrompt";
import ModalShell from "./ModalShell";
import { LinkioBank, LinkioVendor } from "./types";

export type OnrampForm = {
  amount: string;
  vendor: LinkioVendor | null;
  bank_name: string;
  bank_code: string;
  account_number: string;
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-medium text-gray-600 pl-1 mb-1.5">
      {children}
    </p>
  );
}

function OnrampScreen({
  onBack,
  needsLogin,
  vendors,
  vendorsLoading,
  banks,
  rate,
  form,
  setForm,
  accountCheck,
  result,
  loading,
  transactionResult,
  transactionLoading,
  onSubmit,
  onCheckTransaction,
}: {
  onBack: () => void;
  needsLogin: boolean;
  vendors: LinkioVendor[];
  vendorsLoading: boolean;
  banks: LinkioBank[];
  rate: Record<string, number> | null;
  form: OnrampForm;
  setForm: React.Dispatch<React.SetStateAction<OnrampForm>>;
  accountCheck: AccountCheck;
  result: any;
  loading: boolean;
  transactionResult: any;
  transactionLoading: boolean;
  onSubmit: () => void;
  onCheckTransaction: (trx_ref: string) => void;
}) {
  const amount = Number(form.amount || 0);
  const belowMinimum = amount > 0 && amount < ONRAMP_MIN_NGN;
  const estimate = rate?.NGNUSDC && amount > 0 ? amount / rate.NGNUSDC : 0;

  return (
    <ModalShell onBack={onBack}>
      {needsLogin ? (
        <LoginPrompt message="Kindly login to fund your wallet." />
      ) : !result ? (
        <>
          <h1 className="text-center font-bold text-xl">
            Fund with Bank Transfer
          </h1>
          <p className="text-center text-gray-500 text-sm mt-1">
            Pay a vendor by bank transfer, receive USDC in your wallet.
          </p>

          <div className="flex items-center justify-between rounded-2xl bg-gray-50 border border-gray-100 px-4 py-3 mt-6">
            <span className="flex items-center gap-2 text-sm text-gray-500">
              <MdOutlineCurrencyExchange className="text-[1rem]" />
              Exchange rate
            </span>
            {rate?.NGNUSDC ? (
              <span className="text-sm font-semibold">
                1 USDC ≈ ₦{format_currency(rate.NGNUSDC)}
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
              <FieldLabel>Amount (NGN)</FieldLabel>
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
                  Minimum is ₦{format_currency(ONRAMP_MIN_NGN)} — enter a
                  higher amount.
                </p>
              ) : (
                <p className="text-sm text-gray-500 mt-2 pl-1">
                  {amount > 0
                    ? `≈ ${format_currency(estimate)} USDC`
                    : `Minimum ₦${format_currency(ONRAMP_MIN_NGN)}`}
                </p>
              )}
            </div>

            <div>
              <FieldLabel>Vendor</FieldLabel>

              <div className="border border-black/15 hover:border-black/30 rounded-xl">
                <CustomSelector
                  optionsList={vendors}
                  placeholder={
                    vendorsLoading ? "Loading vendors..." : "Select a vendor"
                  }
                  control_class=""
                  control_style={{
                    border: "none",
                    backgroundColor: "transparent",
                    padding: "0.45rem 0.75rem",
                  }}
                  changeEvent={(selected) =>
                    setForm((prev) => ({
                      ...prev,
                      vendor:
                        vendors.find(
                          (v) => v.vendorNumber === selected?.value,
                        ) || null,
                    }))
                  }
                  mapOption={(v: LinkioVendor) => ({
                    value: v.vendorNumber,
                    name: v.venderName,
                    label: (
                      <div className="flex flex-col">
                        <p>{v.venderName}</p>
                        <p className="text-xs text-gray-400">
                          {v.vendorBank} · {v.vendorNumber}
                        </p>
                      </div>
                    ),
                  })}
                />
              </div>
            </div>

            <div>
              <FieldLabel>Your bank</FieldLabel>

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
              <FieldLabel>Your account number</FieldLabel>
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

          <InfoNote>
            You'll need to make the bank transfer yourself once you continue —
            we'll show you exactly where to send it.
          </InfoNote>
        </>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
              <PiMoneyWavy className="text-[1.5rem] text-amber-600" />
            </div>
            <h1 className="font-bold text-lg mt-3">Transfer to complete</h1>
            <p className="text-gray-500 text-sm mt-1">
              Status:{" "}
              <span className="font-semibold">
                {result?.transaction_status || "Pending"}
              </span>
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 p-4 flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Pay</span>
              <span className="font-semibold">{result?.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">You'll receive</span>
              <span className="font-semibold">{result?.payout_amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Bank</span>
              <span className="font-semibold">{result?.link_bank_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Account name</span>
              <span className="font-semibold">
                {result?.link_account_name}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-gray-500">Account number</span>
              <span className="flex items-center gap-2 font-semibold">
                {result?.link_account_number}
                <IoCopy
                  onClick={() =>
                    copy_to_clipboard(result?.link_account_number)
                  }
                  className="cursor-pointer text-gray-400"
                />
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Reference</span>
              <span className="font-semibold">{result?.reference}</span>
            </div>
          </div>

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
            onClick={() => onCheckTransaction(result?.reference)}
            disabled={transactionLoading}
            className="w-full flex justify-center items-center gap-1 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-2xl px-5 py-3 disabled:opacity-60"
          >
            {transactionLoading && (
              <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
            )}
            <p className="text-sm font-semibold">Check status</p>
          </button>

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

export default OnrampScreen;
