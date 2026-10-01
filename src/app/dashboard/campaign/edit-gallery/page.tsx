"use client";

import { response_message } from "@/components/utilities/utils";
import { NavigationTemplate } from "@/components/utilities/utils.template";
import {
  useAddGalleryImagesMutation,
  useEditGalleryImageMutation,
  useGetMilestoneMutation,
} from "@/redux/api/main";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegImages } from "react-icons/fa";
import { useSelector } from "react-redux";

type ImageItem = {
  file: File;
  preview: string;
  id: string;
};

type FormType = {
  images: ImageItem[];
};

export default function Home() {
  const { organization } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<FormType>({ images: [] });

  // const [Edit_Gallery_Image, { isLoading }] = useEditGalleryImageMutation();
  const [Add_Gallery_Images, { isLoading }] = useAddGalleryImagesMutation();
  const [Get_Milestone, { data }] = useGetMilestoneMutation();

  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  const project_id = params.get("project_id");

  useEffect(() => {
    if (organization === false || !id) return router.back();

    (async () => {
      const result = await Get_Milestone({ query: `/${id}/` });
      console.log("[ result ]: ", result);
    })();

    return () => {};
  }, [organization]);

  // Remove a not-yet-uploaded image from the preview list
  const handleDelete = (image_id: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== image_id),
    }));
  };

  const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    if (!selectedFiles.length) return;

    const MAX_SIZE = 5 * 1024 * 1024; // 5MB in bytes
    const MAX_COUNT = 8;
    const currentImagesCount = formData.images.length;

    const validFiles = selectedFiles.filter((file) => {
      if (file.size > MAX_SIZE) {
        response_message({
          message: `${file.name} is too large. Max size is 5MB.`,
          option: "err",
        });
        return false;
      }
      return true;
    });

    const remainingSlots = MAX_COUNT - currentImagesCount;

    if (remainingSlots <= 0) {
      response_message({
        message: "You have already reached the limit of 8 images.",
        option: "err",
      });
      e.target.value = "";
      return;
    }

    const filesToAdd = validFiles.slice(0, remainingSlots);

    if (validFiles.length > remainingSlots) {
      response_message({
        message: `Only the first ${remainingSlots} valid images were added (Limit: 8).`,
        option: "wrn",
      });
    }

    const newImages = filesToAdd.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: crypto.randomUUID(),
    }));

    setFormData((prev: FormType) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));

    e.target.value = "";
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.images.length <= 0) {
      response_message({
        message: "Kindly select an image to continue",
        option: "wrn",
      });
      return;
    }

    const body = new FormData();
    formData.images.forEach((img) => body.append("images", img.file));

    const result = await Add_Gallery_Images({ query: `/${id}/`, body });
    console.log(result);

    const is_message = result.error?.data?.errors;

    if ("error" in result) {
      return response_message({
        message: is_message
          ? `${result.error?.data?.errors[0]?.detail} ${result.error?.data?.errors[0]?.attr}`
          : "Something went wrong?",
        option: "err",
      });
    }

    response_message({
      message: "Images added successfully",
      option: "scc",
    });
    setTimeout(
      () => router.push(`/dashboard/campaign/overview?id=${project_id}`),
      2000,
    );
  };

  return (
    <div className="relative px-5 md:px-10 pb-5">
      <NavigationTemplate
        title="Edit Gallery"
        navigation={[
          {
            title: "Campaign",
            path: `/dashboard/campaign`,
          },
          {
            title: "Overview",
            path: `/dashboard/campaign/overview?id=${project_id}`,
          },
          { title: "Edit Gallery", path: "#" },
        ]}
      />

      {data?.images?.length > 0 && (
        <div className="gradient-cto-border rounded-2xl border-2 border-transparent p-5 lg:p-10 mt-5">
          <div className="flex items-center gap-3 pl-3">
            <div className="w-2 h-2 min-w-2 min-h-2 bg-[#f4901e] rounded-full"></div>
            <p className="text-sm font-semibold text-gray-500">
              Current images for {data?.title || "this milestone"}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-5">
            {data?.images.map((img: any) => (
              <div
                key={img.id}
                className="relative w-32 h-32 border rounded-md overflow-hidden"
              >
                <Image src={img.image} alt="" className="object-cover" fill />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="w-full min-h-80 h-80 flex items-center justify-center relative rounded-4xl bg-gray-100 border-2 border-dashed border-gray-500 p-10 mt-5">
        <div className="w-[calc(100%-1rem)] h-[calc(100%-1rem)] bg-white/70 rounded-4xl relative z-10 flex flex-col items-center justify-center">
          <label
            htmlFor="Campaign-Banner"
            className="gradient-cto text-white rounded-lg flex items-center gap-3 cursor-pointer px-5 py-3"
          >
            <FaRegImages className="text-[1.5rem]" />
            <p>Upload New Images</p>
          </label>

          <input
            required
            multiple
            type="file"
            sub-child={"false"}
            onChange={addFile}
            id="Campaign-Banner"
            accept=".jpg,.jpeg,.png"
            className="absolute opacity-0 pointer-events-none"
          />

          <p className="mt-2">Select an image, JPG, JPEG, PNG, Max 5mb.</p>
        </div>
      </div>

      <form
        onSubmit={submit}
        className="gradient-cto-border rounded-2xl border-2 border-transparent p-5 lg:p-10 mt-5"
      >
        <div
          className={`flex flex-wrap gap-3 ${
            formData.images?.length > 0 && "mb-5 md:mb-10"
          }`}
        >
          {formData.images?.map((img) => (
            <div
              key={img.id}
              className="relative w-52 h-52 border rounded-md overflow-hidden group"
            >
              <img
                src={img.preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleDelete(img.id)}
                className="gradient-cto absolute top-1 right-1 text-white text-xs px-2 py-1 rounded opacity-80 hover:opacity-100"
              >
                <p className="opacity-100">✕</p>
              </button>
            </div>
          ))}
        </div>

        <button
          disabled={isLoading}
          className={`gradient-cto rounded-full w-full font-semibold cursor-pointer ${
            formData.images?.length > 0 && "md:mt-7"
          } py-3 flex items-center justify-center gap-2`}
        >
          {isLoading && (
            <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
          )}
          Submit
        </button>
      </form>
    </div>
  );
}
