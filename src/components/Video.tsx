"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// --------------- [  ]
gsap.registerPlugin(ScrollTrigger);

function Video() {
  const ref_container = useRef<HTMLDivElement | null>(null);
  const ref_video = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const gsap_video = gsap.context((context) => {});
    gsap_video.add("init_animation", () => {
      // console.log("====================================");
      // console.log(ref_container.current);
      // console.log(ref_video.current);
      // console.log("====================================");

      gsap.to(ref_video.current, {
        width: "100%",
        // x: 100,
        // duration: 1,

        scrollTrigger: {
          id: `ref_video`,
          trigger: ref_container.current,
          start: "clamp(top top+=50%)",
          endTrigger: ref_container.current,
          end: "clamp(bottom bottom-=10%)",
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
    <div
      ref={ref_container}
      className="sm:w-[90%] lg:w-[80%] px-5 sm:px-0 mx-auto mt-[5rem]"
    >
      <div
        ref={ref_video}
        id="gradient-border"
        className="rounded-lg m-auto w-[90%] lg:w-[90%] sticky top-0"
      >
        <div className="rounded-lg bg-[#fcfcfc] p-2 md:p-5">
          <div className="w-full bg-gray-100">
            <video
              autoPlay
              muted
              loop
              controls
              playsInline
              className="w-full h-full rounded-md"
            >
              <source src="/video/u4c_FIN.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
