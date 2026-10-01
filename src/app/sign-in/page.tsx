"use client";

import { post_jwt, response_message } from "@/components/utilities/utils";
import {
  useGetKycMutation,
  useGetProfileMutation,
  useSignInMutation,
} from "@/redux/api/main";
import {
  setKyc,
  setOnline,
  setOrganization,
  setUser,
  setVerifyEmail,
} from "@/redux/slice/users";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { TbExternalLink } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { online, kyc } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const [Sign_In, {}] = useSignInMutation();
  const [Get_Kyc, {}] = useGetKycMutation();
  const [Profile, {}] = useGetProfileMutation();

  const editFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((priv) => ({ ...priv, [e.target.name]: e.target.value }));
  };

  const router = useRouter();
  const dispatch = useDispatch();

  const is_error = (result: any): boolean => {
    const is_message = result.error?.data?.errors;
    console.log(result);

    if ("error" in result) {
      response_message({
        message: is_message
          ? `${result.error?.data?.errors[0]?.detail} ${result.error?.data?.errors[0]?.attr}`
          : "Something went wrong?",
        option: "err",
      });

      setIsLoading(false);
      return true;
    }

    return false;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (online === true)
      return response_message({
        message: "You are already logged in?",
        option: "wrn",
      });

    setIsLoading(true);
    dispatch(setVerifyEmail(formData.email));

    const signin_result = await Sign_In({ params: {}, body: formData });
    if (is_error(signin_result) === true) return;

    if (signin_result.data?.is_active === false) {
      response_message({
        message:
          "Your account has not been verified. kindly verify your account",
        option: "wrn",
      });
      setTimeout(() => router.push("/verify-email"), 2000);

      return;
    }

    post_jwt({ type: "access-token", jwt: signin_result?.data?.access });
    post_jwt({ type: "refresh-token", jwt: signin_result?.data?.refresh });

    const profile_result = await Profile({ params: {} });
    if (is_error(profile_result) === true) return;

    dispatch(setOnline(true));
    dispatch(setUser(profile_result.data || {}));
    dispatch(setOrganization(profile_result.data?.user?.is_organization));

    response_message({
      message: signin_result.data?.email || "Welcome back?",
      option: "scc",
    });

    const verified = kyc?.verified === false;
    const kyc_res = verified ? await Get_Kyc({ params: {} }) : { error: true };

    if (
      !("error" in kyc_res) &&
      profile_result.data?.user?.is_organization === true
    ) {
      const kyc_status = { value: true };
      const requirements = kyc_res?.data?.requirements;

      for (let i = 0; i < requirements?.length; i++) {
        const status = requirements[i]?.status;
        if (!(status === "pending" || status === "approved"))
          kyc_status.value = false;
      }

      const kyc_data = { verified: kyc_status.value, data: requirements };
      console.log(kyc_data);
      dispatch(setKyc(kyc_data));
    }

    setTimeout(() => router.push("/dashboard"), 2000);
    // setIsLoading(false);
  };

  console.log("====================================");
  console.log(formData);
  console.log("====================================");

  return (
    <div className="mt-20 flex justify-center items-center">
      <div className="lg:w-[85%] xl:grid grid-cols-10 px-5 sm:px-10 md:px-20">
        <div className="col-span-4 relative w-full h-full flex flex-col justify-between text-whit p-7 sm:p-10">
          <div className="absolute top-0 left-0 w-full h-[150%] xl:w-[120%] xl:h-full rounded-b-lg bg-[#33b1ba1c]/10 border-2 border-[#33b1baa2]/30 rounded-md"></div>

          <div className="">
            <h1 className="text-3xl font-bold relative z-10">Sign-In</h1>
            <p className="relative z-10 mt-5">
              We built United4Change to solve the trust problem in charity, by
              using technology that proves every donation does what it says it
              will. Giving has never been this transparent or borderless
            </p>
          </div>

          <div className="mt-5">
            <p className="relative z-10 mt-5">Don't have an account?</p>

            <Link
              href={"/sign-up"}
              className="flex justify-start items-center gap-2 text-xl font-semibold relative cursor-pointer pl-2 z-10 mt-2"
            >
              Sign-Up <TbExternalLink className="text-[1.2rem]" />
            </Link>
          </div>
        </div>

        <div className="col-span-6 relative z-10 p-3 sm:p-5">
          <form
            onSubmit={submit}
            className="gradient-cto-border rounded-2xl border border-transparent bg-[#fcfcfc] p-4 sm:p-7"
          >
            <div className="flex flex-col gap-5 px-2">
              <label>
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
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

              <label>
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Password
                  </p>
                </div>

                <div className="border border-black/15 outline-0 rounded-md flex items-center gap-2 px-4 mt-3">
                  <input
                    required
                    // If showPassword is true, use 'text', otherwise use 'password'
                    type={showPassword ? "text" : "password"}
                    name="password"
                    sub-child={"user"}
                    value={formData.password}
                    onChange={editFormData}
                    className="w-full border-0 outline-0 stroke-0 py-2"
                  />

                  <div
                    className="cursor-pointer select-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <IoEye className="text-2xl text-gray-500" />
                    ) : (
                      <IoEyeOff className="text-2xl text-gray-500" />
                    )}
                  </div>
                </div>
              </label>

              <p className="flex justify-start text-sm">
                <Link href={"/forgot-password"}>Forgot password?</Link>
              </p>
            </div>

            <button
              disabled={isLoading}
              className="gradient-cto rounded-xl w-full font-semibold cursor-pointer mt-7 py-3 flex items-center justify-center gap-2"
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
