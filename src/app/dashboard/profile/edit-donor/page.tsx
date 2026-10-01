"use client";

import BackButton from "@/components/dashboard/BackButton";
import EditProfile from "@/components/dashboard/EditProfile";
import { response_message } from "@/components/utilities/utils";
import { NavigationTemplate } from "@/components/utilities/utils.template";
import { usePatchUserMutation } from "@/redux/api/main";
import { RootState } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector } from "react-redux";

function Home() {
  const { user, organization } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState({
    username: "",
    last_name: "",
    first_name: "",
  });
  const [Patch_User, { isLoading }] = usePatchUserMutation();
  const router = useRouter();

  console.log("====================================");
  console.log(user);
  console.log("====================================");

  useEffect(() => {
    if (organization === true) return router.back();

    setFormData((prev) => ({
      ...prev,
      username: user?.username || "",
      last_name: user?.last_name || "",
      first_name: user?.first_name || "",
    }));

    return () => {};
  }, [organization]);

  const editFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await Patch_User({ body: formData });
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
      message: "Profile edited successfully",
      option: "scc",
    });
    setTimeout(() => router.push("/dashboard/profile"), 2000);
  };

  return (
    <div className="relative px-5 md:px-10 pb-5 mt-5">
      <NavigationTemplate
        title="Edit Profile"
        navigation={[
          { title: "Settings", path: "/dashboard/setting" },
          { title: "Edit Profile", path: "#" },
        ]}
      />

      <form
        onSubmit={submit}
        className="gradient-cto-border rounded-[1rem] border-2 border-transparent p-5 lg:p-10 mt-5"
      >
        <div className="flex flex-col md:grid grid-cols-2 gap-5 px-2">
          <label className="col-span-1">
            <div className="flex items-center gap-3 pl-3">
              <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
              <p className="text-sm font-semibold text-gray-500">Username</p>
            </div>

            <input
              required
              type="text"
              name="username"
              sub-child={"false"}
              value={formData.username}
              onChange={editFormData}
              // placeholder="smith"
              className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
            />
          </label>

          <label className="col-span-1">
            <div className="flex items-center gap-3 pl-3">
              <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
              <p className="text-sm font-semibold text-gray-500">First name</p>
            </div>

            <input
              required
              type="text"
              name="first_name"
              sub-child={"false"}
              value={formData.first_name}
              onChange={editFormData}
              // placeholder="smith"
              className="w-full px-5 py-2 border border-black/30 outline-0 rounded-md mt-3"
            />
          </label>

          <label className="col-span-2">
            <div className="flex items-center gap-3 pl-3">
              <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
              <p className="text-sm font-semibold text-gray-500">Last name</p>
            </div>

            <input
              required
              type="text"
              name="last_name"
              sub-child={"false"}
              value={formData.last_name}
              onChange={editFormData}
              // placeholder="smith"
              className="w-full px-5 py-2 border border-black/30 outline-0 rounded-md mt-3"
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

export default Home;
