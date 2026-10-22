"use client";

import { MdOutlineHourglassEmpty } from "react-icons/md";
import ModalShell from "./ModalShell";

// Used by the Swap quick action for now.
function ComingSoonScreen({ onBack }: { onBack: () => void }) {
  return (
    <ModalShell onBack={onBack}>
      <div className="w-full flex flex-col items-center justify-center text-center py-10">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <MdOutlineHourglassEmpty className="text-[1.8rem] text-gray-400" />
        </div>

        <h1 className="text-xl font-bold mt-4">Coming Soon</h1>
        <p className="text-gray-500 text-sm mt-1 max-w-70">
          We're working on this feature. Check back soon.
        </p>
      </div>
    </ModalShell>
  );
}

export default ComingSoonScreen;
