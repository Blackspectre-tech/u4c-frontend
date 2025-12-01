import Link from "next/link";
import React from "react";

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
    <div className="flex flex-col items-center mt-[10rem] px-5 md:px-10">
      {button === true && (
        <div className="bg-gray-100 flex items-center gap-3 mb-2 md:mb-5 px-7 py-4 rounded-lg">
          <div className="min-w-7 min-h-7 w-7 h-7">
            <div className="ripple">
              <div className="ripple-circle"></div>
              <div className="ripple-circle"></div>
              <div className="ripple-circle"></div>
            </div>
          </div>

          <h1 className="font-semibold text-[1rem] md:text-lg">
            {1312} Active Campaigns
          </h1>
        </div>
      )}

      <h1 className="heading_ font-bold text-center">
        {heading}
        <span id="gradient-txt">{heading_styled}</span>
      </h1>
      {paragraph.length > 0 && (
        <p className="sm:w-[80%] lg:w-[60%] xl:w-[50%] text-center mt-5">
          {paragraph}
        </p>
      )}

      {button === true && (
        <div className="flex flex-wrap items-center justify-center gap-5 md:gap-10 mt-8">
          <Link className="rounded-xl" href={"/sign-up/ngo"}>
            <button className="button_border_ font-bold rounded-xl cursor-pointer text-md px-10 py-[1.0rem] md:py-[1.1rem]">
              Register a NGO
            </button>
          </Link>

          <Link href={"/explore"}>
            <button
              id="gradient-button"
              className="font-bold rounded-xl cursor-pointer text-md px-10 py-[1.0rem] md:py-[1.1rem]"
            >
              Support a cause
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Hero;
