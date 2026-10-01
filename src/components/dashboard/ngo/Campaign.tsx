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
import { SiHiveBlockchain } from "react-icons/si";
import Pagination from "@/components/Pagination";
import { NavigationTemplate } from "@/components/utilities/utils.template";
import CustomSelector from "@/components/SelectTag";
import { get_time_expiry } from "@/components/utilities/utils";

function Campaign() {
  const { user, wallet_type } = useSelector((state: RootState) => state.user);

  const [params, setParams] = useState({
    categories__name: "",
    search: "",
    status: "",
    size: 13,
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
  }, [params]);

  console.log("====================================");
  console.log(data);
  console.log("====================================");

  const campaign_status = ["All", "Failed", "Completed"];

  return (
    <div className="">
      <NavigationTemplate
        title="Campaigns"
        navigation={[
          { title: "Dashboard", path: "/dashboard" },
          { title: "Campaigns", path: "#" },
        ]}
      />

      <div className="mt-5 w-full h-full bg-gray-100 rounded-4xl flex flex-wrap justify-between gap-10 p-7">
        <Insight
          colorTint={"bg-[#FFD3BA]"}
          icon={<BsShieldFillCheck className="text-[#9C4617]" />}
          value={user?.approved_projects}
          description={"Approved Campaign"}
        />

        <Insight
          colorTint={"bg-[#A6FAFF]"}
          icon={<RiFileList3Fill className="text-[#1D6166]" />}
          value={user?.total_projects}
          description={"Campaigns"}
        />

        <Insight
          colorTint={"bg-[#FF8FFC]"}
          icon={<SiHiveBlockchain className="text-[#822580]" />}
          value={user?.onchain_projects}
          description={"Published Campaigns"}
        />

        <Insight
          colorTint={"bg-[#FFE6A3]"}
          icon={<SiHiveBlockchain className="text-[#A2790C]" />}
          value={"0"}
          description={"Completed Campaigns"}
        />

        {/* <Insight
          colorTint={"bg-[#FFD3DA]"}
          icon={<SiHiveBlockchain className="text-[#A9190C]" />}
          value={"0"}
          description={"UnCompleted Campaigns"}
        /> */}
      </div>

      <div className="mt-20">
        <div className="flex flex-wrap justify-between items-center gap-5">
          <h1 className="font-bold text-xl md:text-2xl mb-2">All Campaign</h1>

          <div className="flex flex-wrap items-center gap-5">
            <div className="w-52 flex items-center gap-3 bg-gray-200 rounded-full">
              <CustomSelector
                // optionsList={["USDT", "USDC", "Fiat VIA Transak/Card"]}
                control_class={"w-full"}
                control_style={{
                  // borderRadius: "0.5rem",
                  border: "none",
                  padding: "0.35rem 0.75rem",
                  backgroundColor: "",
                  outline: "0",
                  stroke: "0",
                  width: "100%",
                  flex: 1,
                }}
                optionsList={campaign_status}
                placeholder="All"
                changeEvent={(selected) => {
                  if (!selected) return;

                  if ((selected?.value as string) === "All")
                    setParams((prev) => ({ ...prev, status: "" }));
                  else
                    setParams((prev) => ({
                      ...prev,
                      status: selected?.value as string,
                    }));
                }}
                mapOption={(val) => ({
                  value: val,
                  name: val,
                  label: (
                    <div className="flex items-center">
                      <p>{val}</p>
                    </div>
                  ),
                })}
              />
            </div>

            <Link
              href={"/dashboard/campaign/add"}
              className="gradient-cto rounded-full flex items-center gap-2 py-2 md:py-3 px-5"
            >
              <TbPlus /> <p className="">Add Campaign</p>
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:grid grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
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
                <div
                  key={index}
                  className={
                    params.status === "Funding"
                      ? `${
                          get_time_expiry(campaign?.deadline) === "0" &&
                          "hidden"
                        }`
                      : ""
                  }
                >
                  <CampaignCard
                    donate={false}
                    loading={false}
                    id={campaign?.id}
                    refetch={refetch}
                    status={campaign?.status}
                    deadline={campaign?.deadline}
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
                    sadaqah={campaign?.sadaqah === true}
                  />
                </div>
              ))}
        </div>

        <div className="px-5">
          {isLoading === false && !(data?.results?.length > 0) && (
            <div className="bg-[#0000000a]/30 border-2 border-[#0000000a]/70 rounded-lg flex flex-col justify-center items-center p-10">
              <RiFileForbidFill className="text-[3rem] font text-black/30 mb-3" />
              {wallet_type === "pending" ? (
                <p>Kindly connect your wallet to view active campaigns</p>
              ) : (
                <p>You do not have any active campaigns</p>
              )}
            </div>
          )}
        </div>

        <Pagination
          data={data}
          count={13}
          params={params}
          setParams={setParams}
        />
      </div>
    </div>
  );
}

export default Campaign;
