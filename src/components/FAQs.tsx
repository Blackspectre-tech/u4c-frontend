"use client";

import { useGetFaqsQuery } from "@/redux/api/main";
import React from "react";
import Faq from "./Faq";

function FAQs({ title = false }: { title?: boolean }) {
  const { isLoading, data, refetch, error } = useGetFaqsQuery({
    params: { category: "FAQs on the Homepage" }, // ✅ object, not string
  });

  return (
    <div className="relative mx-auto xl:w-[90%] p-5 sm:px-20 mt-20">
      {title === true ? (
        <div className="flex flex-col justify-center">
          <div className="flex flex-col items-center justify-center gap-3">
            {/* <h1 className="font-semibold text-center text-3xl">
              Your Donation, Protected
            </h1> */}

            {/* <p>
              U4C Compliance Statement At United4Change (U4C), transparency,
              integrity, and security are at the heart of everything we do. All
              NGOs and donors on our platform are carefully verified to ensure
              compliance with global anti-money laundering (AML) and
              counter-terrorist financing (CTF) standards. U4C uses
              blockchain-powered smart contracts to move donations directly from
              donors to NGOs, releasing funds only when verified project
              milestones are met. Our systems include identity verification,
              sanctions screening, real-time monitoring, and secure reporting
              processes to maintain a safe and trustworthy environment for
              charitable giving. By using U4C, you agree to our "Terms of Use"
              and "Privacy Policy", and support our commitment to ethical,
              transparent, and fully compliant operations.
            </p> */}
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="flex items-center gap-5">
            <div id="gradient-border" className="rounded-lg overflow-hidden">
              <input
                type="text"
                className="w-full bg-[#F2F8F9] outline-0 py-[.6rem] px-5"
              />
            </div>
            <button className="w-40 button_ font-semibold py-3">Submit</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:px-20 lg:px-0 xl:px-30 mt-20">
        {data?.map((faq: any, index: number) => (
          <Faq
            // class_="gradient-cto-border w-full h-full hover:bg-gray-50 rounded-xl  border-2 border-white/50 py-5 px-10"
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
