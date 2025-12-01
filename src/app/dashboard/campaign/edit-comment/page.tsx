"use client";

import BackButton from "@/components/dashboard/BackButton";
import { response_message } from "@/components/utilities/utils";
import {
  useGetCommentMutation,
  usePatchCommentMutation,
} from "@/redux/api/main";
import { RootState } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector } from "react-redux";

type formType = {
  details: string;
};

export default function Home() {
  const { organization } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<formType>({ details: "" });

  const [Get_Comment, {}] = useGetCommentMutation();
  const [Patch_Comment, { isLoading }] = usePatchCommentMutation();

  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  const campaign = params.get("campaign");

  useEffect(() => {
    console.log("====================================");
    console.log(id);
    console.log("====================================");

    if (!id) return router.back();
    if (organization === true) return router.back();

    (async () => {
      const result = await Get_Comment({ query: `/${id}/` });

      console.log(result.data);

      if ("error" in result) return;

      setFormData((priv) => ({
        ...priv,
        details: result.data?.details || "",
      }));
    })();

    return () => {};
  }, []);

  const editFormData = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((priv) => ({ ...priv, [e.target.name]: e.target.value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();

    // Append simple fields
    data.append("details", formData.details);

    const result = await Patch_Comment({ query: `/${id}/`, body: data });
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
      message: "Comment edited successfully",
      option: "scc",
    });
    setTimeout(
      () => router.push(`/dashboard/campaign/overview?id=${campaign}`),
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
          <h1 className="text-4xl font-bold relative">Edit / Comment</h1>
          <p className="relative md:w-[80%] lg:w-[70%] mt-5">
            We built United4Change to solve the trust problem in charity, by
            using technology that proves every donation does what it says it
            will. Giving has never been this transparent or borderless
          </p>
        </div>

        <div className="relative mt-5 md:p-5">
          <BackButton route="/dashboard/campaign" parent_wind="flex mb-5" />

          <form
            onSubmit={submit}
            id="gradient-border"
            className="bg-[#fcfcfc] rounded-[1rem] border-2 px-2 md:px-7 py-10"
          >
            <div className="flex flex-col md:grid grid-cols-2 gap-5 px-3">
              <label className="col-span-2">
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">Comment</p>
                </div>

                <textarea
                  required
                  minLength={10}
                  name="details"
                  sub-child={"false"}
                  value={formData.details}
                  onChange={editFormData}
                  // placeholder="smith"
                  className="w-full h-[10rem] resize-none px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>
            </div>

            <button
              disabled={isLoading}
              className="w-full font-semibold button_ cursor-pointer mt-7 py-3 flex items-center justify-center gap-2"
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
