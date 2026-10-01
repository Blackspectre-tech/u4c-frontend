"use client";

import { response_message } from "@/components/utilities/utils";
import { useDeleteGalleryImageMutation } from "@/redux/api/main";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import {
  MdDeleteForever,
  MdEditSquare,
  MdOutlineDeleteForever,
} from "react-icons/md";
import { PiEmptyBold } from "react-icons/pi";
import { useSelector } from "react-redux";

type ImageEntry = { id: string; image: string };

const get_images = (data: any): ImageEntry[] =>
  data?.images?.length > 0
    ? data.images
    : data?.image
      ? [{ id: "", image: data.image }]
      : [];

function GalleryComponent({
  data,
  id,
  project_id,
  action = true,
  update = (id: string) => null,
}: {
  data: any;
  id: string;
  project_id?: any;
  action?: boolean;
  update?: (id: string) => void;
}) {
  const { organization } = useSelector((state: RootState) => state.user);
  const [openDelete, setOpenDelete] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [images, setImages] = useState<ImageEntry[]>(() => get_images(data));
  const [deletingId, setDeletingId] = useState<string | null>(null);

  console.log("[ Action ]: ", action);
  const [Delete_Gallery_Image] = useDeleteGalleryImageMutation();
  if (!(get_images(data).length > 0)) return <></>;

  // Keep the local, editable image list in sync whenever the campaign data
  // this card was built from is refetched.
  useEffect(() => {
    setImages(get_images(data));
    setActiveImage(0);
  }, [data]);

  // Deletes a single evidence image (the milestone/card itself is never
  // removed from here).
  const delete_image = async (image_id: string) => {
    if (!image_id) return;

    setDeletingId(image_id);
    const result = await Delete_Gallery_Image({ query: `/${image_id}/` });
    setDeletingId(null);

    const is_message = result.error?.data?.errors;

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
      message: "Image deleted successfully",
      option: "scc",
    });

    setImages((prev) => {
      const next = prev.filter((img) => img.id !== image_id);
      setActiveImage((current) =>
        Math.min(current, Math.max(next.length - 1, 0)),
      );
      return next;
    });
  };

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

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 min-w-16 min-h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <MdOutlineDeleteForever className="text-[2rem] text-red-600" />
                </div>

                <h1 className="font-bold text-lg mt-4">Manage images</h1>
                <p className="text-gray-500 text-sm mt-1">
                  Delete the images you no longer want on this milestone.
                </p>
              </div>

              <div className="flex flex-col gap-3 mt-6 max-h-80 overflow-y-auto">
                {images.length === 0 && (
                  <p className="text-center text-gray-400 text-sm py-5">
                    No images left.
                  </p>
                )}

                {images.map((img, index) => (
                  <div
                    key={img.id || index}
                    className="flex items-center gap-3 border border-gray-100 rounded-xl p-2"
                  >
                    <div className="relative w-14 h-14 min-w-14 rounded-lg overflow-hidden bg-gray-100">
                      {img.image && (
                        <Image
                          src={img.image}
                          alt=""
                          className="object-cover"
                          fill
                        />
                      )}
                    </div>

                    <p className="flex-1 text-sm font-medium text-gray-500">
                      Image {index + 1}
                    </p>

                    <button
                      type="button"
                      onClick={() => delete_image(img.id)}
                      disabled={!img.id || deletingId === img.id}
                      className="bg-red-100 border border-red-300/60 text-red-700 rounded-lg p-2 cursor-pointer disabled:opacity-60"
                    >
                      {deletingId === img.id ? (
                        <AiOutlineLoading3Quarters className="button_loading_ text-[1.1rem]" />
                      ) : (
                        <MdDeleteForever className="text-[1.1rem]" />
                      )}
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setOpenDelete((prev) => !prev)}
                className="w-full bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200 cursor-pointer rounded-lg py-2.5 font-semibold mt-6"
              >
                Done
              </button>
            </div>
          </div>,
          document.body,
        )}

      <div className={`bg-white shadow-md p-5`}>
        {organization === true && action === true && (
          <div className="absolute right-8 top-8 z-10 flex items-center gap-2">
            <Link
              href={`/dashboard/campaign/edit-gallery?id=${data?.id}&project_id=${project_id}`}
              className="bg-gray-200 border border-gray-400/60 text-gray-950 rounded-2xl p-2"
            >
              <MdEditSquare className="text-xl cursor-pointer" />
            </Link>

            <div
              onClick={() => setOpenDelete((prev) => !prev)}
              className="bg-red-500/20 rounded-2xl p-2"
            >
              <MdDeleteForever className="text-xl text-red-900 cursor-pointer" />
            </div>
          </div>
        )}

        <div
          className={`bg-[#0000000a]/60 w-full min-h-50 max-h-50 relative overflow-hidden rounded-4xl border border-black/5 p-5`}
        >
          {images[activeImage]?.image ? (
            <Image
              src={images[activeImage].image}
              alt=""
              className="w-full h-full object-cover"
              fill
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400">
              <PiEmptyBold className="text-[1.7rem]" />
              <p className="text-sm font-semibold">No images yet</p>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          {images.length > 1 && (
            <div className="z-10 flex items-center gap-2 pt-3">
              {images.map((img, index) => (
                <button
                  key={img.id || index}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Show image ${index + 1}`}
                  className={`rounded-full transition-all cursor-pointer ${
                    index === activeImage
                      ? "w-5 h-2 bg-[#35B9C2]"
                      : "w-2 h-2 bg-[#35B9C2]/60 hover:bg-[#35B9C2]/80"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-5">
          <h1 className="font-semibold capitalize text-[1.3rem] text-center">
            {data?.title}
          </h1>
          <p className="line-clamp-2 mt-3 min-h-[3.3rem] text-center">
            {data?.details}
          </p>
        </div>
      </div>
    </div>
  );
}

export default GalleryComponent;
