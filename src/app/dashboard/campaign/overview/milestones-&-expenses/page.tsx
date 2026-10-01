"use client";

import BackButton from "@/components/dashboard/BackButton";
import Insight from "@/components/dashboard/Insight";
import CustomSelector from "@/components/SelectTag";
import {
  format_currency,
  format_date,
  get_percentage_of_second,
  response_message,
} from "@/components/utilities/utils";
import { NavigationTemplate } from "@/components/utilities/utils.template";
import {
  useDeleteExpensesMutation,
  useGetMilestoneMutation,
} from "@/redux/api/main";
import { RootState } from "@/redux/store";
import {
  Get_Campaign_Details,
  Withdraw_Milestone,
} from "@/Wallet/ConnectContract";
import { Smart_Withdraw_Milestone } from "@/Wallet/ConnectSmartContract";
import { useGetWallet } from "@/Wallet/privy/privy.utils";
import { useWallets } from "@privy-io/react-auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaDownload } from "react-icons/fa";
import { IoClose, IoWallet } from "react-icons/io5";
import { MdDateRange, MdDeleteOutline, MdEditSquare } from "react-icons/md";
import { PiEmptyBold } from "react-icons/pi";
import { RiDeleteBin6Fill, RiEdit2Line } from "react-icons/ri";
import { SiHiveBlockchain } from "react-icons/si";
import { TbPlus } from "react-icons/tb";
import { useSelector } from "react-redux";

export default function Home() {
  const [isLoadingWithdraw, setIsLoadingWithdraw] = useState<boolean>(false);
  const [transferred, setTransferred] = useState<boolean>(false);
  const [expenseId, setExpenseId] = useState<string>("/");
  const [data, setData] = useState<any>({});
  const [toggle, setToggle] = useState<string>("milestone-images");
  const [refetch, setRefetch] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { organization, wallet } = useSelector(
    (state: RootState) => state.user,
  );

  const [Delete_Expenses, { isLoading: isLoadingDelete }] =
    useDeleteExpensesMutation();
  const [Get_Milestone, { isLoading }] = useGetMilestoneMutation();
  const use_wallet = useGetWallet();

  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  const surplus = params.get("surplus");
  const deployed = params.get("deployed");
  const project_id = params.get("project_id");
  const campaign_percentage = params.get("campaign_percentage");

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
      setData(campaign_result?.data);
    })();

    return () => {};
  }, [refetch]);

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

    const pars_data = {
      id: data?.contract_id,
      index: data?.milestone_no - 1,
    };

    setIsLoadingWithdraw(true);

    const core = await Get_Campaign_Details(data?.contract_id);

    console.log("====================================");
    console.log(pars_data);
    console.log(core);
    console.log("====================================");

    if (core[0] === use_wallet?.address) {
      try {
        let pledge = null;

        if (use_wallet.isSmartAccount) {
          pledge = await Smart_Withdraw_Milestone({
            ...pars_data,
            smartClient: use_wallet.connector,
          });
        } else {
          pledge = await Withdraw_Milestone({
            ...pars_data,
            wallet: use_wallet.connector,
          });
        }

        console.log("Withdraw successful:", pledge);

        if (pledge?.status === true) {
          setTransferred(true);
          response_message({ message: "Withdrawal successful", option: "scc" });

          const path = `/dashboard/campaign/overview?id=${project_id}`;
          setTimeout(() => router.push(path), 1000);
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

            const path = `/dashboard/campaign/overview?id=${project_id}`;
            return setTimeout(() => router.push(path), 1000);
          }

          response_message({ message: pledge?.error as string, option: "wrn" });
        }
      } catch (err) {
        console.error("Withdraw failed:", err);
      }
    } else
      response_message({
        message:
          "Invalid Wallet, Kindly use the wallet used to create this campaign.",
        option: "wrn",
      });

    setIsLoadingWithdraw(false);
  };

  const deleteCampaignExpenses = async () => {
    console.log("====================================");
    console.log(expenseId);
    console.log("====================================");

    const result = await Delete_Expenses({ query: `/${expenseId}/` });
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
      message: "Campaign expenses has been deleted successfully",
      option: "scc",
    });

    setRefetch((prev) => !prev);
    setOpenDelete((prev) => !prev);
  };

  console.log("====================================");
  console.log(data);
  console.log("====================================");

  return (
    <div className="w-full px-5 md:px-10 pb-5">
      <NavigationTemplate
        title="Campaigns Milestone"
        navigation={[
          {
            title: "Overview",
            path: `/dashboard/campaign/overview?id=${project_id}`,
          },
          { title: "Milestone", path: "#" },
        ]}
      />

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

            {organization === true && (
              <div className="flex justify-center mt-5">
                <button
                  onClick={deleteCampaignExpenses}
                  className="bg-red-100 border border-red-300/60 text-red-700 w-[80%] cursor-pointer rounded-lg flex items-center justify-center gap-2 py-2"
                  disabled={isLoading}
                >
                  {isLoadingDelete && (
                    <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
                  )}{" "}
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-10 gap-5 mt-5">
        <div className="col-span-10 xl:col-span-6 overflow-hidden rounded-4xl bg-[url('https://images.unsplash.com/photo-1740568439252-b060d7ff3437?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds')]">
          <div className="w-full h-full text-white bg-[linear-gradient(90deg,#eb2027e1,#f36f26e1)] p-7">
            <div className="flex items-center gap-2">
              <Image
                src={"/icons/usdc-white-logo.png"}
                alt=""
                className=""
                width={60}
                height={60}
              />

              <div className="">
                <h1 className="font-semibold text-3xl">
                  <span className="font-bold">
                    {format_currency(data?.goal || 0)}
                  </span>{" "}
                  {Number(surplus || 0) > 0 && (
                    <span className="font-bold text-xl text-green-300">
                      + {format_currency(Number(surplus || 0))}
                    </span>
                  )}
                </h1>

                <p className="">
                  <span className="font-bold">{campaign_percentage}%</span> to
                  completion
                </p>
              </div>
            </div>

            <p className="mt-5">{data?.details}</p>
          </div>
        </div>

        <div className="col-span-10 xl:col-span-4 relative">
          <div
            className={`sticky top-0 gradient-cto-border w-full border border-transparent rounded-4xl overflow-hidden 
              ${
                organization === true &&
                data?.approved === false &&
                "flex items-center"
              }
            `}
          >
            <div className="bg-white w-full flex flex-col min-[400px]:flex-row items-center justify-between p-5">
              <Insight
                colorTint={"bg-[#c0fbff]"}
                icon={<SiHiveBlockchain className="text-[#33b2ba]" />}
                value={Number(data?.goal || 0) + Number(surplus || 0)}
                description={"Total Goal"}
              />

              <div className="hidden md:block w-px h-10 bg-gray-300 mx-10"></div>

              <Insight
                colorTint={data?.approved ? "bg-[#8adf9d]" : "bg-[#FFE6A3]"}
                status={true}
                icon={
                  <SiHiveBlockchain
                    className={`${data?.approved ? "text-[#1a712d]" : "text-[#A2790C]"}`}
                  />
                }
                value={data?.approved ? "Approved" : "Pending"}
                description={"Milestone approval"}
              />
            </div>

            {organization === true && data?.approved === true && (
              <>
                {data?.withdrawn === true ? (
                  <button className="bg-gray-400 border-none w-full text-white flex items-center justify-center gap-3 px-5 py-7">
                    <IoWallet className="text-[2rem]" />
                    <p className="text-[1.5rem]">Withdraw Donation</p>
                  </button>
                ) : (
                  <button
                    disabled={isLoadingWithdraw}
                    onClick={withdraw_token}
                    className="gradient-cto border-none w-full flex items-center justify-center gap-3 px-5 py-7"
                  >
                    {isLoadingWithdraw && (
                      <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
                    )}

                    <IoWallet className="text-[2rem]" />
                    <p className="text-[1.5rem]">Withdraw Donation</p>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-4xl overflow-hidden bg-gray-100 mt-14 p-3">
        <div className="bg-[#35B9C2] rounded-4xl w-full flex flex-wrap justify-between items-center gap-5 py-5 px-5 lg:px-10">
          <div className="md:hidden bg-white rounded-lg w-60 relative z-50">
            <CustomSelector
              optionsList={["milestone-images", "expenses"]}
              control_class=""
              control_style={{
                borderRadius: "0.5rem",
                border: "1px solid rgba(0,0,0,0.15)",
                padding: "0.25rem 0.75rem",
                backgroundColor: "transparent",
              }}
              placeholder="Milestones Images"
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
            {["milestone-images", "expenses"].map((val, index) => (
              <button
                key={index}
                onClick={() => setToggle(val.toLowerCase())}
                className={`${
                  toggle === val.toLowerCase()
                    ? "bg-white text-black"
                    : "text-white/70"
                } rounded-lg cursor-pointer flex items-center gap-2 font-semibold capitalize px-5 py-2`}
              >
                {/* <BsFillBarChartLineFill /> */}
                {val}
              </button>
            ))}
          </div>

          {/* {organization === true && data?.withdrawn === true && ( */}
          {organization === true && deployed === "true" && (
            <Link
              // href={`/dashboard/campaign/add-comment?id=${data?.id}`}
              href={
                toggle === "expenses"
                  ? `/dashboard/campaign/overview/milestones-&-expenses/add-expenses?id=${id}&project_id=${project_id}&campaign_percentage=${campaign_percentage}&surplus=${surplus}&deployed=${deployed}`
                  : `/dashboard/campaign/overview/milestones-&-expenses/add-milestone-image?id=${id}&project_id=${project_id}&campaign_percentage=${campaign_percentage}&surplus=${surplus}&deployed=${deployed}`
              }
              className="w-10 h-10 lg:w-13 lg:h-13 border-2 border-white bg-white/10 rounded-full cursor-pointer flex items-center justify-center"
            >
              <TbPlus className="text-white text-[1.5rem]" />
            </Link>
          )}
        </div>

        <div className="sm:p-5">
          <div className="">
            {toggle === "expenses" ? (
              <div className="flex flex-col gap-5 py-5">
                {data?.expenses?.length > 0 ? (
                  data?.expenses?.map((expense: any, index: number) => (
                    <div
                      key={index}
                      className="bg-white shadow-md rounded-2xl border border-black/5 p-5"
                    >
                      <div className="flex justify-between ">
                        <div className="flex items-center gap-2">
                          <MdDateRange className="text-[1.3rem]" />
                          <p className="text-sm">
                            {format_date(
                              expense?.date
                                ? new Date(expense?.date)
                                : new Date(),
                            )}{" "}
                          </p>
                        </div>

                        <div className="flex items-center gap-5">
                          {expense?.documents ? (
                            <Link
                              href={expense?.documents?.[0]?.document}
                              target="_blank"
                              className="flex items-center gap-2"
                            >
                              <FaDownload />
                              <p className="text-sm">Download</p>{" "}
                            </Link>
                          ) : (
                            <div className="flex items-center gap-2">
                              <FaDownload />
                              <p className="text-sm">Download</p>{" "}
                            </div>
                          )}

                          {/* <div className="w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer bg-gray-300">
                          <RiEdit2Line className="text-xl" />
                        </div> */}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-4 mt-5">
                        <div className="flex items-center justify-between">
                          <h1 className="font-semibold capitalize text-lg">
                            amount spent:{" "}
                            <span className="font-bold">
                              ${expense?.amount_spent}
                            </span>
                            <span className="bg-green-200 rounded-xl text-xs px-2 py-1 ml-2">
                              {expense?.documents?.[0]?.document_type}
                            </span>
                          </h1>

                          <RiDeleteBin6Fill
                            onClick={() => {
                              setExpenseId(expense?.id);
                              setOpenDelete(true);
                            }}
                            className="text-[2rem] text-white bg-red-500 rounded-sm cursor-pointer py-[0.4rem]"
                          />
                        </div>

                        <p className="mt-10">{expense?.description}</p>
                      </div>
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
                      className="bg-[#0000000a]/60 w-full min-h-68 max-h-68 relative overflow-hidden rounded-4xl border border-black/5 p-5"
                    >
                      <Image
                        src={image?.image}
                        alt=""
                        className="w-full h-full object-cover"
                        fill
                      />
                    </div>
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
        </div>
      </div>
    </div>
  );
}
