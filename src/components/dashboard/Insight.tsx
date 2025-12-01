import React from "react";
import { FaPhoneFlip } from "react-icons/fa6";

function Insight({
  value = "$4000",
  description = "Lorem ipsum dolor.",
  icon = <FaPhoneFlip />,
}: {
  value?: string;
  description?: string;
  icon?: any;
}) {
  return (
    <div id="gradient-border" className="rounded-lg overflow-hidden">
      <div className="h-full bg-[#fcfcfc] p-4">
        <div className="flex items-center gap-3">
          <div className="bg-[#812880] rounded-lg text-white px-3 py-3 text-[1.2rem]">
            {icon}
          </div>

          <h1 className="font-semibold text-2xl mb-1">{value}</h1>
        </div>

        <p className="mt-2">{description}</p>
      </div>
    </div>
  );
}

export default Insight;
