"use client";

import { useDeleteCampaignMutation } from "@/redux/api/main";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import {
  MdDateRange,
  MdEditSquare,
  MdMoreHoriz,
  MdMoreVert,
  MdTimer,
} from "react-icons/md";
import {
  format_date,
  get_time_expiry,
  response_message,
} from "./utilities/utils";
import { TbPercentage25 } from "react-icons/tb";
import SadaqahBadge from "./SadaqahBadge";

function Campaign({
  donate = true,
  loading = false,
  refetch,
  id = "",
  status,
  image = "/background/bg-0.jpg",
  title = "",
  description = "",
  progress = "0",
  isApproved = false,
  date = null,
  path = "#",
  deployed = false,
  approved = false,
  sadaqah = false,
  deadline,
}: {
  donate?: boolean;
  loading?: boolean;

  //
  refetch?: () => {};
  id?: string;
  image?: string;
  title?: string;
  status: string;
  description?: string;
  progress?: string;
  isApproved?: boolean;
  date?: string | null;
  path?: string;
  deployed?: boolean;
  approved?: boolean;
  sadaqah?: boolean;
  deadline: string;
}) {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [Delete_Campaign, { isLoading }] = useDeleteCampaignMutation();

  const deleteCampaign = async () => {
    console.log("====================================");
    console.log(id);
    console.log("====================================");

    const result = await Delete_Campaign({ query: `/${id}/` });
    const is_message = result.error?.data?.errors;

    console.log(result);

    if ("error" in result) {
      response_message({
        message: is_message
          ? `${result.error?.data?.errors[0]?.detail} ${result.error?.data?.errors[0]?.attr}`
          : "Something went wrong?",
        option: "err",
      });

      return;
    }

    response_message({
      message: "Campaign has been deleted successfully",
      option: "scc",
    });

    refetch && refetch();
    setOpen((prev) => !prev);
    setOpenDelete((prev) => !prev);
  };

  // console.log("====================================");
  // console.log(Number(progress));
  // console.log("====================================");

  return (
    <div className={`rounded-lg shadow-lg border border-white bg-white`}>
      {openDelete === true && (
        <div className="fixed top-0 left-0 z-10 w-full h-full bg-gray-800/10 flex justify-center items-center">
          <div className="bg-white w-100 rounded-lg p-5">
            <div className="flex justify-end">
              <IoClose
                onClick={() => setOpenDelete((prev) => !prev)}
                className="text-[1.5rem] cursor-pointer"
              />
            </div>

            <p className="text-center mt-5">
              <span className="font-bold">
                Are you sure you want to delete this campaign?
              </span>
              This action cannot be undone.
            </p>

            <div className="flex justify-center mt-5">
              <button
                onClick={deleteCampaign}
                className="bg-red-100 border border-red-300/60 text-red-700 w-[80%] cursor-pointer rounded-lg flex items-center justify-center gap-2 py-2"
                disabled={isLoading}
              >
                {isLoading && (
                  <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
                )}{" "}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {loading === false ? (
        <>
          <div className="relative h-60 bg-gray-100 rounded-t-md overflow-hidden">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={image}
                alt=""
                className="w-full h-full object-cover object-center"
                fill
              />
            </div>

            <Image
              src={"/icons/icon-3.png"}
              alt=""
              width={70}
              height={70}
              className="absolute -bottom-1 left-[50%] w-[120%] translate-x-[-50%] h-20"
            />

            <div className="absolute top-0 left-0 w-full p-3">
              <div
                className={`bg-white/90 w-full flex items-center gap-5 rounded-xl p-3 ${donate === false && isApproved === false ? "justify-between" : "justify-center"}`}
              >
                <div className="flex items-center gap-2">
                  {donate === true ? (
                    status === "Failed" ? (
                      <p className="px-5 py-1 text-sm bg-[#ba3333] text-white rounded-lg">
                        Expired
                      </p>
                    ) : status === "Cancelled" ? (
                      <p className="px-5 py-1 text-sm bg-[#ba3333] text-white rounded-lg">
                        Cancelled
                      </p>
                    ) : status === "Completed" ? (
                      <p className="px-5 py-1 text-sm bg-[#319b29] text-white rounded-lg">
                        {status}
                      </p>
                    ) : get_time_expiry(deadline) === "0" ? (
                      <p className="px-5 py-1 text-sm bg-[#ac12a4] text-white rounded-lg">
                        Finalizing
                      </p>
                    ) : (
                      <p className="px-5 py-1 text-sm bg-[#33b2ba] text-white rounded-lg">
                        Ongoing
                      </p>
                    )
                  ) : (
                    <>
                      {deployed === true ? (
                        <>
                          {status === "Failed" ? (
                            <p className="px-5 py-1 text-sm bg-[#ba3333] text-white rounded-lg">
                              Expired
                            </p>
                          ) : status === "Cancelled" ? (
                            <p className="px-5 py-1 text-sm bg-[#ba3333] text-white rounded-lg">
                              Cancelled
                            </p>
                          ) : status === "Completed" ? (
                            <p className="px-5 py-1 text-sm bg-[#319b29] text-white rounded-lg">
                              {status}
                            </p>
                          ) : get_time_expiry(deadline) === "0" ? (
                            <p className="px-5 py-1 text-sm bg-[#ac12a4] text-white rounded-lg">
                              Finalizing
                            </p>
                          ) : (
                            <p className="px-5 py-1 text-sm bg-[#293a9b] text-white rounded-lg">
                              Published
                            </p>
                          )}
                        </>
                      ) : (
                        <>
                          {approved === true ? (
                            <p className="px-5 py-1 text-sm bg-[#d39b00] text-white rounded-lg">
                              Approved
                            </p>
                          ) : (
                            <p className="px-5 py-1 text-sm bg-[#33b2ba] text-white rounded-lg">
                              {"Pending"}
                            </p>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>

                {donate === false && isApproved === false && (
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      href={`/dashboard/campaign/edit?id=${id}`}
                      className="bg-gray-200 border border-gray-400/60 text-gray-950 text-[1.2rem] rounded-md cursor-pointer p-[0.60rem]"
                    >
                      <MdEditSquare />
                    </Link>

                    <div
                      onClick={() => setOpenDelete((prev) => !prev)}
                      className="bg-red-100 border border-red-300/60 text-red-700 text-[1.0rem] rounded-md cursor-pointer p-[0.7rem]"
                    >
                      <FaTrashAlt />
                    </div>
                  </div>
                )}

                <SadaqahBadge sadaqah={sadaqah} className="" />
              </div>
            </div>
          </div>

          <div className="rounded-b-lg bg-white px-5 pb-5 pt-3 translate-y-0.75">
            <h1 className="font-semibold capitalize text-[1.3rem] text-center line-clamp-2 h-16">
              {title && `${title}`}
            </h1>
            <p className="line-clamp-2 mt-5 mb-5 min-h-[3.3rem] text-center">
              {description}
            </p>

            <div className="flex items-center justify-between mt-5">
              <div className="flex items-center gap-1">
                <TbPercentage25 className="text-[1.5rem]" />
                <p className="flex items-center gap-2">{Number(progress)}%</p>
              </div>

              {
                <div
                  className={`flex items-center gap-1 ${status === "Completed" && "text-gray-300"}`}
                >
                  <MdTimer className="text-[1.5rem]" />
                  <p className={`flex items-center gap-2`}>
                    {get_time_expiry(deadline) === "0"
                      ? "Closed"
                      : `${get_time_expiry(deadline)} left`}
                  </p>
                </div>
              }
            </div>

            <div className="w-full h-[0.8rem] bg-[#33b2ba]/10 overflow-hidden rounded-full my-5">
              <div
                style={{ width: `${Number(progress) || 0}%` }}
                className={`h-full rounded-full bg-linear-to-r from-[#eb2027] from-60% to-[#f4901e]`}
              ></div>
            </div>

            <Link href={path}>
              <div className="gradient-cto-border border border-transparent w-full rounded-lg">
                <p className="hover:bg-gray-50 w-full flex justify-center items-center font-bold rounded-lg py-3">
                  View More
                </p>
              </div>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="relative">
            <div className="h-60 relative bg-gray-100 rounded-md loading_ [--delay:0.5s]"></div>

            <div className="flex flex-col relative gap-3 mt-5 p-5">
              <div className="h-10 relative bg-gray-100 rounded-md loading_ [--delay:0.6s]"></div>
              <div className="h-20 relative bg-gray-100 rounded-md loading_ [--delay:0.4s]"></div>
              {donate === true && (
                <div className="h-10 relative bg-gray-100 rounded-md loading_ [--delay:0.5s]"></div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Campaign;
