"use client";

import Image from "next/image";
import { truncate_balance } from "@/components/utilities/utils";
import CustomSelector from "@/components/SelectTag";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaPaste } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import { isAddress } from "viem";
import ModalShell from "./ModalShell";
import WarningNote from "./WarningNote";

const image = [
  "/icons/polygon-logo.png",
  "/icons/usdc-logo.png",
  "/icons/usdt-logo.png",
];

type TransferFormData = {
  amount: number;
  token: string | null;
  receiver_address: string;
};

function TransferScreen({
  wallet,
  formData,
  setFormData,
  validAddress,
  setValidAddress,
  isLoading,
  onSubmit,
  onBack,
}: {
  wallet: any;
  formData: TransferFormData;
  setFormData: React.Dispatch<React.SetStateAction<TransferFormData>>;
  validAddress: boolean;
  setValidAddress: (valid: boolean) => void;
  isLoading: boolean;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const copy_from_clipboard = async () => {
    try {
      // 1. Request text from clipboard
      const text = await navigator.clipboard.readText();
      setFormData((prev) => ({ ...prev, receiver_address: text }));

      if (isAddress(text)) setValidAddress(true);
      else setValidAddress(false);
    } catch (err) {
      // This happens if the user denies the 'Paste' permission popup
      console.error("Failed to read clipboard: ", err);
    }
  };

  return (
    <ModalShell onBack={onBack}>
      <div className="w-full rounded-3xl bg-[#33b2ba]/5 border border-[#33b2ba]/15 py-6 px-5 text-center">
        <h1 className="text-gray-500 text-sm font-medium capitalize">
          {formData.token || "Token"} Balance
        </h1>

        <h1 className="text-3xl font-bold mt-2">
          <span id="gradient-txt">
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
          </span>
        </h1>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <div className="border border-black/15 hover:border-black/30 rounded-xl">
          <CustomSelector
            optionsList={[
              "POLYGON_0",
              "USDC_1",
              // "USDT_2"
            ]}
            placeholder="Currency"
            control_class=""
            control_style={{
              border: "none",
              backgroundColor: "transparent",
              padding: "0.45rem 0.75rem",
            }}
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
            className="w-full px-5 py-3 border border-black/15 hover:border-black/30 outline-0 rounded-xl"
          />
        </div>
      </div>

      <div className="bg-gray-100 flex flex-col min-[380px]:flex-row justify-between items-center rounded-2xl gap-5 mt-6 py-2 pr-2 pl-2 min-[380px]:pl-4">
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
          className={`w-full min-[380px]:w-auto flex justify-center cursor-pointer gap-1 bg-gray-700 hover:bg-gray-800 text-white rounded-xl px-4 py-3`}
        >
          <FaPaste className={"text-lg"} />{" "}
        </button>
      </div>

      {formData.receiver_address && !validAddress && (
        <p className="text-amber-600 text-sm mt-2 pl-1">
          Enter a valid wallet address to continue.
        </p>
      )}

      <div className="flex items-center justify-center mt-6">
        <button
          onClick={onSubmit}
          disabled={!validAddress}
          className={`w-full flex justify-center items-center gap-1 cursor-pointer ${validAddress ? "gradient-cto" : "bg-gray-300 text-gray-500"} rounded-2xl px-5 py-4`}
        >
          {isLoading && (
            <AiOutlineLoading3Quarters className="button_loading_ text-[1.3rem]" />
          )}
          <IoWallet className={"text-xl"} />{" "}
          <p className="text-[0.9rem]">Transfer</p>
        </button>
      </div>

      <WarningNote>
        Please note that this is the native USDC on the POLYGON network,
        please verify the contract address before depositing.
      </WarningNote>
    </ModalShell>
  );
}

export default TransferScreen;
