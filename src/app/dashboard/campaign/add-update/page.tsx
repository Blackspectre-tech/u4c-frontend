"use client";

import { response_message } from "@/components/utilities/utils";
import { NavigationTemplate } from "@/components/utilities/utils.template";
import { useAddUpdateMutation } from "@/redux/api/main";
import { RootState } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters, AiOutlinePercentage } from "react-icons/ai";
import { FaRegImages } from "react-icons/fa";
import { useSelector } from "react-redux";

type formType = { title: string; details: string };

export default function Home() {
  const { organization } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<formType>({
    title: "",
    details: "",
  });

  const [Add_Update, { isLoading }] = useAddUpdateMutation();

  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  useEffect(() => {
    if (organization === false || !id) return router.back();

    return () => {};
  }, [organization]);

  const editFormData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormData((priv) => ({ ...priv, [e.target.name]: e.target.value }));
  };

  console.log("====================================");
  console.log(formData);
  console.log("====================================");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();

    // Append simple fields
    data.append("title", formData.title);
    data.append("details", formData.details);
    const result = await Add_Update({ query: `/${id}/`, body: data });

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
      message: "Update added successfully",
      option: "scc",
    });
    setTimeout(
      () => router.push(`/dashboard/campaign/overview?id=${id}`),
      2000,
    );
  };

  console.log("====================================");
  console.log(formData);
  console.log("====================================");

  return (
    <div className="relative px-5 md:px-10 pb-5">
      <NavigationTemplate
        title="Add Gallery Update"
        navigation={[
          {
            title: "Campaign",
            path: `/dashboard/campaign`,
          },
          {
            title: "Add-Gallery-Update",
            path: `/dashboard/campaign/add-update?id=${id}`,
          },
          { title: "Add Gallery Update", path: "#" },
        ]}
      />

      <form
        onSubmit={submit}
        className="gradient-cto-border rounded-2xl border-2 border-transparent p-5 lg:p-10 mt-5"
      >
        {/* <div className="relative w-full min-h-80 flex items-center justify-center rounded-4xl bg-gray-100 border-2 border-dashed border-gray-500 p-5 mx-auto">
          {formData?.image && (
            <div className="rounded-4xl max-h-80 overflow-hidden top-0 left-0 w-full h-full">
              <img
                className="w-full h-full object-cover object-center rounded-4xl"
                src={URL.createObjectURL(formData.image)}
                alt=""
              />
            </div>
          )}

          <div className="absolute w-[95%] h-[75%] bg-white/70 rounded-4xl z-10 flex flex-col items-center justify-center">
            <label
              htmlFor="Campaign-Banner"
              className="gradient-cto text-white rounded-lg flex items-center gap-3 cursor-pointer px-5 py-3"
            >
              <FaRegImages className="text-[1.5rem]" />
              <p>Upload Image</p>
            </label>

            <input
              required
              id="Campaign-Banner"
              type="file"
              sub-child={"false"}
              onChange={addFile}
              accept=".jpg,.jpeg,.png"
              className="absolute opacity-0 pointer-events-none"
            />

            <p className="mt-2">Select an image, JPG, JPEG, PNG, Max 5mb.</p>
          </div>
        </div> */}

        <div className="flex flex-col md:grid grid-cols-2 gap-5 px-3">
          <label className="col-span-2">
            <div className="flex items-center gap-4 pl-3">
              <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
              <p className="text-sm font-semibold text-gray-500">Title</p>
            </div>

            <input
              required
              type="text"
              name="title"
              value={formData.title}
              onChange={editFormData}
              className="w-full px-5 py-2 border border-black/30 outline-0 rounded-md mt-3"
            />
          </label>

          <label className="col-span-2">
            <div className="flex items-center gap-4 pl-3">
              <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
              <p className="text-sm font-semibold text-gray-500">Details</p>
            </div>

            <textarea
              required
              minLength={20}
              name="details"
              sub-child={"false"}
              value={formData.details}
              onChange={editFormData}
              // placeholder="smith"
              className="w-full h-40 resize-none px-5 py-2 border border-black/30 outline-0 rounded-md mt-3"
            />
          </label>
        </div>

        <button
          disabled={isLoading}
          className="gradient-cto rounded-full w-full font-semibold cursor-pointer mt-7 py-3 flex items-center justify-center gap-2"
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
