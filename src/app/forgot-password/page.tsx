"use client";

import { response_message } from "@/components/utilities/utils";
import { useForgotPasswordMutation } from "@/redux/api/main";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TbExternalLink } from "react-icons/tb";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "" });
  const [Forgot_Password, { isLoading }] = useForgotPasswordMutation();

  const editFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((priv) => ({ ...priv, [e.target.name]: e.target.value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await Forgot_Password({ params: {}, body: formData });

    console.log(result);
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
      message: result.data?.message || "Successful",
      option: "scc",
    });
    setTimeout(() => router.push("/edit-password"), 2000);
  };

  return (
    <div className="mt-[5rem] flex justify-center items-center">
      <div className="lg:w-[85%] xl:grid grid-cols-10 px-5 sm:px-10 md:px-20">
        <div className="col-span-4 relative w-full h-full flex flex-col justify-between p-7 sm:p-10">
          <div className="absolute top-0 left-0 w-full h-[150%] xl:w-[120%] xl:h-full rounded-b-lg bg-[#33b1ba1c]/10 border-2 border-[#33b1baa2]/30 rounded-md"></div>

          <div className="">
            {" "}
            <h1 className="text-4xl font-bold relative z-10">
              Forgot Password
            </h1>
            <p className="relative z-10 mt-5">
              We built United4Change to solve the trust problem in charity, by
              using technology.
            </p>
          </div>

          <div className="mt-5">
            <p className="relative z-10 mt-5">Don't have an account?</p>

            <Link
              href={"/sign-in"}
              className="flex justify-start items-center gap-2 text-xl font-semibold relative cursor-pointer pl-2 z-10 mt-2"
            >
              Sign-In <TbExternalLink className="text-[1.2rem]" />
            </Link>
          </div>
        </div>

        <div className="col-span-6 relative z-10 p-3 sm:p-5">
          <form
            onSubmit={submit}
            id="gradient-border"
            className="bg-[#fcfcfc] rounded-[1rem] border-2 border-[#6161618a]/7 p-4 sm:p-7"
          >
            <div className="flex flex-col gap-5 px-2">
              <label>
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">Email</p>
                </div>

                <input
                  required
                  type="email"
                  name="email"
                  sub-child={"user"}
                  value={formData.email}
                  onChange={editFormData}
                  // placeholder="example@gmail.com"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>

              <p className="flex justify-start text-sm">
                <Link href={"/forgot-password"}>Forgot password?</Link>
              </p>
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
