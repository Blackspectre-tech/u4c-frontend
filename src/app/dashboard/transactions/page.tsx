"use client";

import {
  format_date,
  get_time_ago,
  response_message,
} from "@/components/utilities/utils";
import { useGetTransactionHistoryMutation } from "@/redux/api/main";
import Link from "next/link";
import { useEffect } from "react";
import { MdDateRange } from "react-icons/md";

export default function Home() {
  const [Get_Campaign, { data, isLoading }] =
    useGetTransactionHistoryMutation();

  useEffect(() => {
    (async () => {
      const result = await Get_Campaign({});
      const is_message = result.error?.data?.errors;

      console.log(result);

      if ("error" in result)
        return response_message({
          message: is_message
            ? `${result.error?.data?.errors[0]?.detail} ${result.error?.data?.errors[0]?.attr}`
            : "Something went wrong?",
          option: "err",
        });
    })();

    return () => {};
  }, []);

  return (
    <div className="px-5 sm:px-10">
      <h1 className="font-semibold text-xl mb-2">Transaction History</h1>

      <div className="relative grid grid-cols-1 gap-5 mt-5">
        {data
          ? data?.map((transaction: any, index: number) => (
              <Link
                key={index}
                href={`/dashboard/transactions/overview?harsh=${transaction?.tx_hash}&data=${transaction?.created_at}&event=${transaction?.event}`}
                className="bg-gray-100 rounded-md flex flex-wrap items-center justify-between gap-5 p-5"
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center">
                    <MdDateRange className="text-[1.3rem]" />
                  </div>
                  <p className="text-sm">
                    {get_time_ago(transaction?.created_at || 0)}
                  </p>
                </div>

                <div className="sm:w-[40%] lg:w-[20%] flex items-center gap-5">
                  <p className="px-5 py-1 text-sm bg-[#33b2ba]/10 text-[#144447] border-1 border-[#33b2ba]/15 rounded-lg">
                    {transaction?.event || "..."}
                  </p>

                  <div className="w-full">
                    <p className="line-clamp-1 wrap-anywhere">
                      {transaction?.tx_hash}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          : [
              "[--delay:0.5s]",
              "[--delay:0.3s]",
              "[--delay:0.4s]",
              "[--delay:0.6s]",
            ]?.map((transaction: any, index: number) => (
              <div key={index} className="relative">
                <div
                  className={`bg-gray-100 relative rounded-md loading_ ${transaction} p-8`}
                ></div>
              </div>
            ))}
      </div>
    </div>
  );
}
