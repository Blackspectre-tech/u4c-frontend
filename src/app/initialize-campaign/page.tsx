"use client";

import LocationMap from "@/components/LocationMap";
import { format_date, response_message } from "@/components/utilities/utils";
import {
  useAddWalletAddressMutation,
  useGetCampaignNgoMutation,
} from "@/redux/api/main";
import { RootState } from "@/redux/store";
import { Create_Campaign, Platform_Address } from "@/Wallet/ConnectContract";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GiTrophy } from "react-icons/gi";

import { IoPeople } from "react-icons/io5";
import { MdCancel, MdDateRange } from "react-icons/md";
import { TbPercentage75 } from "react-icons/tb";
import { useSelector } from "react-redux";

export default function Home() {
  const [open, setOpen] = useState(true);
  const { organization, wallet } = useSelector(
    (state: RootState) => state.user
  );

  const [loading, setLoading] = useState(false);
  const [Get_Campaign, { data, isLoading }] = useGetCampaignNgoMutation();
  const [Add_Address, {}] = useAddWalletAddressMutation();

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

      if (!(result.data?.approval_status === "APPROVED")) return router.back();
      if (result.data?.deployed === true) return router.back();
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
    const milestoneAmounts: Array<number> = [];

    for (let i = 0; i < data?.milestones?.length; i++) {
      milestoneNames.push(data?.milestones[i]?.title || "");
      milestoneAmounts.push(Math.abs(data?.milestones[i]?.goal) || 0);
    }

    const campaign_details = {
      currencyType: 1,
      // token: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", // USDT
      token: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", // USDC
      goal: Number(data?.goal) || 0,
      durationInDays: Number(data?.duration_in_days) || 0,
      milestoneNames: milestoneNames,
      milestoneAmounts: milestoneAmounts,
    };

    const add_address = await Add_Address({
      params: {},
      body: { wallet_address: wallet.account || "" },
    });

    if (is_error(add_address) === true) return;

    const result = await Create_Campaign({ ...campaign_details });

    console.log("====================================");
    console.log(result);
    console.log(campaign_details);
    console.log(wallet.account);
    console.log("====================================");

    if (result?.status === true) {
      response_message({
        message: "Campaign initiated successfully.",
        option: "scc",
      });

      setTimeout(() => {
        router.push("/dashboard/campaign");
      }, 3000);
    }
    setLoading(false);
  };

  return (
    <div className="w-[70%] bg-gray-50 border border-gray-200 rounded-lg mx-auto mt-20 p-10">
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

      <div
        className={`${
          open === true ? "flex items-center justify-between" : "hidden"
        } w-full bg-amber-100/50 border border-amber-400 rounded-lg my-5 p-4`}
      >
        <p>Kindly note that this process is not reversible</p>

        <div className="min-w-10 min-h-10 flex justify-center items-center">
          <MdCancel
            className="cursor-pointer text-[1.2rem]"
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
      </div>

      <div className="mt-5 px-5">
        <div className="flex justify-between items-center gap-5">
          <div className="flex items-center">
            <div className="w-10 h-10 flex items-center">
              <MdDateRange className="text-[1.8rem]" />
            </div>
            {format_date(
              data?.created_at ? new Date() : new Date(data?.created_at)
            )}
          </div>

          <p className="px-5 py-1 text-sm bg-[#33b2ba]/10 text-[#144447] border-1 border-[#33b2ba]/15 rounded-lg">
            Pending
          </p>
        </div>

        <h1 className="text-4xl font-bold mt-5">
          <span id="gradient-txt">About </span>
          {data?.title}
        </h1>
        <p className="mt-5">{data?.description}</p>

        <div className="rounded-lg w-full relative border-[2px] border-transparent [background:linear-gradient(#f9fafb,#f9fafb)_padding-box,linear-gradient(90deg,#81288055,#eb202755)_border-box] mt-[2rem]">
          <div className="absolute top-0 left-[2rem] translate-y-[-50%] z-10 bg-gray-50 px-5 py-1">
            <p>Summary</p>
          </div>

          <div className="w-full p-5">
            <p>{data?.summary}</p>

            <div className="bg-[#0000000a]/60 rounded-lg border border-black/5 flex flex-wrap lg:grid grid-cols-2 min-[1320]:grid-cols-3 gap-5 mt-10 p-5">
              <div className="flex items-center gap-3">
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

              <div className="flex items-center gap-3">
                <div className="bg-[#812880] rounded-lg text-white p-3 text-[2.5rem]">
                  <TbPercentage75 />
                </div>

                <div className="">
                  <h1 className="font-semibold text-2xl">
                    {Number(data?.progress || 0)}%
                  </h1>
                  <p className="mt-1 text-sm">Completion percentage</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-[#812880] rounded-lg text-white p-3 text-[2.5rem]">
                  <GiTrophy />
                </div>

                <div className="">
                  <h1 className="font-semibold text-2xl">
                    {Number(data?.goal || 0)}
                  </h1>
                  <p className="mt-1 text-sm">Goal</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="font-semibold text-xl mb-3">
            What Your Donation Provides
          </h1>

          <div className="flex flex-col md:grid grid-cols-2 xl:grid-cols-3 gap-5 pl-5 mt-5">
            {data?.categories_display?.map((provide: any, index: number) => (
              <div
                key={index}
                id="gradient-border"
                className="rounded-lg overflow-hidden"
              >
                <div className="bg-[#fcfcfc] py-4 px-7">
                  <p>{provide}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 p-5">
          <div className="w-full h-[20rem] relative bg-red-200 rounded-lg overflow-hidden mt-5">
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

      <div
        onClick={publishCampaign}
        className="w-full font-semibold button_ text-sm cursor-pointer flex items-center justify-center gap-2 mt-10 py-3"
      >
        {loading && (
          <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
        )}
        <h1>Publish Campaign</h1>
      </div>
    </div>
  );
}
