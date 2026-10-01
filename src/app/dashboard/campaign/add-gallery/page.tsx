"use client";

import CountrySelector from "@/components/CountrySelector";
import BackButton from "@/components/dashboard/BackButton";
import CustomSelector from "@/components/SelectTag";
import { response_message } from "@/components/utilities/utils";
import { NavigationTemplate } from "@/components/utilities/utils.template";
import {
  useAddGalleryImagesMutation,
  useAddMilestoneImagesMutation,
  useCreateCampaignMutation,
  useGetCampaignNgoMutation,
} from "@/redux/api/main";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters, AiOutlinePercentage } from "react-icons/ai";
import { FaPlus, FaRegImages } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { PiEmptyBold } from "react-icons/pi";
import { useSelector } from "react-redux";

type ImageItem = {
  file: File;
  preview: string;
  id: string;
};

type FormType = {
  images: ImageItem[];
  milestone: null | string;
};

export default function Home() {
  const { organization } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<FormType>({
    images: [],
    milestone: null,
  });

  const [Add_Gallery_Images, { isLoading }] = useAddGalleryImagesMutation();
  const [Get_Campaign, { data }] = useGetCampaignNgoMutation();

  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  useEffect(() => {
    if (organization === false || !id) return router.back();

    (async () => {
      const result = await Get_Campaign({ query: `/${id}/` });
      console.log("[ result ]: ", result);
    })();

    return () => {};
  }, [organization]);

  // Delete image
  const handleDelete = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== id),
    }));
  };

  const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 1. Convert FileList to Array
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    if (!selectedFiles.length) return;

    const MAX_SIZE = 5 * 1024 * 1024; // 5MB in bytes
    const MAX_COUNT = 8;
    const currentImagesCount = formData.images.length;

    // 2. Filter out files that are too large
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

    // 3. Limit the total number of images to 5
    const remainingSlots = MAX_COUNT - currentImagesCount;

    if (remainingSlots <= 0) {
      response_message({
        message: "You have already reached the limit of 5 images.",
        option: "err",
      });
      e.target.value = "";
      return;
    }

    const filesToAdd = validFiles.slice(0, remainingSlots);

    if (validFiles.length > remainingSlots) {
      response_message({
        message: `Only the first ${remainingSlots} valid images were added (Limit: 5).`,
        option: "wrn",
      });
    }

    // 4. Map to your state structure
    const newImages = filesToAdd.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: crypto.randomUUID(),
    }));

    setFormData((prev: FormType) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));

    // 5. Reset input so the same file can be picked again if deleted
    e.target.value = "";
  };

  // console.log("====================================");
  // console.log(formData);
  // console.log("====================================");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.images.length <= 0)
      response_message({
        message: "Kindly select an image to continue",
        option: "wrn",
      });

    if (!formData.milestone) {
      response_message({
        message: "Kindly select a milestone to continue",
        option: "wrn",
      });
      return;
    }

    const data = new FormData();
    formData.images.forEach((img) => data.append("images", img.file));

    const result = await Add_Gallery_Images({
      query: `/${formData.milestone}/`,
      body: data,
    });

    console.log(data);
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
      message: "Images added to gallery successfully",
      option: "scc",
    });
    setTimeout(
      () => router.push(`/dashboard/campaign/overview?id=${id}`),
      2000,
    );
  };

  // console.log("====================================");
  // console.log(formData);
  // console.log("====================================");

  return (
    <div className="relative px-5 md:px-10 pb-5">
      <NavigationTemplate
        title="Add Gallery"
        navigation={[
          {
            title: "Campaign",
            path: `/dashboard/campaign`,
          },
          {
            title: "Add-Gallery",
            path: `/dashboard/campaign/add-gallery?id=${id}`,
          },
          { title: "Add Gallery", path: "#" },
        ]}
      />

      <div className="w-full min-h-80 h-80 flex items-center justify-center relative rounded-4xl bg-gray-100 border-2 border-dashed border-gray-500 p-10 mt-5">
        <div className="w-[calc(100%-1rem)] h-[calc(100%-1rem)] bg-white/70 rounded-4xl relative z-10 flex flex-col items-center justify-center">
          <label
            htmlFor="Campaign-Banner"
            className="gradient-cto text-white rounded-lg flex items-center gap-3 cursor-pointer px-5 py-3"
          >
            <FaRegImages className="text-[1.5rem]" />
            <p>Upload Image To Gallery</p>
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
        {/* Preview container */}
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
                onClick={() => handleDelete(img.id)}
                className="gradient-cto absolute top-1 right-1 text-white text-xs px-2 py-1 rounded opacity-80 hover:opacity-100"
              >
                <p className="opacity-100">✕</p>
              </button>
            </div>
          ))}
        </div>

        <label className="block mb-5 md:mb-10">
          <div className="flex items-center gap-3 pl-3">
            <div className="w-2 h-2 min-w-2 min-h-2 bg-[#f4901e] rounded-full"></div>
            <p className="text-sm font-semibold text-gray-500">Milestone</p>
          </div>

          <div className="w-full border border-black/30 rounded-md p-1 mt-3">
            <CustomSelector
              optionsList={[...(data?.milestones || [])]}
              control_class=""
              control_style={{
                border: "none",
                backgroundColor: "transparent",
              }}
              placeholder="Select a milestone"
              changeEvent={(selected) => {
                setFormData((prev) => ({
                  ...prev,
                  milestone: (selected?.value as string) ?? null,
                }));
              }}
              mapOption={(milestone: any) => ({
                value: milestone?.id,
                name: milestone?.id,
                label: (
                  <div className="flex items-center gap-2">
                    <p>
                      Milestone {milestone?.milestone_no}: {milestone?.title} (
                      {milestone?.percentage}%)
                    </p>
                  </div>
                ),
              })}
            />
          </div>
        </label>

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
