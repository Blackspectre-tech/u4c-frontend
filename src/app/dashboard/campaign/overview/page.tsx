"use client";

import LocationMap from "@/components/LocationMap";
import {
  format_date,
  get_time_expiry,
  response_message,
} from "@/components/utilities/utils";
import {
  useDonateDonorMutation,
  useGetCampaignNgoMutation,
} from "@/redux/api/main";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import CommentComp from "@/components/dashboard/Comment";
import { GiTrophy } from "react-icons/gi";
import { IoClose, IoPeople, IoWallet } from "react-icons/io5";
import {
  MdCancel,
  MdDateRange,
  MdSystemUpdateAlt,
  MdTimer,
} from "react-icons/md";
import { PiEmptyBold } from "react-icons/pi";
import { TbPlus, TbStarsFilled } from "react-icons/tb";
import { useSelector } from "react-redux";
import Milestone from "@/components/dashboard/ngo/Milestone";
import CircularLoader from "@/components/dashboard/CircularLoader";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Get_Campaign_Core,
  Pledge_Token,
  Refund_Campaign,
} from "@/Wallet/ConnectContract";
import BackButton from "@/components/dashboard/BackButton";
import { BsFillBarChartLineFill } from "react-icons/bs";
import { FaListCheck } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import CustomSelector from "@/components/SelectTag";

export default function Home() {
  const swiperRef = useRef<any>(null);
  const { online, organization, wallet, user } = useSelector(
    (state: RootState) => state.user
  );

  const [openPublish, setOpenPublish] = useState(true);
  const [openDonation, setOpenDonation] = useState(false);
  const [toggle, setToggle] = useState<
    "statistics" | "milestone" | "campaign-update"
  >("statistics");
  const [comments, setComments] = useState<Array<any>>([{}]);
  const [donator, setDonator] = useState<Array<any>>([{}]);
  const [loading, setLoading] = useState(false);
  const [loadingRefund, setLoadingRefund] = useState(false);
  const [formData, setFormData] = useState({
    amount: 0,
    tip: 0,
  });

  const [Donate_Donor, {}] = useDonateDonorMutation();
  const [Get_Campaign, { data, isLoading }] = useGetCampaignNgoMutation();

  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  const is_error = (result: any): boolean => {
    const is_message = result.error?.data?.errors;
    // console.log(result);

    if ("error" in result) {
      response_message({
        message: is_message
          ? `${result.error?.data?.errors[0]?.detail} ${result.error?.data?.errors[0]?.attr}`
          : "Something went wrong?",
        option: "err",
      });

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

  useEffect(() => {
    console.log("====================================");
    console.log(id);
    console.log("====================================");

    if (!id) return router.back();

    (async () => {
      const campaign_result = await Get_Campaign({ query: `/${id}/` });
      console.log(campaign_result.data);

      const comments =
        organization === true
          ? campaign_result.data?.comments
          : campaign_result.data?.comments?.filter((comment: any) => {
              console.log(comment?.username, " : ", user?.username);
              if (comment?.username === user?.username) return comment;
            });

      const donator = campaign_result.data?.donations?.filter(
        (donation: any) => {
          console.log(donation?.username, " : ", user?.username);
          if (donation?.username === user?.username) return donation;
        }
      );

      // console.log("====================================");
      // console.log(comments);
      // console.log("====================================");

      setComments(comments);
      setDonator(donator);
      if (is_error(campaign_result) === true) return;
    })();

    return () => {};
  }, []);

  const editFormData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((priv) => ({ ...priv, [e.target.name]: e.target.value }));
  };

  const make_donation = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pledge_data = {
      id: data?.contract_id,
      grossAmount: formData.amount,
      tipAmount: formData.tip,
    };

    console.log("====================================");
    console.log(data);
    console.log(formData);
    console.log(pledge_data);
    console.log("====================================");

    if (online === false)
      return response_message({
        message: "Kindly login to continue.",
        option: "wrn",
      });
    if (organization === true)
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

    const result = await Donate_Donor({
      query: `/${id}/`,
      body: {
        tip: formData.tip,
        amount: formData.amount,
        wallet: wallet.account,
      },
    });
    console.log(result);
    console.log(data);

    const is_message = result.error?.data?.errors;

    if ("error" in result) {
      setLoading(false);

      return response_message({
        message: is_message
          ? `${result.error?.data?.errors[0]?.detail} ${result.error?.data?.errors[0]?.attr}`
          : "Something went wrong?",
        option: "err",
      });
    }

    const core = await Get_Campaign_Core(pledge_data.id);

    if (core) {
      // Example: donor pledges 100 USDT with 2 USDT tip
      const pledge = await Pledge_Token({ ...pledge_data, token: core[2] });

      // Tx receipt returned
      console.log("pledge receipt:", pledge);
      if (pledge?.status === true)
        response_message({ message: "Transaction successful", option: "scc" });
    }

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

    console.log("====================================");
    console.log(data);
    console.log(formData);
    console.log(pledge_data);
    console.log("====================================");

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

    const core = await Get_Campaign_Core(pledge_data.id);

    if (core) {
      // Example: donor pledges 100 USDT with 2 USDT tip
      const pledge = await Refund_Campaign({ id: pledge_data.id });

      // Tx receipt returned
      console.log("pledge receipt:", pledge);
      if (pledge?.status === true)
        response_message({ message: "Refund successful", option: "scc" });
    }

    // Tx receipt returned
    console.log("get campaign core:", core);
    setLoadingRefund(false);
  };

  console.log("====================================");
  console.log(data);
  console.log(donator);
  console.log("====================================");

  return (
    <>
      {openDonation && (
        <div className="fixed top-0 left-0 z-[1000] w-full h-full bg-gray-800/10 flex justify-center items-center">
          <div className="bg-[#fffff9] 0 w-[25rem] rounded-lg p-7">
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
                className="button_ w-full border text-white font-semibold text-md rounded-lg cursor-pointer flex items-center justify-center gap-2 px-5 py-3 mt-5"
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
        <BackButton route="/dashboard/campaign" parent_wind="flex mb-5" />

        {isLoading === true || !data?.image ? (
          <div className="w-full min-h-[17rem] max-h-[17rem] relative bg-gray-100 rounded-lg loading_ [--delay:0.5s]"></div>
        ) : (
          <div className="w-full min-h-[17rem] max-h-[17rem] rounded-lg relative overflow-hidden">
            <Image
              src={data?.image}
              alt=""
              className="w-full h-full object-cover"
              fill
            />
          </div>
        )}

        {data?.approval_status === "APPROVED" && data?.deployed === false && (
          <div
            className={`${
              openPublish === true
                ? "flex items-center justify-between"
                : "hidden"
            } w-full bg-amber-100/50 border border-amber-400 rounded-lg my-5 p-4`}
          >
            <p>
              Your campaign has been approved kindly publish it here{" "}
              <Link href={`/initialize-campaign?id=${id}`}>
                <span className="text-blue-600 font-semibold underline cursor-pointer">
                  here
                </span>
              </Link>
            </p>

            <div className="min-w-10 min-h-10 flex justify-center items-center">
              <MdCancel
                className="cursor-pointer text-[1.2rem]"
                onClick={() => setOpenPublish((prev) => !prev)}
              />
            </div>
          </div>
        )}

        <div className="mt-5 md:px-5">
          <div className="flex justify-between items-center gap-5">
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center">
                <MdDateRange className="text-[1.8rem]" />
              </div>
              <p>
                {format_date(
                  data?.created_at ? new Date() : new Date(data?.created_at)
                )}
              </p>
            </div>

            {data?.deployed === true ? (
              <>
                {data?.status === "Failed" ? (
                  <p className="px-5 py-1 text-sm bg-[#ba3333]/10 text-[#721e1e] border-1 border-[#ba3333]/15 rounded-lg">
                    Failed
                  </p>
                ) : data?.status === "Completed" ? (
                  <p className="px-5 py-1 text-sm bg-[#319b29]/10 text-[#174714] border-1 border-[#319b29]/15 rounded-lg">
                    {data?.status}
                  </p>
                ) : get_time_expiry(data?.deadline) === "0" ? (
                  <p className="px-5 py-1 text-sm bg-[#33b2ba]/10 text-[#144447] border-1 border-[#33b2ba]/15 rounded-lg">
                    Finalizing
                  </p>
                ) : (
                  <p className="px-5 py-1 text-sm bg-[#293a9b]/10 text-[#18225a] border-1 border-[#293a9b]/15 rounded-lg">
                    Published
                  </p>
                )}
              </>
            ) : (
              <>
                {data?.approval_status === "APPROVED" ? (
                  <p className="px-5 py-1 text-sm bg-[#ffb900]/20 text-[#866200] border-1 border-[#af8000]/15 rounded-lg">
                    Approved
                  </p>
                ) : (
                  <p className="px-5 py-1 text-sm bg-[#33b2ba]/10 text-[#144447] border-1 border-[#33b2ba]/15 rounded-lg">
                    Pending
                  </p>
                )}
              </>
            )}
          </div>

          <h1 className="text-4xl font-bold mt-5">
            <span id="gradient-txt">About </span>
            {data?.title}
          </h1>
          <p className="mt-5">{data?.description}</p>
          <p className="mt-3">{data?.summary}</p>

          <div className="rounded-lg w-full relative border-[2px] border-transparent [background:linear-gradient(#fcfcfc,#fcfcfc)_padding-box,linear-gradient(90deg,#81288055,#eb202755)_border-box] mt-14">
            <div className="relative w-full p-3 sm:p-5 pt-10">
              <div className="absolute top-0 left-0 translate-y-[-50%] md:translate-x-[1rem] w-full flex px-5">
                <div className="bg-[#fcfcfc] w-full md:hidden mb-5 px-5">
                  <CustomSelector
                    optionsList={["statistics", "milestone", "campaign-update"]}
                    placeholder="statistics"
                    changeEvent={(selected) => {
                      const value = selected?.value as string;
                      setToggle(
                        value === "statistics"
                          ? "statistics"
                          : value === "milestone"
                          ? "milestone"
                          : "campaign-update"
                      );
                    }}
                    control_style={{
                      border: "1px solid rgba(0,0,0,0.15)",
                      borderRadius: "0.5rem",
                      outline: "none",
                      backgroundColor: "#f3f4f6",
                      padding: "0.5rem",
                      width: "100%",
                    }}
                    control_class={""}
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

                <div className="bg-[#fcfcfc] hidden md:flex items-center gap-5 mb-5 px-5">
                  <button
                    onClick={() => setToggle("statistics")}
                    className={`${
                      toggle === "statistics"
                        ? "bg-black text-white"
                        : "bg-black/10 text-black/70"
                    } rounded-lg cursor-pointer flex items-center gap-2 font-semibold px-5 py-2`}
                  >
                    <BsFillBarChartLineFill />
                    Statistics
                  </button>

                  <button
                    onClick={() => setToggle("milestone")}
                    className={`${
                      toggle === "milestone"
                        ? "bg-black text-white"
                        : "bg-black/10 text-black/70"
                    } rounded-lg cursor-pointer flex items-center gap-2 font-semibold px-5 py-2`}
                  >
                    <GiTrophy className="text-[1.2rem]" /> Milestones
                  </button>

                  <button
                    onClick={() => setToggle("campaign-update")}
                    className={`${
                      toggle === "campaign-update"
                        ? "bg-black text-white"
                        : "bg-black/10 text-black/70"
                    } rounded-lg cursor-pointer flex items-center gap-2 font-semibold px-5 py-2`}
                  >
                    <MdSystemUpdateAlt className="text-[1.2rem]" /> Campaign
                    Updates
                  </button>
                </div>
              </div>

              {toggle === "statistics" ? (
                <div className="bg-[#0000000a]/60 rounded-lg border border-black/5 flex flex-wrap justify-between gap-5 p-3 sm:p-5">
                  <div className="flex items-center gap-3 min-w-[15rem]">
                    <div className="bg-[#812880] rounded-lg text-white p-3 text-[2.5rem]">
                      <IoPeople />
                    </div>

                    <div className="">
                      <h1 className="font-semibold text-2xl">
                        {data?.donations?.length}
                      </h1>
                      <p className="mt-1 text-sm">Total donations</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 min-w-[15rem]">
                    <div className="bg-[#812880] rounded-lg text-white p-3 text-[2.5rem]">
                      {/* <TbPercentage75 /> */}

                      <CircularLoader
                        size={40}
                        color="#812880"
                        percentage={Number(data?.progress || 0)}
                        strokeWidth={12}
                      />
                    </div>

                    <div className="">
                      <h1 className="font-semibold text-2xl">
                        {Number(data?.progress || 0)}%
                      </h1>
                      <p className="mt-1 text-sm">Completion percentage</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 min-w-[15rem]">
                    <div className="bg-[#812880] rounded-lg text-white p-3 text-[2.5rem]">
                      <TbStarsFilled />
                    </div>

                    <div className="">
                      <h1 className="font-semibold text-2xl">
                        {Number(data?.goal || 0)} <span>USDC</span>
                      </h1>
                      <p className="mt-1 text-sm">Campaign Goal</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 min-w-[15rem]">
                    <div className="bg-[#812880] rounded-lg text-white p-3 text-[2.4rem]">
                      <FaListCheck />
                    </div>

                    <div className="">
                      <h1 className="font-semibold text-2xl">
                        {Number(data?.milestones?.length || 0)}
                      </h1>
                      <p className="mt-1 text-sm">Total milestone</p>
                    </div>
                  </div>
                </div>
              ) : toggle === "milestone" ? (
                <Milestone
                  link={`/dashboard/campaign/overview/milestones-&-expenses`}
                  project_id={id}
                  milestones={data?.milestones}
                  project_percentage={Number(data?.progress || 0)}
                />
              ) : (
                <div className="col-span-2 w-full relative bg-gray-100 rounded-lg flex justify-center items-center px-5 py-14">
                  <div className="flex items-center justify-center gap-2">
                    <PiEmptyBold className="text-red-600 text-[1.3rem]" />
                    <p className="text-sm font-semibold text-gray-500">
                      No campaign updates
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className={`mt-10 ${
              organization === false &&
              "flex flex-col xl:grid grid-cols-2 gap-5"
            }`}
          >
            <div className="py-5">
              <h1 className="font-semibold text-xl mb-3">
                What Your Donation Provides
              </h1>

              <div className="flex flex-wrap gap-5 pl-5 mt-5">
                {data?.categories_display?.map(
                  (provide: any, index: number) => (
                    <div
                      key={index}
                      id="gradient-border"
                      className={`overflow-hidden ${
                        organization === false
                          ? "xl:w-full rounded-full xl:rounded-lg"
                          : "rounded-full"
                      }`}
                    >
                      <div className="bg-[#fcfcfc] px-5 py-3">
                        <p>{provide}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {organization === false && (
              <div className="h-full button_ flex flex-col justify-between p-3">
                <div className="">
                  <div className="flex items-center gap-1 mt-5 mb-2 px-5">
                    <MdTimer className="text-[1.5rem]" />
                    <p className="flex items-center gap-2 font-semibold">
                      <span>Deadline: </span>
                      {get_time_expiry(data?.deadline)}
                    </p>
                  </div>

                  <div className="bg-white rounded-sm p-5 sm:p-7">
                    <div className="rounded-lg w-full  text-black px-5">
                      <div className="w-full relative border-[2px] border-transparent rounded-lg flex justify-evenly items-center px-5">
                        {data?.status === "Failed" ? (
                          <div className="text-center">
                            <h1 className="font-bold text-3xl mb-2">
                              {donator[0]?.refunded === true
                                ? "0.0"
                                : donator[0]?.amount}
                            </h1>
                            <p>( Available Amount )</p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <h1 className="font-bold text-3xl mb-2">
                              {data?.goal}
                            </h1>
                            <p>( Campaign Goal )</p>
                          </div>
                        )}
                      </div>
                      <div className="w-[70%] h-[1px] mx-auto bg-gradient-to-r from-transparent via-black to-transparent mt-5"></div>
                    </div>

                    {data?.status === "Failed" ? (
                      <button
                        disabled={donator[0]?.refunded === true}
                        onClick={initiate_refund}
                        className={`w-full flex items-center justify-center gap-2 font-semibold cursor-pointer text-sm mt-5 p-5 ${
                          donator[0]?.refunded === true
                            ? "bg-gray-400 rounded-lg"
                            : "button_"
                        }`}
                      >
                        {loadingRefund && (
                          <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
                        )}
                        <IoWallet className="text-[1.3rem]" />
                        Request refund{" "}
                      </button>
                    ) : (
                      <button
                        onClick={() => setOpenDonation(true)}
                        disabled={data?.status === "Completed"}
                        className={`w-full flex items-center justify-center gap-2 font-semibold cursor-pointer text-sm mt-5 p-5 ${
                          data?.status === "Completed"
                            ? "bg-gray-400 rounded-lg"
                            : "button_"
                        }`}
                      >
                        <IoWallet className="text-[1.3rem]" />
                        Make a digital donation{" "}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-10">
            <div className="w-full h-[20rem] relative bg-gray-200 rounded-lg overflow-hidden mt-5">
              {data?.country && data?.address && (
                <LocationMap
                  country={`${data?.country || ""} ${
                    data?.address || ""
                  }`?.replace(" ", ", ")}
                />
              )}
            </div>
          </div>

          <div className="mt-10">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-xl mb-2">All Comments</h1>

              {organization === false && (
                <Link
                  href={`/dashboard/campaign/add-comment?id=${data?.id}`}
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

            {organization === false ? (
              <div className="mt-5 grid grid-cols-2 gap-5">
                {comments?.length > 0 ? (
                  comments?.map((comment: any, index) => (
                    <CommentComp
                      key={index}
                      index={index}
                      id={comment?.id}
                      loading={isLoading}
                      heading={comment?.username}
                      editComment={deleteComment}
                      paragraph={comment?.details}
                      link={`/dashboard/campaign/edit-comment?id=${comment?.id}&campaign=${id}`}
                    />
                  ))
                ) : (
                  <div className="col-span-2 w-full h-[10rem] sm:h-[15rem] xl:h-[20rem] relative bg-gray-100 rounded-lg flex justify-center items-center mt-5">
                    <div className="flex items-center justify-center gap-3">
                      <PiEmptyBold className="text-red-600 text-[1.7rem]" />
                      <p className="text-[1.0rem] font-semibold text-gray-500">
                        you don't have any comments added
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                {comments?.length > 0 ? (
                  <Swiper
                    modules={[Navigation]}
                    navigation={{
                      prevEl: ".popular-prev",
                      nextEl: ".popular-next",
                    }}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={1} // 👈 base: mobile first
                    breakpoints={{
                      900: { slidesPerView: 2 }, // ≥900px → 2 slides
                      1100: { slidesPerView: 3 }, // ≥1100px → 3 slides
                    }}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                  >
                    {comments?.map((comment: any, index: number) => (
                      <SwiperSlide key={index}>
                        <CommentComp
                          key={index}
                          index={index}
                          id={comment?.id}
                          loading={isLoading}
                          heading={comment?.username}
                          editComment={deleteComment}
                          paragraph={comment?.details}
                          link={`/dashboard/campaign/edit-comment?id=${comment?.id}&campaign=${id}`}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div className="w-full h-[10rem] sm:h-[15rem] xl:h-[20rem] relative bg-gray-100 rounded-lg flex justify-center items-center mt-5">
                    <div className="flex items-center justify-center gap-3">
                      <PiEmptyBold className="text-red-600 text-[1.7rem]" />
                      <p className="text-[1.0rem] font-semibold text-gray-500">
                        No comments has been made yet.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
