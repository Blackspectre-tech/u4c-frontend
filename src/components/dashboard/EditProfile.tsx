"use client";

import {
  usePatchUserMutation,
  useUploadAvatarMutation,
} from "@/redux/api/main";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { response_message } from "../utilities/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import Image from "next/image";

function EditProfile() {
  const [formData, setFormData] = useState<{ image: File | null | string }>({
    image: null,
  });
  const [selected, setSelected] = useState<string | null>(null);

  const [Upload_Avatar, { isLoading }] = useUploadAvatarMutation();
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await Upload_Avatar({ body: formData });
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
      message: "Profile photo edited successfully",
      option: "scc",
    });
    // setTimeout(() => router.push("/dashboard/profile"), 2000);
  };

  const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]; // safe check
    if (!selectedFile) {
      return response_message({
        message: "You didn't select any file",
        option: "wrn",
      });
    }

    // Store the file in form data
    setFormData((prev) => ({ ...prev, image: selectedFile }));

    // Read the file for preview
    const reader = new FileReader();
    reader.onload = () => {
      setSelected(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);

    console.log("====================================");
    console.log(selectedFile);
    console.log("====================================");
  };

  return (
    <>
      <div className="relative">
        <form onSubmit={submit} className="">
          {selected ? (
            <div className="border border-gray-100 rounded-md p-2">
              <div className="relative h-[10rem] w-full bg-gray-50 rounded-md border border-gray-200 flex justify-center items-center">
                <Image
                  src={selected}
                  alt=""
                  className="absolute w-full h-full object-cover rounded-md"
                  fill
                />

                <div className="relative z-10 w-[90%] h-[70%] rounded-md bg-gray-50/90 flex justify-center items-center">
                  <div className="">
                    <input
                      type="file"
                      id="Reselect-Profile-Picture"
                      onChange={addFile}
                      accept=".jpg,.jpeg,.png"
                      className="hidden"
                    />
                    <label
                      htmlFor="Reselect-Profile-Picture"
                      className="border-2 border-yellow-500 text-yellow-800 font-bold cursor-pointer rounded-lg text-[0.9rem] px-11 py-2"
                    >
                      Reselect
                    </label>
                  </div>

                  <div className="h-[1rem] w-[2px] bg-gray-700 mx-3"></div>

                  <button
                    disabled={isLoading}
                    className="border-2 border-green-500 text-green-800 font-bold cursor-pointer rounded-lg text-[0.9rem] px-11 py-2 flex items-center justify-center gap-2"
                  >
                    {isLoading && (
                      <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
                    )}
                    Submit
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <label
              htmlFor="Profile-Picture"
              className="bg-gray-50 h-[10rem] w-full cursor-pointer rounded-md border border-gray-200 flex flex-col justify-center items-center"
            >
              <RiImageAddFill className="text-[2.5rem] text-gray-800" />
              <p className="capitalize text-sm text-gray-700 font-semibold mt-2">
                click to select an image
              </p>
            </label>
          )}

          <input
            type="file"
            id="Profile-Picture"
            onChange={addFile}
            accept=".jpg,.jpeg,.png"
            className="hidden"
          />
        </form>
      </div>

      <div className="w-[50%] mx-auto border-b-2 border-gray-500/10 my-10"></div>
    </>
  );
}

export default EditProfile;
