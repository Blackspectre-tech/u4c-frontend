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

  // Inside your component, before the return
  const slides = data?.results || [];
  // If you have 4 slides and view 3, you need at least 6-8 for a smooth loop
  const loopData =
    slides.length > 0 && slides.length < 6 ? [...slides, ...slides] : slides;

  // console.log("============== [  ] ================");
  // console.log("============== [  ] ================");
  // console.log("============== [  ] ================");
  // console.log("============== [  ] ================");
  // console.log(data);
  // console.log(swiperRef);
  // console.log(swiperRef.current?.activeIndex);
  // console.log("====================================");

  return (
    <div ref={ref_container} className="relative px-5 py-10 mt-40">
      <div className="absolute top-0 left-[50%] w-[90%] lg:w-[70%] h-full translate-x-[-50%] bg-primary/15 rounded-4xl"></div>

      <div className="relative z-20">
        <h1 className="font-semibold capitalize text-center text-3xl mb-3">
          Active Verified Campaigns
        </h1>

        <p className="max-w-160 text-center text-gray-700 mx-auto">
          Projects verified by our compliance and partner network.
        </p>
      </div>

      <div className="Popular-Campaign w-full mt-14">
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          pagination={{
            clickable: true,
            dynamicBullets: true, // Optional: dots change size dynamically
          }}
          key={data?.results?.length || 0}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          speed={500}
          centeredSlides={true}
          loop={true}
          observer={true} // 👈 Add this
          observeParents={true} // 👈 Add this
          breakpoints={{
            400: { slidesPerView: 1 },
            750: { slidesPerView: 2 },
            1300: { slidesPerView: 3 },
          }}
        >
          {isLoading
            ? [1, 2, 3, 4].map((campaign, index) => (
                <SwiperSlide key={index}>
                  <div className="scroll_effect_child py-10 px-3">
                    <Campaign loading={true} status={""} deadline={""} />
                  </div>
                </SwiperSlide>
              ))
            : loopData.map((campaign: any, index: number) => (
                <SwiperSlide key={index}>
                  <div className={`px-1 py-10 lg:px-3`}>
                    <Campaign
                      donate={true}
                      loading={false}
                      deadline={campaign?.deadline}
                      status={campaign?.status}
                      image={campaign?.image || ""}
                      title={campaign?.title || ""}
                      description={campaign?.description || ""}
                      progress={campaign?.progress || ""}
                      path={campaign?.id ? `/campaign?id=${campaign?.id}` : "#"}
                      date={campaign?.created_at || null}
                      sadaqah={campaign?.sadaqah === true}
                    />
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>

        {/* CUSTOM DOTS CONTAINER */}
        <div className="swiper-pagination-custom flex justify-center mt-6"></div>
      </div>
    </div>
  );
}

export default PopularCampaign;
