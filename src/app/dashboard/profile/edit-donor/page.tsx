"use client";

import BackButton from "@/components/dashboard/BackButton";
import EditProfile from "@/components/dashboard/EditProfile";
import { response_message } from "@/components/utilities/utils";
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
    <div className="relative mt-5 p-5">
      <div className="relative w-full h-full flex flex-col justify-between md:px-10">
        <h1 className="text-4xl font-bold relative">Edit / User Details</h1>
        <p className="relative md:w-[80%] lg:w-[70%] mt-5">
          We built United4Change to solve the trust problem in charity, by using
          technology that proves every donation does what it says it will.
          Giving has never been this transparent or borderless
        </p>
      </div>

      <div className="relative mt-5 md:p-5">
        <BackButton route="/dashboard/setting" parent_wind="flex mb-5" />
        <div
          id="gradient-border"
          className="bg-[#fcfcfc] rounded-[1rem] border-2 px-2 md:px-7 py-7 md:py-10 mt-5"
        >
          <div className="px-1 md:px-0">
            <EditProfile />
          </div>

          <form onSubmit={submit} className="">
            <div className="flex flex-col md:grid grid-cols-2 gap-5 px-2">
              <label className="col-span-1">
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Username
                  </p>
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
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    First name
                  </p>
                </div>

                <input
                  required
                  type="text"
                  name="first_name"
                  sub-child={"false"}
                  value={formData.first_name}
                  onChange={editFormData}
                  // placeholder="smith"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>

              <label className="col-span-2">
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Last name
                  </p>
                </div>

                <input
                  required
                  type="text"
                  name="last_name"
                  sub-child={"false"}
                  value={formData.last_name}
                  onChange={editFormData}
                  // placeholder="smith"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
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

export default Home;
