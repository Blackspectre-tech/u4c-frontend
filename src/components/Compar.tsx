"use client";

import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

function Compar({ title = false }: { title?: boolean }) {
  return (
    <div className="relative mx-auto xl:w-[90%] p-5 sm:px-20 mt-20">
      <div className="flex flex-col justify-center">
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="font-semibold text-center text-3xl">
            A Better Model for Global Giving
          </h1>

          <p>Built for transparency, accountability, and impact</p>
        </div>
      </div>

      <div className="xl:px-30 mt-20">
        <div className="bg-[#298e95] rounded-2xl pb-5 p-3 lg:p-5">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 bg-white rounded-2xl p-5">
            <h1 className="hidden lg:block text-xl md:text-2xl">Feature</h1>

            <Image
              src={"/icons/u4c-logo.svg"}
              className=""
              alt=""
              width={30}
              height={30}
            />

            <h1 className="text-xl md:text-2xl">Traditional platforms</h1>
          </div>

          <div className="grid grid-cols-12 gap-5 text-white bg-[#2a949c] lg:bg-transparent p-3 lg:p-0 rounded-xl mt-5">
            <div className="col-span-12 lg:col-span-4 bg-white/20 lg:bg-transparent rounded-xl py-3 pl-5">
              <h2>Transparency</h2>
            </div>

            <div className="col-span-6 lg:col-span-4 flex items-center gap-3 lg:gap-5 pl-5">
              <div className="min-w-7 min-h-7 bg-white/80 rounded-full flex items-center justify-center">
                <FaCheck className="text-green-700 text-[0.9rem]" />
              </div>
              <h2>Real-time tracking</h2>
            </div>

            <div className="col-span-6 lg:col-span-4 flex items-center gap-3 lg:gap-5 pl-5">
              <div className="min-w-7 min-h-7 bg-white/80 rounded-full flex items-center justify-center">
                <FaX className="text-red-700 text-[0.9rem]" />
              </div>
              <h2>Limited reporting</h2>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-5 text-white bg-[#2a949c] lg:bg-transparent p-3 lg:p-0 rounded-xl mt-5">
            <div className="col-span-12 lg:col-span-4 bg-white/20 lg:bg-transparent rounded-xl py-3 pl-5">
              <h2>Fund Release</h2>
            </div>

            <div className="col-span-6 lg:col-span-4 flex items-center gap-3 lg:gap-5 pl-5">
              <div className="min-w-7 min-h-7 bg-white/80 rounded-full flex items-center justify-center">
                <FaCheck className="text-green-700 text-[0.9rem]" />
              </div>
              <h2>Milestone-based</h2>
            </div>

            <div className="col-span-6 lg:col-span-4 flex items-center gap-3 lg:gap-5 pl-5">
              <div className="min-w-7 min-h-7 bg-white/80 rounded-full flex items-center justify-center">
                <FaX className="text-red-700 text-[0.9rem]" />
              </div>
              <h2>Lump-sum transfers</h2>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-5 text-white bg-[#2a949c] lg:bg-transparent p-3 lg:p-0 rounded-xl mt-5">
            <div className="col-span-12 lg:col-span-4 bg-white/20 lg:bg-transparent rounded-xl py-3 pl-5">
              <h2>Donor Visibility</h2>
            </div>

            <div className="col-span-6 lg:col-span-4 flex items-center gap-3 lg:gap-5 pl-5">
              <div className="min-w-7 min-h-7 bg-white/80 rounded-full flex items-center justify-center">
                <FaCheck className="text-green-700 text-[0.9rem]" />
              </div>
              <h2>Track project impact</h2>
            </div>

            <div className="col-span-6 lg:col-span-4 flex items-center gap-3 lg:gap-5 pl-5">
              <div className="min-w-7 min-h-7 bg-white/80 rounded-full flex items-center justify-center">
                <FaX className="text-red-700 text-[0.9rem]" />
              </div>
              <h2>Minimal updates</h2>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-5 text-white bg-[#2a949c] lg:bg-transparent p-3 lg:p-0 rounded-xl mt-5">
            <div className="col-span-12 lg:col-span-4 bg-white/20 lg:bg-transparent rounded-xl py-3 pl-5">
              <h2>Accountability</h2>
            </div>

            <div className="col-span-6 lg:col-span-4 flex items-center gap-3 lg:gap-5 pl-5">
              <div className="min-w-7 min-h-7 bg-white/80 rounded-full flex items-center justify-center">
                <FaCheck className="text-green-700 text-[0.9rem]" />
              </div>
              <h2>Smart contract rules</h2>
            </div>

            <div className="col-span-6 lg:col-span-4 flex items-center gap-3 lg:gap-5 pl-5">
              <div className="min-w-7 min-h-7 bg-white/80 rounded-full flex items-center justify-center">
                <FaX className="text-red-700 text-[0.9rem]" />
              </div>
              <h2>Trust-based</h2>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-5 text-white bg-[#2a949c] lg:bg-transparent p-3 lg:p-0 rounded-xl mt-5">
            <div className="col-span-12 lg:col-span-4 bg-white/20 lg:bg-transparent rounded-xl py-3 pl-5">
              <h2>Fees</h2>
            </div>

            <div className="col-span-6 lg:col-span-4 flex items-center gap-3 lg:gap-5 pl-5">
              <div className="min-w-7 min-h-7 bg-white/80 rounded-full flex items-center justify-center">
                <FaCheck className="text-green-700 text-[0.9rem]" />
              </div>
              <h2>0% platform fees (USDC)</h2>
            </div>

            <div className="col-span-6 lg:col-span-4 flex items-center gap-3 lg:gap-5 pl-5">
              <div className="min-w-7 min-h-7 bg-white/80 rounded-full flex items-center justify-center">
                <FaX className="text-red-700 text-[0.9rem]" />
              </div>
              <h2>3-5% + hidden costs</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Compar;
