"use client";

import { setDefault } from "@/redux/slice/users";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { user, organization } = useSelector((state: RootState) => state.user);

  console.log("====================================");
  console.log(user);
  console.log("====================================");

  const path = useRouter();
  const dispatch = useDispatch();

  const log_out = () => {
    dispatch(setDefault({}));
    localStorage.clear();

    setTimeout(() => {
      path.push("/sign-in");
    }, 1000);
  };

  return (
    <div className="px-5 sm:px-10">
      <div className="rounded-lg w-full relative border-[2px] border-transparent [background:linear-gradient(#fcfcfc,#fcfcfc)_padding-box,linear-gradient(90deg,#81288055,#eb202755)_border-box]">
        <div className="absolute top-0 left-[2rem] translate-y-[-50%] z-10 bg-[#fcfcfc] px-5 py-1">
          <p>Personal information</p>
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
                  {user?.approval_status === "APPROVED" ? "True" : "False"}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="rounded-lg w-full relative border-[2px] border-transparent [background:linear-gradient(#fcfcfc,#fcfcfc)_padding-box,linear-gradient(90deg,#81288055,#eb202755)_border-box] mt-[4rem]">
        <div className="absolute top-0 left-[2rem] translate-y-[-50%] z-10 bg-[#fcfcfc] px-5 py-1">
          <p>Quick actions</p>
        </div>

        <div className="w-full flex flex-col gap-5 p-5 mt-5">
          {organization === true && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-black/10 px-5 pb-3">
              <p className="font-semibold mb-3 md:mb-0">KYC verification</p>
              <Link
                href={"/dashboard/setting/verify-kyc"}
                className={`${
                  user?.approval_status === "APPROVED"
                    ? "bg-gray-50 border-2 border-gray-200 text-gray-900 pointer-events-none"
                    : "bg-green-50 border-2 border-green-200 text-green-900 cursor-pointer"
                } font-bold rounded-lg text-center text-[0.9rem] px-9 py-2`}
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
