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
import {
  MdCancel,
  MdLanguage,
  MdLocationOn,
  MdOutlineMail,
} from "react-icons/md";

type Params_Type = {
  categories__name: string;
  search: string;
  status: string;
  size: number;
  page: number;
};

const social_platforms = [
  { key: "instagram", Icon: SiInstagram, base: "https://instagram.com/" },
  { key: "facebook", Icon: FaFacebook, base: "https://facebook.com/" },
  { key: "twitter", Icon: FaTwitter, base: "https://x.com/" },
  { key: "youtube", Icon: FaYoutube, base: "https://youtube.com/" },
];

// Socials may be saved as a full URL or just a handle.
const social_link = (value: string, base: string) =>
  value.startsWith("http") ? value : base + value.replace(/^@/, "");

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
    console.log("campaign");
    console.log("campaign");
    console.log(campaign);
  };

  useEffect(() => {
    (async () => {
      const ngo = await Get_Ngo({ query: `/${id}/` });
      refetch();

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
    else if (value === "Expired")
      setParams((prev) => ({ ...prev, status: "Failed" }));
    else setParams((prev) => ({ ...prev, status: value }));

    await refetch();
  };

  const editSearch = async (value: string) => {
    setParams((prev) => ({ ...prev, search: value }));
    await refetch();
  };

  const d_profile = "/icons/profile-icon.png";
  const VERIFIED = data?.kyc_status === "verified";

  console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
  console.log(data);
  console.log(ngo_campaign);
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

  const socials = social_platforms.filter(
    (platform) => data?.socials?.[platform.key],
  );

  const location = data?.address
    ? data?.country &&
      !data.address.toLowerCase().includes(data.country.toLowerCase())
      ? `${data.address}, ${data.country}`
      : data.address
    : data?.country || "";

  const website_label = (data?.website || "")
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  const total_projects = Number(data?.total_projects || 0);
  const onchain_projects = Number(data?.onchain_projects || 0);
  const onchain_rate =
    total_projects > 0
      ? Math.round((onchain_projects / total_projects) * 100)
      : 0;

  // Opens the visitor's email app with a pre-filled enquiry to the organization.
  const enquiry_link = data?.user?.email
    ? `mailto:${data.user.email}?subject=${encodeURIComponent(
        `Enquiry for ${data?.name || "your organization"}`,
      )}&body=${encodeURIComponent(
        `Hello ${data?.name || "there"},\n\nI found your organization on United4Change and would like to know more about your work.\n\n${typeof window !== "undefined" ? window.location.href : ""}\n\nThank you.`,
      )}`
    : "";

  return (
    <>
      <div className="px-5 sm:px-10 mt-20">
        <div className="relative rounded-4xl overflow-hidden bg-gray-100">
          <div className="gradient-cto-two relative h-40 sm:h-56 overflow-hidden">
            <div className="absolute -top-16 -right-10 w-64 h-64 rounded-full bg-white/10"></div>
            <div className="absolute -bottom-24 left-[35%] w-72 h-72 rounded-full bg-white/10"></div>
            <div className="absolute top-8 left-10 w-16 h-16 rounded-full bg-white/10"></div>
          </div>

          <div className="px-5 sm:px-10 pb-8 pt-10">
            <div className="flex flex-col items-center gap-5 text-center -mt-16 sm:-mt-20 lg:flex-row lg:items-end lg:text-left">
              <div className="relative w-32 h-32 min-w-32 sm:w-40 sm:h-40 sm:min-w-40 rounded-full bg-white p-1.5 shadow-lg">
                <div className="relative w-full h-full rounded-full overflow-hidden flex justify-center items-center bg-gray-100">
                  {data?.user?.avatar ? (
                    <Image
                      src={data?.user?.avatar}
                      alt=""
                      className="w-full h-full object-cover"
                      fill
                    />
                  ) : (
                    <Image src={d_profile} alt="" width={110} height={110} />
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0 lg:pb-3">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <h1 className="text-3xl sm:text-4xl font-bold">
                    {data?.name}
                  </h1>

                  <div
                    className={`${VERIFIED === true ? "bg-[#33b2ba]/5 text-[#1b5f64] border border-[#33b2ba]/25" : "bg-[#ba3333]/5 text-[#721e1e] border border-[#ba3333]/25"} rounded-full flex items-center gap-1.5 px-3 py-1`}
                  >
                    {VERIFIED === true ? (
                      <FaCircleCheck className="text-[1.1rem]" />
                    ) : (
                      <MdCancel className="text-[1.2rem]" />
                    )}

                    <p className="text-sm font-semibold">
                      {VERIFIED === true ? "Verified NGO" : "Un-Verified NGO"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 mt-3 text-gray-600">
                  {location && (
                    <p className="flex items-center gap-2">
                      <MdLocationOn className="text-[1.2rem]" />
                      {location}
                    </p>
                  )}

                  {data?.user?.email && (
                    <p className="flex items-center gap-2 break-all">
                      <MdOutlineMail className="text-[1.2rem]" />
                      {data?.user?.email}
                    </p>
                  )}

                  {data?.website && (
                    <a
                      href={data.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 break-all hover:text-black"
                    >
                      <MdLanguage className="text-[1.2rem]" />
                      {website_label}
                    </a>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 lg:pb-3">
                {socials.map(({ key, Icon, base }) => (
                  <a
                    key={key}
                    href={social_link(data?.socials?.[key] || "", base)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key}
                    className="gradient-cto-border border border-transparent block w-11 h-11 rounded-full"
                  >
                    <span className="hover:bg-gray-50 w-full h-full flex items-center justify-center rounded-full text-[1.2rem]">
                      <Icon />
                    </span>
                  </a>
                ))}

                {enquiry_link && (
                  <a
                    href={enquiry_link}
                    title="Enquire about this organization"
                    aria-label="Enquire about this organization"
                    className="gradient-cto-border border border-transparent block w-fit rounded-xl"
                  >
                    <p className="hover:bg-gray-50 flex items-center gap-2 text-sm font-semibold rounded-xl px-4 py-2.5">
                      <MdOutlineMail className="text-[1.2rem]" />
                      Enquire
                    </p>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
          {[
            { label: "Total Projects", value: `${total_projects}` },
            { label: "Published On-chain", value: `${onchain_projects}` },
            { label: "On-chain Rate", value: `${onchain_rate}%` },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl bg-white border border-gray-200 shadow-sm p-6 text-center"
            >
              <p className="text-4xl font-bold">
                <span id="gradient-txt">{stat.value}</span>
              </p>
              <p className="text-sm font-semibold text-gray-500 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <OurStory description={data?.description || ""} verified={VERIFIED} />

      <div className="w-full p-5 sm:p-20 mt-[5rem]">
        <h2 className="text-3xl font-bold mb-8 text-center sm:text-left">
          Campaigns by <span id="gradient-txt">{data?.name}</span>
        </h2>

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
                    sadaqah={campaign?.sadaqah === true}
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
