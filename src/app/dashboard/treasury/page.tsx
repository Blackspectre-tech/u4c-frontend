"use client";

import CustomSelector from "@/components/SelectTag";
import { useState } from "react";

export default function Home() {
  const [active, setActive] = useState<string>("Validator Compensation");

  const categories = [
    "Validator Compensation",
    "Emergency Response",
    "Outreach & Education",
    "Research & Innovation",
    "DAO Experiments",
  ];

  return (
    <div className="px-5 sm:px-10">
      <div className="w-full">
        <div id="gradient-border" className="rounded-xl p-4">
          <CustomSelector
            optionsList={[...categories]}
            placeholder="Select a category"
            changeEvent={(selected) => {
              setActive(selected?.value as string);
            }}
            control_style={{ border: "none", outline: "none" }}
            control_class={""}
            mapOption={(val) => ({
              value: val,
              name: val,
              label: (
                <div className="flex items-center gap-2">
                  <p>{val}</p>
                </div>
              ),
            })}
          />
        </div>
      </div>

      <div className="relative grid grid-cols-1 gap-5 mt-5 px-5">
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
        {active === "DAO Experiments" && (
          <div className="bg-gray-100 rounded-md flex items-center justify-between p-5">
            <h1>"DAO Experiments"</h1>
          </div>
        )}
      </div>
    </div>
  );
}
