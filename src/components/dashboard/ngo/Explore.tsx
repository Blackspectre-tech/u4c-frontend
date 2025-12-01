"use client";

import CampaignCard from "@/components/Campaign";
import {
  useGetCampaignAwaitMutation,
  useGetCampaignQuery,
} from "@/redux/api/main";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RiFileForbidFill } from "react-icons/ri";
import { TbPlus } from "react-icons/tb";
import { useSelector } from "react-redux";

export default function Explore() {
  const { user } = useSelector((state: RootState) => state.user);

  const [Get_Campaign, { isLoading, data }] = useGetCampaignAwaitMutation();
  const router = useRouter();

  const refetch = async () => {
    const result = await Get_Campaign({ params: {} });

    // if ("error" in result) router.back();
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log(result);
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
  };

  useEffect(() => {
    (async () => {
      await refetch();
    })();

    return () => {};
  }, []);

  // console.log("====================================");
  // console.log(user);
  // console.log(data);
  // console.log("====================================");

  return (
    <div className="">
      <div className="w-full relative bg-[#0000000a]/30 col-span-6 rounded-lg overflow-hidden object-center bg-[url('https://images.unsplash.com/photo-1740568439252-b060d7ff3437?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds')]">
        <div className="w-full h-full bg-[linear-gradient(90deg,#812880a1,#eb2027e1)] text-white p-5 md:p-10">
          <h1 className="text-2xl md:text-3xl font-semibold">
            Welcome back, <span className="font-bold">{user?.name}!</span>
          </h1>
          <p className="mt-2">Here’s what happened since your last login</p>
        </div>
      </div>

      <div className="mt-[5rem]">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl md:text-2xl mb-2">
            Active Campaign
          </h1>

          <Link
            href={"/dashboard/campaign/add"}
            className="text-[#381237] font-bold cursor-pointer text-[1.3rem] md:text-[1.5rem]
             rounded-lg md:rounded-xl border-[2px] border-transparent
             [background:linear-gradient(#fcfcfc,#fcfcfc)_padding-box,linear-gradient(90deg,#812880,#eb2027)_border-box] overflow-hidden"
          >
            <div className="hover:bg-[#812880]/5 p-2 md:p-3">
              <TbPlus />
            </div>
          </Link>
        </div>

        <div className="flex flex-col min-[800]:grid grid-cols-2 min-[1450]:grid-cols-3 gap-5 mt-8 ">
          {isLoading
            ? [1, 2, 3, 5].map((campaign, index) => (
                <div key={index} className="">
                  <CampaignCard
                    donate={false}
                    loading={true}
                    status={""}
                    deadline={""}
                  />
                </div>
              ))
            : data?.results.map((campaign: any, index: number) => (
                <div key={index} className="">
                  <CampaignCard
                    refetch={refetch}
                    id={campaign?.id}
                    donate={false}
                    loading={false}
                    deadline={campaign?.deadline}
                    status={campaign?.status}
                    deployed={campaign?.deployed}
                    image={campaign?.image || ""}
                    title={campaign?.title || ""}
                    description={campaign?.description || ""}
                    progress={campaign?.progress || ""}
                    approved={campaign?.approval_status === "APPROVED"}
                    isApproved={
                      campaign?.approval_status === "APPROVED" ? true : false
                    }
                    path={
                      campaign?.id
                        ? `/dashboard/campaign/overview?id=${campaign?.id}`
                        : "#"
                    }
                    date={campaign?.created_at || null}
                  />
                </div>
              ))}
        </div>

        <div className="px-5">
          {isLoading === false && !(data?.results?.length > 0) && (
            <div className="bg-[#0000000a]/30 border-2 border-[#0000000a]/70 rounded-lg flex flex-col justify-center items-center p-10">
              <RiFileForbidFill className="text-[3rem] font text-black/30 mb-3" />
              <p>You do not have any active campaigns</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
