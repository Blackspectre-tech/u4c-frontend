"use client";

import LocationMap from "@/components/LocationMap";
import {
  format_date,
  get_percentage,
  get_time_expiry,
  response_message,
} from "@/components/utilities/utils";
import {
  useDeleteCampaignMutation,
  useGetCampaignNgoMutation,
  useGetCommentsMutation,
  useGetDonationsMutation,
  useGetUpdateMutation,
} from "@/redux/api/main";
import {
  Finalize_Campaign,
  Get_Campaign_Details,
  Get_User_Pledge,
  Pledge_Token,
  Refund_Campaign,
} from "@/Wallet/ConnectContract";
import Link from "next/link";
import Image from "next/image";
import { TbPlus } from "react-icons/tb";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import { PiEmptyBold } from "react-icons/pi";
import PaiChart from "@/components/PaiChart";
import { FaChevronRight, FaPlus, FaTrashAlt } from "react-icons/fa";
import { SiHiveBlockchain } from "react-icons/si";
import { IoClose, IoWallet } from "react-icons/io5";
import Insight from "@/components/dashboard/Insight";
import { useGetWallet } from "@/Wallet/privy/privy.utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Milestone from "@/components/dashboard/ngo/Milestone";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import {
  MdDateRange,
  MdDriveFileMoveOutline,
  MdEditSquare,
} from "react-icons/md";
import { NavigationTemplate } from "@/components/utilities/utils.template";
import {
  Smart_Finalize_Campaign,
  Smart_Pledge_Token,
  Smart_Refund_Campaign,
} from "@/Wallet/ConnectSmartContract";
import CommentComponent from "@/components/dashboard/Comment";
import GalleryComponent from "@/components/dashboard/Gallery";
import CustomSelector from "@/components/SelectTag";
import UpdateComponent from "@/components/dashboard/Update";
import SadaqahBadge from "@/components/SadaqahBadge";

export default function Home() {
  const [swiperInstance1, setSwiperInstance1] = useState<SwiperClass | null>(
    null,
  );
  const [swiperInstance2, setSwiperInstance2] = useState<SwiperClass | null>(
    null,
  );
  const { online, organization, wallet, user } = useSelector(
    (state: RootState) => state.user,
  );

  const [gallery, setGallery] = useState<any>([]);
  const [milestones, setMilestones] = useState<any>([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [data, setData] = useState<any>({});
  const [donor, setDonor] = useState<any>({});
  const [updates, setUpdates] = useState<any>({});
  const [openDonation, setOpenDonation] = useState(false);
  const [toggle, setToggle] = useState<string>("milestones");
  const [comments, setComments] = useState<Array<any>>([]);
  const [donator, setDonator] = useState<Array<any>>([{}]);
  const [donations, setDonations] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [loadingFinalize, setLoadingFinalize] = useState(false);
  const [loadingRefund, setLoadingRefund] = useState(false);
  const [formData, setFormData] = useState({
    amount: 0,
    tip: 0,
  });

  const [Delete_Campaign, { isLoading: isLoadingDelete }] =
    useDeleteCampaignMutation();
  const [Get_Campaign, { isLoading }] = useGetCampaignNgoMutation();
  const [Get_Donations, {}] = useGetDonationsMutation();
  const [Get_Updates, {}] = useGetUpdateMutation();
  const [Get_Comments, {}] = useGetCommentsMutation();
  const use_wallet = useGetWallet();

  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  const is_error = (result: any): boolean => {
    console.log(result);

    if ("error" in result) {
      // response_message({ message: "Something went wrong?", option: "wrn" });
      return true;
    }

    return false;
  };

  const deleteComment = (index: number) => {
    console.log("====================================");
    console.log(index);
    console.log("====================================");

    setComments((prev) => {
      return prev.filter((_, i) => i !== index);
    });
  };

  const deleteCampaign = async () => {
    console.log("====================================");
    console.log(id);
    console.log("====================================");

    const result = await Delete_Campaign({ query: `/${id}/` });
    const is_message = result.error?.data?.errors;

    console.log(result);

    if ("error" in result) {
      response_message({
        message: is_message
          ? `${result.error?.data?.errors[0]?.detail} ${result.error?.data?.errors[0]?.attr}`
          : "Something went wrong?",
        option: "err",
      });

      return;
    }

    response_message({
      message: "Campaign has been deleted successfully",
      option: "scc",
    });

    router.push("/dashboard/campaign");
    setOpenDelete((prev) => !prev);
  };

  const refetch = async () => {
    const query = { query: `/${id}/` };
    const campaign_result = await Get_Campaign(query);
    const comments_result = await Get_Comments(query);
    const donations_result = await Get_Donations(query);
    const updates_result = await Get_Updates(query);
    console.log(campaign_result.data);

    console.log("====================================");
    console.log("comments_result");
    console.log(comments_result);
    console.log("donations_result");
    console.log(donations_result);
    console.log("campaign_result");
    console.log(campaign_result);
    console.log("updates_result");
    console.log(updates_result);
    console.log("query");
    console.log(query);
    console.log("====================================");

    const milestones_copy = campaign_result?.data?.milestones;
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

        const surplus = Number(campaign_result?.data?.progress || 0) - 100;
        milestone_count.value =
          milestone_count.value +
          get_percentage(
            next_percentage,
            Number(campaign_result?.data?.goal || 0),
          );

        return {
          ...milestone,
          new_percentage: percentage,
          surplus: surplus < 0 ? 0 : surplus,
          milestone_length: new_milestones.length,
          new_goal: get_percentage(
            percentage,
            Number(campaign_result?.data?.goal || 0),
          ),
          milestone_goal: campaign_result?.data?.goal,
          milestone_count: next_goal === 0 ? 0 : milestone_count.value,
        };
      })
      ?.sort((a: any, b: any) => a?.percentage - b?.percentage);

    const donator_ = donations_result.data?.filter((donation: any) => {
      console.log(donation?.username, " : ", user?.username);
      if (donation?.username === user?.username) setDonor(donation);
      else {
        return donation;
      }
    });

    const comments_ =
      organization === true
        ? comments_result?.data?.results
        : comments_result?.data?.results?.filter((comment: any) => {
            console.log(comment?.username, " : ", user?.username);
            if (comment?.username === user?.username) return comment;
          });

    if (is_error(comments_result) === false) setComments(comments_);
    if (is_error(updates_result) === false) {
      setUpdates(updates_result.data?.results);
    }
    if (is_error(campaign_result) === false) {
      setMilestones(milestones_);
      setData(campaign_result.data);
      setGallery(campaign_result.data?.milestones);
    }
    if (is_error(donations_result) === false) {
      setDonator(donator_);
      setDonations(donations_result.data || []);
    }
  };

  useEffect(() => {
    console.log("====================================");
    console.log(id);
    console.log("====================================");

    if (!id) return router.back();

    (async () => {
      await refetch();
    })();

    return () => {};
  }, []);

  const editFormData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFormData((priv) => ({ ...priv, [e.target.name]: e.target.value }));
  };

  const make_donation = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pledge_data = {
      id: data?.contract_id,
      grossAmount: formData.amount,
      tipAmount: formData.tip,
      wallet: use_wallet.connector,
    };

    // console.log("====================================");
    // console.log(data);
    // console.log(formData);
    // console.log(pledge_data);
    // console.log("====================================");

    if (online === false)
      return response_message({
        message: "Kindly login to continue.",
        option: "wrn",
      });
    else if (organization === true)
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
    const core: any = await Get_Campaign_Details(pledge_data.id);

    if (core?.[2]) {
      // Example: donor pledges 100 USDT with 2 USDT tip
      const address = core[2];
      let pledge = null;

      if (use_wallet.isSmartAccount) {
        pledge = await Smart_Pledge_Token({
          ...pledge_data,
          token: address,
          smartClient: use_wallet.connector,
        });
      } else {
        pledge = await Pledge_Token({ ...pledge_data, token: address });
      }

      // Tx receipt returned
      console.log("pledge receipt:", pledge);
      if (pledge?.status === true) {
        response_message({ message: "Transaction successful", option: "scc" });
        await refetch();
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

          return await refetch();
        }

        response_message({ message: pledge?.error as string, option: "wrn" });
      }
    } else
      response_message({ message: "Something went wrong.", option: "wrn" });

    // Tx receipt returned
    console.log("get campaign core:", core);
    setLoading(false);
    setOpenDonation(false);
  };

  const initiate_refund = async () => {
    const pledge_data = {
      id: data?.contract_id,
      grossAmount: formData.amount,
      tipAmount: formData.tip,
    };

    // console.log("====================================");
    // console.log(data);
    // console.log(formData);
    // console.log(pledge_data);
    // console.log("====================================");

    if (online === false)
      return response_message({
        message: "Kindly login to continue.",
        option: "wrn",
      });
    if (organization === true)
      return response_message({
        message: "Organizations can't access this feature.",
        option: "wrn",
      });
    else if (!wallet.account)
      return response_message({
        message: "Kindly connect your wallet to continue.",
        option: "wrn",
      });

    setLoadingRefund(true);

    const check = await Get_User_Pledge(
      pledge_data.id,
      use_wallet?.address as string,
    );

    console.log("\n\n\ncheck");
    console.log("check");
    console.log("check");
    console.log("check");
    console.log("check");
    console.log("check");
    console.log(check === 0n);
    console.log(check, "\n\n\n");

    if (check > 0n) {
      console.log("User has a pledge!");
      let pledge = null;

      if (use_wallet.isSmartAccount) {
        pledge = await Smart_Refund_Campaign({
          id: pledge_data.id,
          smartClient: use_wallet.connector,
        });
      } else {
        pledge = await Refund_Campaign({
          id: pledge_data.id,
          wallet: use_wallet.connector,
        });
      }

      // Tx receipt returned
      console.log("pledge receipt:", pledge);
      if (pledge?.status === true) {
        response_message({ message: "Refund successful", option: "scc" });
        await refetch();
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

          return await refetch();
        }

        response_message({ message: pledge?.error as string, option: "wrn" });
      }
    } else
      response_message({
        message: "You have no funds to refunded.",
        option: "wrn",
      });

    // Tx receipt returned
    setLoadingRefund(false);
  };

  const finalize_campaign = async () => {
    if (online === false)
      return response_message({
        message: "Kindly login to continue.",
        option: "wrn",
      });
    else if (!wallet.account)
      return response_message({
        message: "Kindly connect your wallet to continue.",
        option: "wrn",
      });

    setLoadingFinalize(true);
    const core = await Get_Campaign_Details(data?.contract_id);
    console.log("core");
    console.log("core");
    console.log("core");
    console.log(core);
    console.log(core[0]);
    console.log(use_wallet);

    if (core[0] === use_wallet?.address) {
      // Example: donor pledges 100 USDT with 2 USDT tip
      let pledge = null;

      if (use_wallet.isSmartAccount) {
        pledge = await Smart_Finalize_Campaign({
          id: data?.contract_id,
          smartClient: use_wallet.connector,
        });
      } else {
        pledge = await Finalize_Campaign({
          id: data?.contract_id,
          wallet: use_wallet.connector,
        });
      }

      // Tx receipt returned
      console.log("pledge receipt:", pledge);
      if (pledge?.status === true) {
        response_message({ message: "Finalization successful", option: "scc" });
        await refetch();
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

          return await refetch();
        }

        response_message({ message: pledge?.error as string, option: "wrn" });
      }
    } else
      response_message({
        message:
          "Invalid Wallet, Kindly use the wallet used to create this campaign.",
        option: "wrn",
      });

    setLoadingFinalize(false);
  };

  const progress = Number(data?.progress || 0);
  const progress_ = progress > 100 ? 100 : progress;
  const FUNDED_AMOUNT = get_percentage(progress_, Number(data?.goal || 0));
  const OWING_AMOUNT = get_percentage(100 - progress_, Number(data?.goal || 0));
  const SURPLUS =
    progress < 101
      ? 0
      : get_percentage(progress - 100, Number(data?.goal || 0));

  const IS_REFUNDABLE =
    data?.status === "Failed" ||
    data?.status === "Cancelled" ||
    (get_time_expiry(data?.deadline) === "0" && Number(data?.progress) < 100);

  const style_check =
    (toggle === "milestones" && milestones.length > 3) ||
    (toggle === "campaign updates" && updates.length > 3) ||
    (toggle === "gallery" && gallery.length > 3);

  // console.log("\n\n\n\n====================================");
  // console.log("ALL");
  // console.log(gallery);
  // console.log(progress);
  // console.log(progress - 100);
  // console.log(updates);
  // console.log(FUNDED_AMOUNT);
  // console.log(OWING_AMOUNT);
  // console.log(data);
  // console.log(milestones);
  // console.log(progress_);
  // console.log(comments);
  // console.log(donator);
  // console.log(donor);
  // console.log(user);
  // console.log(get_time_expiry(data?.deadline));
  // console.log("====================================\n\n\n\n");

  return (
    <>
      {/* <button onClick={refetch} className="p-20 bg-red-50">
        Refetch
      </button> */}

      {openDonation && (
        <div className="fixed top-0 left-0 z-1000 w-full h-full bg-gray-800/10 flex justify-center items-center">
          <div className="bg-[#fffff9] 0 w-100 rounded-lg p-7">
            <div className="flex justify-end">
              <IoClose
                onClick={() => setOpenDonation((prev) => !prev)}
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

      {openDelete === true && (
        <div className="fixed top-0 left-0 z-10 w-full h-full bg-gray-800/10 flex justify-center items-center">
          <div className="bg-white w-100 rounded-lg p-5">
            <div className="flex justify-end">
              <IoClose
                onClick={() => setOpenDelete((prev) => !prev)}
                className="text-[1.5rem] cursor-pointer"
              />
            </div>

            <p className="text-center mt-5">
              <span className="font-bold">
                Are you sure you want to delete this campaign?
              </span>
              This action cannot be undone.
            </p>

            <div className="flex justify-center mt-5">
              <button
                onClick={deleteCampaign}
                className="bg-red-100 border border-red-300/60 text-red-700 w-[80%] cursor-pointer rounded-lg flex items-center justify-center gap-2 py-2"
                disabled={isLoading}
              >
                {isLoadingDelete && (
                  <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
                )}{" "}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="px-5 md:px-10 pb-5">
        <NavigationTemplate
          title={`Campaigns Overview`}
          navigation={[
            { title: "Dashboard", path: "/dashboard" },
            { title: "Campaigns", path: "/dashboard/campaign" },
            { title: "Overview", path: "#" },
          ]}
        />

        {isLoading === true || !data?.image ? (
          <div className="w-full min-h-68 rounded-4xl relative bg-gray-100 loading_ [--delay:0.5s] mt-5"></div>
        ) : (
          <div className={`w-full rounded-4xl overflow-hidden relative mt-5`}>
            <img alt="" src={data?.image} className="w-full" />

            {data?.approval_status != "APPROVED" && (
              <div className="absolute top-5 right-5 z-100 bg-white rounded-2xl flex items-center gap-5 p-3">
                <Link
                  href={`/dashboard/campaign/edit?id=${id}`}
                  className="bg-gray-200 border border-gray-400/60 text-gray-950 text-[1.2rem] rounded-md cursor-pointer p-[0.60rem]"
                >
                  <MdEditSquare />
                </Link>

                <div
                  onClick={() => setOpenDelete((prev) => !prev)}
                  className="bg-red-100 border border-red-300/60 text-red-700 text-[1.0rem] rounded-md cursor-pointer p-[0.7rem]"
                >
                  <FaTrashAlt />
                </div>
              </div>
            )}
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
              {data?.deployed === true ? (
                <>
                  {data?.status === "Failed" ? (
                    <p className="px-5 py-2 text-sm md:text-[1rem] font-semibold bg-[#ba3333]/10 text-[#721e1e] border border-[#ba3333]/15 rounded-lg">
                      Expired
                    </p>
                  ) : data?.status === "Cancelled" ? (
                    <p className="px-5 py-2 text-sm md:text-[1rem] font-semibold bg-[#ba3333]/10 text-[#721e1e] border border-[#ba3333]/15 rounded-lg">
                      Cancelled
                    </p>
                  ) : data?.status === "Completed" ? (
                    <p className="px-5 py-2 text-sm md:text-[1rem] font-semibold bg-[#319b29]/10 text-[#174714] border border-[#319b29]/15 rounded-lg">
                      {data?.status}
                    </p>
                  ) : get_time_expiry(data?.deadline) === "0" ? (
                    <p className="px-5 py-2 text-sm md:text-[1rem] font-semibold bg-[#ac12a4]/10 text-[#144447] border border-[#ac12a4]/15 rounded-lg">
                      Finalizing
                    </p>
                  ) : (
                    <p className="px-5 py-2 text-sm md:text-[1rem] font-semibold bg-[#293a9b]/10 text-[#18225a] border border-[#293a9b]/15 rounded-lg">
                      Published
                    </p>
                  )}
                </>
              ) : (
                <>
                  {data?.approval_status === "APPROVED" ? (
                    <p className="px-5 py-2 text-sm md:text-[1rem] font-semibold bg-[#ffb900]/20 text-[#866200] border border-[#af8000]/15 rounded-lg">
                      Approved
                    </p>
                  ) : (
                    <p className="px-5 py-2 text-sm md:text-[1rem] font-semibold bg-[#33b2ba]/10 text-[#144447] border border-[#33b2ba]/15 rounded-lg">
                      Pending
                    </p>
                  )}
                </>
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

              <div className="py-5">
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
                      colorTint={"bg-[#c0fbff]"}
                      icon={<SiHiveBlockchain className="text-[#33b2ba]" />}
                      value={data?.goal || 0}
                      description={"Total Goal"}
                    />

                    <div className="hidden md:block w-px h-10 bg-gray-300 mx-10"></div>

                    <Insight
                      colorTint={"bg-[#FFE6A3]"}
                      icon={<SiHiveBlockchain className="text-[#A2790C]" />}
                      value={donations?.length || 0}
                      description={"Total Donations"}
                    />
                  </div>

                  {organization === false ? (
                    IS_REFUNDABLE ? (
                      <button
                        onClick={initiate_refund}
                        disabled={donor?.refunded === true}
                        className={`w-full flex items-center justify-center gap-2 font-semibold cursor-pointer text-sm mt-5 p-5 ${
                          donor?.refunded === true
                            ? "bg-gray-400"
                            : "gradient-cto"
                        }`}
                      >
                        {loadingRefund && (
                          <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
                        )}
                        <IoWallet className="text-[2rem]" />
                        <p className="text-[1.5rem]">Request Refund</p>
                      </button>
                    ) : (
                      <button
                        onClick={() => setOpenDonation(true)}
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
                    )
                  ) : (
                    <>
                      {data?.deployed === false &&
                        data?.approval_status === "APPROVED" && (
                          <Link
                            href={`/initialize-campaign?id=${data?.id}`}
                            className="gradient-cto flex items-center justify-center gap-3 px-5 py-7"
                          >
                            <MdDriveFileMoveOutline className="text-[2.5rem]" />
                            <p className="text-[1.5rem]">Publish Campaign</p>
                          </Link>
                        )}

                      {data?.status === "Funding" &&
                        Number(data?.progress) >= 100 && (
                          <button
                            onClick={finalize_campaign}
                            className={`w-full flex items-center justify-center gap-2 font-semibold cursor-pointer text-sm mt-5 p-5 gradient-cto`}
                          >
                            {loadingFinalize && (
                              <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
                            )}
                            <IoWallet className="text-[2rem]" />
                            <p className="text-[1.5rem]">Finalize Campaign</p>
                          </button>
                        )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------------------------------------------------------------------ */}
      {/* ------------------------------------------------------------------------------------------------------------------------------ */}
      {/* ------------------------------------------------------------------------------------------------------------------------------ */}
      {/* ------------------------------------------------------------------------------------------------------------------------------ */}
      <div className="">
        <div className="bg-gray-100 mt-14">
          <div className="bg-[#35B9C2] w-full flex flex-wrap justify-between items-center gap-5 p-5">
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

            <div className="hidden md:flex items-center gap-5 px-10">
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

            <div className="flex items-center gap-5">
              {(toggle === "campaign updates" || toggle === "gallery") &&
                organization === true && (
                  <Link
                    href={
                      toggle === "campaign updates"
                        ? `/dashboard/campaign/add-update?id=${id}`
                        : `/dashboard/campaign/add-gallery?id=${id}`
                    }
                    className="bg-white text-gray-700 rounded-full cursor-pointer flex items-center justify-center gap-1 py-3 px-6"
                  >
                    <p className="text-[1rem]">Add</p>
                    <FaPlus className="text-[0.7rem] text-gray-500 translate-x-0.5" />
                  </Link>
                )}

              <div
                onClick={() => {
                  if (swiperInstance1) swiperInstance1.slideNext();
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
              {
                <Swiper
                  loop={true}
                  key={style_check ? "layout-populated" : "layout-loading"} // 👈 Forces recalculation
                  onSwiper={(swiper) => setSwiperInstance1(swiper)}
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
                  {toggle === "milestones"
                    ? milestones?.map((milestone: any, index: number) => (
                        <SwiperSlide key={index}>
                          <div className="py-3">
                            <Milestone
                              link={`/dashboard/campaign/overview/milestones-&-expenses`}
                              project_id={id}
                              milestone={milestone}
                              campaign={{
                                deployed: data?.deployed,
                                goal: Number(data?.goal || 0),
                                milestone_goal: milestone?.milestone_goal,
                                refundable:
                                  IS_REFUNDABLE ||
                                  milestone?.approved === false,
                                percentage: Number(data?.progress || 0),
                                funded_amount: FUNDED_AMOUNT,
                              }}
                            />
                          </div>
                        </SwiperSlide>
                      ))
                    : toggle === "campaign updates" &&
                      updates?.map((update: any, index: number) => (
                        <SwiperSlide key={index}>
                          <UpdateComponent
                            update={(id: string) => {
                              setUpdates((prev: any) =>
                                prev.filter((item: any) => item.id !== id),
                              );
                            }}
                            data={update}
                            id={update?.id}
                          />
                        </SwiperSlide>
                      ))}
                </Swiper>
              }
            </div>

            {toggle === "campaign updates" && updates?.length === 0 && (
              <div className="w-full h-40 sm:h-60 xl:h-80 relative bg-gray-100 rounded-lg flex justify-center items-center">
                <div className="flex items-center justify-center gap-3">
                  <PiEmptyBold className="text-red-600 text-[1.7rem]" />
                  <p className="text-[1.0rem] font-semibold text-gray-500">
                    No campaign updates has been made yet.
                  </p>
                </div>
              </div>
            )}
            {toggle === "gallery" && gallery?.length > 0 ? (
              <div className="flex flex-col md:grid lg:grid-cols-2 xl:grid-cols-3 gap-5 py-5">
                {gallery?.map((data: any, index: number) => (
                  <GalleryComponent
                    update={(id: string) => {
                      setGallery((prev: any) =>
                        prev.filter((item: any) => item.id !== id),
                      );
                    }}
                    key={index}
                    id={data?.id}
                    project_id={id}
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

        {/* ------------------------------------------------------------------------------------------------------------------------------ */}
        {/* ------------------------------------------------------------------------------------------------------------------------------ */}
        {/* ------------------------------------------------------------------------------------------------------------------------------ */}
        {/* ------------------------------------------------------------------------------------------------------------------------------ */}
        {/* ------------------------------------------------------------------------------------------------------------------------------ */}
        <div className="mt-10 p-5 sm:px-10">
          <div className="flex flex-wrap justify-between items-center px-2 sm:px-5">
            <h1 className="font-semibold text-xl mb-2">All Comments</h1>

            <div className="flex flex-wrap items-center gap-5">
              {organization === false && (
                <Link
                  href={`/dashboard/campaign/add-comment?id=${data?.id}`}
                  className="gradient-cto-border border border-transparent rounded-full overflow-hidden"
                >
                  <div className="hover:bg-[#812880]/5 flex items-center gap-2 py-3 px-5">
                    <TbPlus className="text-[1.2rem]" />
                    <p className="font-semibold">Add Comment</p>
                  </div>
                </Link>
              )}

              <div
                onClick={() => {
                  if (swiperInstance1) swiperInstance1.slideNext();
                }}
                className="w-13 h-13 border border-gray-400 bg-gray-400/10 rounded-full cursor-pointer flex items-center justify-center"
              >
                <FaChevronRight className="text-[1.5rem] translate-x-0.5 text-black/70" />
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div
              className={`${comments?.length > 1 ? "w-[190%] lg:w-[120%]" : "w-full"}`}
            >
              {comments?.length > 0 ? (
                <Swiper
                  key={
                    comments?.length > 1 ? "layout-populated" : "layout-loading" // 👈 Forces recalculation
                  }
                  modules={[Navigation]}
                  navigation={{
                    prevEl: ".popular-prev",
                    nextEl: ".popular-next",
                  }}
                  loop={true}
                  slidesPerView={1} // 👈 base: mobile first
                  breakpoints={
                    comments?.length > 1
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
                  onSwiper={(swiper) => setSwiperInstance2(swiper)}
                >
                  {comments?.map((comment: any, index: number) => (
                    <SwiperSlide key={index}>
                      <div className="py-5 sm:px-3">
                        <CommentComponent
                          key={index}
                          index={index}
                          id={comment?.id}
                          loading={isLoading}
                          date={comment?.created_at}
                          heading={comment?.username}
                          editComment={deleteComment}
                          paragraph={comment?.details}
                          link={`/dashboard/campaign/edit-comment?id=${comment?.id}&campaign=${id}`}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
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
        </div>

        {/* ------------------------------------------------------------------------------------------------------------------------------ */}
        {/* ------------------------------------------------------------------------------------------------------------------------------ */}
        {/* ------------------------------------------------------------------------------------------------------------------------------ */}
        {/* ------------------------------------------------------------------------------------------------------------------------------ */}
        {/* ------------------------------------------------------------------------------------------------------------------------------ */}
        <div className="mt-10 px-10">
          <div className="w-full h-80 relative bg-gray-200 rounded-lg overflow-hidden mt-5">
            {data?.country && data?.address && (
              <LocationMap
                country={`${data?.country || ""} ${
                  data?.address || ""
                }`?.replace(" ", ", ")}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
