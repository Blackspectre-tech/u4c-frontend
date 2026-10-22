"use client";

import { QRCodeSVG } from "qrcode.react";
import { IoCopy } from "react-icons/io5";
import { copy_to_clipboard } from "./clipboard";
import ModalShell from "./ModalShell";
import WarningNote from "./WarningNote";

function truncate(text: string, first = 1) {
  if (text.length <= 10) return text;
  return first === 1 ? text.slice(0, 5) : text.slice(-5);
}

function ReceiveScreen({
  address,
  onBack,
}: {
  address: string;
  onBack: () => void;
}) {
  return (
    <ModalShell onBack={onBack}>
      <div className="w-full flex items-center justify-center mt-2">
        <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6">
          <QRCodeSVG
            value={address}
            size={200}
            level="H" // High error correction (good for phone screens)
            includeMargin={false}
          />
        </div>
      </div>

      <div className="bg-gray-100 flex justify-between items-center rounded-2xl gap-3 mt-8 py-2 pr-2 pl-4">
        <p className="flex-1 line-clamp-1 text-primary text-lg">
          {truncate(address)} <span className="text-black">.....</span>{" "}
          {truncate(address, 0)}
        </p>

        <button
          onClick={() => copy_to_clipboard(address)}
          className={`flex justify-center items-center cursor-pointer gap-1 bg-gray-700 hover:bg-gray-800 text-white rounded-xl w-11 h-11`}
        >
          <IoCopy className={"text-lg"} />{" "}
        </button>
      </div>

      <WarningNote>
        Please note that this is the native USDC on the POLYGON network,
        please verify the contract address before depositing
      </WarningNote>
    </ModalShell>
  );
}

export default ReceiveScreen;
