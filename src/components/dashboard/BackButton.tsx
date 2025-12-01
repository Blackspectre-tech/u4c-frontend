import Link from "next/link";
import React from "react";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

function BackButton({
  parent_wind = "flex mb-5",
  route = "#",
}: {
  route?: string;
  parent_wind?: string;
}) {
  return (
    <div className={parent_wind}>
      <Link
        href={route}
        className="text-[#381237] font-bold cursor-pointer
                   rounded-xl border-[2px] border-transparent
                   [background:linear-gradient(#fcfcfc,#fcfcfc)_padding-box,linear-gradient(90deg,#812880,#eb2027)_border-box] overflow-hidden"
      >
        <div className="hover:bg-[#812880]/5 flex items-center gap-1 py-2 pl-5 pr-7">
          <MdOutlineKeyboardDoubleArrowLeft className="text-[1.3rem] md:text-[1.9rem] translate-y-[1px]" />
          <p className="text-[0.9rem] md:text-[1rem]">Back</p>
        </div>
      </Link>
    </div>
  );
}

export default BackButton;
