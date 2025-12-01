"use client";

import LocationMap from "@/components/LocationMap";
import Reviews from "@/components/Reviews";
import {
  get_time_expiry,
  response_message,
} from "@/components/utilities/utils";
import {
  useDonateDonorMutation,
  useGetNgoPublicMutation,
  useGetPopularCampaignQuery,
} from "@/redux/api/main";
import { RootState } from "@/redux/store";
import { Get_Campaign_Core, Pledge_Token } from "@/Wallet/ConnectContract";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoClose, IoWallet } from "react-icons/io5";
import { MdDateRange, MdTimer } from "react-icons/md";
import { useSelector } from "react-redux";

export default function Home() {
  const { online, organization } = useSelector(
    (state: RootState) => state.user
  );
  const [open, setOpen] = useState(false);
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { wallet } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState({
    amount: 0,
    tip: 0,
  });

  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  const [Donate_Donor, {}] = useDonateDonorMutation();
  const [Get_Ngo, { data: ngo_data }] = useGetNgoPublicMutation();
  const { data, isLoading, error } = useGetPopularCampaignQuery(
    {
      query: `/${id}/`,
    },
    {
      // pollingInterval: 10000, // every 10 seconds
      // refetchOnFocus: true,
      // refetchOnReconnect: true,
    }
  );

  useEffect(() => {
    // if (error) router.back();

    (async () => {
      const ngo = await Get_Ngo({
        query: `/${data?.organization_id}/`,
      });

      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
      console.log(ngo);
      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    })();

    return () => {};
  }, [data]);

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
    if (online === false) {
      response_message({
        message: "Kindly login to continue.",
        option: "wrn",
      });
      return router.push("/sign-in");
    } else if (data?.status === "Failed" || data?.status === "Completed") {
      response_message({
        message: `This campaign ${
          data?.status === "Completed"
            ? "has been Completed"
            : "deadline has expired"
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
      if (pledge?.status === true) {
        setTransactionCount((prev) => prev + 1);
        response_message({ message: "Transaction successful", option: "scc" });
        router.push(`/dashboard/campaign`);
      }
    }

    // Tx receipt returned
    console.log("get campaign core:", core);
    setLoading(false);
    setOpen(false);
  };

  const d_profile = "/icons/profile-icon.png";

  console.log("====================================");
  console.log(data?.country);
  console.log(data);
  console.log(
    `${data?.country || ""} ${data?.address || ""}`?.replace(" ", ", ")
  );
  console.log(ngo_data);
  console.log("====================================");

  return (
    <>
      {open && (
        <div className="fixed top-0 left-0 z-[1000] w-full h-full bg-gray-800/10 flex justify-center items-center">
          <div className="bg-[#fffff9] 0 w-[25rem] rounded-lg p-7">
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

      <div className="px-5 sm:px-10 md:px-20 mt-[5rem]">
        <div className="w-full h-[20rem] md:h-[30rem] relative overflow-hidden rounded-lg">
          {isLoading === true || !data?.image ? (
            <div className="w-full min-h-[17rem] max-h-[17rem] relative bg-gray-100 rounded-lg loading_ [--delay:0.5s]"></div>
          ) : (
            <Image
              src={data?.image}
              alt=""
              className="w-full h-full object-cover"
              fill
            />
          )}
        </div>

        <div className="flex flex-col xl:grid grid-cols-2 gap-10 mt-[2.5rem] md:mt-[4rem]">
          <div className="">
            <div className="flex justify-between items-center gap-5">
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center">
                  <MdDateRange className="text-[1.8rem]" />
                </div>
                <p>14 June 2025</p>
              </div>

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
                <p className="px-5 py-1 text-sm bg-[#33b2ba]/10 text-[#144447] border-1 border-[#33b2ba]/15 rounded-lg">
                  Ongoing
                </p>
              )}
            </div>

            <h1 className="text-4xl font-bold mt-5">
              <span id="gradient-txt">About </span>
              {data?.title}
            </h1>

            <p className="mt-5">{data?.description}</p>
            <p className="mt-2">{data?.summary}</p>

            <div className="mt-10">
              <h1 className="font-semibold text-xl mb-3">
                What Your Donation Provides
              </h1>

              <div className="flex flex-wrap gap-5 pl-5 mt-5">
                {data?.categories_display?.map(
                  (provide: any, index: number) => (
                    <div
                      key={index}
                      id="gradient-border"
                      className="rounded-full overflow-hidden"
                    >
                      <div className="bg-[#fcfcfc] px-5 py-3">
                        <p>{provide}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="">
            {/* <div id="gradient-border" className="rounded-lg overflow-hidden"> */}
            <div className=" rounded-lg overflow-hidden">
              <div className="h-full button_ flex flex-col justify-between p-3">
                {ngo_data && (
                  <Link href={`/ngo?id=${data?.organization_id}`}>
                    <div className="w-full flex flex-wrap items-center gap-2 rounded-lg p-5">
                      <div className="min-w-[5rem] min-h-[5rem] bg-white/70 relative overflow-hidden flex justify-center items-center border-2 border-transparent rounded-[.5rem]">
                        {ngo_data?.user?.avatar ? (
                          <Image
                            src={ngo_data?.user?.avatar}
                            alt=""
                            className="w-full h-full object-cover rounded-lg"
                            fill
                          />
                        ) : (
                          <Image
                            src={d_profile}
                            alt=""
                            width={50}
                            height={50}
                          />
                        )}
                      </div>

                      <div className="text-white">
                        <h1 className="text-xl font-bold mb-1">
                          {ngo_data?.name}
                        </h1>
                        <p className="font-normal">{ngo_data?.user?.email}</p>
                      </div>
                    </div>
                  </Link>
                )}

                <div className="">
                  <div className="flex items-center gap-1 mt-10 mb-2 px-5">
                    <MdTimer className="text-[1.5rem]" />
                    <p className="flex items-center gap-2 font-semibold">
                      <span>Deadline: </span>
                      {get_time_expiry(data?.deadline)}
                    </p>
                  </div>
                  {/* <h1 className="font-semibold text-lg">
                  Milestone
                </h1> */}

                  <div className="bg-white rounded-sm p-5 sm:p-7">
                    <div className="rounded-lg w-full  text-black px-5">
                      <div className="w-full relative border-[2px] border-transparent rounded-lg flex justify-evenly items-center px-5">
                        {data?.milestones[0] && (
                          <div className="text-center">
                            <h1 className="font-bold text-3xl mb-2">
                              {data?.milestones[0]?.goal}
                            </h1>
                            <p>( {data?.milestones[0]?.title} )</p>
                          </div>
                        )}

                        {data?.milestones[1] && (
                          <>
                            <div className="w-[2px] h-10 bg-black/90"></div>

                            <div className="text-center">
                              <h1 className="font-bold text-3xl mb-2">
                                {data?.milestones[1]?.goal}
                              </h1>
                              <p>( {data?.milestones[1]?.title} )</p>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="w-[70%] h-[1px] mx-auto bg-gradient-to-r from-transparent via-black to-transparent mt-5"></div>

                      <div className="">
                        <div className="flex justify-between items-center gap-5 mt-5">
                          <p>
                            Donors:{" "}
                            <span className="font-bold">
                              {data?.donations
                                ? data?.donations?.length + transactionCount
                                : 0 + transactionCount}
                            </span>
                          </p>

                          <p className="font-bold">
                            {data?.progress ? Number(data?.progress) : 0}%
                          </p>
                        </div>

                        <div className="w-full h-[0.8rem] bg-[#33b2ba]/10 overflow-hidden rounded-full mt-5">
                          <div
                            style={{
                              width: `${
                                data?.progress ? Number(data?.progress) : 0
                              }%`,
                            }}
                            className={`h-full rounded-full bg-gradient-to-r from-[#eb2027] from-60% to-[#f4901e]`}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setOpen(true)}
                      disabled={
                        data?.status === "Completed" ||
                        data?.status === "Failed" ||
                        get_time_expiry(data?.deadline) === "0"
                      }
                      className={`w-full flex items-center justify-center gap-2 font-semibold cursor-pointer text-sm mt-5 p-5 ${
                        data?.status === "Completed"
                          ? "bg-gray-400 rounded-lg"
                          : data?.status === "Failed"
                          ? "bg-gray-400 rounded-lg"
                          : get_time_expiry(data?.deadline) === "0"
                          ? "bg-gray-400 rounded-lg"
                          : "button_"
                      }`}
                    >
                      <IoWallet className="text-[1.3rem]" />
                      Make a digital donation{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
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

      <Reviews comments={data?.comments} />
    </>
  );
}
