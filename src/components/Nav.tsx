"use client";

import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TfiClose } from "react-icons/tfi";
import { VscMenu } from "react-icons/vsc";
import { useSelector } from "react-redux";
import ConnectWallet from "@/Wallet/ConnectWallet";
import { usePathname } from "next/navigation";

function Nav({ isDashboard = false }: { isDashboard?: boolean }) {
  const { user, online } = useSelector((state: RootState) => state.user);
  const [open, setOpen] = useState<boolean>(false);

  // console.log(online);
  const d_profile = "/icons/profile-icon.png";
  const currentPath = usePathname();

  useEffect(() => {
    setOpen(false);

    return () => {};
  }, [currentPath]);

  return (
    <>
      <div className="flex justify-between items-center relative z-50 px-5 sm:px-10 py-5">
        {isDashboard === true && (
          <div className="absolute top-0 left-0 min-w-[15rem] h-full hidden lg:block bg-[#0000000a]/30 border-r-2 border-[#0000000a]/50"></div>
        )}

        <Link href={"/"} className="relative z-10">
          <Image
            src={"/icons/u4c-logo.svg"}
            alt=""
            width={70}
            height={70}
            className="w-[2.0rem] sm:w-[3rem]"
          />
        </Link>

        {isDashboard === false && (
          <div className="hidden xl:flex items-center font-semibold gap-10">
            <Link href={"/"}>Home</Link>
            <Link href={"/explore"}>Explore</Link>
            <Link href={"/how-digital-giving-works"}>
              How digital giving works
            </Link>
            <Link href={"/contact-us"}>Contact us</Link>
            <Link href={"/faq"}>FAQ's</Link>
          </div>
        )}

        <div className="flex items-center gap-5 sm:gap-7 xl:gap-10">
          <ConnectWallet />

          {online === false ? (
            <Link href={"/sign-in"}>
              <button className="bg-black text-white rounded-md cursor-pointer text-[0.9rem] font-semibold hidden sm:block px-5 py-[.70rem]">
                Signin | Signup
              </button>
            </Link>
          ) : (
            <Link
              href={"/dashboard"}
              className="w-[3.5rem] h-[3.5rem] sm:w-[4rem] sm:h-[4rem] border-1 border-black/20 rounded-full p-[0.2rem]"
            >
              <div className="w-full h-full bg-gray-100 rounded-full relative overflow-hidden flex justify-center items-center">
                {user?.user?.avatar ? (
                  <Image
                    src={user?.user?.avatar}
                    alt=""
                    className="w-full h-full object-cover rounded-lg"
                    fill
                  />
                ) : (
                  <Image src={d_profile} alt="" width={30} height={30} />
                )}
              </div>
            </Link>
          )}

          <VscMenu
            onClick={() => setOpen((priv) => !priv)}
            className="text-[2.0rem] xl:hidden cursor-pointer"
          />
        </div>
      </div>

      <div
        className={`pointer-events-none fixed top-0 right-0 w-full h-full z-[200] overflow-hidden flex justify-end bg-red-100/0`}
      >
        <div
          className={`pointer-events-auto w-[90%] sm:w-[80%] md:w-[50%] h-screen xl:hidden border-l border-[#0000003a]/50 bg-white transition duration-[0.5s] ${
            !(open === true) && "translate-x-[100%]"
          }`}
        >
          <div className="flex justify-end px-5 sm:px-10 pt-10">
            <TfiClose
              onClick={() => setOpen((priv) => !priv)}
              className="text-[1.5rem] xl:hidden cursor-pointer"
            />
          </div>

          <div className="mt-10 flex flex-col gap-5 text-[1.1rem]">
            {isDashboard === false ? (
              <>
                <Link className="hover:bg-[#812880]/5 py-2 pl-10" href={"/"}>
                  Home
                </Link>
                <Link
                  className="hover:bg-[#812880]/5 py-2 pl-10"
                  href={"/explore"}
                >
                  Explore
                </Link>
                <Link
                  className="hover:bg-[#812880]/5 py-2 pl-10"
                  href={"/how-digital-giving-works"}
                >
                  How digital giving works
                </Link>
                <Link
                  className="hover:bg-[#812880]/5 py-2 pl-10"
                  href={"/contact-us"}
                >
                  Contact-Us
                </Link>
                <Link className="hover:bg-[#812880]/5 py-2 pl-10" href={"/faq"}>
                  FAQ's
                </Link>
                {online === true && (
                  <Link
                    className="hover:bg-[#812880]/5 py-2 pl-10"
                    href={"/dashboard"}
                  >
                    Dashboard
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link className="hover:bg-[#812880]/5 py-2 pl-10" href={"/"}>
                  Home
                </Link>
                <Link
                  className="hover:bg-[#812880]/5 py-2 pl-10"
                  href={"/dashboard"}
                >
                  Overview
                </Link>
                <Link
                  className="hover:bg-[#812880]/5 py-2 pl-10"
                  href={"/dashboard/campaign"}
                >
                  Campaign
                </Link>
                <Link
                  className="hover:bg-[#812880]/5 py-2 pl-10"
                  href={"/dashboard/profile"}
                >
                  Profile
                </Link>
                <Link
                  className="hover:bg-[#812880]/5 py-2 pl-10"
                  href={"/dashboard/transactions"}
                >
                  Transactions
                </Link>
                <Link
                  className="hover:bg-[#812880]/5 py-2 pl-10"
                  href={"/dashboard/treasury"}
                >
                  Treasury
                </Link>
                <Link
                  className="hover:bg-[#812880]/5 py-2 pl-10"
                  href={"/dashboard/setting"}
                >
                  Setting
                </Link>
              </>
            )}

            {online === false && (
              <Link
                href={"/sign-in"}
                className="hover:bg-[#812880]/5 py-2 pl-10"
              >
                Signin | Signup
              </Link>
            )}
            <ConnectWallet
              responsive_wind="w-full bg-[#812880]/5 hover:bg-[#812880]/10 text-black flex justify-start rounded-sm cursor-pointer font-semibold pl-5 py-2 block md:hidden"
              connect_wind="flex items-center gap-2 cursor-pointer text-[1.2rem] py-3"
              icon_wind="text-[1.7rem]"
              plus_wind="text-[1.0rem] ml-[0]"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
