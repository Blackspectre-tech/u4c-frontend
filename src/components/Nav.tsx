"use client";

import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { TfiClose } from "react-icons/tfi";
import { VscMenu } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import ConnectWallet from "@/Wallet/ConnectWallet";
import { usePathname, useRouter } from "next/navigation";
import { FaChevronDown, FaChevronUp, FaExclamation } from "react-icons/fa";
import { setDefault } from "@/redux/slice/users";
import { BsFillBellFill } from "react-icons/bs";
import { MdInstallDesktop, MdInstallMobile } from "react-icons/md";
import { response_message } from "./utilities/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useLogOut } from "@/Wallet/privy/privy.utils";

// Capture beforeinstallprompt before React hydration so we don't miss it
let _earlyInstallPrompt: any = null;
if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    _earlyInstallPrompt = e;
  });
}

function Nav({ isDashboard = false }: { isDashboard?: boolean }) {
  const { user, online, organization, kyc } = useSelector(
    (state: RootState) => state.user,
  );
  const menu_ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState(false);
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);
  const [loggedInNavigation, setLoggedInNavigation] = useState<boolean>(false);

  const d_profile = "/icons/profile-icon.png";
  const { disconnect_wallet } = useLogOut();
  const currentPath = usePathname();

  useEffect(() => {
    setOpen(false);

    return () => {};
  }, [currentPath]);

  useEffect(() => {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;

    if (!isStandalone && _earlyInstallPrompt) {
      setSupportsPWA(true);
      setPromptInstall(_earlyInstallPrompt);
    }

    const handler = (e: any) => {
      e.preventDefault();
      _earlyInstallPrompt = e;
      setSupportsPWA(true);
      setPromptInstall(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        menu_ref.current &&
        !menu_ref.current.contains(target) &&
        !(target instanceof Element && target.closest(".ignore_element"))
      ) {
        setLoggedInNavigation(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const path = useRouter();
  const dispatch = useDispatch();

  const log_out = async () => {
    dispatch(setDefault({}));
    await disconnect_wallet().finally(() => {
      localStorage.clear();

      setTimeout(() => {
        path.push("/sign-in");
      }, 1000);
    });
  };

  const install_web_app = async () => {
    if (!supportsPWA)
      return response_message({
        message: "Web Apps are not supported on your device",
        option: "wrn",
      });

    setisLoading(true);
    try {
      promptInstall.prompt();
      const choiceResult: { outcome: string } = await promptInstall.userChoice;
      if (choiceResult.outcome === "accepted") {
        setSupportsPWA(false);
        response_message({ message: "Installation Complete.", option: "scc" });
      } else {
        response_message({ message: "Process was canceled.", option: "err" });
      }
    } catch (error) {
      response_message({ message: "Something went wrong.", option: "err" });
    } finally {
      setisLoading(false);
    }
  };

  // console.log("supportsPWA");
  // console.log("supportsPWA");
  // console.log("supportsPWA");
  // console.log("supportsPWA");
  // console.log(supportsPWA);

  return (
    <div
      className={`${currentPath === "/" && "absolute top-0 left-0 w-full"} ${
        isDashboard === true && "border-b border-gray-200 md:border-none"
      }`}
    >
      <div className="flex justify-between items-center relative z-50 px-5 sm:px-10 py-4">
        <Link
          href={"/"}
          className={`${isDashboard === true && "md:hidden"} relative z-10`}
        >
          <Image
            src={"/icons/u4c-logo.svg"}
            alt=""
            width={70}
            height={70}
            className="w-8 sm:w-12"
          />
        </Link>

        {isDashboard === false ? (
          <div className="hidden xl:flex items-center font-semibold gap-10">
            <Link href={"/"}>Home</Link>
            <Link href={"/explore"}>Explore</Link>
            <Link href={"/how-digital-giving-works"}>digital giving</Link>
            <Link href={"/contact-us"}>Contact us</Link>
            <Link href={"/faq"}>FAQs</Link>
          </div>
        ) : (
          <div className="hidden md:block"></div>
        )}

        <div className="flex items-center gap-5 sm:gap-7">
          <ConnectWallet />

          {supportsPWA === true && (
            <button
              onClick={install_web_app}
              className={`gradient-cto-border border border-transparent cursor-pointer items-center rounded-xl hidden md:flex gap-2 px-5 py-[0.65rem]`}
            >
              {isLoading && (
                <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
              )}
              <MdInstallDesktop className={`hidden lg:block text-xl`} />
              <MdInstallMobile className={`lg:hidden text-xl`} />
              Install
            </button>
          )}

          {online === false ? (
            <Link href={"/sign-in"}>
              <button className="gradient-cto-border border border-transparent text-black rounded-xl cursor-pointer text-[0.9rem] font-semibold hidden sm:block px-10 py-[.70rem]">
                Signin
              </button>
            </Link>
          ) : (
            <div
              onClick={() => setLoggedInNavigation((prev) => !prev)}
              className="ignore_element bg-gray-200 relative flex items-center gap-2 rounded-xl cursor-pointer px-4 py-[0.45rem]"
            >
              <div className="gradient-cto-border overflow-hidden border border-transparent w-[2.1rem] h-[2.1rem] bg-gray-100 rounded-full relative ------hidden flex justify-center items-center">
                {user?.user?.avatar ? (
                  <Image
                    src={user?.user?.avatar}
                    alt=""
                    className="w-full h-full object-cover rounded-lg"
                    fill
                  />
                ) : (
                  <Image
                    src={d_profile}
                    alt=""
                    className="translate-y-1"
                    width={22}
                    height={22}
                  />
                )}
              </div>

              <h1 className="font-semibold">
                {organization === true ? "NGO" : "Donor"}
              </h1>

              {kyc?.verified === false && organization === true && (
                <div className="relative mr-2">
                  <BsFillBellFill className="text-[0.9rem]" />

                  <div className="absolute top-0 right-0 w-5 h-5 translate-x-[13px] translate-y-[-13px] border-2 border-gray-200 bg-red-500 rounded-full flex items-center justify-center">
                    <p className="text-[0.75rem] text-white font-black">1</p>
                  </div>
                </div>
              )}

              {loggedInNavigation ? (
                <FaChevronUp
                  className={`text-[0.8rem] translate-y-0.5 opacity-50`}
                />
              ) : (
                <FaChevronDown
                  className={`text-[0.8rem] translate-y-0.5 opacity-50`}
                />
              )}

              <div
                ref={menu_ref}
                className={`absolute bottom-0 right-0 transition duration-500 ${
                  loggedInNavigation
                    ? "translate-y-[105%]"
                    : "translate-y-[90%] opacity-0 pointer-events-none"
                } min-w-60 rounded-lg ------hidden bg-gray-200`}
              >
                {currentPath.includes("dashboard") ? (
                  <Link className="" href={"/"}>
                    <p className="hover:bg-[#812880]/10 font-semibold py-3 px-5">
                      Home
                    </p>
                  </Link>
                ) : (
                  <Link className="" href={"/dashboard"}>
                    <p className="hover:bg-[#812880]/10 font-semibold py-3 px-5">
                      Dashboard
                    </p>
                  </Link>
                )}

                <div onClick={log_out} className="">
                  <p className="hover:bg-[#812880]/10 font-semibold py-3 px-5">
                    Sign Out
                  </p>
                </div>

                {organization === true && (
                  <>
                    {kyc?.verified === false && (
                      <Link
                        className="hover:bg-[#fa6a71] bg-red-500 text-white flex items-center justify-start gap-1 py-3 px-4"
                        href={"/dashboard/setting/verify-kyc"}
                      >
                        <FaExclamation className="text-[1rem]" />{" "}
                        <p className="font-semibold">Verify KYC</p>
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          <VscMenu
            onClick={() => setOpen((priv) => !priv)}
            className="text-[2.0rem] xl:hidden cursor-pointer"
          />
        </div>
      </div>

      <div
        className={`pointer-events-none fixed top-0 right-0 w-full h-full z-60 flex justify-end bg-red-100/0`}
      >
        <div
          className={`pointer-events-auto w-[90%] sm:w-[80%] md:w-[50%] xl:hidden border-l border-[#0000003a]/50 bg-white transition duration-500 ${
            !(open === true) && "translate-x-full"
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
                  digital giving
                </Link>
                <Link
                  className="hover:bg-[#812880]/5 py-2 pl-10"
                  href={"/contact-us"}
                >
                  Contact-Us
                </Link>
                <Link className="hover:bg-[#812880]/5 py-2 pl-10" href={"/faq"}>
                  FAQs
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
            <div className="pl-7 pr-5">
              {supportsPWA && (
                <button
                  onClick={install_web_app}
                  className={`w-full gradient-cto-border border border-transparent items-center cursor-pointer rounded-xl md:hidden flex gap-2 px-5 py-[0.65rem]`}
                >
                  {isLoading === true && (
                    <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
                  )}

                  <MdInstallDesktop className={`hidden lg:block text-xl`} />
                  <MdInstallMobile className={`lg:hidden text-xl`} />
                  <p className="text-[1.2rem] font-semibold">Install</p>
                </button>
              )}
            </div>
            <div className="pl-7 pr-5">
              <ConnectWallet
                responsive_wind="w-full"
                connect_wind="w-full flex items-center gap-2 cursor-pointer text-[1.2rem] py-3 pl-5"
                icon_wind="text-[1.7rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
