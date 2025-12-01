"use client";

import Image from "next/image";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

function FundProject() {
  const [selected, setSelected] = useState<
    "donor-dashboard" | "ngo-dashboard" | "treasuries"
  >("donor-dashboard");
  const { online } = useSelector((state: RootState) => state.user);

  console.log("====================================");
  console.log(selected);
  console.log("====================================");

  useEffect(() => {
    return () => {};
  }, [selected]);

  return (
    <div className="relative p-5 sm:p-20 mt-[10rem]">
      {/* <div className="flex justify-center items-center gap-2 mb-3">
        <Image src={"/icons/u4c-logo.svg"} alt="" width={30} height={30} />{" "}
        <p>Platform Breakdown</p>
      </div> */}

      <h1 className="max-w-[40rem] text-xl text-center mx-auto mb-10">
        Streamline aid distribution with tailored tools for donors, NGOs.
      </h1>

      <div className="flex justify-center">
        <div className="bg-gray-100 flex items-center justify-center rounded-lg mb-20 p-2">
          <button
            onClick={() => setSelected("donor-dashboard")}
            className={`${
              selected === "donor-dashboard" && "button_border_"
            } rounded-lg cursor-pointer`}
          >
            <p className="bg-gray-100 rounded-lg px-5 py-3">Donor Dashboard</p>
          </button>

          <button
            onClick={() => setSelected("ngo-dashboard")}
            className={`${
              selected === "ngo-dashboard" && "button_border_"
            } rounded-lg cursor-pointer`}
          >
            <p className="bg-gray-100 rounded-lg px-5 py-3">NGO Dashboard</p>
          </button>

          <button
            onClick={() => setSelected("treasuries")}
            className={`${
              selected === "treasuries" && "button_border_"
            } rounded-lg cursor-pointer`}
          >
            <p className="bg-gray-100 rounded-lg px-5 py-3">Treasury</p>
          </button>
        </div>
      </div>

      <div className="relative">
        {/* -------------------------------------------------------------------- */}
        {/* -------------------------------------------------------------------- */}
        {/* -------------------------------------------------------------------- */}
        {/* -------------------------------------------------------------------- */}
        <div
          className={`${
            selected === "donor-dashboard"
              ? ""
              : "opacity-0 pointer-events-none absolute top-0"
          } z-[1] flex flex-col lg:flex-row justify-center items-center gap-10`}
        >
          <Image
            src={"/icons/icon-1.svg"}
            alt=""
            width={400}
            height={400}
            className="w-[40rem] lg:w-[30rem] rounded-2xl"
          />

          <div className="md:w-[90%] lg:w-[30rem] bg-[#fcfcfc]/0 text-center lg:text-left">
            <h1 className="font-semibold text-3xl mb-3">Donor Dashboard</h1>
            <p className="sm:w-[80%] mx-auto lg:w-full">
              view every transaction, milestone update, and NGO proof of work in
              real time.
            </p>

            <Link href={online ? "/dashboard" : "/sign-in"}>
              <button className={`button_border_ rounded-lg mt-5`}>
                <p className="hover:bg-gray-100 rounded-lg px-7 py-3">
                  Visit Donor Dashboard
                </p>
              </button>
            </Link>
          </div>
        </div>

        {/* -------------------------------------------------------------------- */}
        {/* -------------------------------------------------------------------- */}
        {/* -------------------------------------------------------------------- */}
        {/* -------------------------------------------------------------------- */}
        <div
          className={`${
            selected === "ngo-dashboard"
              ? ""
              : "opacity-0 pointer-events-none absolute top-0"
          } z-[1] flex flex-col lg:flex-row justify-center items-center gap-10`}
        >
          <Image
            src={"/icons/icon-2.svg"}
            alt=""
            width={400}
            height={400}
            className="w-[40rem] lg:w-[30rem] rounded-2xl"
          />

          <div className="md:w-[90%] lg:w-[30rem] bg-[#fcfcfc]/0 text-center lg:text-left">
            <h1 className="font-semibold text-3xl mb-3">NGO Dashboard</h1>
            <p className="sm:w-[80%] mx-auto lg:w-full">
              manage campaigns, upload verification materials, and request
              milestone releases directly from your dashboard.
            </p>

            <Link href={online ? "/dashboard" : "/sign-in"}>
              <button className={`button_border_ rounded-lg mt-5`}>
                <p className="hover:bg-gray-100 rounded-lg px-7 py-3">
                  Visit Ngo Dashboard
                </p>
              </button>
            </Link>
          </div>
        </div>

        {/* -------------------------------------------------------------------- */}
        {/* -------------------------------------------------------------------- */}
        {/* -------------------------------------------------------------------- */}
        {/* -------------------------------------------------------------------- */}
        <div
          className={`${
            selected === "treasuries"
              ? ""
              : "opacity-0 pointer-events-none absolute top-0"
          } z-[1] flex flex-col lg:flex-row justify-center items-center gap-10`}
        >
          <Image
            src={"/icons/icon-0.svg"}
            alt=""
            width={400}
            height={400}
            className="w-[40rem] lg:w-[30rem] rounded-2xl"
          />

          <div className="md:w-[90%] lg:w-[30rem] bg-[#fcfcfc]/0 text-center lg:text-left">
            <h1 className="font-semibold text-3xl mb-3">Treasury</h1>
            <p className="sm:w-[80%] mx-auto lg:w-full">
              The U4C Treasury is entirely community-funded through optional
              donor tips and direct contributions. It supports outreach,
              research, emergency response, and validator compensation all fully
              visible in your transparency dashboard.
            </p>

            <Link href={"/in-app-donation"}>
              <button className={`button_border_ rounded-lg mt-5`}>
                <p className="hover:bg-gray-100 rounded-lg px-7 py-3">
                  Donate To Treasury
                </p>
              </button>
            </Link>
            <div className="flex items-center justify-center lg:justify-start gap-3 mt-2">
              {/* <div className="w-4 h-[2px] bg-gray-400"></div> */}
              <Link
                href={
                  "https://polygonscan.com/address/0xc79974d478a60cA37A633A0e78eC3408A88E1A5C"
                }
                target="_blank"
                className="block text-sm border-b border-black"
              >
                View Transparency Ledger
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FundProject;
