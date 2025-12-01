"use client";

import Image from "next/image";
import React from "react";
import { BsTransparency } from "react-icons/bs";
import { MdLibraryAddCheck } from "react-icons/md";
import { PiLightbulbBold } from "react-icons/pi";
import { TiWorld } from "react-icons/ti";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const why_us = [
  {
    icon: <TiWorld />,
    heading: "Impact First",
    paragraph:
      "Every project is chosen by the communities it serves  so your donation directly fuels real, local impact.",
  },
  {
    icon: <MdLibraryAddCheck />,
    heading: "Milestone Based Giving",
    paragraph:
      "Donations are held in smart digital vaults and only released when verified milestones are met.",
  },
  {
    icon: <BsTransparency />,
    heading: "Transparent by Design",
    paragraph:
      "Every donation is traceable. See where your support goes, who it helps, and what changes in real time.",
  },
  {
    icon: <PiLightbulbBold />,
    heading: "Powered by Purposeful Tech",
    paragraph:
      "Donations are held in smart digital vaults and only released when verified milestones are met.",
  },
];

function WhyUs() {
  return (
    <div className="relative p-5 sm:p-20 mt-[5rem] bg-gray-100">
      <h1 className="font-semibold text-center text-3xl mb-3">Why Chose Us</h1>

      <div className="w-full flex flex-col lg:grid grid-cols-2 gap-14 md:px-20 lg:px-0 xl:px-30 mt-[5rem]">
        {why_us.map((why, index) => {
          return (
            <div
              key={index}
              className={`bg-[white] flex flex-col text-left rounded-md shadow my-2 p-8`}
            >
              <div className={`relative flex items-center gap-3 mb-3`}>
                <div
                  id="gradient-border"
                  className={`bg-red-100 min-w-[3rem] min-h-[3rem] flex justify-center items-center rounded-md font-semibold text-[1.5rem]`}
                >
                  {why.icon}
                </div>

                <h1 className={`font-semibold text-3xl`}>{why.heading}</h1>
              </div>

              <p className="">{why.paragraph}</p>
            </div>
          );
        })}
      </div>

      <div className="w-full overflow-hidden">
        <div className="w-[300%] min-[400]:w-[200%] min-[750]:w-full py-5 mt-20">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            speed={5000} // how fast the content glides
            freeMode={{
              enabled: true,
              momentum: false,
            }}
            spaceBetween={20}
            slidesPerView={1} // 👈 base: mobile first
            breakpoints={{
              400: { slidesPerView: 1 },
              1400: { slidesPerView: 2 },
            }}
            autoplay={{
              delay: 0, // <- no pause between animations
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            allowTouchMove={false}
          >
            {[1, 2, 3, 4].map((campaign, index) => (
              <SwiperSlide key={index}>
                <div className="">
                  <h1 className="text-[3rem]">
                    Over <span className="font-bold">500+</span> Funded NGOs
                  </h1>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default WhyUs;
