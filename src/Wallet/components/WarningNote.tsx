"use client";

import { IoWarningOutline } from "react-icons/io5";

// A warning banner used wherever we need to flag something to the user (the
// network/contract note on the receive & transfer screens).
function WarningNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 p-4 mt-5">
      <IoWarningOutline className="text-[1.2rem] min-w-5 mt-0.5" />
      <p className="text-sm">{children}</p>
    </div>
  );
}

export default WarningNote;
