import React from "react";
import { FaPhoneFlip } from "react-icons/fa6";
import { format_currency } from "../utilities/utils";

function Insight({
  surplus = 0,
  status = null,
  value,
  description,
  colorTint,
  icon,
}: {
  status?: boolean | null;
  surplus?: number;
  value: string | number;
  description: string;
  colorTint: string;
  icon: any;
}) {
  return (
    <div className="h-full p-4">
      {!status ? (
        <div className="flex items-center gap-3">
          <h1 className="font-semibold text-3xl sm:text-4xl mb-1">
            {format_currency(Number(value || 0) + Number(surplus || 0))}
          </h1>

          <div
            className={`rounded-full text-white px-3 py-3 text-[1.0rem] sm:text-[1.2rem] ${colorTint}`}
          >
            {icon}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div
            className={`rounded-full flex items-center gap-3 px-5 py-3 text-[1.0rem] sm:text-[1.2rem] ${colorTint}`}
          >
            <h1 className="font-semibold text-xl mb-1">{value}</h1>
            {icon}
          </div>
        </div>
      )}

      <p className="mt-2">{description}</p>
    </div>
  );
}

export default Insight;
