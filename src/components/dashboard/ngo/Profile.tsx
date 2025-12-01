"use client";

import { useGetNgoMutation } from "@/redux/api/main";
import { RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { user } = useSelector((state: RootState) => state.user);
  const [Get_Ngo, { data, isLoading }] = useGetNgoMutation();

  useEffect(() => {
    (async () => {
      const result = await Get_Ngo({ query: `/${user?.id}/` });
      console.log(result);
    })();

    return () => {};
  }, []);
  console.log("====================================");
  console.log(user);
  console.log("====================================");

  return (
    <div className="rounded-lg w-full relative border-[2px] border-transparent [background:linear-gradient(#fcfcfc,#fcfcfc)_padding-box,linear-gradient(90deg,#81288055,#eb202755)_border-box] mt-[3rem] md:mt-[4rem]">
      <div className="absolute top-0 left-[2rem] translate-y-[-50%] z-10 bg-[#fcfcfc] px-5 py-1">
        <p>Description</p>
      </div>
      <div className="w-full p-5">{user?.description}</div>
    </div>
  );
}

export default Profile;
