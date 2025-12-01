"use client";

import React, { useEffect, useState } from "react";
import CampaignCard from "@/components/Campaign";
import ExploreFilter from "@/components/ExploreFilter";
import Link from "next/link";
import { TbPlus } from "react-icons/tb";
import {
  useGetCampaignAwaitMutation,
  useGetCampaignQuery,
} from "@/redux/api/main";
import { RiFileForbidFill, RiFileList3Fill } from "react-icons/ri";
import Insight from "../Insight";
import { BsShieldFillCheck } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CampaignChart from "../CampaignChart";
import { useRouter } from "next/navigation";
import Pagination from "@/components/Pagination";

function Campaign() {
  const { organization } = useSelector((state: RootState) => state.user);

  const [params, setParams] = useState({
    categories__name: "",
    search: "",
    status: "",
    size: 20,
    page: 1,
  });

  const [Get_Campaign, { isLoading, data }] = useGetCampaignAwaitMutation();
  const router = useRouter();

  const refetch = async () => {
    const result = await Get_Campaign({ params: params });

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

  console.log("====================================");
  console.log(data);
  //   console.log(isLoading);
  console.log("====================================");

  // const editCategory = async (value: string) => {
  //   if (value === "All Categories")
  //     setParams((prev) => ({ ...prev, categories__name: "" }));
  //   else setParams((prev) => ({ ...prev, categories__name: value }));

  //   await refetch();
  // };

  const editCategory = async (value: string) => {
    if (value === "All Categories")
      setParams((prev) => ({ ...prev, categories__name: "" }));
    else setParams((prev) => ({ ...prev, categories__name: value }));

    await refetch();
  };

  const editStatus = async (value: string) => {
    if (value === "All Status") setParams((prev) => ({ ...prev, status: "" }));
    else setParams((prev) => ({ ...prev, status: value }));

    await refetch();
  };

  const editSearch = async (value: string) => {
    setParams((prev) => ({ ...prev, search: value }));
    await refetch();
  };

  return (
    <div className="">
      {/* <div className="flex flex-col xl:grid md:grid-cols-10 gap-5">
        <div className="w-full h-full col-span-6 xl:col-span-7 overflow-hidden object-center bg-[url('https://images.unsplash.com/photo-1740568439252-b060d7ff3437?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds')] rounded-lg">
          <div className="w-full max-h-[24rem] min-h-[24rem] bg-[linear-gradient(90deg,#812880a1,#eb2027e1)] p-4">
            <CampaignChart />
          </div>
        </div>

        <div className="w-full h-full  xl:col-span-3 flex flex-col md:grid grid-cols-3 xl:grid-cols-1 gap-5">
          <Insight
            icon={<BsShieldFillCheck />}
            value={user?.approved_projects}
            description={"Total approved projects"}
          />

          <Insight
            icon={<RiFileList3Fill />}
            value={user?.total_projects}
            description={"Total projects"}
          />

          <Insight
            icon={<RiFileList3Fill />}
            value={"500"}
            description={"Total donors"}
          />
        </div>
      </div> */}

      <div className="">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl mb-2">All Campaign</h1>

          {organization === true && (
            <Link
              href={"/dashboard/campaign/add"}
              className="text-[#381237] font-bold cursor-pointer text-[1.5rem]
             rounded-xl border-[2px] border-transparent
             [background:linear-gradient(#fcfcfc,#fcfcfc)_padding-box,linear-gradient(90deg,#812880,#eb2027)_border-box] overflow-hidden"
            >
              <div className="hover:bg-[#812880]/5 p-3">
                <TbPlus />
              </div>
            </Link>
          )}
        </div>

        <div className="py-10">
          <ExploreFilter
            category={editCategory}
            status={editStatus}
            search={editSearch}
            search_value={params.search}
          />
        </div>

        <div className="flex flex-col min-[800]:grid grid-cols-2 min-[1450]:grid-cols-3 gap-5 mt-8 ">
          {isLoading
            ? [1, 2, 3, 5].map((campaign, index) => (
                <div key={index} className="">
                  <CampaignCard loading={true} status={""} deadline={""} />
                </div>
              ))
            : data?.results.map((campaign: any, index: number) => (
                <div key={index} className="">
                  <CampaignCard
                    loading={false}
                    deadline={campaign?.deadline}
                    status={campaign?.status}
                    image={campaign?.image || ""}
                    title={campaign?.title || ""}
                    description={campaign?.description || ""}
                    progress={campaign?.progress || ""}
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

        <Pagination
          data={data}
          count={6}
          params={params}
          setParams={setParams}
        />
      </div>
    </div>
  );
}

export default Campaign;
