"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { RootState } from "@/redux/store";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { MdDeleteForever, MdOutlineDeleteForever } from "react-icons/md";
import { response_message } from "@/components/utilities/utils";
import { useDeleteUpdateMutation } from "@/redux/api/main";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaQuoteLeft } from "react-icons/fa";

function UpdateComponent({
  id,
  data,
  action = true,
  update = (id: string) => null,
}: {
  data: any;
  id: string;
  action?: boolean;
  update?: (id: string) => void;
}) {
  const { organization } = useSelector((state: RootState) => state.user);
  const [openDelete, setOpenDelete] = useState(false);

  const [Delete_Update, { isLoading }] = useDeleteUpdateMutation();

  const delete_gallery_image = async () => {
    console.log("====================================");
    console.log(id);
    console.log("====================================");

    const result = await Delete_Update({ query: `/${id}/` });
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
      message: "Gallery image has been deleted successfully",
      option: "scc",
    });

    update(id);
    setOpenDelete((prev) => !prev);
  };

  // console.log("====================================");
  // console.log("milestones");
  // console.log(REMAINING_PERCENTAGE);
  // console.log(OWING_PERCENTAGE);
  // console.log(campaign);
  // console.log("====================================");

  return (
    <div className="relative overflow-hidden rounded-4xl">
      {openDelete === true &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800/40 flex justify-center items-center px-5">
            <div className="bg-white w-full max-w-sm rounded-3xl relative p-7 shadow-xl">
              <IoClose
                onClick={() => setOpenDelete((prev) => !prev)}
                className="absolute top-5 right-5 text-[1.3rem] text-gray-400 hover:text-gray-600 cursor-pointer"
              />
              Ź
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 min-w-16 min-h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <MdOutlineDeleteForever className="text-[2rem] text-red-600" />
                </div>

                <h1 className="font-bold text-lg mt-4">Delete this update?</h1>
                <p className="text-gray-500 text-sm mt-1">
                  This action cannot be undone.
                </p>
              </div>
              <div className="flex items-center gap-3 mt-7">
                <button
                  type="button"
                  onClick={() => setOpenDelete((prev) => !prev)}
                  className="w-full bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200 cursor-pointer rounded-lg py-2.5 font-semibold"
                >
                  Cancel
                </button>

                <button
                  onClick={delete_gallery_image}
                  className="w-full bg-red-600 hover:bg-red-700 text-white cursor-pointer rounded-lg flex items-center justify-center gap-2 py-2.5 font-semibold disabled:opacity-60"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
                  )}
                  Delete
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      <div className={`bg-white shadow-md p-5`}>
        <div className={`flex justify-end`}>
          {organization === true && action === true && (
            <div
              onClick={() => setOpenDelete((prev) => !prev)}
              className="bg-red-500/20 rounded-2xl p-2"
            >
              <MdDeleteForever className="text-xl text-red-900 cursor-pointer" />
            </div>
          )}
        </div>

        <div className="mt-5">
          <div className="flex items-center gap-4">
            <FaQuoteLeft className="text-[2rem] text-black/70" />
            <h1 className="font-semibold capitalize text-[1.5rem] text-center">
              {data?.title}
            </h1>
          </div>

          <p className="line-clamp-7 mt-3 min-h-[3.3rem]">{data?.details}</p>
        </div>
      </div>
    </div>
  );
}

export default UpdateComponent;
