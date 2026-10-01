"use client";

import { get_time_ago, response_message } from "@/components/utilities/utils";
import { NavigationTemplate } from "@/components/utilities/utils.template";
import { RootState } from "@/redux/store";
import { Get_Transaction_Details } from "@/Wallet/privy/privy.utils";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LuExternalLink } from "react-icons/lu";
import { useSelector } from "react-redux";

export default function Home() {
  const { organization } = useSelector((state: RootState) => state.user);
  const [transactionData, setTransactionData] = useState<any>({});

  const router = useRouter();
  const params = useSearchParams();
  const harsh = params.get("harsh");
  const date = params.get("date");
  const event = params.get("event");

  useEffect(() => {
    console.log("====================================");
    console.log(harsh, " : ", date);
    console.log("====================================");

    if (!harsh || !date || !event) return router.back();

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
      <NavigationTemplate
        title="Transaction Details"
        navigation={[
          { title: "Dashboard", path: "/dashboard" },
          { title: "Transaction History", path: "/dashboard/transactions" },
          { title: "Transaction Details", path: "#" },
        ]}
      />

      <div className="rounded-lg w-full relative border-2 border-transparent mt-5">
        <div className="w-full h-full col-span-6 xl:col-span-7 overflow-hidden object-center bg-[url('https://images.unsplash.com/photo-1740568439252-b060d7ff3437?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds')] rounded-4xl">
          <div className="w-full bg-[linear-gradient(90deg,#eb2027e1,#f36f26e1)] p-7 md:p-10">
            <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold">
              Transaction Details{" "}
            </h1>
            <h2 className="text-white text-[1.2rem] px-2 py-1">
              {event === "null" ? "..." : event}
            </h2>
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
                <p className="sm:w-[40%] lg:w-[20%] text-right line-clamp-1 wrap-anywhere capitalize ml-2 md:ml-0">
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
