"use client";

import Campaign from "@/components/Campaign";
import ExploreFilter from "@/components/ExploreFilter";
import Hero from "@/components/Hero";
import Pagination from "@/components/Pagination";
import { get_time_expiry } from "@/components/utilities/utils";
import { useGetPopularCampaignQuery } from "@/redux/api/main";
import { use, useEffect, useState } from "react";

export default function Home() {
  const [params, setParams] = useState<{
    categories__name: string;
    search: string;
    status: string;
    sadaqah?: boolean;
    size: number;
    page: number;
  }>({
    categories__name: "",
    search: "",
    status: "",
    size: 20,
    page: 1,
  });
  const { isLoading, data, refetch } = useGetPopularCampaignQuery({
    params: { ...params },
  });

  console.log("[ params ]: ", params);

  // useEffect(() => {
  //   refetch().then(async () => {
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //   });

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
    else if (value === "Expired")
      setParams((prev) => ({ ...prev, status: "Failed" }));
    else setParams((prev) => ({ ...prev, status: value }));

    await refetch();
  };

  const editSadaqah = async (active: boolean) => {
    setParams((prev) => {
      const { sadaqah, ...rest } = prev;
      return active
        ? { ...rest, sadaqah: true, page: 1 }
        : { ...rest, page: 1 };
    });

    await refetch();
  };

  const editSearch = async (value: string) => {
    setParams((prev) => ({ ...prev, search: value }));
    await refetch();
  };

  console.log("====================================");
  console.log(params);
  console.log("====================================");

  return (
    <div className="">
      <Hero
        heading="Explore "
        heading_styled="Campaigns"
        paragraph="Search all projects currently in United4Change"
      />

      <div className="w-full p-5 sm:p-10 lg:p-20 mt-20">
        <ExploreFilter
          category={editCategory}
          status={editStatus}
          sadaqah={editSadaqah}
          sadaqah_active={params.sadaqah}
          search={editSearch}
          search_value={params.search}
        />

        <div className="mt-20 flex flex-col md:grid grid-cols-2 xl:grid-cols-3 gap-5 sm:px-5">
          {isLoading
            ? Array(10)
                .fill(0)
                ?.map((campaign, index) => (
                  <div key={index} className="">
                    <Campaign loading={true} status={""} deadline={""} />
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
                  <Campaign
                    donate={true}
                    deadline={campaign?.deadline}
                    status={campaign?.status || ""}
                    loading={false}
                    image={campaign?.image || ""}
                    title={campaign?.title || ""}
                    description={campaign?.description || ""}
                    progress={campaign?.progress || ""}
                    path={campaign?.id ? `/campaign?id=${campaign?.id}` : "#"}
                    date={campaign?.created_at || null}
                    sadaqah={campaign?.sadaqah === true}
                  />
                </div>
              ))}
        </div>

        <Pagination
          data={data}
          count={20}
          params={params}
          setParams={setParams}
        />
      </div>
    </div>
  );
}
