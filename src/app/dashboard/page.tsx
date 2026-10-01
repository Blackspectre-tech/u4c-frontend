"use client";

import Explore_DONOR from "@/components/dashboard/donor/Explore";
import Explore_NGO from "@/components/dashboard/ngo/Explore";
import { NavigationTemplate } from "@/components/utilities/utils.template";
import { setHideBalance } from "@/redux/slice/users";
import { RootState } from "@/redux/store";
import { UseWalletBalances } from "@/Wallet/privy/privy.utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaExclamation, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import { MdShield } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { organization, user, kyc, hide_balance } = useSelector(
    (state: RootState) => state.user,
  );
  // ✅ CALL THE HOOK HERE (Top level)
  const wallet = UseWalletBalances();
  const dispatch = useDispatch();
  // console.log("wallet");
  // console.log("wallet");
  // console.log(wallet);

  return (
    <div className="px-5 sm:px-10">
      <NavigationTemplate
        hide={false}
        title={`${organization === true ? "NGO" : "Donor"} Dashboard`}
        navigation={[
          { title: "Dashboard", path: "#" },
          { title: "Home", path: "#" },
        ]}
      />

      <div className="grid grid-cols-10 gap-5 mt-5">
        <div className="w-full relative col-span-10 xl:col-span-7 bg-[#0000000a]/30 rounded-4xl overflow-hidden object-center bg-[url('https://images.unsplash.com/photo-1740568439252-b060d7ff3437?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds')]">
          <div className="w-full h-full flex flex-col sm:flex-row items-center gap-5 bg-[linear-gradient(90deg,#eb2027e1,#f36f26e1)] text-white p-5 md:p-8">
            <div className="min-w-20 min-h-20 relative flex items-center justify-center rounded-full border-2 border-gray-200 bg-gray-200">
              {user?.user?.avatar ? (
                <Image
                  src={user?.user?.avatar}
                  alt=""
                  className="w-full h-full object-cover rounded-full cursor-pointer"
                  fill
                />
              ) : (
                <Image
                  src={"/icons/profile-icon.png"}
                  alt=""
                  className="translate-y-2 rounded-full cursor-pointer"
                  width={60}
                  height={60}
                />
              )}

              {organization === true && (
                <>
                  {kyc?.verified === false ? (
                    <Link
                      href={"/dashboard/setting/verify-kyc"}
                      title="Kindly complete your KYC to verify your NGO"
                      className="absolute bottom-0 right-0 w-8 h-8 translate-x-2 bg-red-700 border-2 border-gray-200 rounded-full flex items-center justify-center"
                    >
                      <FaExclamation className="text-[0.8rem] text-white" />
                    </Link>
                  ) : (
                    <div
                      title="NGO has been Verified"
                      className="absolute bottom-0 right-0 w-8 h-8 translate-x-2 bg-green-700 border-2 border-gray-200 rounded-full flex items-center justify-center"
                    >
                      <MdShield className="text-[1rem] text-white" />
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="">
              <h1 className="text-2xl md:text-3xl text-center sm:text-left font-semibold">
                Welcome back{" "}
                <span className="font-bold">
                  {organization === true
                    ? user?.name || ""
                    : user?.first_name || ""}
                  !
                </span>
              </h1>
              <p className="text-center sm:text-left mt-1">
                {user?.user?.email}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full relative col-span-10 xl:col-span-3 bg-[#0000000a]/30 rounded-4xl object-center bg-[url('https://images.unsplash.com/photo-1740568439252-b060d7ff3437?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds')]">
          <div className="w-full h-full rounded-4xl bg-[linear-gradient(90deg,#818181e1,#6b6b6be1)] text-white p-5 md:p-8">
            <div className="w-full flex items-center justify-between gap-5">
              <h1>USDC Balance</h1>

              {hide_balance ? (
                <FaEye
                  onClick={() => dispatch(setHideBalance(false))}
                  className={`cursor-pointer text-[1.2rem]`}
                />
              ) : (
                <FaEyeSlash
                  onClick={() => dispatch(setHideBalance(true))}
                  className={`cursor-pointer text-[1.2rem]`}
                />
              )}
            </div>
            <div className="w-full flex items-center justify-between gap-5">
              <div className="flex items-center gap-3 mt-3">
                <IoWallet className={`text-[2.5rem]`} />
                <h1 className="font-bold text-2xl md:text-3xl">
                  {hide_balance ? "******" : wallet?.usdc}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {organization === true ? <Explore_NGO /> : <Explore_DONOR />}
    </div>
  );
}
