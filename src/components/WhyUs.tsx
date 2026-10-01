"use client";

import Image from "next/image";
import React from "react";
import { BsTransparency } from "react-icons/bs";
import { MdLibraryAddCheck } from "react-icons/md";
import { PiLightbulbBold } from "react-icons/pi";
import { TiWorld } from "react-icons/ti";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Analytics from "./Analytics";

const why_us = [
  {
    icon: "/icons/why-0.png",
    heading: "Impact First",
    paragraph:
      "Projects are selected based on real community needs, ensuring funding supports meaningful local development.",
  },
  {
    icon: "/icons/why-0.png",
    heading: "Milestone-Based Funding",
    paragraph:
      "Donations are securely held and released only after verified project milestones are achieved.",
  },
  {
    icon: "/icons/why-0.png",
    heading: "Transparent by Design",
    paragraph:
      "Every transaction and milestone update is visible to donors and stakeholders.",
  },
  {
    icon: "/icons/why-0.png",
    heading: "Purpose-Built Infrastructure",
    paragraph:
      "United4Change combines modern financial technology with accountability standards designed for NGOs and development partners.",
  },
];

function WhyUs() {
  return (
    <div className="relative bg-primary/15 min-[1800px]:rounded-2xl mt-20">
      <div className="p-5 sm:p-20">
        <h1 className="font-semibold text-center text-3xl mb-3">
          Why Choose Us
        </h1>

        <div className="w-full flex flex-col lg:grid grid-cols-2 gap-10 mt-10 p-5">
          {why_us.map((why: any, index: number) => {
            return (
              <div
                key={index}
                className={`border-2 border-[#298e95]/15 rounded-2xl text-left p-2`}
              >
                <div
                  className={`w-full bg-[#298e95] text-white rounded-xl px-7 py-4 mb-4`}
                >
                  <h1 className={`font-semibold text-2xl`}>{why.heading}</h1>
                </div>

                <p className="px-5 pt-2 pb-5">{why.paragraph}</p>
              </div>
            );
          })}
        </div>
      </div>

      <Analytics />
    </div>
  );
}

export default WhyUs;
