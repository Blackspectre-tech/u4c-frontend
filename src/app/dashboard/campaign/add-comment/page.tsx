"use client";

import BackButton from "@/components/dashboard/BackButton";
import { response_message } from "@/components/utilities/utils";
import { NavigationTemplate } from "@/components/utilities/utils.template";
import { useAddCommentMutation } from "@/redux/api/main";
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

  const [Add_Comment, { isLoading }] = useAddCommentMutation();

  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  useEffect(() => {
    console.log("====================================");
    console.log(id);
    console.log("====================================");

    if (!id) return router.back();
    if (organization === true) return router.back();

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

    const result = await Add_Comment({ query: `/${id}/`, body: data });
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
      message: "Comment created successfully",
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
    <div className="relative px-5 md:px-10 mt-10">
      <NavigationTemplate
        title="Add Comment"
        navigation={[
          { title: "Dashboard", path: "/dashboard" },
          { title: "Campaigns", path: "/dashboard/campaign" },
          {
            title: "Overview",
            path: `/dashboard/campaign/overview?id=${id}`,
          },
          { title: "Add Comment", path: "#" },
        ]}
      />

      <form
        onSubmit={submit}
        className="gradient-cto-border rounded-[1rem] border-2 border-transparent p-5 lg:p-10 mt-5"
      >
        <div className="flex flex-col md:grid grid-cols-2 gap-5 px-3">
          <label className="col-span-2">
            <div className="flex items-center gap-3 pl-3">
              <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
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
              className="w-full h-[10rem] resize-none px-5 py-2 border border-black/30 outline-0 rounded-md mt-3"
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
