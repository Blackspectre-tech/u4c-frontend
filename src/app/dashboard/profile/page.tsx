"use client";

import Profile from "@/components/dashboard/ngo/Profile";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Home() {
  const { user, organization } = useSelector((state: RootState) => state.user);
  console.log("====================================");
  console.log(user);
  console.log("====================================");

  const d_profile = "/icons/profile-icon.png";

  return (
    <div className="px-5 sm:px-10">
      <div className="w-full relative bg-[#0000000a]/30 col-span-6 rounded-lg overflow-hidden object-center bg-[url('https://images.unsplash.com/photo-1740568439252-b060d7ff3437?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds')]">
        <div className="w-full min-h-[15rem] bg-[linear-gradient(90deg,#812880a1,#eb2027e1)] text-white p-10"></div>
      </div>

      <div className="flex flex-col md:grid grid-cols-10 gap-5 px-3 md:px-5">
        <div className="col-span-4 xl:col-span-3 min-h-[8rem] md:min-h-full relative">
          <div className="w-full absolute bottom-[-1rem] left-0 rounded-lg border-2 border-gray-50 p-2">
            <div className="min-h-[15rem] flex justify-center items-center rounded-lg bg-gray-50/40">
              {user?.user?.avatar ? (
                <Image
                  src={user?.user?.avatar}
                  alt=""
                  className="w-full h-full object-cover rounded-lg"
                  fill
                />
              ) : (
                <Image src={d_profile} alt="" width={150} height={150} />
              )}
            </div>
          </div>

          <Link
            href={
              organization === true
                ? `/dashboard/profile/edit-ngo?id=${user?.id}`
                : organization === false
                ? `/dashboard/profile/edit-donor`
                : "#"
            }
            className="absolute bottom-0 right-[1rem] bg-white rounded-md pr-[.68rem] pl-3 py-[.70rem] text-[1.2rem]"
          >
            <FaEdit />
          </Link>
        </div>

        <div className="col-span-6 xl:col-span-7 pt-5">
          <h1 className="text-3xl md:text-4xl font-bold">
            {organization
              ? user?.name
              : `${user?.first_name} ${user?.last_name}`}
          </h1>
          <div className="flex items-center gap-2 pl-3 mt-2">
            <div className="w-2 h-2 bg-[#33b2ba] translate-y-[.2rem] rounded-full"></div>
            <h1 className="text-lg font-semibold text-gray-600">
              {user?.user?.email}
            </h1>
          </div>
        </div>
      </div>

      {organization && <Profile />}
    </div>
  );
}
