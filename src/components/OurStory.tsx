"use client";

import { FaCircleCheck, FaQuoteLeft } from "react-icons/fa6";
import { MdOutlineHourglassEmpty, MdVerifiedUser } from "react-icons/md";

const checks = ["NGO Registration Certificate", "Identity Verification"];

function OurStory({
  description = "",
  verified = false,
}: {
  description?: string;
  verified?: boolean;
}) {
  return (
    <div className="relative p-5 sm:p-10 lg:p-20 mt-20 bg-primary/13">
      <div className="relative z-1">
        <div className="w-full flex flex-col lg:grid lg:grid-cols-5 gap-7 lg:gap-14 xl:px-30">
          <div className="lg:col-span-3 flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              About us
            </p>
            <h1 className="text-4xl font-bold mt-2 mb-6">
              Our <span id="gradient-txt">Story</span>
            </h1>

            <div className="rounded-3xl bg-white/70 border border-white shadow-sm p-6 sm:p-8">
              <FaQuoteLeft className="text-[2rem] text-[#f4901e]/40 mb-4" />

              <p
                className={`text-lg leading-relaxed whitespace-pre-line ${description ? "text-gray-800" : "text-gray-400"}`}
              >
                {description ||
                  "This organization hasn't shared its story yet."}
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 self-center rounded-3xl bg-white border border-gray-200 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="gradient-cto-two w-12 h-12 min-w-12 rounded-2xl flex items-center justify-center">
                <MdVerifiedUser className="text-[1.5rem] text-white" />
              </div>

              <div>
                <h2 className="text-2xl font-bold leading-tight">
                  Compliance & Verification
                </h2>
                <p className="text-sm text-gray-500">
                  {verified ? "All checks completed" : "Verification pending"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              {checks.map((check) => (
                <div
                  key={check}
                  className={`flex items-center gap-4 rounded-2xl border p-4 ${
                    verified
                      ? "border-[#33b2ba]/25 bg-[#33b2ba]/5"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  {verified ? (
                    <FaCircleCheck className="text-[1.6rem] min-w-6 text-[#33b2ba]" />
                  ) : (
                    <MdOutlineHourglassEmpty className="text-[1.6rem] min-w-6 text-gray-400" />
                  )}

                  <div>
                    <p className="font-semibold">{check}</p>
                    <p className="text-sm text-gray-500">
                      {verified ? "Verified" : "Pending review"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurStory;
