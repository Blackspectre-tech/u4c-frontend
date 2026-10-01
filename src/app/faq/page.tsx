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
  const [params, setParams] = useState({ category: "General Overview" });
  const { isLoading, data, refetch, error } = useGetFaqsQuery(
    {
      params: params, // ✅ object, not string
    },
    {
      // pollingInterval: 10000, // every 10 seconds
      // refetchOnFocus: true,
      // refetchOnReconnect: true,
    },
  );

  console.log("====================================");
  console.log("FAQs");
  console.log(data);
  console.log("====================================");

  const editCategory = async (category: string) => {
    setParams((prev) => ({ ...prev, category: category }));
  };

  return (
    <div className="">
      <Hero
        // heading="Frequently Asked "
        // heading_styled="Questions"
        heading="FAQs"
        heading_styled=""
        paragraph="We built United4Change to solve the trust problem in charity, by using technology that proves every donation does what it says it will. Giving has never been this transparent or borderless"
      />
      <div className="relative mt-40">
        <div className="mx-auto xl:w-[80%] px-5 sm:px-10 md:px-20 xl:px-30 mt-20">
          <div className="flex justify-end mb-10">
            <div
              data-lenis-prevent
              className="w-84 flex items-center gap-3 gradient-cto rounded-xl"
            >
              <CustomSelector
                // optionsList={["USDT", "USDC", "Fiat VIA Transak/Card"]}
                control_class={"w-full"}
                single_value_style={{
                  color: "#ffffff",
                }}
                placeholder_style={{
                  color: "#ffffff",
                }}
                control_style={{
                  // borderRadius: "0.5rem",
                  border: "none",
                  padding: "0.55rem 1rem",
                  backgroundColor: "",
                  outline: "0",
                  stroke: "0",
                  width: "100%",
                  flex: 1,
                }}
                optionsList={[
                  "General Overview",
                  "How Funding Works",
                  "Donor Protection & Refunds",
                  "Security & Transparency",
                  "Treasury & Governance",
                  "NGOs & Participation",
                  "Your Donation, Protected",
                  "Contact & Updates",
                ]}
                placeholder="General Overview"
                changeEvent={(selected) =>
                  editCategory(String(selected?.value ?? ""))
                }
                mapOption={(val) => ({
                  value: val,
                  name: val,
                  label: (
                    <div className="flex items-center text-xl">
                      <p>{val}</p>
                    </div>
                  ),
                })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
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
      </div>
      {/* <FAQs faqs={faqs} /> */}
    </div>
  );
}
