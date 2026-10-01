"use client";

import Image from "next/image";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import CustomSelector from "./SelectTag";

function FundProject() {
  const [selected, setSelected] = useState<
    "donor-dashboard" | "ngo-dashboard" | "treasuries" | string
  >("donor-dashboard");
  const { online } = useSelector((state: RootState) => state.user);

  // console.log("====================================");
  // console.log(selected);
  // console.log("====================================");

  useEffect(() => {
    return () => {};
  }, [selected]);

  return (
    <div className="relative px-5 mt-20">
      <h1 className="font-semibold text-gray-500 text-center text-xl mb-5">
        Infrastructure & Compliance Partners
      </h1>

      <div className="bg-[linear-gradient(to_right,transparent_0%,transparent_15%,#d1d5dc_50%,transparent_85%,transparent_100%)] py-px">
        <div className="bg-white py-5">
          <div className="flex justify-center items-center gap-5 md:gap-10">
            <Link href="https://www.circle.com/" target="_blank" className="">
              <Image
                src={"/icons/circle.png"}
                alt=""
                width={290}
                height={290}
                // className="grayscale-[20]"
              />{" "}
            </Link>

            <Link href="https://www.linkio.com/" target="_blank" className="">
              <Image
                src={"/icons/link.png"}
                alt=""
                width={180}
                height={180}
                // className="grayscale-[20]"
              />{" "}
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-20 sm:px-20">
        <div className="bg-[#278b92] md:hidden rounded-lg flex w-full gap-3 mb-10 py-1">
          <CustomSelector
            optionsList={["donor-dashboard", "ngo-dashboard", "treasuries"]}
            control_class={"w-full"}
            single_value_style={{
              color: "white",
            }}
            placeholder_style={{ color: "rgba(255, 255, 255, 0.8)" }}
            control_style={{
              border: "none",
              padding: "0.35rem 0.75rem",
              backgroundColor: "",
              outline: "0",
              stroke: "0",
              width: "100%",
              flex: 1,
            }}
            placeholder="Donor Dashboard"
            changeEvent={(selected) => {
              console.log("hii");
              console.log(selected);
              setSelected(String(selected?.value));
            }}
            mapOption={(val) => ({
              value: val,
              name: val,
              label: (
                <div className="flex items-center">
                  <p className="capitalize">{val?.replace("-", " ")}</p>
                </div>
              ),
            })}
          />
        </div>

        <div className="bg-gray-200 hidden text-black md:flex items-center justify-center gap-3 rounded-full mb-20 p-2">
          <button
            onClick={() => setSelected("donor-dashboard")}
            className={`${
              selected === "donor-dashboard" && "gradient-cto text-white"
            } rounded-full cursor-pointer`}
          >
            <p className="px-5 py-3">Donor Dashboard</p>
          </button>

          <button
            onClick={() => setSelected("ngo-dashboard")}
            className={`${
              selected === "ngo-dashboard" &&
              "gradient-cto text-white font-semibold"
            } rounded-full cursor-pointer`}
          >
            <p className="px-5 py-3">NGO Dashboard</p>
          </button>

          <button
            onClick={() => setSelected("treasuries")}
            className={`${
              selected === "treasuries" &&
              "gradient-cto text-white font-semibold"
            } rounded-full cursor-pointer`}
          >
            <p className="px-5 py-3">Treasury</p>
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
          } z-1 flex flex-col lg:flex-row justify-center items-center gap-10`}
        >
          <Image
            src={"/icons/icon-1.svg"}
            alt=""
            width={400}
            height={400}
            className="w-[90%] md:w-100 rounded-2xl"
          />

          <div className="md:w-[90%] lg:w-120 bg-[#fcfcfc]/0 text-center lg:text-left">
            <h1 className="font-semibold text-3xl mb-3">
              Track Your Impact in Real Time
            </h1>
            <p className="sm:w-[80%] mx-auto lg:w-full">
              Donors receive transparent updates showing project progress,
              milestone verification, and fund releases.
            </p>

            <Link href={online ? "/dashboard" : "/sign-in"}>
              <button className={`gradient-cto rounded-xl cursor-pointer mt-5`}>
                <p className="rounded-lg px-7 py-3">Visit Donor Dashboard</p>
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
          } z-1 flex flex-col lg:flex-row justify-center items-center gap-10`}
        >
          <Image
            src={"/icons/icon-2.svg"}
            alt=""
            width={400}
            height={400}
            className="w-[90%] md:w-100 rounded-2xl"
          />

          <div className="md:w-[90%] lg:w-120 bg-[#fcfcfc]/0 text-center lg:text-left">
            <h1 className="font-semibold text-3xl mb-3">
              Manage Projects with Transparent Funding
            </h1>
            <p className="sm:w-[80%] mx-auto lg:w-full">
              NGOs can manage campaigns, submit milestone updates, and request
              verified fund releases through a dedicated dashboard. Progress
              reports and documentation help maintain transparency and donor
              trust.
            </p>

            <Link href={online ? "/dashboard" : "/sign-in"}>
              <button className={`gradient-cto rounded-xl cursor-pointer mt-5`}>
                <p className="rounded-lg px-7 py-3">Visit Ngo Dashboard</p>
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
          } z-1 flex flex-col lg:flex-row justify-center items-center gap-10`}
        >
          <Image
            src={"/icons/icon-0.svg"}
            alt=""
            width={400}
            height={400}
            className="w-[90%] md:w-100 rounded-2xl"
          />

          <div className="md:w-[90%] lg:w-120 bg-[#fcfcfc]/0 text-center lg:text-left">
            <h1 className="font-semibold text-3xl mb-3">
              Secure Treasury & Fund Management
            </h1>
            <p className="sm:w-[80%] mx-auto lg:w-full">
              Funds are held in secure digital vaults and released according to
              verified project milestones. The treasury layer provides
              transparent fund tracking, automated release conditions, and
              secure financial oversight.
            </p>

            <Link href={"/in-app-donation"}>
              <button className={`gradient-cto rounded-xl cursor-pointer mt-5`}>
                <p className="rounded-lg px-7 py-3">Donate To Treasury</p>
              </button>
            </Link>
            <div className="flex items-center justify-center lg:justify-start gap-3 mt-2">
              <Link
                href={
                  "https://polygonscan.com/address/0xc79974d478a60cA37A633A0e78eC3408A88E1A5C"
                }
                target="_blank"
                className="block text-sm border-b border-black"
              >
                Built for Donors, NGOs, and Institutional Funding Partners
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FundProject;
