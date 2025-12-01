"use client";

import BackButton from "@/components/dashboard/BackButton";
import { format_date, response_message } from "@/components/utilities/utils";
import { useGetMilestoneMutation } from "@/redux/api/main";
import { RootState } from "@/redux/store";
import { Withdraw_Milestone } from "@/Wallet/ConnectContract";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaDownload, FaImages } from "react-icons/fa";
import { IoDocumentsSharp, IoWallet } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { PiEmptyBold } from "react-icons/pi";
import { TbPercentage25, TbPlus } from "react-icons/tb";
import { useSelector } from "react-redux";

export default function Home() {
  const [isLoadingWithdraw, setIsLoadingWithdraw] = useState<boolean>(false);
  const [transferred, setTransferred] = useState<boolean>(false);
  const [toggle, setToggle] = useState<"expenses" | "milestone-images">(
    "milestone-images"
  );
  const { organization, wallet } = useSelector(
    (state: RootState) => state.user
  );

  const [Get_Milestone, { data, isLoading }] = useGetMilestoneMutation();

  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  const project_id = params.get("project_id");

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

  useEffect(() => {
    console.log("====================================");
    console.log(id);
    console.log("====================================");

    if (!id) return router.back();

    (async () => {
      const campaign_result = await Get_Milestone({ query: `/${id}/` });

      if (is_error(campaign_result) === true) return;
    })();

    return () => {};
  }, []);

  const withdraw_token = async () => {
    if (organization === false)
      return response_message({
        message: "You do not have access to this feature",
        option: "wrn",
      });
    else if (!wallet.account)
      return response_message({
        message: "Kindly connect your wallet to continue.",
        option: "wrn",
      });

    const pars_data = { id: data?.contract_id, index: data?.milestone_no - 1 };

    console.log("====================================");
    console.log(pars_data);
    console.log("====================================");

    setIsLoadingWithdraw(true);

    try {
      const txReceipt = await Withdraw_Milestone(pars_data);
      console.log("Withdraw successful:", txReceipt);

      setIsLoadingWithdraw(false);
      if (txReceipt?.status === true) {
        setTransferred(true);
        response_message({ message: "WithdrawL successful", option: "scc" });
        router.push(`/dashboard/campaign/overview?id=${project_id}`);
      }
    } catch (err) {
      console.error("Withdraw failed:", err);
    }
  };

  console.log("====================================");
  console.log(data);
  console.log("====================================");

  return (
    <div className="w-full px-5 md:px-10 pb-5">
      <BackButton
        route={`/dashboard/campaign/overview?id=${project_id}`}
        parent_wind="flex mb-5"
      />

      <div className="rounded-lg w-full relative border-[2px] border-transparent mb-10">
        <div className="w-full h-full col-span-6 xl:col-span-7 overflow-hidden object-center bg-[url('https://images.unsplash.com/photo-1740568439252-b060d7ff3437?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds')] rounded-lg">
          <div className="w-full bg-[linear-gradient(90deg,#812880a1,#eb2027e1)] font-bold text-white p-7 sm:p-10">
            <div className={`flex flex-col gap-5`}>
              <div className="">
                <h1 className="text-2xl md:text-3xl lg:text-4xl flex flex-wrap items-end gap-2">
                  <span className="">Goal:</span> {data?.goal} USDC{" "}
                  <span className="text-sm flex items-center gap-1 font-semibold">
                    <TbPercentage25 className="text-[1.2rem]" />
                    {Number(data?.percentage)}%
                  </span>
                </h1>

                <p className="mt-3 font-normal">{data?.details}</p>
              </div>
            </div>

            {organization === true && data?.approved === true && (
              <div className="max-w-[20rem] bg-white rounded-lg mt-5 p-[0.2rem]">
                {transferred === true || data?.withdrawn === true ? (
                  <button className="bg-gray-300 text-black/70 rounded-md w-full flex items-center justify-center gap-2 font-semibold cursor-pointer text-sm py-5">
                    <IoWallet className="text-[1.3rem]" />
                    Withdraw token{" "}
                  </button>
                ) : (
                  <button
                    disabled={isLoadingWithdraw}
                    onClick={withdraw_token}
                    className="button_ w-full flex items-center justify-center gap-2 font-semibold cursor-pointer text-sm py-5"
                  >
                    {isLoadingWithdraw && (
                      <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
                    )}
                    <IoWallet className="text-[1.3rem]" />
                    Withdraw token{" "}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-5 mb-5 mt-10">
        <div className="flex items-center gap-5">
          <button
            onClick={() => setToggle("milestone-images")}
            className={`font-semibold ${
              toggle === "milestone-images"
                ? "bg-black text-white"
                : "bg-black/10 text-black/70"
            } rounded-lg cursor-pointer px-5 py-2`}
          >
            milestone-images
          </button>

          <button
            onClick={() => setToggle("expenses")}
            className={`font-semibold ${
              toggle === "expenses"
                ? "bg-black text-white"
                : "bg-black/10 text-black/70"
            } rounded-lg cursor-pointer px-5 py-2`}
          >
            expenses
          </button>
        </div>

        {(organization === true && transferred === true) ||
          (data?.withdrawn === true && (
            <Link
              // href={`/dashboard/campaign/add-comment?id=${data?.id}`}
              href={
                toggle === "expenses"
                  ? `/dashboard/campaign/overview/milestones-&-expenses/add-expenses?id=${id}`
                  : `/dashboard/campaign/overview/milestones-&-expenses/add-milestone-image?id=${id}`
              }
              className="text-[#381237] font-bold cursor-pointer text-[1.5rem]
                       rounded-xl border-[2px] border-transparent
                       [background:linear-gradient(#fcfcfc,#fcfcfc)_padding-box,linear-gradient(90deg,#812880,#eb2027)_border-box] overflow-hidden"
            >
              <div className="hover:bg-[#812880]/5 text-[1.3rem] px-5 py-[0.7rem]">
                <TbPlus />
              </div>
            </Link>
          ))}
      </div>

      {toggle === "expenses" ? (
        <div className="flex flex-col gap-5 py-5">
          {data?.expenses?.length > 0 ? (
            data?.expenses?.map((expense: any, index: number) => (
              <div
                key={index}
                className="bg-[#0000000a]/60 rounded-lg flex justify-between border border-black/5 p-5"
              >
                <div className="flex items-center">
                  <MdDateRange className="text-[1.3rem]" />
                  <p className="text-sm">
                    {format_date(
                      expense?.date ? new Date(expense?.date) : new Date()
                    )}{" "}
                  </p>
                </div>

                {expense?.proof_pdf ? (
                  <Link
                    href={expense?.proof_pdf}
                    target="_blank"
                    className="flex items-center gap-2"
                  >
                    <p className="text-sm">Download Proof</p> <FaDownload />
                  </Link>
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="text-sm">Download Proof</p> <FaDownload />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-2 w-full relative bg-gray-100 rounded-lg flex justify-center items-center p-5">
              <div className="flex items-center justify-center gap-2">
                <PiEmptyBold className="text-red-600 text-[1.3rem]" />
                <p className="text-sm font-semibold text-gray-500">
                  No expenses document has been added
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col md:grid grid-cols-2 gap-5 py-5">
          {data?.images?.length > 0 ? (
            data?.images?.map((image: any, index: number) => (
              <div
                key={index}
                className="bg-[#0000000a]/60 rounded-lg border border-black/5 p-5"
              ></div>
            ))
          ) : (
            <div className="col-span-2 w-full relative bg-gray-100 rounded-lg flex justify-center items-center p-5">
              <div className="flex items-center justify-center gap-2">
                <PiEmptyBold className="text-red-600 text-[1.3rem]" />
                <p className="text-sm font-semibold text-gray-500">
                  No milestone images has been added
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
