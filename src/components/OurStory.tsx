"use client";

import Image from "next/image";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { FaCircleCheck } from "react-icons/fa6";

function FundProject({ description = "" }: { description: string }) {
  const ref_container = useRef<HTMLDivElement | null>(null);
  const ref_slide_in = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const gsap_video = gsap.context((context) => {});
    gsap_video.add("init_animation", () => {
      console.log("====================================");
      console.log(ref_container.current);
      console.log(ref_slide_in.current);
      console.log("====================================");

      gsap.to(ref_slide_in.current, {
        width: "100%",
        // x: 0,
        // duration: 1,

        scrollTrigger: {
          id: `ref_video`,
          trigger: ref_container.current,
          start: "clamp(top top+=100%)",
          endTrigger: ref_container.current,
          end: "clamp(bottom bottom-=50%)",
          scrub: 1,
          // markers: true,
        },
      });
    });

    gsap_video.init_animation();

    return () => {
      gsap_video.revert();
    };
  }, []);

  return (
    <div ref={ref_container} className="relative p-5 sm:p-10 lg:p-20 mt-[5rem]">
      <div
        ref={ref_slide_in}
        className="absolute top-0 left-0 w-[20%] h-full bg-[#F2F8F9]"
      ></div>

      <div className="relative z-[1]">
        <h1 className="font-semibold text-center text-3xl mb-3">Ngo Details</h1>

        <div className="w-full flex flex-col min-[900]:grid grid-cols-2 gap-7 lg:gap-14 min-[700]:px-20 min-[900]:px-0 xl:px-30 mt-[5rem]">
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold my-5">
              Our <span id="gradient-txt">Story</span>
            </h1>
            <p>{description}</p>
          </div>

          <div className="bg-white rounded-lg border-2 border-gray-400/10 p-5 lg:p-10">
            <h1 className="text-3xl font-bold my-5">
              Compliance & Verification
            </h1>

            <div className="flex flex-col gap-5 mt-5 pl-5">
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center">
                  <FaCircleCheck className="text-[1.8rem] text-[#33b2ba]" />
                </div>
                <p>NGO Registration Certificate</p>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center">
                  <FaCircleCheck className="text-[1.8rem] text-[#33b2ba]" />
                </div>
                <p>Identity Verification</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FundProject;
