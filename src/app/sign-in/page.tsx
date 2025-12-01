"use client";

import { post_jwt, response_message } from "@/components/utilities/utils";
import {
  useAddWalletAddressMutation,
  useGetProfileMutation,
  useSignInMutation,
} from "@/redux/api/main";
import {
  setOnline,
  setOrganization,
  setUser,
  setVerifyEmail,
  setWallet,
} from "@/redux/slice/users";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TbExternalLink } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";

export default function Home() {
  const { online } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [Sign_In, {}] = useSignInMutation();
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

  const { address, isConnected, connector } = useAccount();

  const [Add_Address] = useAddWalletAddressMutation();

  const add_address = async () => {
    if (!isConnected || !address) return;

    const result = await Add_Address({
      params: {},
      body: { wallet_address: address },
    });

    console.log("====================================");
    console.log("WALLET CONNECTED");
    console.log("WALLET CONNECTED");
    console.log("WALLET CONNECTED");
    console.log(result);
    console.log("====================================");
    if ("error" in result) return;

    dispatch(
      setWallet({
        account: address,
        wallet_name: connector?.name ?? "Connected Wallet",
      })
    );
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

    await add_address();
    setTimeout(() => router.push("/dashboard"), 2000);
    // setIsLoading(false);
  };

  console.log("====================================");
  console.log(formData);
  console.log("====================================");

  return (
    <div className="mt-[5rem] flex justify-center items-center">
      <div className="lg:w-[85%] xl:grid grid-cols-10 px-5 sm:px-10 md:px-20">
        <div className="col-span-4 relative w-full h-full flex flex-col justify-between text-whit p-7 sm:p-10">
          <div
            // id="gradient-border"
            className="absolute top-0 left-0 w-full h-[150%] xl:w-[120%] xl:h-full rounded-b-lg bg-[#33b1ba1c]/10 border-2 border-[#33b1baa2]/30 rounded-md"
          ></div>

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
            id="gradient-border"
            className="bg-[#fcfcfc] rounded-[1rem] p-4 sm:p-7"
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

              <label>
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Password
                  </p>
                </div>

                <input
                  required
                  type="password"
                  name="password"
                  sub-child={"user"}
                  value={formData.password}
                  onChange={editFormData}
                  // placeholder="**********"
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
