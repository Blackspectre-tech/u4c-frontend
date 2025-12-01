"use client";

import BackButton from "@/components/dashboard/BackButton";
import Campaign_DONOR from "@/components/dashboard/donor/Campaign";
import Campaign_NGO from "@/components/dashboard/ngo/Campaign";
import LocationMap from "@/components/LocationMap";
import {
  format_date,
  get_time_ago,
  response_message,
} from "@/components/utilities/utils";
import {
  useGetCampaignNgoMutation,
  useGetCommentMutation,
} from "@/redux/api/main";
import { RootState } from "@/redux/store";
import { Get_Transaction_Details } from "@/Wallet/ConnectContract";
import { error } from "console";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa";
import { GiTrophy } from "react-icons/gi";
import { GoLink } from "react-icons/go";
import { IoPeople } from "react-icons/io5";
import { LuExternalLink } from "react-icons/lu";
import {
  MdCancel,
  MdDateRange,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { PiEmptyBold } from "react-icons/pi";
import { TbPercentage75, TbPlus } from "react-icons/tb";
import { useSelector } from "react-redux";

export default function Home() {
  const { organization } = useSelector((state: RootState) => state.user);
  const [transactionData, setTransactionData] = useState<any>({});

  const router = useRouter();
  const params = useSearchParams();
  const harsh = params.get("harsh");
  const data = params.get("data");
  const event = params.get("event");

  useEffect(() => {
    console.log("====================================");
    console.log(harsh, " : ", data);
    console.log("====================================");

    if (!harsh || !data || !event) return router.back();

    (async () => {
      // Example usage
      await Get_Transaction_Details(harsh)
        .then((res) => {
          console.log(res);
          setTransactionData(res);
        })
        .catch((err) => {
          console.log(err);

          response_message({
            message: "Something went wrong?",
            option: "err",
          });
        });
    })();

    return () => {};
  }, []);

  const amount = transactionData?.amount
    ? [
        {
          title: "Amount",
          result: transactionData?.amount || "...",
        },
      ]
    : [];
  const symbol = transactionData?.tokenSymbol
    ? [
        {
          title: "Token Name",
          result: transactionData?.tokenSymbol?.replace("0", "") || "...",
        },
      ]
    : [];

  const from = transactionData?.to
    ? [
        {
          title: "From Address",
          address: true,
          result: transactionData?.from || "...",
        },
      ]
    : [];

  const too = transactionData?.to
    ? [
        {
          title: "Too Address",
          address: true,
          result: transactionData?.to || "...",
        },
      ]
    : [];

  const transaction_details = [
    ...amount,
    ...symbol,
    {
      title: "Block Number",
      result: transactionData?.blockNumber || "...",
    },
    {
      title: "Status",
      result: transactionData?.status || "...",
    },
    {
      title: "Gas Price Gwei",
      result: transactionData?.gasPriceGwei || "...",
    },
    {
      title: "Gas Fee",
      result: transactionData?.gasFeeMatic || "...",
    },
    {
      title: "Token Address",
      address: true,
      result: transactionData?.tokenAddress || "...",
    },
    ...from,
    ...too,
    {
      title: "Date",
      result: transactionData?.timestamp
        ? get_time_ago(transactionData?.timestamp)
        : "...",
    },
  ];

  return (
    <div className="px-5 md:px-10">
      <BackButton route="/dashboard/transactions" />

      <div className="rounded-lg w-full relative border-[2px] border-transparent">
        <div className="w-full h-full col-span-6 xl:col-span-7 overflow-hidden object-center bg-[url('https://images.unsplash.com/photo-1740568439252-b060d7ff3437?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds')] rounded-lg">
          <div className="w-full bg-[linear-gradient(90deg,#812880a1,#eb2027e1)] p-7 md:p-10">
            <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold">
              Transaction Details{" "}
              <span className="px-2 py-1 text-[0.8rem] bg-[#48f3ff] text-[#144447] border-1 border-[#48f3ff] rounded-lg">
                {event === "null" ? "..." : event}
              </span>
            </h1>
          </div>
        </div>

        <div className="w-full flex flex-col gap-5 md:p-5 mt-5">
          <div className="flex flex-col sm:flex-row sm:items-center border-b border-black/10 sm:justify-between px-5 pb-3">
            <p className="font-semibold mb-3 md:mb-0">Explorer On Polygon</p>
            <Link href={transactionData?.explorerUrl || "#"} target="_blank">
              <LuExternalLink className="text-[1.5rem]" />
            </Link>
          </div>

          {transaction_details.map((value: any, index) => (
            <div
              key={index}
              className={`flex flex-col sm:flex-row sm:items-center sm:justify-between ${
                !(index === transaction_details.length - 1) &&
                "border-b border-black/10"
              } px-5 pb-5`}
            >
              <p className="font-semibold mb-3 md:mb-0">{value?.title}</p>
              {value?.address === true ? (
                <p className="sm:w-[40%] lg:w-[20%] line-clamp-1 wrap-anywhere capitalize ml-2 md:ml-0">
                  {value?.result}
                </p>
              ) : (
                <p className="line-clamp-1 wrap-anywhere capitalize ml-2 md:ml-0">
                  {value?.result}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
