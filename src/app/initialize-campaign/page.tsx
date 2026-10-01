"use client";

import Insight from "@/components/dashboard/Insight";
import {
  format_date,
  get_percentage,
  response_message,
} from "@/components/utilities/utils";
import {
  useAddWalletAddressMutation,
  useGetCampaignNgoMutation,
} from "@/redux/api/main";
import { RootState } from "@/redux/store";
import { Create_Campaign } from "@/Wallet/ConnectContract";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdCancel, MdDateRange } from "react-icons/md";
import { SiHiveBlockchain } from "react-icons/si";
import { useSelector } from "react-redux";
import { FaChevronRight } from "react-icons/fa";
import Milestone from "@/components/dashboard/ngo/Milestone";
import { useWallets } from "@privy-io/react-auth";
import { useGetWallet, USDC_ADDRESS } from "@/Wallet/privy/privy.utils";
import { Smart_Create_Campaign } from "@/Wallet/ConnectSmartContract";

export default function Home() {
  const [swiperInstance1, setSwiperInstance1] = useState<SwiperClass | null>(
    null,
  );
  const [data, setData] = useState<any>({});
  const [open, setOpen] = useState(true);
  const { organization, wallet, user } = useSelector(
    (state: RootState) => state.user,
  );

  const [Get_Campaign, { isLoading }] = useGetCampaignNgoMutation();
  const [Add_Address, {}] = useAddWalletAddressMutation();
  const [loading, setLoading] = useState(false);
  const use_wallet = useGetWallet();

  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  useEffect(() => {
    console.log("====================================");
    console.log(id);
    console.log("====================================");

    if (!id || !(organization === true)) return router.back();

    (async () => {
      const result = await Get_Campaign({ query: `/${id}/` });
      console.log(result.data);

      const milestones_copy = result?.data?.milestones;
      const new_milestones = [...(milestones_copy || [])]?.sort(
        (a: any, b: any) => b?.percentage - a?.percentage,
      );

      const milestones_ = new_milestones
        ?.map((milestone: any, index: number) => {
          console.log("\n\n[ Milestone ]: ", milestone);
          const goal = new_milestones[index]?.percentage || 0;
          const next_goal = new_milestones?.[index + 1]?.percentage || 0;
          const percentage = goal - next_goal;

          return {
            ...milestone,
            new_percentage: percentage,
            readable_goal: get_percentage(
              milestone?.percentage,
              Number(result?.data?.goal || 0),
            ),
            new_goal: get_percentage(
              percentage,
              Number(result?.data?.goal || 0),
            ),
          };
        })
        ?.sort((a: any, b: any) => a?.percentage - b?.percentage);

      if (!(result.data?.approval_status === "APPROVED")) return router.back();
      if (result.data?.deployed === true) return router.back();

      setData({ ...(result.data || {}), milestones: milestones_ });
    })();

    return () => {};
  }, []);

  const is_error = (result: any): boolean => {
    console.log(result);

    if ("error" in result) {
      response_message({ message: "Something went wrong?", option: "wrn" });
      return true;
    }

    return false;
  };

  const publishCampaign = async () => {
    setLoading(true);

    if (!wallet.account) {
      response_message({
        message: "Kindly connect your wallet to continue.",
        option: "wrn",
      });

      setLoading(false);
      return;
    }

    const milestoneNames: Array<string> = [];
    const milestoneBps: Array<number> = [];
    const milestones = [...(data?.milestones || [])]?.sort(
      (a: any, b: any) => b?.percentage - a?.percentage,
    );

    for (let i = 0; i < milestones?.length; i++) {
      const goal = milestones[i]?.percentage * 100 || 0;
      const next_goal = milestones?.[i + 1]?.percentage * 100 || 0;

      // console.log("\n\n[ Goal ]: ", goal, ", Next, ", next_goal);
      // console.log("[ Index ]: ", i, "\n\n");

      milestoneNames[milestoneNames.length] = milestones[i]?.title || "";
      milestoneBps[milestoneBps.length] = goal - next_goal;
      // milestoneNames.push(milestones[i]?.title || "");
      // milestoneBps.push(goal - next_goal);
    }

    milestoneNames.reverse();
    milestoneBps.reverse();

    const campaign_details = {
      currencyType: 1,
      token: USDC_ADDRESS,
      goal: Number(data?.goal) || 0,
      durationDays: Number(data?.duration_in_days) || 0,
      milestoneNames: milestoneNames,
      milestoneBps: milestoneBps, // Updated key name (ensure these are Basis Points, e.g., 5000 for 50%)
      contextData: String(user?.name || ""), // New field from screenshot
      offchainId: String(id || ""), // New field from screenshot (usually your DB ID)
    };

    console.log("\n\nCampaign-Details");
    console.log("[ MilestoneBps ]: ", milestoneBps);
    console.log("[ MilestoneNames ]: ", milestoneNames);
    console.log(campaign_details);
    console.log(data?.milestones);
    console.log(milestones);

    // throw Error("Wait.");
    const add_address = await Add_Address({
      params: {},
      body: { wallet_address: wallet.account || "" },
    });

    if (is_error(add_address) === true) return;
    let pledge = null;

    if (use_wallet.isSmartAccount) {
      pledge = await Smart_Create_Campaign({
        body: campaign_details,
        smartClient: use_wallet.connector,
      });
    } else {
      pledge = await Create_Campaign({
        ...campaign_details,
        wallet: use_wallet.connector,
      });
    }

    console.log("====================================");
    console.log(pledge);
    console.log(wallet.account);
    console.log(campaign_details);
    console.log("====================================");

    if (pledge?.status === true) {
      response_message({
        message: "Campaign initiated successfully.",
        option: "scc",
      });

      setTimeout(() => {
        router.push("/dashboard/campaign");
      }, 3000);
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

        return setTimeout(() => router.push("/dashboard/campaign"), 3000);
      }

      response_message({ message: pledge?.error as string, option: "wrn" });
    }

    setLoading(false);
  };

  const progress = Number(data?.progress || 0);
  const progress_ = progress > 100 ? 100 : progress;
  const FUNDED_AMOUNT = get_percentage(progress_, Number(data?.goal || 0));

  console.log("data");
  console.log("data");
  console.log("data");
  console.log("data");
  console.log(data);

  return (
    <div className="p-5">
      <div className="sm:w-[90%] lg:w-[70%] bg-gray-50 border border-gray-200 rounded-4xl mx-auto mt-20">
        <div className="px-5 md:px-10">
          <div
            className={`${
              open === true ? "flex items-center justify-between" : "hidden"
            } w-full bg-amber-100/50 border border-amber-400 rounded-xl my-5 p-4`}
          >
            <p>Kindly note that this process is not reversible</p>

            <div className="min-w-10 min-h-10 flex justify-center items-center">
              <MdCancel
                className="cursor-pointer text-[1.2rem]"
                onClick={() => setOpen((prev) => !prev)}
              />
            </div>
          </div>

          {isLoading === true || !data?.image ? (
            <div className="w-full min-h-68 max-h-68 relative bg-gray-100 rounded-lg loading_ [--delay:0.5s]"></div>
          ) : (
            <div className="w-full min-h-68 max-h-68 rounded-4xl relative overflow-hidden">
              <Image
                src={data?.image}
                alt=""
                className="w-full h-full object-cover"
                fill
              />
            </div>
          )}

          <div className="mt-5 px-5">
            <div className="flex justify-between items-center gap-5">
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center">
                  <MdDateRange className="text-[1.8rem]" />
                </div>
                {format_date(
                  data?.created_at ? new Date() : new Date(data?.created_at),
                )}
              </div>

              <p className="px-5 py-1 text-sm bg-[#33b2ba]/10 text-[#144447] border border-[#33b2ba]/15 rounded-lg">
                Pending
              </p>
            </div>

            <h1 className="text-4xl font-bold mt-5">{data?.title}</h1>
            <p className="mt-5">{data?.description}</p>
            <p className="mt-3">{data?.summary}</p>

            <div className="gradient-cto-border border border-transparent rounded-4xl mt-10 overflow-hidden">
              <div className="w-full flex flex-wrap items-center gap-10 p-5">
                <Insight
                  colorTint={"bg-[#c0fbff]"}
                  icon={<SiHiveBlockchain className="text-[#33b2ba]" />}
                  value={data?.goal || 0}
                  description={"Total Goal"}
                />

                <div className="w-px h-10 bg-gray-300 mx-10"></div>

                <Insight
                  colorTint={"bg-[#FFE6A3]"}
                  icon={<SiHiveBlockchain className="text-[#A2790C]" />}
                  value={Number(data?.progress || 0)}
                  description={"Completion Percentage"}
                />
              </div>
            </div>

            <div className="mt-10">
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
            <div className="bg-gray-100 mt-14"></div>
          </div>
        </div>

        <div>
          <div className="bg-[#35B9C2] w-full flex justify-between p-5">
            <div className="flex items-center gap-5 px-10">
              <button
                className={`${"bg-white text-black"} rounded-lg cursor-pointer flex items-center gap-2 font-semibold px-5 py-2`}
              >
                {/* <BsFillBarChartLineFill /> */}
                Milestones
              </button>
            </div>

            {
              <div className="flex items-center gap-5">
                <div
                  onClick={() => {
                    if (swiperInstance1) swiperInstance1.slideNext();
                  }}
                  className="w-13 h-13 border-2 border-white bg-white/10 rounded-full cursor-pointer flex items-center justify-center"
                >
                  <FaChevronRight className="text-[1.5rem] translate-x-0.5 text-white" />
                </div>
              </div>
            }
          </div>
          <div className="relative overflow-hidden">
            <div
              className={`${data?.milestones?.length > 1 ? "w-[190%] lg:w-[120%] min-[1500px]:w-full!" : "w-full"} px-5 mt-5 md:mt-0 md:p-10`}
            >
              <Swiper
                loop={true}
                key={
                  data?.milestones?.length > 1
                    ? "layout-populated"
                    : "layout-loading" // 👈 Forces recalculation
                }
                onSwiper={(swiper) => setSwiperInstance1(swiper)}
                speed={500} // how fast the content glides
                spaceBetween={20}
                slidesPerView={3} // 👈 base: mobile first
                breakpoints={
                  data?.milestones?.length > 3
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
                {data?.milestones?.map((milestone: any, index: number) => (
                  <SwiperSlide key={index}>
                    <div className="py-5 px-3">
                      <Milestone
                        link={`/dashboard/campaign/overview/milestones-&-expenses`}
                        milestone={milestone}
                        project_id={id}
                        campaign={{
                          deployed: false,
                          goal: Number(data?.goal || 0),
                          refundable: true,
                          percentage: Number(data?.progress || 0),
                          milestone_goal: Number(data?.progress || 0),
                          funded_amount: FUNDED_AMOUNT,
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        <div className="px-10 pb-10">
          <button
            onClick={publishCampaign}
            className="w-full font-semibold gradient-cto text-sm cursor-pointer flex items-center justify-center rounded-4xl gap-2 mt-10 py-5"
          >
            {loading && (
              <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
            )}
            <h1>Publish Campaign</h1>
          </button>
        </div>
      </div>
    </div>
  );
}
