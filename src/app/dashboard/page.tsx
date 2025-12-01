"use client";

import Explore_DONOR from "@/components/dashboard/donor/Explore";
import Explore_NGO from "@/components/dashboard/ngo/Explore";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { useSelector } from "react-redux";

export default function Home() {
  const { organization, user } = useSelector((state: RootState) => state.user);
  const [open, setOpen] = useState(true);

  return (
    <div className="px-5 sm:px-10">
      {!(user?.approval_status === "APPROVED") && organization === true && (
        <div
          className={`${
            open === true ? "flex items-center justify-between" : "hidden"
          } w-full bg-amber-100/50 border border-amber-400 rounded-lg mb-5 p-4`}
        >
          <p>
            Kindly complete your KYC verification{" "}
            <Link href={"/dashboard/setting/verify-kyc"}>
              <span className="text-blue-600 font-semibold underline cursor-pointer">
                here
              </span>
            </Link>
          </p>

          <div className="min-w-10 min-h-10 flex justify-center items-center">
            <MdCancel
              className="cursor-pointer text-[1.2rem]"
              onClick={() => setOpen((prev) => !prev)}
            />
          </div>
        </div>
      )}

      {organization === true ? <Explore_NGO /> : <Explore_DONOR />}
    </div>
  );
}
