"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

function Reviews({ comments }: { comments: any }) {
  const swiperRef = useRef<any>(null);
  // console.log("====================================");
  // console.log(comments);
  // console.log("====================================");

  return (
    <>
      {comments?.length > 0 && (
        <div className="px-5 py-10 bg-[#F2F8F9] mt-20">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".popular-prev",
              nextEl: ".popular-next",
            }}
            loop={true}
            spaceBetween={10}
            slidesPerView={1} // 👈 base: mobile first
            breakpoints={{
              900: { slidesPerView: 2 }, // ≥900px → 2 slides
              1100: { slidesPerView: 3 }, // ≥1100px → 3 slides
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {comments?.map((comment: any, index: number) => (
              <SwiperSlide key={index}>
                <div className="relative bg-white rounded-md p-5">
                  <FaQuoteLeft className="text-[2rem]" />
                  <p className="my-5">{comment?.details}</p>

                  <div className="flex justify-between items-center gap-3">
                    <h1 className="font-semibold text-xl capitalize">
                      {comment?.username}
                    </h1>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
}

export default Reviews;
