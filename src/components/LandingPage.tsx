import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsBank2 } from "react-icons/bs";

function Hero({
  heading,
  heading_styled,
  paragraph = "",
  button = false,
}: {
  heading: string;
  heading_styled: string;
  paragraph?: string;
  button?: boolean;
}) {
  return (
    <div className="bg-white min-h-[20vh] relative overflow-hidden">
      <div className="absolute top-0 left-0 overflow-hidden w-full h-full flex items-center justify-center bg-white">
        <div className="relative w-full h-full mx-auto">
          <Image
            src={"/background/bg-0.jpg"}
            alt=""
            className="hidden lg:block w-full h-full object-cover object-top"
            fill
          />
          <Image
            src={"/background/bg-1.png"}
            alt=""
            className="lg:hidden w-full h-full object-cover object-top"
            fill
          />
        </div>
      </div>

      <div className="gradient-radial-1 absolute top-0 left-[50%] w-[180%] h-[80%] flex items-center justify-center translate-x-[-50%] bg-black">
        <div className="gradient-radial-2 w-[60%] h-full translate-y-[35%]"></div>
      </div>
      <div className="gradient-radial-1 absolute top-0 left-[50%] w-[180%] h-full opacity-50 flex items-center justify-center translate-x-[-50%] bg-black"></div>

      <div className="relative w-full h-full z-10">
        <div className="gradient-linier-1 absolute top-0 left-0 w-full h-[10rem]"></div>
        <div className="gradient-linier-2 absolute bottom-0 left-0 w-full h-[60%]"></div>

        <div className="w-full flex flex-col items-center relative z-10 px-5 md:px-10 pt-[35vh] md:pt-[45vh]">
          <h1 className="heading_ font-bold text-center">
            {heading} {heading_styled}
            {/* <span id="gradient-txt">{heading_styled}</span> */}
          </h1>
          {paragraph.length > 0 && (
            <p className="sm:w-[80%] lg:w-[70%] text-center mt-5">
              {paragraph}
            </p>
          )}

          {button === true && (
            <>
              <div className="flex flex-wrap items-center justify-center gap-5 md:gap-10 mt-8">
                <Link className="rounded-xl" href={"/sign-up"}>
                  <button className="gradient-cto-border border border-transparent font-bold rounded-xl cursor-pointer px-10 py-[1.0rem] md:py-[1.1rem]">
                    Get Started
                  </button>
                </Link>

                <Link href={"/explore"}>
                  <button className="gradient-cto font-bold rounded-xl cursor-pointer text-md px-10 py-[1.0rem] md:py-[1.1rem]">
                    Support a cause
                  </button>
                </Link>
              </div>

              <div className="h-px w-[30%] bg-linear-to-r from-transparent via-black to-transparent my-8"></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;
