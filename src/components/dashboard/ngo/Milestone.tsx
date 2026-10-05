"use client";

import {
  format_currency,
  get_percentage,
  get_percentage_in_total,
  get_percentage_of_second,
} from "@/components/utilities/utils";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

function Milestone({
  project_id,
  milestone,
  campaign,
  redirect = true,
  link,
}: {
  redirect?: boolean;
  project_id: any;
  milestone: any;
  link: string;
  campaign: {
    goal: number;
    deployed: boolean;
    percentage: number;
    refundable: boolean;
    funded_amount: number;
    milestone_goal: number;
  };
}) {
  const { organization } = useSelector((state: RootState) => state.user);

  const deployed = campaign.deployed;
  const goal = Number(milestone?.new_goal || 0);
  const funded_amount = campaign.funded_amount - milestone?.milestone_count;
  const surplus_ = deployed === false ? 0 : Number(milestone?.surplus || 0);
  const remaining_percentage = get_percentage_in_total(
    Number(funded_amount < 0 ? 0 : funded_amount),
    Number(goal),
  );
  const total_suplus = get_percentage(
    Number(milestone?.surplus || 0),
    milestone?.milestone_goal,
  );
  const surplus =
    surplus_ === 0
      ? 0
      : get_percentage(milestone?.new_percentage, total_suplus);

  const REMAINING_PERCENTAGE =
    remaining_percentage > 100 ? 100 : remaining_percentage;
  const OWING_PERCENTAGE = 100 - REMAINING_PERCENTAGE;

  // console.log("\n\n\n====================================");
  // console.log("milestones");
  // console.log("milestone: ", milestone);
  // console.log("surplus: ", surplus);
  // console.log(
  //   "surplus: ",
  //   get_percentage(Number(milestone?.surplus || 0), milestone?.milestone_goal),
  // );
  // console.log("goal: ", goal);
  // console.log("surplus: ", surplus);
  // console.log(REMAINING_PERCENTAGE);
  // console.log(OWING_PERCENTAGE);
  // console.log(milestone);
  // console.log(campaign);
  // console.log("====================================\n\n\n");

  return (
    <>
      <Link
        href={
          redirect
            ? `${link}?id=${milestone?.id}&project_id=${project_id}&campaign_percentage=${REMAINING_PERCENTAGE}&surplus=${surplus}&deployed=${campaign.deployed}`
            : "#"
        }
        className="w-full"
      >
        <div
          className={`relative w-full bg-white text-black rounded-4xl shadow-md p-5 ${
            (milestone?.withdrawn === true ||
              (campaign.percentage >= goal && campaign.refundable === false)) &&
            "pt-"
          }`}
        >
          <div className="absolute top-4 right-4">
            {organization === true && (
              <>
                {milestone?.withdrawn === true ? (
                  <span className="text-[0.7rem] font-semibold rounded-full bg-amber-100 border border-amber-300 px-3 py-[0.3rem] text-black">
                    Withdrawn
                  </span>
                ) : (
                  campaign.percentage >= goal &&
                  campaign.refundable === false && (
                    <span className="text-[0.7rem] font-semibold rounded-full bg-green-100 border border-green-300 px-3 py-[0.3rem] text-black">
                      Available
                    </span>
                  )
                )}
              </>
            )}
          </div>

          <div className="flex items-center justify-center gap-2">
            <Image
              src={"/icons/usdc-logo.png"}
              alt=""
              className=""
              width={30}
              height={30}
            />
            <h1 className="font-semibold text-center text-3xl">
              {surplus != 0 ? (
                <span className="font-bold text-[#33b2ba]">
                  {format_currency(surplus + goal)}
                </span>
              ) : (
                <span className="font-bold">{format_currency(goal)}</span>
              )}
            </h1>
          </div>

          <h1 className="text-center font-semibold text-[0.9rem] text-black">
            {milestone?.title?.toUpperCase()}
          </h1>

          <p className="text-center text-[0.9rem] font-normal line-clamp-2 text-black h-11 mt-5">
            {milestone?.details || ""}
          </p>

          <div className="mt-5">
            <div className="flex justify-between items-center gap-3">
              <div className="">
                <h1 className="text-[1.0rem] font-bold">
                  {campaign.deployed === false
                    ? 0
                    : get_percentage(REMAINING_PERCENTAGE, goal)}{" "}
                  USDC
                </h1>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#109099]"></div>
                  <p className="text-sm">
                    <span className="text-[#33b2ba]">
                      {campaign.deployed === false ? 0 : REMAINING_PERCENTAGE}%
                    </span>{" "}
                    Completed
                  </p>
                </div>
              </div>

              <div className="w-px h-6 bg-gray-300 mx-5"></div>

              <div className="">
                <h1 className="text-[1.0rem] font-bold">
                  {campaign.deployed === false
                    ? goal
                    : get_percentage(OWING_PERCENTAGE, goal)}{" "}
                  USDC
                </h1>

                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#ff0505]"></div>
                  <p className="text-sm">
                    <span className="text-[#ff0505]">
                      {campaign.deployed === false ? 100 : OWING_PERCENTAGE}%
                    </span>{" "}
                    Remaining
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Milestone;
