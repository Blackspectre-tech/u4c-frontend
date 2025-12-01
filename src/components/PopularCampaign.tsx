"use client";

import React, { useEffect, useRef } from "react";
import Campaign from "./Campaign";
import gsap from "gsap";
import { useGetPopularCampaignQuery } from "@/redux/api/main";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import {
  HiOutlineArrowLongLeft,
  HiOutlineArrowLongRight,
} from "react-icons/hi2";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

function PopularCampaign() {
  const ref_container = useRef<HTMLDivElement | null>(null);
  const ref_campaign = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<any>(null);
  const { isLoading, data, refetch, error } = useGetPopularCampaignQuery({
    params: {},
  });

  useEffect(() => {
    const gsap_video = gsap.context((context) => {});
    gsap_video.add("init_animation", () => {
      // console.log("====================================");
      // console.log(ref_container.current);
      // console.log(ref_campaign.current);
      // console.log("====================================");

      gsap.to(ref_campaign.current, {
        // width: "100%",
        x: 0,
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

  console.log("============== [  ] ================");
  console.log(data);
  console.log(swiperRef);
  console.log("====================================");

  return (
    <div ref={ref_container} className="px-5 mt-[10rem]">
      <h1 className="font-semibold text-center text-3xl mb-3">
        Active verified campaigns
      </h1>

      <p className="max-w-[40rem] text-lg text-center mx-auto">
        All campaigns on U4C are verified, milestone-based, and transparently
        tracked on the blockchain.
      </p>

      <div className="w-full mt-[5rem]">
        <div className="flex justify-between gap-[3rem] text-black mb-10 px-5 xl:px-10">
          <button
            onClick={() => {
              if (!swiperRef.current) return;
              swiperRef.current.slidePrev();

              console.log("====================================");
              console.log(swiperRef);
              console.log("====================================");
            }}
            className="button_border_ min-w-[3.5rem] min-h-[3.5rem] lg:min-w-[4rem] lg:min-h-[4rem] rounded-full flex justify-center items-center text-[2.0rem] cursor-pointer"
          >
            <MdOutlineKeyboardArrowLeft />
          </button>

          <button
            onClick={() => {
              const s = swiperRef.current;
              s.slideNext();

              console.log("====================================");
              console.log(swiperRef);
              console.log("====================================");
            }}
            className="button_border_ min-w-[3.5rem] min-h-[3.5rem] lg:min-w-[4rem] lg:min-h-[4rem] rounded-full flex justify-center items-center text-[2.0rem] cursor-pointer"
          >
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          speed={500} // how fast the content glides
          spaceBetween={20}
          slidesPerView={1} // 👈 base: mobile first
        >
          {[1, 2, 3, 4].map((campaign, index) => (
            <SwiperSlide key={index}>
              <Swiper
                modules={[Autoplay]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                loop={true}
                speed={5000} // how fast the content glides
                freeMode={{
                  enabled: true,
                  momentum: false,
                }}
                spaceBetween={20}
                slidesPerView={1} // 👈 base: mobile first
                autoplay={{
                  delay: 0, // <- no pause between animations
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                }}
                breakpoints={{
                  400: { slidesPerView: 1 },
                  750: { slidesPerView: 2 },
                  1300: { slidesPerView: 3 },
                }}
                allowTouchMove={false}
              >
                {isLoading
                  ? [1, 2, 3, 4].map((campaign, index) => (
                      <SwiperSlide key={index}>
                        <div className="scroll_effect_child">
                          <Campaign loading={true} status={""} deadline={""} />
                        </div>
                      </SwiperSlide>
                    ))
                  : data?.results.map((campaign: any, index: number) => (
                      <SwiperSlide key={index}>
                        <Campaign
                          donate={true}
                          loading={false}
                          deadline={campaign?.deadline}
                          status={campaign?.status}
                          image={campaign?.image || ""}
                          title={campaign?.title || ""}
                          description={campaign?.description || ""}
                          progress={campaign?.progress || ""}
                          path={
                            campaign?.id ? `/campaign?id=${campaign?.id}` : "#"
                          }
                          date={campaign?.created_at || null}
                        />
                      </SwiperSlide>
                    ))}
              </Swiper>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default PopularCampaign;
