"use client";

import Image from "next/image";
import { useState } from "react";
import { FaQuestion } from "react-icons/fa";
import { Get_Token_Logo } from "../privy/privy.utils";

const HistoryTokenLogo = ({
  symbol,
  address,
}: {
  symbol: string;
  address: string;
}) => {
  const [hasError, setHasError] = useState(false);

  // Get the URL from your helper
  const logoUrl = Get_Token_Logo(symbol, address);

  // If the helper returned an empty string or the Image component failed to load
  if (hasError || !logoUrl) {
    return (
      <div className="w-11 h-11 min-w-11 flex items-center justify-center rounded-full bg-gray-100">
        <FaQuestion className="text-sm text-gray-400" />
      </div>
    );
  }

  return (
    <div className="w-11 h-11 min-w-11 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden">
      <Image
        src={logoUrl}
        alt={symbol}
        width={28}
        height={28}
        className="rounded-full"
        // 🟢 This correctly triggers a re-render for THIS specific image
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default HistoryTokenLogo;
