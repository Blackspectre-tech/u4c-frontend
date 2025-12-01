"use client";

import OurStory from "@/components/OurStory";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { SiInstagram } from "react-icons/si";
import ExploreFilter from "@/components/ExploreFilter";
import Campaign from "@/components/Campaign";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useGetNgoCampaignMutation,
  useGetNgoPublicMutation,
} from "@/redux/api/main";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";

type Params_Type = {
  categories__name: string;
  search: string;
  status: string;
  size: number;
  page: number;
};

export default function Home() {
  const router = useRouter();
  const url_params = useSearchParams();
  const id = url_params.get("id");

  const [params, setParams] = useState<Params_Type>({
    categories__name: "",
    search: "",
    status: "",
    size: 6,
    page: 1,
  });

  const [Get_Campaign, { data: ngo_campaign, isLoading }] =
    useGetNgoCampaignMutation();
  const [Get_Ngo, { data, error }] = useGetNgoPublicMutation();

  const refetch = async () => {
    console.log("(((((((((((((((())))))))))))))))))");
    console.log(params);
    console.log("(((((((((((((((())))))))))))))))))");

    const campaign = await Get_Campaign({ params, query: `/${id}` || "" });
  };

  useEffect(() => {
    (async () => {
      const ngo = await Get_Ngo({ query: `/${id}/` });
      if (error) router.back();
    })();

    return () => {};
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const campaign = await refetch();
  //   })();

  //   return () => {};
  // }, [params]);

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

  const d_profile = "/icons/profile-icon.png";

  console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
  console.log(data);
  console.log(ngo_campaign);
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

  return (
    <>
      <div className=" px-5 sm:px-10 md:px-20 mt-[5rem]">
        <div className="bg-gradient-to-r from-[#812880] to-[#eb2027] to-60% rounded-lg text-white relative h-[20rem]">
          <div className="w-[15rem] h-[15rem] rounded-full bg-white absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] p-2">
            <div className="w-full h-full rounded-full relative overflow-hidden flex justify-center items-center">
              {data?.user?.avatar ? (
                <Image
                  src={data?.user?.avatar}
                  alt=""
                  className="w-full h-full object-cover rounded-lg"
                  fill
                />
              ) : (
                <Image src={d_profile} alt="" width={150} height={150} />
              )}
            </div>
          </div>
        </div>

        <div className="text-center px-5 lg:px-10 mt-[9rem]">
          <h1 className="text-3xl font-bold my-5">{data?.name}</h1>

          <p className="text-xl font-semibold">{data?.user?.email}</p>

          <div className="flex flex-wrap justify-center items-center gap-5 mt-5">
            {data?.approval_status === "APPROVED" ? (
              <div className="bg-[#33b2ba]/5 border-2 border-[#33b2ba]/50 text-[#1b5f64] rounded-lg flex items-center gap-1 px-5 py-2">
                <div className="w-10 h-10 text-[1.5rem] flex justify-center items-center">
                  <FaCircleCheck className="text-[1.7rem]" />
                </div>
                <p className="text-lg font-semibold wrap-break-word">
                  Verified NGO
                </p>
              </div>
            ) : (
              <div className="bg-[#ba3333]/5 border-2 border-[#ba3333]/50 text-[#721e1e] rounded-lg flex items-center gap-1 px-5 py-2">
                <div className="w-10 h-10 text-[1.5rem] flex justify-center items-center">
                  <FaCircleCheck className="text-[1.7rem]" />
                </div>
                <p className="text-lg wrap-break-word">Verified NGO</p>
              </div>
            )}

            {data?.socials?.instagram && (
              <div
                id="gradient-border"
                className="w-[3.5rem] h-[3.5rem] min-w-[2.8rem] min-h-[2.8rem] xl:w-[3.2rem] xl:h-[3.2rem] xl:min-w-[3.2rem] xl:min-h-[3.2rem] flex justify-center items-center rounded-lg text-[1.5rem] bg-red-200"
              >
                <SiInstagram />
              </div>
            )}

            {data?.socials?.facebook && (
              <div
                id="gradient-border"
                className="w-[3.5rem] h-[3.5rem] min-w-[2.8rem] min-h-[2.8rem] xl:w-[3.2rem] xl:h-[3.2rem] xl:min-w-[3.2rem] xl:min-h-[3.2rem] flex justify-center items-center rounded-lg text-[1.5rem] bg-red-200"
              >
                <FaFacebook />
              </div>
            )}

            {data?.socials?.twitter && (
              <div
                id="gradient-border"
                className="w-[3.5rem] h-[3.5rem] min-w-[2.8rem] min-h-[2.8rem] xl:w-[3.2rem] xl:h-[3.2rem] xl:min-w-[3.2rem] xl:min-h-[3.2rem] flex justify-center items-center rounded-lg text-[1.5rem] bg-red-200"
              >
                <FaTwitter />
              </div>
            )}

            {data?.socials?.youtube && (
              <div
                id="gradient-border"
                className="w-[3.5rem] h-[3.5rem] min-w-[2.8rem] min-h-[2.8rem] xl:w-[3.2rem] xl:h-[3.2rem] xl:min-w-[3.2rem] xl:min-h-[3.2rem] flex justify-center items-center rounded-lg text-[1.5rem] bg-red-200"
              >
                <FaYoutube />
              </div>
            )}
          </div>
        </div>
      </div>

      <OurStory description={data?.description || ""} />

      <div className="w-full p-5 sm:p-20 mt-[5rem]">
        <ExploreFilter
          category={editCategory}
          status={editStatus}
          search={editSearch}
          search_value={params.search}
        />

        <div className="mt-[5rem] flex flex-col md:grid grid-cols-2 xl:grid-cols-3 gap-5">
          {isLoading
            ? [1, 2, 3, 4, 5, 6].map((campaign, index) => (
                <div key={index} className="">
                  <Campaign
                    donate={false}
                    loading={true}
                    status={""}
                    deadline={""}
                  />
                </div>
              ))
            : ngo_campaign?.results.map((campaign: any, index: number) => (
                <div key={index} className="">
                  <Campaign
                    donate={true}
                    loading={false}
                    deadline={campaign?.deadline}
                    status={campaign?.status}
                    image={campaign?.image || ""}
                    title={campaign?.title || ""}
                    description={campaign?.description || ""}
                    progress={campaign?.progress || ""}
                    path={campaign?.id ? `/campaign?id=${campaign?.id}` : "#"}
                    date={campaign?.created_at || null}
                  />
                </div>
              ))}
        </div>

        <Pagination
          data={ngo_campaign}
          count={6}
          params={params}
          setParams={setParams}
        />
      </div>

      {/* <Reviews /> */}
    </>
  );
}
