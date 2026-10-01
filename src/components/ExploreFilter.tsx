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

const statuses = ["All Status", "Expired", "Completed", "Funding"];

function ExploreFilter({
  search_value = "",
  search = (value: string) => {},
  status = (value: string) => {},
  category = (value: string) => {},
  sadaqah = (active: boolean) => {},
  sadaqah_active = false,
}: {
  search_value?: string;
  sadaqah_active?: boolean;
  sadaqah?: (active: boolean) => void;
  status?: (value: string) => void;
  search?: (value: string) => void;
  category?: (value: string) => void;
}) {
  return (
    <div className="w-full">
      <div
        id="gradient-border"
        className="rounded-xl flex flex-col min-[950px]:flex-row items-center gap-5 p-4"
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

        <div className="hidden min-[950px]:block min-w-[2px] w-[2px] h-[2rem] bg-black"></div>

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

        <div className="hidden min-[950px]:block min-w-[2px] w-[2px] h-[2rem] bg-black"></div>

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

        <div className="hidden min-[950px]:block min-w-[2px] w-[2px] h-[2rem] bg-black"></div>

        <button
          type="button"
          role="switch"
          aria-checked={sadaqah_active}
          onClick={() => sadaqah(!sadaqah_active)}
          className={`w-full min-[950px]:w-auto min-[950px]:min-w-max flex items-center justify-between gap-3 rounded-lg px-4 py-[0.86rem] text-sm font-medium transition-colors cursor-pointer ${
            sadaqah_active
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <span>Sadaqah only</span>
          <span
            className={`relative inline-block h-5 w-9 rounded-full transition-colors ${
              sadaqah_active ? "bg-white/30" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                sadaqah_active ? "translate-x-4" : ""
              }`}
            />
          </span>
        </button>
      </div>
    </div>
  );
}

export default ExploreFilter;
