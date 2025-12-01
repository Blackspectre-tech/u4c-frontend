"use client";

import React, { useState } from "react";
import CustomSelector from "./SelectTag";
import { BsSearch } from "react-icons/bs";

const categories = [
  "All Categories",
  "Clean Water",
  "Education",
  "Healthcare",
  "Childcare",
  "Climate Change",
  "Disaster Recovery",
  "Hunger",
];

const statuses = ["All Status", "Failed", "Completed", "Funding"];

function ExploreFilter({
  search_value = "",
  search = (value: string) => {},
  status = (value: string) => {},
  category = (value: string) => {},
}: {
  search_value?: string;
  status?: (value: string) => void;
  search?: (value: string) => void;
  category?: (value: string) => void;
}) {
  return (
    <div className="w-full">
      <div
        id="gradient-border"
        className="rounded-xl flex flex-col min-[950]:flex-row items-center gap-5 p-4"
      >
        <div className="w-full flex items-center gap-3 bg-gray-100 rounded-lg px-5 py-[0.86rem]">
          <input
            type="text"
            value={search_value}
            placeholder="Search..."
            className="border-0 outline-0 w-full"
            onChange={(e) => search(e.target.value)}
          />

          <div className="min-w-[1px] w-[1px] h-[1.2rem] bg-black/20"></div>

          <div className="min-w-[1.5rem] h-full flex justify-center">
            <BsSearch className="text-[1.3rem] text-gray-400 hover:text-gray-600" />
          </div>
        </div>

        <div className="hidden min-[950]:block min-w-[2px] w-[2px] h-[2rem] bg-black"></div>

        <div className="w-full">
          <CustomSelector
            optionsList={[...categories]}
            placeholder="Select a category"
            changeEvent={(selected) => {
              category(selected?.value as string);
            }}
            control_style={{
              border: "none",
              borderRadius: "0.5rem",
              outline: "none",
              backgroundColor: "#f3f4f6",
              padding: "0.5rem",
            }}
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

        <div className="hidden min-[950]:block min-w-[2px] w-[2px] h-[2rem] bg-black"></div>

        <div className="w-full">
          <CustomSelector
            optionsList={[...statuses]}
            placeholder="Select a campaign status"
            changeEvent={(selected) => {
              status(selected?.value as string);
            }}
            control_style={{
              border: "none",
              borderRadius: "0.5rem",
              outline: "none",
              backgroundColor: "#f3f4f6",
              padding: "0.5rem",
            }}
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
    </div>
  );
}

export default ExploreFilter;
