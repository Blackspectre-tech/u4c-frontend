"use client";

import { capitalize } from "@/components/utilities/utils";
import CustomSelector from "@/components/SelectTag";
import { FaCircleQuestion } from "react-icons/fa6";

// Not currently rendered anywhere (the dashboard screen keeps it commented
// out), kept around for when wallet-type switching is wired back in.
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

export default WalletSelection;
