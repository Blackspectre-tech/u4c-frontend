"use client";

import { IoClose } from "react-icons/io5";
import { MdKeyboardBackspace } from "react-icons/md";

// A single shell shared by every screen of the wallet modal: same card, same
// rounding/shadow, same back/close button placement. Only the content inside
// changes per screen.
function ModalShell({
  title,
  onBack,
  onClose,
  width = "sm:w-120",
  children,
}: {
  title?: string;
  onBack?: () => void;
  onClose?: () => void;
  width?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`w-full ${width}`}>
      <div className="w-full bg-white relative rounded-3xl shadow-xl p-7">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="absolute cursor-pointer top-7 left-7 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <MdKeyboardBackspace className="text-lg" />
          </button>
        )}

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute cursor-pointer top-7 right-7 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <IoClose className="text-lg" />
          </button>
        )}

        {title && <h1 className="text-center font-bold text-xl">{title}</h1>}

        <div className={title ? "mt-5" : ""}>{children}</div>
      </div>
    </div>
  );
}

export default ModalShell;
