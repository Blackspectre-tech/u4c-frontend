"use client";

import CountrySelector from "@/components/CountrySelector";
import BackButton from "@/components/dashboard/BackButton";
import CustomSelector from "@/components/SelectTag";
import { response_message } from "@/components/utilities/utils";
import {
  useAddMilestoneImagesMutation,
  useCreateCampaignMutation,
} from "@/redux/api/main";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters, AiOutlinePercentage } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
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
};

export default function Home() {
  const { organization } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<FormType>({
    images: [],
  });

  const [Add_Milestone_Images, { isLoading }] = useAddMilestoneImagesMutation();
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  useEffect(() => {
    if (organization === false || !id) return router.back();

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
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length) return;

    const newImages = files.map((file) => ({
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

  console.log("====================================");
  console.log(formData);
  console.log("====================================");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.images.length <= 0)
      response_message({
        message: "Kindly select an image to continue",
        option: "wrn",
      });

    const data = new FormData();
    formData.images.forEach((img) => data.append("images", img.file));

    const result = await Add_Milestone_Images({ query: `/${id}/`, body: data });
    console.log(result);
    console.log(data);

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
      message: "Milestone Images added successfully",
      option: "scc",
    });
    setTimeout(
      () =>
        router.push(
          `/dashboard/campaign/overview/milestones-&-expenses?id=${id}`
        ),
      2000
    );
  };

  // console.log("====================================");
  // console.log(formData);
  // console.log("====================================");

  return (
    <div className="relative px-5 md:px-10 mt-10">
      <div className="">
        <div className="relative w-full h-full flex flex-col justify-between md:px-10">
          <h1 className="text-4xl font-bold relative">
            Add / Milestone images
          </h1>
          <p className="relative w-[80%] lg:w-[70%] mt-5">
            We built United4Change to solve the trust problem in charity, by
            using technology that proves every donation does what it says it
            will. Giving has never been this transparent or borderless
          </p>
        </div>

        <div className="relative mt-5 md:p-5">
          <BackButton
            route={`/dashboard/campaign/overview/milestones-&-expenses?id=${id}`}
            parent_wind="flex mb-5"
          />

          <form
            onSubmit={submit}
            id="gradient-border"
            className="bg-[#fcfcfc] rounded-[1rem] border-2 px-3 md:px-7 py-7 md:py-10"
          >
            <label className="">
              <div className="flex items-center gap-4 pl-3">
                <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                <p className="text-sm font-semibold text-gray-500">images</p>
              </div>

              <input
                type="file"
                multiple
                onChange={addFile}
                // placeholder="smith"
                accept=".jpg,.jpeg,.png"
                className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
              />
            </label>

            {formData.images.length > 0 && (
              <div className="w-[50%] mx-auto border-b-2 border-gray-500/10 mt-5 mb-10"></div>
            )}

            {/* Preview container */}
            <div className="flex flex-wrap gap-3 mb-5 md:mb-10">
              {formData.images?.map((img) => (
                <div
                  key={img.id}
                  className="relative w-[13rem] h-[13rem] border rounded-md overflow-hidden group"
                >
                  <img
                    src={img.preview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-80 hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button
              disabled={isLoading}
              className="w-full font-semibold button_ cursor-pointer md:mt-7 py-3 flex items-center justify-center gap-2"
            >
              {isLoading && (
                <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
              )}
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
