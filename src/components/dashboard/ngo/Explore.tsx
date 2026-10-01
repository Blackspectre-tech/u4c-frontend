"use client";

import CampaignCard from "@/components/Campaign";
import CustomSelector from "@/components/SelectTag";
import {
  useGetCampaignAwaitMutation,
  useGetCampaignQuery,
} from "@/redux/api/main";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RiFileForbidFill } from "react-icons/ri";
import { TbPlus } from "react-icons/tb";
import { useSelector } from "react-redux";

export default function Explore() {
  const { wallet_type } = useSelector((state: RootState) => state.user);

  const [Get_Campaign, { isLoading, data }] = useGetCampaignAwaitMutation();
  const router = useRouter();
  const [params, setParams] = useState({
    categories__name: "",
    search: "",
    status: "",
    size: 10,
    page: 1,
  });

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

  // console.log("====================================");
  // console.log(user);
  // console.log(data);
  // console.log("====================================");

  return (
    <div className="">
      <div className="mt-20">
        <div className="flex flex-wrap justify-between items-center gap-5">
          <h1 className="font-bold text-xl md:text-2xl mb-2">
            Active Campaign
          </h1>

          <div className="flex flex-wrap items-center gap-5">
            <div className="w-[7rem] flex items-center gap-3 bg-gray-200 rounded-full">
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
                optionsList={Array.from({ length: 10 }, (_, i) =>
                  String(i + 1),
                )}
                placeholder="10"
                changeEvent={(selected) =>
                  setParams((prev) => ({
                    ...prev,
                    size: Number(selected?.value),
                  }))
                }
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
              {wallet_type === "pending" ? (
                <p>Kindly connect your wallet to view active campaigns</p>
              ) : (
                <p>You do not have any active campaigns</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
