"use client";

import { response_message } from "@/components/utilities/utils";
import { NavigationTemplate } from "@/components/utilities/utils.template";
import { useUploadAvatarMutation } from "@/redux/api/main";
import { setDefault, setRefetch } from "@/redux/slice/users";
import { RootState } from "@/redux/store";
import { useLogOut } from "@/Wallet/privy/privy.utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEdit, FaRegImages } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { user, organization } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<{ image: any }>({
    image: null,
  });
  const [open, setOpen] = useState(false);
  const { disconnect_wallet } = useLogOut();

  console.log("====================================");
  console.log(user);
  console.log("====================================");

  const path = useRouter();
  const dispatch = useDispatch();

  const log_out = async () => {
    dispatch(setDefault({}));
    await disconnect_wallet().finally(() => {
      localStorage.clear();

      setTimeout(() => {
        path.push("/sign-in");
      }, 1000);
    });
  };

  const [Upload_Avatar, { isLoading }] = useUploadAvatarMutation();
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await Upload_Avatar({ body: formData });
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
      message: "Profile photo edited successfully",
      option: "scc",
    });

    dispatch(setRefetch());
    // setTimeout(() => router.push("/dashboard/profile"), 2000);
  };

  const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]; // safe check
    if (!selectedFile) {
      return response_message({
        message: "You didn't select any file",
        option: "wrn",
      });
    }

    setFormData((prev) => ({ ...prev, image: selectedFile }));
  };

  return (
    <div className="px-5 sm:px-10">
      <NavigationTemplate
        title="Settings"
        navigation={[
          { title: "Dashboard", path: "/dashboard" },
          { title: "Settings", path: "#" },
        ]}
      />

      {open && (
        <div className="fixed top-0 left-0 z-1000 w-full h-full bg-gray-800/10 flex justify-center items-center">
          <div className="bg-[#fffff9] 0 w-100 rounded-lg p-7">
            <div className="flex justify-end">
              <IoClose
                onClick={() => setOpen((prev) => !prev)}
                className="text-[1.5rem] cursor-pointer"
              />
            </div>

            <div className="flex flex-col items-center justify-center p-5">
              <div className="relative min-w-50 min-h-50 w-40 h-50 bg-gray-100 flex justify-center items-center rounded-full overflow-hidden">
                {formData?.image ? (
                  <img
                    className="object-cover w-full h-full"
                    src={URL.createObjectURL(formData.image)}
                    alt=""
                  />
                ) : (
                  <Image
                    src={"/icons/profile-icon.png"}
                    className="opacity-20"
                    alt=""
                    width={80}
                    height={80}
                  />
                )}

                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-7">
                  <label
                    htmlFor="Campaign-Banner"
                    className="w-full h-full text-black bg-white/50 rounded-full flex items-center justify-center cursor-pointer gap-3 px-5 py-3"
                  >
                    <FaRegImages className="text-[1.5rem]" />
                    <p>Upload</p>
                  </label>

                  <input
                    required
                    id="Campaign-Banner"
                    type="file"
                    sub-child={"false"}
                    onChange={addFile}
                    accept=".jpg,.jpeg,.png"
                    className="absolute opacity-0 pointer-events-none"
                  />
                </div>
              </div>

              {formData?.image ? (
                <button
                  onClick={submit}
                  className="gradient-cto w-[70%] rounded-full cursor-pointer flex items-center justify-center gap-1 text-[1.2rem] text-white py-3 mt-5"
                >
                  {isLoading ? (
                    <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
                  ) : (
                    <FaEdit />
                  )}{" "}
                  <p>Submit</p>
                </button>
              ) : (
                <button
                  onClick={() => setOpen((prev) => !prev)}
                  className="w-[70%] bg-gray-200 rounded-full cursor-pointer flex items-center justify-center gap-1 text-[1.2rem] py-3 mt-5"
                >
                  <FaEdit /> <p>Edit</p>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="w-full rounded-4xl bg-white border-2 border-gray-200 p-5 md:p-10 mt-5">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="min-w-40 min-h-40 w-40 h-40 rounded-full flex justify-center items-center bg-gray-200 relative">
            {user?.user?.avatar ? (
              <Image
                src={user?.user?.avatar}
                alt=""
                className="w-full h-full object-cover rounded-full"
                fill
              />
            ) : (
              <Image
                className="rounded-full"
                src={"/icons/profile-icon.png"}
                alt=""
                width={80}
                height={80}
              />
            )}

            <button
              onClick={() => setOpen((prev) => !prev)}
              className="absolute bottom-0 right-[0.2rem] bg-gray-200 rounded-full border-5 border-white cursor-pointer pr-[.68rem] pl-3 py-[.70rem] text-[1.2rem]"
            >
              <FaEdit />
            </button>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <Link
              href={
                organization === true
                  ? `/dashboard/profile/edit-ngo?id=${user?.id}`
                  : organization === false
                    ? `/dashboard/profile/edit-donor`
                    : "#"
              }
              className="gradient-cto-border border border-transparent rounded-full text-lg px-5 py-3"
            >
              Edit Profile
            </Link>

            {/* <p className="text-gray-400 text-center md:text-left mt-3">
              At least 800*800 PX, Recommended. JPEG, or PNG with a maximum size
              of 2mb
            </p> */}
          </div>
        </div>

        <div className="w-full flex flex-col gap-5 p-5 mt-5">
          <div
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between ${
              organization === true && "border-b border-black/10"
            } px-5 pb-3`}
          >
            <p className="font-semibold mb-3 md:mb-0">Name</p>
            <p className="capitalize ml-1 md:ml-0">
              {organization === true
                ? user?.name || "loading..."
                : `${user?.first_name || "loading..."} ${
                    user?.last_name || ""
                  }`}
            </p>
          </div>

          {organization === true && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-black/10 px-5 pb-3">
                <p className="font-semibold mb-3 md:mb-0">Country</p>
                <p className="capitalize ml-1 md:ml-0">{user?.country}</p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-black/10 px-5 pb-3">
                <p className="font-semibold mb-3 md:mb-0">Address</p>
                <p className="capitalize ml-1 md:ml-0">{user?.address}</p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-5 pb-3">
                <p className="font-semibold mb-3 md:mb-0">
                  Account verification
                </p>
                <p className="capitalize ml-1 md:ml-0">
                  {user?.kyc_status === "verified" ? "True" : "False"}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="gradient-cto-border rounded-4xl w-full relative border-2 border-transparent mt-16">
        <div className="w-full flex flex-col gap-5 p-5 mt-5">
          {organization === true && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-black/10 px-5 pb-3">
              <p className="font-semibold mb-3 md:mb-0">KYC verification</p>
              <Link
                href={"/dashboard/setting/verify-kyc"}
                className={`bg-green-50 border-2 border-green-200 text-green-900 cursor-pointer font-bold rounded-lg text-center text-[0.9rem] px-9 py-2`}
              >
                Verify-Now
              </Link>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-5 pb-3">
            <p className="font-semibold mb-3 md:mb-0">Logout</p>
            <button
              onClick={log_out}
              className="bg-red-50 border-2 border-red-200 text-red-900 font-bold cursor-pointer rounded-lg text-[0.9rem] px-11 py-2"
            >
              Sign-Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
