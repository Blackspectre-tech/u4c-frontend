"use client";

import { useGetFaqsQuery } from "@/redux/api/main";
import React from "react";
import Faq from "./Faq";

function FAQs({ title = false }: { title?: boolean }) {
  const { isLoading, data, refetch, error } = useGetFaqsQuery({
    params: { category: "Global Giving Made Easy" }, // ✅ object, not string
  });

  return (
    <div className="relative bg-[#F2F8F9]/0 p-5 sm:px-20 mt-[10rem]">
      {title === true ? (
        <h1 className="font-semibold text-center text-3xl mb-3">FAQs</h1>
      ) : (
        <div className="flex justify-center">
          <div className="flex items-center gap-5">
            <div id="gradient-border" className="rounded-lg overflow-hidden">
              <input
                type="text"
                className="w-full bg-[#F2F8F9] outline-0 py-[.6rem] px-5"
              />
            </div>
            <button className="w-[10rem] button_ font-semibold py-3">
              Submit
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:px-20 lg:px-0 xl:px-30 mt-[5rem]">
        {data?.map((faq: any, index: number) => (
          <Faq
            key={index}
            heading={faq?.question || ""}
            paragraph={faq?.answer || ""}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default FAQs;
