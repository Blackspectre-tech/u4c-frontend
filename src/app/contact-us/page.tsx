"use client";

import CustomSelector from "@/components/SelectTag";
import { post_jwt, response_message } from "@/components/utilities/utils";
import {
  useContactUsMutation,
  useGetProfileMutation,
  useSignInMutation,
} from "@/redux/api/main";
import {
  setOnline,
  setOrganization,
  setUser,
  setVerifyEmail,
} from "@/redux/slice/users";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TbExternalLink } from "react-icons/tb";
import { PhoneInput } from "react-international-phone";
import { useDispatch } from "react-redux";
import "react-international-phone/style.css";

export default function Home() {
  const [formData, setFormData] = useState<{
    full_name: string;
    email: string;
    phone: string;
    organization: string;
    inquiry_type: string;
    // subject: string;
    message: string;
    // file: any;
  }>({
    full_name: "",
    email: "",
    phone: "",
    organization: "",
    inquiry_type: "General Question",
    // subject: "",
    message: "",
    // file: "",
  });
  const [Contact_Us, { isLoading }] = useContactUsMutation();

  const editFormData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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

      return true;
    }

    return false;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setVerifyEmail(formData.email));

    const result = await Contact_Us({ params: {}, body: formData });
    if (is_error(result) === true) return;

    response_message({
      message: "Email Sent successfully",
      option: "scc",
    });
    // setTimeout(() => router.push("/dashboard"), 2000);
  };

  console.log("====================================");
  console.log(formData);
  console.log("====================================");

  return (
    <div className="mt-[5rem] flex justify-center items-center">
      <div className="lg:w-[85%] px-5 sm:px-10 md:px-20">
        <div className="relative w-full h-full flex flex-col justify-between text-whit p-7 sm:p-10">
          <div
            // id="gradient-border"
            className="absolute top-0 left-0 w-full h-[150%] rounded-b-lg bg-[#33b1ba1c]/10 border-2 border-[#33b1baa2]/30 rounded-md"
          ></div>

          <div className="">
            <h1 className="text-3xl font-bold relative z-10">Contact-Us</h1>
            <p className="relative z-10 mt-5">
              We built United4Change to solve the trust problem in charity, by
              using technology that proves every donation does what it says it
              will. Giving has never been this transparent or borderless
            </p>
          </div>
        </div>

        <div className="relative z-10 p-3 sm:p-5">
          <form
            onSubmit={submit}
            id="gradient-border"
            className="bg-[#fcfcfc] rounded-[1rem] p-4 sm:p-7"
          >
            <div className="flex flex-col gap-5 px-2">
              <label>
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Full name
                  </p>
                </div>

                <input
                  required
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={editFormData}
                  // placeholder="example@gmail.com"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>

              <label>
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">Email</p>
                </div>

                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={editFormData}
                  // placeholder="example@gmail.com"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>

              <label>
                <div className="flex items-center gap-4 pl-3 mb-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Phone number{" "}
                    <span className="text-gray-400">/ optional</span>
                  </p>
                </div>

                <PhoneInput
                  defaultCountry="ng"
                  value={formData.phone}
                  onChange={(phone) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: phone,
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
                      padding: "1.3rem 0.5rem",
                      borderRight: "1px solid #d1d5db", // Tailwind's border-gray-300
                      backgroundColor: "#f9fafb", // Tailwind's bg-gray-50
                      borderTopLeftRadius: "0.375rem", // rounded-md
                      borderBottomLeftRadius: "0.375rem", // rounded-md
                    },
                  }}
                />
              </label>

              <label>
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Organization Name{" "}
                    <span className="text-gray-400">/ optional</span>
                  </p>
                </div>

                <input
                  required
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={editFormData}
                  // placeholder="**********"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>

              <label>
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Inquiry type
                  </p>
                </div>

                <CustomSelector
                  optionsList={[
                    "General question",
                    "Technical Support",
                    "NGO Partnership",
                    "Donor Support",
                    "Media/Press",
                    "Other",
                  ]}
                  placeholder="Inquiry type"
                  changeEvent={(selected) =>
                    setFormData((prev) => ({
                      ...prev,
                      inquiry_type: String(selected?.value ?? ""),
                    }))
                  }
                  mapOption={(val) => ({
                    value: val,
                    name: val,
                    label: (
                      <div className="flex items-center gap-2">
                        <p>{val}</p>
                      </div>
                    ),
                  })}
                />
              </label>

              {/* <label>
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">Subject</p>
                </div>

                <input
                  required
                  type="text"
                  name="subject"
                  sub-child={"user"}
                  value={formData.subject}
                  onChange={editFormData}
                  // placeholder="**********"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label> */}

              {/* <label>
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    File upload
                  </p>
                </div>

                <input
                  required
                  type="file"
                  name="subject"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = e.target.files;

                    if (files && files.length > 0) {
                      console.log("Selected file:", files[0]);
                      setFormData((priv) => ({ ...priv, file: files[0] }));
                    }
                  }}
                  // placeholder="**********"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label> */}

              <label>
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">Message</p>
                </div>

                <textarea
                  required
                  name="message"
                  value={formData.message}
                  onChange={editFormData}
                  // placeholder="**********"
                  className="w-full h-[7rem] border border-black/15 outline-0 rounded-md resize-none mt-3 px-5 py-2"
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
