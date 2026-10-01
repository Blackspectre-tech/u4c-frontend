import React from "react";
import { FaHandHoldingHeart } from "react-icons/fa";

function SadaqahBadge({
  sadaqah,
  className = "",
}: {
  sadaqah?: boolean | null;
  className?: string;
}) {
  if (sadaqah !== true) return null;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-lg bg-black/50 px-3 py-1 text-sm font-medium text-white shadow-sm ${className}`}
    >
      <FaHandHoldingHeart className="text-[0.9rem]" />
      Sadaqah
    </span>
  );
}

export default SadaqahBadge;
