"use client";

import { RootState } from "@/redux/store";
import Link from "next/link";
import React from "react";
import { FaImages } from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import { TbPercentage25 } from "react-icons/tb";
import { useSelector } from "react-redux";

function Milestone({
  project_id,
  milestones,
  link,
  project_percentage,
}: {
  project_id: any;
  milestones: any;
  link: string;
  project_percentage: number;
}) {
  const { organization } = useSelector((state: RootState) => state.user);

  // console.log("====================================");
  // console.log(milestones);
  // console.log("====================================");

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-5">
        {milestones?.map((milestone: any, index: number) => (
          <Link
            href={`${link}?id=${milestone?.id}&project_id=${project_id}`}
            key={index}
            className="bg-[#812880] text-white rounded-lg border border-black/5 sm:min-w-[25rem] p-5"
          >
            <div className="">
              <h1 className="font-semibold text-center text-2xl">
                <span className="font-bold">
                  {Number(milestone?.goal || 0)}
                </span>{" "}
                USDT
              </h1>

              <p className="text-center font-semibold text-[0.9rem] text-white">
                {milestone?.title}

                {organization === true && (
                  <>
                    {milestone?.withdrawn === true
                      ? ": "
                      : project_percentage >= 100 && ": "}

                    {milestone?.withdrawn === true ? (
                      <span className="text-[0.7rem] font-semibold rounded-sm bg-green-100 border border-green-300 px-2 pt-[0.1rem] pb-[0.2rem] text-black">
                        Withdrawn
                      </span>
                    ) : (
                      project_percentage >= 100 && (
                        <span className="text-[0.7rem] font-semibold rounded-sm bg-amber-100 border border-amber-300 px-2 pt-[0.1rem] pb-[0.2rem] text-black">
                          Un-Withdrawn
                        </span>
                      )
                    )}
                  </>
                )}
              </p>

              <div className="w-[50%] h-[1px] bg-white/60 mx-auto mb-5 mt-3"></div>

              <div className="mt-5">
                <div className="flex flex-wrap justify-between items-center">
                  <p className="flex items-center gap-1">
                    <TbPercentage25 />

                    <span className="font-bold">
                      {Number(milestone?.percentage)}%
                    </span>
                  </p>

                  <div className="flex justify-center items-center gap-3">
                    <div className="flex justify-center items-center gap-2">
                      <FaImages className="text-[1.0rem]" />
                      <p>{milestone?.images?.length}</p>
                    </div>

                    <div className="w-[1px] h-3 bg-white/50"></div>

                    <div className="flex justify-center items-center gap-2">
                      <IoDocumentsSharp className="text-[1.0rem]" />
                      <p>{milestone?.expenses?.length}</p>
                    </div>
                  </div>
                </div>

                {/* <div className="w-full h-[0.8rem] bg-[#33b2ba]/10 overflow-hidden rounded-full mt-5">
                  <div
                    style={{ width: `${Number(milestone?.percentage) || 0}%` }}
                    className={`h-full rounded-full bg-gradient-to-r from-[#eb2027] from-60% to-[#f4901e]`}
                  ></div>
                </div> */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Milestone;
