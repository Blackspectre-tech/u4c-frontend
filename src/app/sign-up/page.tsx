"use client";

import { response_message } from "@/components/utilities/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPeopleCarry } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import { TbExternalLink } from "react-icons/tb";

export default function Home() {
  const [signUpType, setSignUpType] = useState<{
    path: string | null;
    type: string | null;
    active: boolean;
  }>({ path: null, type: null, active: false });

  const router = useRouter();

  const select_type = (e: React.MouseEvent<HTMLLabelElement>) => {
    const path = e.currentTarget.getAttribute("sign-up-path");
    const type = e.currentTarget.getAttribute("sign-up-type");

    console.log("====================================");
    console.log(path);
    console.log(type);
    console.log("====================================");

    setSignUpType((priv) => ({
      ...priv,
      path: path,
      type: type,
      active: true,
    }));
  };

  return (
    <div className="mt-[5rem] flex justify-center items-center">
      <div className="lg:w-[90%] xl:grid grid-cols-10 px-5 sm:px-10 md:px-20">
        <div className="col-span-4 relative w-full h-full flex flex-col justify-between text-whit p-7 sm:p-10">
          <div
            // id="gradient-border"
            className="absolute top-0 left-0 w-full h-[150%] xl:w-[120%] xl:h-full rounded-b-lg bg-[#33b1ba1c]/10 border-2 border-[#33b1baa2]/30 rounded-md"
          ></div>

          <div className="">
            <h1 className="text-3xl font-bold relative z-10">
              Choose your account type
            </h1>
            <p className="relative z-10 mt-5">
              We built United4Change to solve the trust problem in charity, by
              using technology that proves every donation does what it says it
              will. Giving has never been this transparent or borderless
            </p>
          </div>

          <div className="mt-5">
            <p className="relative z-10 mt-5">Do you have an account?</p>

            <Link
              href={"/sign-in"}
              className="flex justify-start items-center gap-2 text-xl font-semibold relative cursor-pointer pl-2 z-10 mt-2"
            >
              Sign-In <TbExternalLink className="text-[1.2rem]" />
            </Link>
          </div>
        </div>

        <div className="col-span-6 relative z-10 p-3 sm:p-5">
          <div
            id="gradient-border"
            className="bg-[#fcfcfc] rounded-[1rem] p-4 sm:p-7"
          >
            <div className="flex flex-col gap-5">
              <label
                sign-up-path="/sign-up/donor"
                sign-up-type="donor"
                onClick={select_type}
                className={`${
                  signUpType.type === "donor"
                    ? "bg-[#33b1ba79]/30 border-2 border-[#33b1baa2]/40 text-black"
                    : "bg-[#33b1ba79]/5 border-2 border-[#33b1baa2]/7 text-gray-600"
                } flex flex-col sm:flex-row items-center gap-5 rounded-lg cursor-pointer p-5`}
              >
                <div className="bg-[#33b2ba] w-20 h-20 min-w-20 min-h-20 rounded-lg flex justify-center items-center text-[3rem] text-white">
                  <FaPeopleCarry />
                </div>

                <div className="text-center sm:text-left">
                  <p className="text-xl font-semibold">Donor</p>
                  <p className="text-sm font-semibold mt-2">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Eum, id!
                  </p>
                </div>
              </label>

              <label
                sign-up-path="/sign-up/ngo"
                sign-up-type="ngo"
                onClick={select_type}
                className={`${
                  signUpType.type === "ngo"
                    ? "bg-[#33b1ba79]/30 border-2 border-[#33b1baa2]/40 text-black"
                    : "bg-[#33b1ba79]/5 border-2 border-[#33b1baa2]/7 text-gray-600"
                } flex flex-col sm:flex-row items-center gap-5 rounded-lg cursor-pointer p-5`}
              >
                <div className="bg-[#33b2ba] w-20 h-20 min-w-20 min-h-20 rounded-lg flex justify-center items-center text-[3rem] text-white">
                  {/* <MdOutlineHealthAndSafety /> */}
                  <MdHealthAndSafety />
                </div>

                <div className="text-center sm:text-left">
                  <p className="text-xl font-semibold">NGO</p>
                  <p className="text-sm font-semibold mt-2">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Eum, id!
                  </p>
                </div>
              </label>
            </div>

            <button
              onClick={() => {
                console.log("====================================");
                console.log(signUpType.path);
                console.log("====================================");

                if (signUpType.path) router.push(signUpType.path);
                else
                  response_message({
                    message:
                      "Kindly select if you want to register as a donor or ngo",
                    option: "wrn",
                  });
              }}
              className={`button_ w-full font-semibold rounded-lg cursor-pointer flex items-center justify-center gap-2 mt-7 py-3`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
