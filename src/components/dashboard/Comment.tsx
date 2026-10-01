"use client";

import {
  useDeleteCampaignMutation,
  useDeleteCommentMutation,
} from "@/redux/api/main";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaQuoteLeft, FaTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdDateRange, MdEditSquare, MdMoreHoriz } from "react-icons/md";
import { format_date, response_message } from "../utilities/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function CommentComponent({
  id,
  link,
  date = null,
  index,
  heading,
  dashboard = true,
  loading,
  paragraph,
  editComment,
}: {
  id: string;
  date?: string | null;
  link: string;
  index: number;
  dashboard?: boolean;
  loading: boolean;
  heading: string;
  paragraph: string;
  editComment: (index: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const { organization } = useSelector((state: RootState) => state.user);
  const [Delete_Comment, { isLoading }] = useDeleteCommentMutation();

  const deleteComment = async () => {
    console.log("====================================");
    console.log(id);
    console.log("====================================");

    const result = await Delete_Comment({ query: `/${id}/` });
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
      message: "Comment has been deleted successfully",
      option: "scc",
    });

    editComment(index);
    setOpen((prev) => !prev);
    setOpenDelete((prev) => !prev);
  };

  // console.log("====================================");
  // console.log(Number(progress));
  // console.log("====================================");

  return (
    <div className="">
      {organization === false && openDelete === true && (
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
                Are you sure you want to delete this comment?
              </span>
              This action cannot be undone.
            </p>

            <div className="flex justify-center mt-5">
              <button
                onClick={deleteComment}
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

      <div
        className={`rounded-4xl shadow-md ${dashboard === true ? "border-gray-100" : "bg-white"}`}
      >
        {loading === false ? (
          <>
            <div className="relative rounded-md p-5">
              {dashboard === true && (
                <>
                  {organization === false && open === true && (
                    <div className="absolute top-0 left-0 rounded-4xl w-full h-full bg-black/5"></div>
                  )}

                  {organization === false && (
                    <div className="relative flex justify-end rounded-md">
                      <div
                        onClick={() => setOpen((prev) => !prev)}
                        className="border-3 border-[#fcfcfc] rounded-md cursor-pointer px-3"
                      >
                        <MdMoreHoriz className="text-[1.5rem]" />
                      </div>

                      {open === true && (
                        <div className="absolute right-0 top-0 translate-y-[calc(100%-0.5rem)] w-[6.6rem] rounded-md overflow-hidden flex items-center justify-between bg-[#ffffff] border-r-2 border-[#0000000a]/50 p-2">
                          <Link
                            href={link || "#"}
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
                    </div>
                  )}
                </>
              )}

              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-[#33b2ba] rounded-full flex justify-center items-center">
                  <FaQuoteLeft className="text-[2rem] text-white" />
                </div>

                <div className="">
                  <h1 className="font-semibold text-xl capitalize">
                    {heading}
                  </h1>
                  <div className="flex items-center">
                    <div className="w-6 h-6 flex items-center">
                      <MdDateRange className="text-[1.3rem] opacity-50" />
                    </div>
                    <p className="text-sm">
                      {format_date(
                        date === null ? new Date() : new Date(date as string),
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <p className="my-5">{paragraph}</p>
            </div>
          </>
        ) : (
          <>
            <div className="relative">
              <div className="h-[15rem] relative bg-gray-100 rounded-md loading_ [--delay:0.5s]"></div>

              <div className="flex flex-col relative gap-3 mt-5">
                <div className="h-[2.5rem] relative bg-gray-100 rounded-md loading_ [--delay:0.6s]"></div>
                <div className="h-[5rem] relative bg-gray-100 rounded-md loading_ [--delay:0.4s]"></div>
                <div className="h-[2.5rem] relative bg-gray-100 rounded-md loading_ [--delay:0.5s]"></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CommentComponent;
