"use client";

import CustomSelector from "@/components/SelectTag";
import { NavigationTemplate } from "@/components/utilities/utils.template";
import Link from "next/link";
import { useState } from "react";
import { TbPlus } from "react-icons/tb";

const Treasury: Record<string, any> = {
  "Validator Compensation": {
    percentage: 12,
    paragraph:
      "Empowering local validators to verify milestones, ensure project integrity, and maintain transparency",
  },
  "Emergency Response": {
    percentage: 18,
    paragraph:
      "Rapid disbursements to address urgent humanitarian needs and crisis relief efforts.",
  },
  "Outreach & Education": {
    percentage: 20,
    paragraph:
      "Training NGOs, onboarding new partners, and providing educational resources to promote ethical giving.",
  },
  "Research & Innovation": {
    percentage: 15,
    paragraph:
      "Developing blockchain tools and systems that improve accountability and donation efficiency.",
  },
  "Marketing & Awareness": {
    percentage: 15,
    paragraph:
      "Promoting verified NGO campaigns, growing donor engagement, and building visibility across global networks.",
  },
  "DAO Experiments": {
    percentage: 10,
    paragraph:
      "Testing community governance models for Treasury allocation and platform decision-making.",
  },
};

export default function Home() {
  const [active, setActive] = useState<string>("Validator Compensation");

  const categories = [
    "Validator Compensation",
    "Emergency Response",
    "Outreach & Education",
    "Research & Innovation",
    "Marketing & Awareness",
    "DAO Experiments",
  ];

  return (
    <div className="px-5 sm:px-10">
      <div className="flex flex-wrap items-center justify-between">
        <NavigationTemplate
          title="Treasury"
          navigation={[
            { title: "Dashboard", path: "/dashboard" },
            { title: "Treasury", path: "#" },
          ]}
        />

        <div className="flex flex-wrap sm:justify-end items-center gap-5 mt-5">
          <Link
            href={"/treasury-policy"}
            className="gradient-cto-border border border-transparent rounded-full flex items-center gap-2 py-2 md:py-3 px-5"
          >
            <TbPlus /> <p className="">Explore Treasury Policy</p>
          </Link>

          <div className="max-w-100 flex items-center gap-3 bg-gray-200 rounded-full">
            <CustomSelector
              // optionsList={["USDT", "USDC", "Fiat VIA Transak/Card"]}
              control_class={"w-full"}
              control_style={{
                // borderRadius: "0.5rem",
                border: "none",
                padding: "0.35rem 0.75rem",
                backgroundColor: "",
                outline: "0",
                stroke: "0",
                width: "100%",
                flex: 1,
              }}
              optionsList={[...categories]}
              placeholder="Validator Compensation"
              changeEvent={(selected) => {
                if (!selected) return;

                setActive(selected?.value as string);
              }}
              mapOption={(val) => ({
                value: val,
                name: val,
                label: (
                  <div className="flex items-center">
                    <p>{val}</p>
                  </div>
                ),
              })}
            />
          </div>
        </div>
      </div>

      <div className="w-full relative col-span-10 xl:col-span-7 bg-[#0000000a]/30 rounded-4xl overflow-hidden object-center bg-[url('https://images.unsplash.com/photo-1740568439252-b060d7ff3437?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds')] mt-5">
        <div className="w-full h-full flex flex-col sm:flex-row items-center gap-5 bg-[linear-gradient(90deg,#eb2027e1,#f36f26e1)] text-white p-5 md:p-8">
          <div className="min-w-20 min-h-20 relative flex items-center justify-center rounded-full bg-white">
            <h1 className="text-black text-2xl font-bold">
              {Treasury[active]?.percentage || ""}%
            </h1>
          </div>
          <div className="">
            <h1 className="text-2xl md:text-3xl text-center sm:text-left font-semibold">
              {active}
            </h1>
            <p className="text-center sm:text-left mt-1">
              {Treasury[active]?.paragraph || ""}
            </p>
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-1 gap-5 mt-5 sm:px-5">
        {active === "Validator Compensation" && (
          <div className="bg-gray-100 rounded-md flex items-center justify-between p-5">
            <h1>"Validator Compensation"</h1>
          </div>
        )}
        {active === "Emergency Response" && (
          <div className="bg-gray-100 rounded-md flex items-center justify-between p-5">
            <h1>"Emergency Response"</h1>
          </div>
        )}
        {active === "Outreach & Education" && (
          <div className="bg-gray-100 rounded-md flex items-center justify-between p-5">
            <h1>"Outreach & Education"</h1>
          </div>
        )}
        {active === "Research & Innovation" && (
          <div className="bg-gray-100 rounded-md flex items-center justify-between p-5">
            <h1>"Research & Innovation"</h1>
          </div>
        )}
        {active === "Marketing & Awareness" && (
          <div className="bg-gray-100 rounded-md flex items-center justify-between p-5">
            <h1>"Marketing & Awareness"</h1>
          </div>
        )}
        {active === "DAO Experiments" && (
          <div className="bg-gray-100 rounded-md flex items-center justify-between p-5">
            <h1>"DAO Experiments"</h1>
          </div>
        )}
      </div>
    </div>
  );
}
