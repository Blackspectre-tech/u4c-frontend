"use client";

import Insight from "@/components/dashboard/Insight";
import LocationMap from "@/components/LocationMap";
import PaiChart from "@/components/PaiChart";
import Reviews from "@/components/Reviews";
import {
  format_date,
  get_percentage,
  get_time_expiry,
  response_message,
} from "@/components/utilities/utils";
import {
  useGetCampaignNgoMutation,
  useGetCommentsMutation,
  useGetDonationsMutation,
  useGetNgoPublicMutation,
  useGetPopularCampaignQuery,
} from "@/redux/api/main";
import { RootState } from "@/redux/store";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Get_Campaign_Details, Pledge_Token } from "@/Wallet/ConnectContract";
import { Smart_Pledge_Token } from "@/Wallet/ConnectSmartContract";
import { useGetSmartWallet, useGetWallet } from "@/Wallet/privy/privy.utils";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import { IoClose, IoPersonSharp, IoWallet } from "react-icons/io5";
import { MdDateRange, MdOutlineMail, MdTimer } from "react-icons/md";
import { SiHiveBlockchain } from "react-icons/si";
import { useSelector } from "react-redux";
import Milestone from "@/components/dashboard/ngo/Milestone";
import CommentComponent from "@/components/dashboard/Comment";
import { PiEmptyBold } from "react-icons/pi";
import CustomSelector from "@/components/SelectTag";
import GalleryComponent from "@/components/dashboard/Gallery";
import SadaqahBadge from "@/components/SadaqahBadge";
import Campaign from "@/components/Campaign";

export default function Home() {
  const { online, organization } = useSelector(
    (state: RootState) => state.user,
  );
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [gallery, setGallery] = useState<any>([]);
  const [milestones, setMilestones] = useState<any>([]);
  const [toggle, setToggle] = useState<string>("milestones");
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const { wallet } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState({
    amount: 0,
    tip: 0,
  });

  const [swiperInstanceMilestone, setSwiperInstanceMilestone] =
    useState<SwiperClass | null>(null);

  const [swiperInstanceComment, setSwiperInstanceComment] =
    useState<SwiperClass | null>(null);
  const [swiperInstanceRelated, setSwiperInstanceRelated] =
    useState<SwiperClass | null>(null);

  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  const use_wallet = useGetWallet();
  const smart_wallet = useGetSmartWallet();
  const [Get_Ngo, { data: ngo_data }] = useGetNgoPublicMutation();
  const [Get_Comments, { data: comment_data }] = useGetCommentsMutation();
  const [Get_Donations, { data: donation_data }] = useGetDonationsMutation();
  const [Get_Campaign, { isLoading }] = useGetCampaignNgoMutation();

  // Related campaigns: other campaigns that share any of this campaign's
  // "What Your Donation Provides" categories.
  const related_categories: string[] = data?.categories_display || [];
  const { data: related_data, isLoading: relatedLoading } =
    useGetPopularCampaignQuery(
      {
        params: {
          categories__name__in: related_categories.join(","),
          size: 7,
        },
      },
      { skip: related_categories.length === 0 },
    );
  const related_campaigns = (related_data?.results || [])
    .filter((campaign: any) => String(campaign?.id) !== String(id))
    .slice(0, 6);

  const is_error = (result: any): boolean => {
    console.log(result);

    if ("error" in result) {
      // response_message({ message: "Something went wrong?", option: "wrn" });
      return true;
    }

    return false;
  };

  const editFormData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFormData((priv) => ({ ...priv, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    // if (error) router.back();

    (async () => {
      const campaign = await Get_Campaign({ query: `/${id}/` });
      const comment = await Get_Comments({ query: `/${id}/` });
      const donation = await Get_Donations({ query: `/${id}/` });

      console.log(campaign.data);

      const ngo_query = `/${campaign?.data?.organization_id}/`;
      const ngo = await Get_Ngo({ query: ngo_query });

      console.log("====================================");
      console.log("comments");
      console.log(comment);
      console.log("donations");
      console.log(donation);
      console.log("campaign");
      console.log(campaign);
      console.log("====================================");

      const milestones_copy = campaign?.data?.milestones;
      const new_milestones = [...(milestones_copy || [])]?.sort(
        (a: any, b: any) => b?.percentage - a?.percentage,
      );

      const milestone_count = { value: 0 };
      const milestones_ = new_milestones
        ?.map((milestone: any, index: number) => {
          console.log("\n\n[ Milestone ]: ", milestone);
          const goal = new_milestones[index]?.percentage || 0;
          const next_goal = new_milestones?.[index + 1]?.percentage || 0;
          const percentage = goal - next_goal;

          const next_next_goal = new_milestones?.[index + 2]?.percentage || 0;
          const next_percentage = next_goal - next_next_goal;

          const surplus = Number(campaign?.data?.progress || 0) - 100;
          milestone_count.value =
            milestone_count.value +
            get_percentage(next_percentage, Number(campaign?.data?.goal || 0));

          return {
            ...milestone,
            new_percentage: percentage,
            surplus: surplus < 0 ? 0 : surplus,
            milestone_length: new_milestones.length,
            new_goal: get_percentage(
              percentage,
              Number(campaign?.data?.goal || 0),
            ),
            milestone_goal: campaign?.data?.goal,
            milestone_count: next_goal === 0 ? 0 : milestone_count.value,
          };
        })
        ?.sort((a: any, b: any) => a?.percentage - b?.percentage);

      // console.log("====================================");
      // console.log(comments);
      // console.log("====================================");

      if (is_error(campaign) === false) {
        setGallery(campaign.data?.milestones);
        setMilestones(milestones_);
        setData(campaign.data);
      }
    })();

    return () => {};
  }, [id]);

  const make_donation = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pledge_data = {
      id: data?.contract_id,
      grossAmount: formData.amount,
      tipAmount: formData.tip,
      wallet: use_wallet.connector,
    };

    // console.log("====================================");
    // console.log("====================================");
    // console.log("====================================");
    // console.log("====================================");
    // console.log("====================================");
    // console.log("====================================");
    // console.log("====================================");
    // console.log(data);
    // console.log(formData);
    // console.log(pledge_data);
    // console.log("====================================");

    if (online === false) {
      response_message({
        message: "Kindly login to continue.",
        option: "wrn",
      });
      return router.push("/sign-in");
    } else if (data?.status === "Failed" || data?.status === "Completed") {
      response_message({
        message: `This campaign ${
          data?.status === "Completed" ? "has been Completed" : "Closed"
        }`,
        option: "wrn",
      });
    } else if (organization === true)
      return response_message({
        message: "Kindly register as a donor to continue.",
        option: "wrn",
      });
    else if (!wallet.account)
      return response_message({
        message: "Kindly connect your wallet to continue.",
        option: "wrn",
      });

    setLoading(true);
    const core = await Get_Campaign_Details(pledge_data.id);

    console.log("\n\n\ncore");
    console.log("core");
    console.log("core");
    console.log("core");
    console.log("core");
    console.log("data: ", pledge_data);
    console.log(core);
    console.log(use_wallet);

    try {
      if (core) {
        // Example: donor pledges 100 USDT with 2 USDT tip
        const address = core[2];
        let pledge = null;

        if (use_wallet.isSmartAccount) {
          console.log("\n\n[ Is-Smart-Account ]: ");

          pledge = await Smart_Pledge_Token({
            ...pledge_data,
            token: address,
            smartClient: smart_wallet?.smartClient,
          });
        } else {
          pledge = await Pledge_Token({ ...pledge_data, token: address });
        }

        // Tx receipt returned
        console.log("pledge receipt:", pledge);
        if (pledge?.status === true) {
          setTransactionCount((prev) => prev + 1);
          response_message({
            message: "Transaction successful",
            option: "scc",
          });

          setTimeout(() => router.push(`/dashboard/campaign`), 1000);
        } else {
          const err_msg = {
            status:
              pledge.error ===
                "Transaction is processing. Please check your balance in a moment." &&
              use_wallet.isSmartAccount === true,
          };

          if (err_msg.status) {
            response_message({
              message: pledge?.error as string,
              option: "scc",
            });

            return setTimeout(() => router.push(`/dashboard/campaign`), 1000);
          }

          response_message({ message: pledge?.error as string, option: "wrn" });
        }
      }
    } finally {
      // Tx receipt returned
      // console.log("get campaign core:", core);
      setLoading(false);
      setOpen(false);
    }
  };

  const progress = Number(data?.progress || 0);
  const progress_ = progress > 100 ? 100 : progress;
  const FUNDED_AMOUNT = get_percentage(progress_, Number(data?.goal || 0));
  const OWING_AMOUNT = get_percentage(100 - progress_, Number(data?.goal || 0));
  const SURPLUS =
    progress < 101
      ? 0
      : get_percentage(progress - 100, Number(data?.goal || 0));

  // Opens the visitor's email app with a pre-filled enquiry to the organization.
  const enquiry_email = ngo_data?.user?.email;
  const enquiry_link = enquiry_email
    ? `mailto:${enquiry_email}?subject=${encodeURIComponent(
        `Enquiry about: ${data?.title || "your campaign"}`,
      )}&body=${encodeURIComponent(
        `Hello ${ngo_data?.name || "there"},\n\nI came across "${data?.title || "your campaign"}" on United4Change and would like to know more about it.\n\nCampaign: ${typeof window !== "undefined" ? window.location.href : ""}\n\nThank you.`,
      )}`
    : "";

  const style_check =
    (toggle === "milestones" && milestones.length > 3) ||
    (toggle === "gallery" && data?.extra_images.length > 3);

  // console.log("\n\n\n\n[ ***** ]");
  // console.log("Smart-Wallet: ", smart_wallet, "\n");
  // console.log("Use-Wallet: ", use_wallet, "\n");

  // console.log("====================================");
  // console.log(data?.country);
  // console.log(data);
  // console.log(
  //   `${data?.country || ""} ${data?.address || ""}`?.replace(" ", ", "),
  // );
  // console.log("====================================");
  // console.log("====================================");
  // console.log("ALL");
  // console.log(gallery);
  // console.log("images: ", data?.extra_images);
  // console.log("data: ", data);
  // console.log("ngo_data: ", ngo_data);
  // console.log("comment_data: ", comment_data);
  // console.log("donation_data: ", donation_data);
  // console.log("====================================");

  return (
    <>
      {open && (
        <div className="fixed top-0 left-0 z-1000 w-full h-full bg-gray-800/10 flex justify-center items-center">
          <div className="bg-[#fffff9] 0 w-100 rounded-lg p-7">
            <div className="flex justify-end">
              <IoClose
                onClick={() => setOpen((prev) => !prev)}
                className="text-[1.5rem] cursor-pointer"
              />
            </div>

            <form onSubmit={make_donation} className="flex flex-col gap-5 mt-2">
              <label>
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Donation amount
                  </p>
                </div>

                <div className="flex items-center mt-3">
                  <div className="bg-gray-200 min-w-[3.6rem] min-h-[2.63rem] rounded-l-md flex justify-center items-center">
                    <Image
                      src={"/icons/usdc-logo.png"}
                      alt=""
                      width={25}
                      height={25}
                    />
                  </div>

                  <input
                    required
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={editFormData}
                    // placeholder="**********"
                    className="w-full px-5 py-2 border border-black/15 outline-0 rounded-r-md"
                  />
                </div>
              </label>

              <label>
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Tip to treasury
                  </p>
                </div>

                <div className="flex items-center mt-3">
                  <div className="bg-gray-200 min-w-[3.6rem] min-h-[2.63rem] rounded-l-md flex justify-center items-center">
                    <Image
                      src={"/icons/usdc-logo.png"}
                      alt=""
                      width={25}
                      height={25}
                    />
                  </div>

                  <input
                    required
                    type="number"
                    name="tip"
                    value={formData.tip}
                    onChange={editFormData}
                    // placeholder="**********"
                    className="w-full px-5 py-2 border border-black/15 outline-0 rounded-r-md"
                  />
                </div>
              </label>

              <button
                // onClick={() => {
                //   setOpenDetails(false);
                //   disconnectWallet();
                // }}
                className="gradient-cto w-full border text-white font-semibold text-md rounded-lg cursor-pointer flex items-center justify-center gap-2 px-5 py-3 mt-5"
              >
                {loading && (
                  <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
                )}
                Transfer
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="px-5 md:px-10 pb-5">
        {isLoading === true || !data?.image ? (
          <div className="w-full min-h-70 rounded-4xl relative bg-gray-100 loading_ [--delay:0.5s] mt-5"></div>
        ) : (
          <div className={`w-full rounded-4xl overflow-hidden mt-5`}>
            <img alt="" src={data?.image} className="w-full" />
          </div>
        )}

        <div className="md:px-5 mt-5">
          <div className="flex justify-between items-center gap-5">
            <div className="">
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center">
                  <MdDateRange className="text-[1.8rem]" />
                </div>
                <p className="text-sm md:text-[1.2rem] font-semibold">
                  {!data?.deadline
                    ? format_date(
                        data?.created_at
                          ? new Date()
                          : new Date(data?.created_at),
                      )
                    : get_time_expiry(data?.deadline) === "0"
                      ? "Closed"
                      : `${get_time_expiry(data?.deadline)} left`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              {data?.status === "Failed" ? (
                <p className="px-5 py-2 text-sm text-[0.9rem] bg-[#ba3333]/10 text-[#721e1e] border border-[#ba3333]/15 rounded-lg">
                  Expired
                </p>
              ) : data?.status === "Cancelled" ? (
                <p className="px-5 py-2 text-sm text-[0.9rem] bg-[#ba3333]/10 text-[#721e1e] border border-[#ba3333]/15 rounded-lg">
                  Cancelled
                </p>
              ) : data?.status === "Completed" ? (
                <p className="px-5 py-2 text-sm text-[0.9rem] bg-[#319b29]/10 text-[#174714] border border-[#319b29]/15 rounded-lg">
                  {data?.status}
                </p>
              ) : get_time_expiry(data?.deadline) === "0" ? (
                <p className="px-5 py-2 text-sm text-[0.9rem] bg-[#ac12a4]/10 text-[#144447] border border-[#ac12a4]/15 rounded-lg">
                  Finalizing
                </p>
              ) : (
                <p className="px-5 py-2 text-sm text-[0.9rem] bg-[#33b2ba]/10 text-[#144447] border border-[#33b2ba]/15 rounded-lg">
                  Ongoing
                </p>
              )}

              <SadaqahBadge sadaqah={data?.sadaqah} className="px-5 py-2" />
            </div>
          </div>

          <div className="grid grid-cols-10 gap-5 mt-10">
            <div className="col-span-10 lg:col-span-5 xl:col-span-6">
              <div className="">
                <h1 className="text-4xl font-bold capitalize">{data?.title}</h1>
                <p className="font-semibold mt-2">
                  Published:{" "}
                  {format_date(new Date(data?.created_at || Date.now()))}
                </p>

                <p className="mt-5">{data?.description}</p>
                <p className="mt-3">{data?.summary}</p>
              </div>

              {ngo_data ? (
                <div className="flex justify-start mt-10">
                  <div className="rounded-4xl bg-gray-100 p-7">
                    <Link
                      href={`/ngo?id=${ngo_data?.id}`}
                      className="flex flex-wrap items-center gap-5"
                    >
                      <div className="flex items-center gap-5">
                        <div className="relative overflow-hidden flex items-center justify-center min-w-20 min-h-20 bg-white rounded-full">
                          {ngo_data?.user?.avatar ? (
                            <Image
                              className="w-full h-full object-cover object-center"
                              src={ngo_data?.user?.avatar}
                              alt="avatar"
                              fill
                            />
                          ) : (
                            <IoPersonSharp className="text-[5rem] translate-y-3 text-gray-500" />
                          )}
                        </div>

                        <div className="">
                          <h1 className="font-bold text-2xl">
                            {ngo_data?.name}
                          </h1>
                          <p className="font-semibold break-all">
                            {ngo_data?.user?.email}
                          </p>
                          {enquiry_link && (
                            <a
                              href={enquiry_link}
                              title="Enquire about this project"
                              aria-label="Enquire about this project"
                              className="flex items-center gap-2 w-fit mt-2"
                            >
                              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                              <p className="flex items-center gap-2 text-sm font-semibold">
                                <MdOutlineMail className="text-[1.2rem]" />
                                Enquire
                              </p>
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="border-l border-gray-400 pl-5 ml-3">
                        <p className="">
                          Total Projects:{" "}
                          <span className="font-semibold text-lg ml-1">
                            {ngo_data?.total_projects}
                          </span>
                        </p>
                        <p className="">
                          Published Projects:
                          <span className="font-semibold text-lg ml-1">
                            {ngo_data?.onchain_projects}
                          </span>
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="relative w-[80%] rounded-4xl bg-gray-100 flex items-center p-17 mt-10 loading_ [--delay:0.5s]"></div>
              )}

              <div className="my-5">
                <h1 className="font-semibold text-xl mb-3">
                  What Your Donation Provides
                </h1>

                <div className="flex flex-wrap gap-5 pl-5 mt-5">
                  {data?.categories_display?.map(
                    (provide: any, index: number) => (
                      <div
                        key={index}
                        className={`gradient-cto-border border border-transparent overflow-hidden rounded-full`}
                      >
                        <div className="px-5 py-3">
                          <p>{provide}</p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-10 lg:col-span-5 xl:col-span-4 relative">
              <div className="sticky top-0">
                <div className="rounded-t-4xl bg-gray-100 p-5">
                  <div className="flex items-center justify-center mb-5">
                    <PaiChart percentage={Number(data?.progress || 0)} />
                  </div>

                  <div className="flex flex-col min-[500px]:flex-row items-center justify-center">
                    <div className="flex flex-col items-center min-[500px]:items-start">
                      <h1 className="text-[1.5rem] font-bold">
                        {FUNDED_AMOUNT} USDC
                      </h1>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#109099]"></div>
                        <p className="text-sm">
                          <span className="text-[#33b2ba]">
                            {Number(data?.progress || 0)}%
                          </span>{" "}
                          Funded
                        </p>
                      </div>
                    </div>

                    <div className="w-20 min-[500px]:w-px h-px min-[500px]:h-10 bg-gray-300 my-5 min-[500px]:my-0 min-[500px]:mx-10"></div>

                    <div className="flex flex-col items-center min-[500px]:items-start">
                      <h1 className="text-[1.5rem] font-bold">
                        {OWING_AMOUNT < 0 ? 0 : OWING_AMOUNT} USDC
                      </h1>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#ff0505]"></div>
                        <p className="text-sm">
                          <span className="text-[#ff0505]">
                            {100 - Number(data?.progress || 0) < 0
                              ? 0
                              : 100 - Number(data?.progress || 0)}
                            %
                          </span>{" "}
                          Expected
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="gradient-cto-border border border-transparent rounded-b-4xl overflow-hidden mt-3">
                  <div className="bg-white flex flex-col min-[400px]:flex-row items-center justify-between p-2 md:p-5">
                    <Insight
                      surplus={SURPLUS}
                      value={data?.goal || 0}
                      colorTint={"bg-[#c0fbff]"}
                      description={"Total Goal"}
                      icon={<SiHiveBlockchain className="text-[#33b2ba]" />}
                    />

                    <div className="hidden md:block w-px h-10 bg-gray-300 mx-10"></div>

                    <Insight
                      colorTint={"bg-[#FFE6A3]"}
                      icon={<SiHiveBlockchain className="text-[#A2790C]" />}
                      value={donation_data?.length || 0}
                      description={"Total Donations"}
                    />
                  </div>
                  <button
                    onClick={() => setOpen(true)}
                    disabled={
                      data?.status === "Completed" ||
                      data?.status === "Failed" ||
                      get_time_expiry(data?.deadline) === "0"
                    }
                    className={`w-full flex items-center justify-center gap-3 px-5 border-none py-7 ${
                      data?.status === "Completed" ||
                      data?.status === "Failed" ||
                      get_time_expiry(data?.deadline) === "0"
                        ? "bg-gray-400 rounded-lg"
                        : "gradient-cto"
                    }`}
                  >
                    {" "}
                    <IoWallet className="text-[2rem]" />
                    <p className="text-[1.5rem]">Make Donation</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          {/* ------------------------------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------------------------------ */}
          <div className="">
            <div className="bg-gray-100 rounded-4xl px-4 pt-4 mt-14">
              <div className="bg-[#35B9C2] rounded-4xl w-full flex justify-between items-center gap-5 py-5 px-7">
                <div className="md:hidden bg-white rounded-lg w-60 relative z-50">
                  <CustomSelector
                    optionsList={["Milestones", "Campaign Updates", "Gallery"]}
                    control_class=""
                    control_style={{
                      borderRadius: "0.5rem",
                      border: "1px solid rgba(0,0,0,0.15)",
                      padding: "0.25rem 0.75rem",
                      backgroundColor: "transparent",
                    }}
                    placeholder="Milestones"
                    changeEvent={(selected) => {
                      setToggle((selected?.value as string)?.toLowerCase());
                    }}
                    mapOption={(val) => ({
                      value: val,
                      name: val,
                      label: (
                        <div className="flex items-center gap-2">
                          <p>{val}</p>
                        </div>
                      ),
                    })}
                  />
                </div>

                <div className="hidden md:flex items-center gap-5">
                  {["Milestones", "Campaign Updates", "Gallery"].map(
                    (val, index) => (
                      <button
                        key={index}
                        onClick={() => setToggle(val.toLowerCase())}
                        className={`${
                          toggle === val.toLowerCase()
                            ? "bg-white text-black"
                            : "text-white/70"
                        } rounded-lg cursor-pointer flex items-center gap-2 font-semibold px-5 py-2`}
                      >
                        {val}
                      </button>
                    ),
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div
                    onClick={() => {
                      if (swiperInstanceMilestone)
                        swiperInstanceMilestone.slidePrev();
                    }}
                    className="w-13 h-13 border-2 border-white bg-white/10 rounded-full cursor-pointer flex items-center justify-center"
                  >
                    <FaChevronLeft className="text-[1.5rem] -translate-x-0.5 text-white" />
                  </div>

                  <div
                    onClick={() => {
                      if (swiperInstanceMilestone)
                        swiperInstanceMilestone.slideNext();
                    }}
                    className="w-13 h-13 border-2 border-white bg-white/10 rounded-full cursor-pointer flex items-center justify-center"
                  >
                    <FaChevronRight className="text-[1.5rem] translate-x-0.5 text-white" />
                  </div>
                </div>
              </div>

              <div className="p-2 sm:p-10 overflow-hidden">
                <div
                  className={`${style_check ? "w-[190%] lg:w-[120%] min-[1500px]:w-full!" : "w-full"}`}
                >
                  <Swiper
                    key={style_check ? "layout-populated" : "layout-loading"} // 👈 Forces recalculation
                    onSwiper={(swiper) => setSwiperInstanceMilestone(swiper)}
                    speed={500} // how fast the content glides
                    spaceBetween={20}
                    slidesPerView={3} // 👈 base: mobile first
                    breakpoints={
                      style_check
                        ? {
                            0: { slidesPerView: 2 }, // Set your base here
                            900: { slidesPerView: 3 },
                            1500: { slidesPerView: 4 },
                          }
                        : {
                            0: { slidesPerView: 1 }, // Set your base here
                            900: { slidesPerView: 2 },
                            1500: { slidesPerView: 3 },
                          }
                    }
                  >
                    {toggle === "milestones" &&
                      milestones?.map((milestone: any, index: number) => (
                        <SwiperSlide key={index}>
                          <div className="py-5 px-3">
                            <Milestone
                              link={`/dashboard/campaign/overview/milestones-&-expenses`}
                              milestone={milestone}
                              redirect={false}
                              project_id={id}
                              campaign={{
                                deployed: true,
                                goal: Number(data?.goal || 0),
                                milestone_goal: milestone?.milestone_goal,
                                refundable: true,
                                percentage: Number(data?.progress || 0),
                                funded_amount: FUNDED_AMOUNT,
                              }}
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>

                {toggle === "campaign updates" && (
                  <div className="w-full h-40 sm:h-70 relative bg-gray-100 rounded-lg flex justify-center items-center">
                    <div className="flex items-center justify-center gap-3">
                      <PiEmptyBold className="text-red-600 text-[1.7rem]" />
                      <p className="text-[1.0rem] font-semibold text-gray-500">
                        Kindly donate to view campaign updates.
                      </p>
                    </div>
                  </div>
                )}
                {toggle === "gallery" && gallery?.length > 0 ? (
                  <div className="flex flex-col md:grid lg:grid-cols-2 xl:grid-cols-3 gap-5 py-5">
                    {gallery?.map((data: any, index: number) => (
                      <GalleryComponent
                        key={index}
                        id={data?.id}
                        action={false}
                        data={data}
                      />
                    ))}
                  </div>
                ) : (
                  toggle === "gallery" && (
                    <div className="w-full h-40 sm:h-60 xl:h-80 relative bg-gray-100 rounded-lg flex justify-center items-center">
                      <div className="flex items-center justify-center gap-3">
                        <PiEmptyBold className="text-red-600 text-[1.7rem]" />
                        <p className="text-[1.0rem] font-semibold text-gray-500">
                          No images has been made yet.
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------------------------------ */}
          <div className="bg-gray-100 rounded-4xl p-5 mt-14">
            <div className="flex justify-between items-center py-5 px-7">
              <h1 className="font-semibold text-2xl mb-2">All Comments</h1>

              <div
                onClick={() => {
                  if (swiperInstanceComment) swiperInstanceComment.slideNext();
                }}
                className="w-13 h-13 border border-gray-400 bg-gray-400/10 rounded-full cursor-pointer flex items-center justify-center"
              >
                <FaChevronRight className="text-[1.5rem] translate-x-0.5 text-black/70" />
              </div>
            </div>

            <div className="relative overflow-hidden">
              <div
                className={`${comment_data?.results?.length > 1 ? "w-[190%] lg:w-[120%]" : "w-full"}`}
              >
                {comment_data?.results?.length > 0 ? (
                  <Swiper
                    // modules={[Navigation]}
                    key={
                      comment_data?.results?.length > 1
                        ? "layout-populated"
                        : "layout-loading" // 👈 Forces recalculation
                    }
                    navigation={{
                      prevEl: ".popular-prev",
                      nextEl: ".popular-next",
                    }}
                    loop={true}
                    slidesPerView={1} // 👈 base: mobile first
                    breakpoints={
                      comment_data?.results?.length > 1
                        ? {
                            0: { slidesPerView: 2 }, // Set your base here
                            900: { slidesPerView: 3 },
                            1500: { slidesPerView: 4 },
                          }
                        : {
                            0: { slidesPerView: 1 }, // Set your base here
                            900: { slidesPerView: 2 },
                            1500: { slidesPerView: 3 },
                          }
                    }
                    onSwiper={(swiper) => setSwiperInstanceComment(swiper)}
                  >
                    {comment_data?.results?.map(
                      (comment: any, index: number) => (
                        <SwiperSlide key={index}>
                          <div className="py-5 sm:px-3">
                            <CommentComponent
                              key={index}
                              index={index}
                              id={comment?.id}
                              dashboard={false}
                              loading={isLoading}
                              date={comment?.created_at}
                              heading={comment?.username}
                              editComment={() => {}}
                              paragraph={comment?.details}
                              link={`/dashboard/campaign/edit-comment?id=${comment?.id}&campaign=${id}`}
                            />
                          </div>
                        </SwiperSlide>
                      ),
                    )}
                  </Swiper>
                ) : (
                  <div className="w-full h-40 sm:h-60 xl:h-80 relative bg-gray-100 rounded-lg flex justify-center items-center mt-5">
                    <div className="flex items-center justify-center gap-3">
                      <PiEmptyBold className="text-red-600 text-[1.7rem]" />
                      <p className="text-[1.0rem] font-semibold text-gray-500">
                        No comments has been made yet.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ------------------------------------------------------------------------------------------------------------------------------ */}
            {/* ------------------------------------------------------------------------------------------------------------------------------ */}
            {/* ------------------------------------------------------------------------------------------------------------------------------ */}
            {/* ------------------------------------------------------------------------------------------------------------------------------ */}
            {/* ------------------------------------------------------------------------------------------------------------------------------ */}
            <div className="w-full h-80 relative bg-gray-200 rounded-b-4xl overflow-hidden mt-5">
              {data?.country && data?.address && (
                <LocationMap
                  country={`${data?.country || ""} ${data?.address || ""}`?.replace(
                    " ",
                    ", ",
                  )}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {(relatedLoading || related_campaigns.length > 0) && (
        <div className="px-5 md:px-10 pb-10">
          <div className="bg-gray-100 rounded-4xl px-4 pt-4">
            <div className="bg-[#35B9C2] rounded-4xl w-full flex flex-wrap justify-between items-center gap-5 py-5 px-7">
              <h1 className="font-semibold text-xl text-white">
                Related Campaigns
              </h1>

              {related_campaigns.length > 1 && (
                <div className="flex items-center gap-3">
                  <div
                    onClick={() => swiperInstanceRelated?.slidePrev()}
                    className="w-13 h-13 border-2 border-white bg-white/10 rounded-full cursor-pointer flex items-center justify-center"
                  >
                    <FaChevronLeft className="text-[1.5rem] -translate-x-0.5 text-white" />
                  </div>

                  <div
                    onClick={() => swiperInstanceRelated?.slideNext()}
                    className="w-13 h-13 border-2 border-white bg-white/10 rounded-full cursor-pointer flex items-center justify-center"
                  >
                    <FaChevronRight className="text-[1.5rem] translate-x-0.5 text-white" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-2 sm:p-10 overflow-hidden">
              <Swiper
                key={relatedLoading ? "loading" : related_campaigns.length} // 👈 Forces recalculation
                onSwiper={(swiper) => setSwiperInstanceRelated(swiper)}
                speed={500}
                spaceBetween={20}
                // 👇 Fractional values leave part of the next card visible, so
                // it's clear the row scrolls. Only used when more cards exist
                // than fit in view.
                slidesPerView={related_campaigns.length > 1 ? 1.15 : 1}
                breakpoints={{
                  768: {
                    slidesPerView: related_campaigns.length > 2 ? 2.15 : 2,
                  },
                  1280: {
                    slidesPerView: related_campaigns.length > 3 ? 3.15 : 3,
                  },
                }}
              >
                {(relatedLoading ? [1, 2, 3] : related_campaigns).map(
                  (campaign: any, index: number) => (
                    <SwiperSlide key={index}>
                      <div className="py-5 px-3">
                        {relatedLoading ? (
                          <Campaign loading={true} status={""} deadline={""} />
                        ) : (
                          <Campaign
                            donate={true}
                            loading={false}
                            deadline={campaign?.deadline}
                            status={campaign?.status || ""}
                            image={campaign?.image || ""}
                            title={campaign?.title || ""}
                            description={campaign?.description || ""}
                            progress={campaign?.progress || ""}
                            path={
                              campaign?.id
                                ? `/campaign?id=${campaign?.id}`
                                : "#"
                            }
                            date={campaign?.created_at || null}
                            sadaqah={campaign?.sadaqah === true}
                          />
                        )}
                      </div>
                    </SwiperSlide>
                  ),
                )}
              </Swiper>
            </div>
          </div>
        </div>
      )}

      {/* <Reviews comments={comment_data?.results} /> */}
    </>
  );
}
