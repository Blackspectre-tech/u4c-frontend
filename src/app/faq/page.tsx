"use client";

import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import CustomSelector from "@/components/SelectTag";
import { useGetFaqsQuery } from "@/redux/api/main";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  PiArrowElbowRightDownFill,
  PiArrowElbowRightUpFill,
} from "react-icons/pi";

export default function Home() {
  const [params, setParams] = useState({ category: "" });
  const { isLoading, data, refetch, error } = useGetFaqsQuery(
    {
      params: params, // ✅ object, not string
    },
    {
      // pollingInterval: 10000, // every 10 seconds
      // refetchOnFocus: true,
      // refetchOnReconnect: true,
    }
  );

  console.log("====================================");
  console.log(data);
  console.log("====================================");

  const editCategory = async (category: string) => {
    setParams((prev) => ({ ...prev, category: category }));
  };

  return (
    <div className="">
      <Hero
        heading="Frequently Asked "
        heading_styled="Questions"
        paragraph="We built United4Change to solve the trust problem in charity, by using technology that proves every donation does what it says it will. Giving has never been this transparent or borderless"
      />
      <div className="relative mt-[10rem]">
        <div className="grid grid-cols-1 gap-5 px-5 sm:px-10 md:px-20 xl:px-30 mt-[5rem]">
          <div className="flex flex-col sm:flex-row items-center gap-3 px-5 sm:px-10 xl:px-20 mb-[5rem]">
            <div className="w-full">
              <CustomSelector
                optionsList={[
                  "Discover United4Change",
                  "Global Giving Made Easy",
                  "Starting A Campaign",
                  "The Tech That Powers U4C",
                ]}
                placeholder="Inquiry type"
                changeEvent={(selected) =>
                  editCategory(String(selected?.value ?? ""))
                }
                control_class={""}
                control_style={{
                  borderRadius: "0.5rem",
                  padding: "0.85rem 0.75rem",
                }}
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

            <button
              onClick={async () => await refetch()}
              disabled={isLoading}
              className="button_ cursor-pointer text-[1.2rem] flex items-center justify-center gap-2 w-full sm:w-auto px-10 md:px-[5rem] py-[1.10rem]"
            >
              {isLoading && (
                <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
              )}{" "}
              Submit
            </button>
          </div>

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
      {/* <FAQs faqs={faqs} /> */}
    </div>
  );
}
