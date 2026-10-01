"use client";

import { response_message } from "@/components/utilities/utils";
import { useSignUpDonorMutation } from "@/redux/api/main";
import { setVerifyEmail } from "@/redux/slice/users";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TbExternalLink } from "react-icons/tb";
import { PhoneInput } from "react-international-phone";
import { useDispatch } from "react-redux";
import "react-international-phone/style.css";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    user: { email: "", phone_number: "", password: "", password2: "" },
    username: "",
    first_name: "",
    last_name: "",
  });
  const [Sign_Up, { isLoading, data, error }] = useSignUpDonorMutation();

  const dispatch = useDispatch();

  const editFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sub_child = e.target.attributes.getNamedItem("sub-child")?.value;
    console.log("sub_child: ", sub_child);

    switch (sub_child) {
      case "user":
        setFormData((priv) => ({
          ...priv,
          user: { ...priv.user, [e.target.name]: e.target.value },
        }));
        break;

      default:
        setFormData((priv) => ({ ...priv, [e.target.name]: e.target.value }));
        break;
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setVerifyEmail(formData.user.email));

    const result = await Sign_Up({ params: {}, body: formData });
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

    response_message({ message: result.data?.message, option: "scc" });
    setTimeout(() => router.push("/verify-email"), 2000);
  };

  return (
    <div className="mt-20 flex justify-center items-center">
      <div className="xl:w-[85%] lg:grid grid-cols-1 px-5 sm:px-10 md:px-20">
        <div className="col-span-4 relative w-full h-full flex flex-col justify-between p-7 sm:p-10">
          <div className="absolute top-0 left-0 w-full h-[150%] rounded-b-lg bg-[#33b1ba1c]/10 border-2 border-[#33b1baa2]/30 rounded-md"></div>

          <div className="">
            <h1 className="text-4xl font-bold relative z-10">
              Donor Registration
            </h1>
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
              Sign-In <TbExternalLink className="text-[1.2rem]" />
            </Link>
          </div>
        </div>

        <div className="col-span-6 relative z-10 p-3 sm:p-5">
          <form
            onSubmit={submit}
            className="gradient-cto-border border-2 border-transparent bg-[#fcfcfc] rounded-2xl p-4 sm:p-7"
          >
            <div className="flex flex-col gap-5 px-2">
              <label>
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
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
                  // placeholder="adam@123"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>

              <label>
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
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
                  // placeholder="adam"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>

              <label>
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
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
                  value={formData.user.email}
                  onChange={editFormData}
                  // placeholder="example@gmail.com"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>

              <label>
                <div className="flex items-center gap-3 pl-3 mb-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Phone number
                  </p>
                </div>

                <PhoneInput
                  defaultCountry="ng"
                  value={formData.user.phone_number}
                  onChange={(phone) =>
                    setFormData((prev) => ({
                      ...prev,
                      user: { ...prev.user, phone_number: phone },
                    }))
                  }
                  inputStyle={{
                    padding: "1.3rem 0.5rem", // py-2 (0.5rem) and px-20 (~5rem)
                    border: "1px solid rgba(0,0,0,0.15)",
                    borderTopRightRadius: "0.375rem", // rounded-md
                    borderBottomRightRadius: "0.375rem", // rounded-md
                    outline: "none",
                    width: "100%",
                  }}
                  countrySelectorStyleProps={{
                    buttonStyle: {
                      padding: "1.3rem 1rem",
                      borderRight: "1px solid #d1d5db", // Tailwind's border-gray-300
                      backgroundColor: "#f9fafb", // Tailwind's bg-gray-50
                      borderTopLeftRadius: "0.375rem", // rounded-md
                      borderBottomLeftRadius: "0.375rem", // rounded-md
                    },
                  }}
                />
              </label>

              <label>
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Password
                  </p>
                </div>

                <input
                  required
                  type="password"
                  name="password"
                  sub-child={"user"}
                  value={formData.user.password}
                  onChange={editFormData}
                  // placeholder="**********"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>

              <label>
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Confirm password
                  </p>
                </div>

                <input
                  required
                  type="password"
                  name="password2"
                  sub-child={"user"}
                  value={formData.user.password2}
                  onChange={editFormData}
                  // placeholder="**********"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>

              <div className="flex items-center gap-3">
                <input type="checkbox" required />
                <p className="text-sm">
                  Accept our{" "}
                  <Link href={"/privacy-policy"} className="font-bold">
                    privacy policy
                  </Link>{" "}
                  and{" "}
                  <Link href={"/terms-of-use"} className="font-bold">
                    terms of use
                  </Link>
                </p>
              </div>
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
