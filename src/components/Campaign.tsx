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
  MdTimer,
} from "react-icons/md";
import {
  format_date,
  get_time_expiry,
  response_message,
} from "./utilities/utils";
import { TbPercentage25 } from "react-icons/tb";

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
    <div className={`rounded-md`}>
      {openDelete === true && (
        <div className="fixed top-0 left-0 z-10 w-full h-full bg-gray-800/10 flex justify-center items-center">
          <div className="bg-white w-[25rem] rounded-lg p-5">
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
          <div className="h-[15rem] relative bg-gray-100 rounded-t-md overflow-hidden">
            <Image
              src={image}
              alt=""
              className="w-full h-full object-cover"
              fill
            />

            {donate === false && isApproved === false && (
              <div className="absolute top-[1rem] right-[1rem]">
                <div
                  onClick={() => setOpen((prev) => !prev)}
                  className="px-3 rounded-[4px] bg-white/90 cursor-pointer"
                >
                  <MdMoreHoriz className="text-[1.5rem]" />
                </div>

                {open === true && (
                  <div className="relative mt-2">
                    <div className="absolute right-0 top-0 w-[6.5rem] rounded-md overflow-hidden flex items-center justify-between bg-[#f3f3f3] border-r-2 border-[#0000000a]/50 p-2">
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
                  </div>
                )}
              </div>
            )}

            {donate === true && (
              <div className="absolute top-0 left-0 w-full h-full flex items-end bg-gradient-to-t from-[#11111192] to-transparent to-60% rounded-lg text-white"></div>
            )}
          </div>

          <div className="border-x-2 border-b-2 border-[#6b6b6b]/15 rounded-b-md p-5">
            <div className="flex justify-between items-center gap-5">
              <div className="flex items-center">
                <div className="w-6 h-6 flex items-center">
                  <MdDateRange className="text-[1.3rem]" />
                </div>
                <p className="text-sm">
                  {format_date(date === null ? new Date() : new Date(date))}
                </p>
              </div>

              {donate === true ? (
                status === "Failed" ? (
                  <p className="px-5 py-1 text-sm bg-[#ba3333]/10 text-[#721e1e] border-1 border-[#ba3333]/15 rounded-lg">
                    Failed
                  </p>
                ) : status === "Completed" ? (
                  <p className="px-5 py-1 text-sm bg-[#319b29]/10 text-[#174714] border-1 border-[#319b29]/15 rounded-lg">
                    {status}
                  </p>
                ) : get_time_expiry(deadline) === "0" ? (
                  <p className="px-5 py-1 text-sm bg-[#33b2ba]/10 text-[#144447] border-1 border-[#33b2ba]/15 rounded-lg">
                    Finalizing
                  </p>
                ) : (
                  <p className="px-5 py-1 text-sm bg-[#33b2ba]/10 text-[#144447] border-1 border-[#33b2ba]/15 rounded-lg">
                    Ongoing
                  </p>
                )
              ) : (
                <>
                  {deployed === true ? (
                    <>
                      {status === "Failed" ? (
                        <p className="px-5 py-1 text-sm bg-[#ba3333]/10 text-[#721e1e] border-1 border-[#ba3333]/15 rounded-lg">
                          Failed
                        </p>
                      ) : status === "Completed" ? (
                        <p className="px-5 py-1 text-sm bg-[#319b29]/10 text-[#174714] border-1 border-[#319b29]/15 rounded-lg">
                          {status}
                        </p>
                      ) : get_time_expiry(deadline) === "0" ? (
                        <p className="px-5 py-1 text-sm bg-[#33b2ba]/10 text-[#144447] border-1 border-[#33b2ba]/15 rounded-lg">
                          Finalizing
                        </p>
                      ) : (
                        <p className="px-5 py-1 text-sm bg-[#293a9b]/10 text-[#18225a] border-1 border-[#293a9b]/15 rounded-lg">
                          Published
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      {approved === true ? (
                        <p className="px-5 py-1 text-sm bg-[#ffb900]/20 text-[#866200] border-1 border-[#af8000]/15 rounded-lg">
                          Approved
                        </p>
                      ) : (
                        <p className="px-5 py-1 text-sm bg-[#33b2ba]/10 text-[#144447] border-1 border-[#33b2ba]/15 rounded-lg">
                          {"Pending"}
                        </p>
                      )}
                    </>
                  )}
                </>
              )}
            </div>

            <p className="line-clamp-2 my-5 min-h-[3.3rem]">
              <span className="font-bold capitalize">
                {title && `${title}: `}
              </span>
              {description}
            </p>

            <div className="flex items-center justify-between mt-7">
              <div className="flex items-center gap-1">
                <TbPercentage25 className="text-[1.5rem]" />
                <p className="flex items-center gap-2">{Number(progress)}%</p>
              </div>

              <div className="flex items-center gap-1">
                <MdTimer className="text-[1.5rem]" />
                <p className="flex items-center gap-2">
                  {get_time_expiry(deadline)}
                </p>
              </div>
            </div>

            <div className="w-full h-[0.8rem] bg-[#33b2ba]/10 overflow-hidden rounded-full my-5">
              <div
                style={{ width: `${Number(progress) || 0}%` }}
                className={`h-full rounded-full bg-gradient-to-r from-[#eb2027] from-60% to-[#f4901e]`}
              ></div>
            </div>

            <Link href={path}>
              <div className="button_border_ w-full rounded-lg">
                <p className="bg-[#fcfcfc] hover:bg-gray-100 w-full flex justify-center items-center font-bold rounded-lg py-3">
                  View More
                </p>
              </div>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="relative">
            <div className="h-[15rem] relative bg-gray-100 rounded-md loading_ [--delay:0.5s]"></div>

            <div className="flex flex-col relative gap-3 mt-5 p-5">
              <div className="h-[2.5rem] relative bg-gray-100 rounded-md loading_ [--delay:0.6s]"></div>
              <div className="h-[5rem] relative bg-gray-100 rounded-md loading_ [--delay:0.4s]"></div>
              {donate === true && (
                <div className="h-[2.5rem] relative bg-gray-100 rounded-md loading_ [--delay:0.5s]"></div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Campaign;
