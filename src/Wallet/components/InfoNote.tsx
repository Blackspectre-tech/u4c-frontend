"use client";

import { IoInformationCircleOutline } from "react-icons/io5";

// Routine, non-critical guidance — a calmer counterpart to WarningNote, which
// stays reserved for genuine risk warnings (wrong network, verify an address).
function InfoNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-blue-50 border border-blue-100 text-blue-700 p-4 mt-5">
      <IoInformationCircleOutline className="text-[1.2rem] min-w-5 mt-0.5" />
      <p className="text-sm">{children}</p>
    </div>
  );
}

export default InfoNote;
