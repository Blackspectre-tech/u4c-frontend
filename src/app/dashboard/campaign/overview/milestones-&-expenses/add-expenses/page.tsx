"use client";

import CountrySelector from "@/components/CountrySelector";
import BackButton from "@/components/dashboard/BackButton";
import CustomSelector from "@/components/SelectTag";
import { response_message } from "@/components/utilities/utils";
import {
  useAddExpensesMutation,
  useCreateCampaignMutation,
} from "@/redux/api/main";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters, AiOutlinePercentage } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { PiEmptyBold } from "react-icons/pi";
import { useSelector } from "react-redux";

type formType = {
  amount_spent: number;
  description: string;
  date: string;
  proof_pdf: any;
};

export default function Home() {
  const { organization } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<formType>({
    amount_spent: 0,
    description: "",
    date: new Date().toISOString(),
    proof_pdf: {},
  });

  const [Add_Expenses, { isLoading }] = useAddExpensesMutation();

  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  useEffect(() => {
    if (organization === false || !id) return router.back();

    return () => {};
  }, [organization]);

  const editFormData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((priv) => ({ ...priv, [e.target.name]: e.target.value }));
  };

  const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]; // safe check
    if (!selectedFile) {
      return response_message({
        message: "You didn't select any file",
        option: "wrn",
      });
    }

    setFormData((prev) => ({ ...prev, proof_pdf: selectedFile }));
  };

  console.log("====================================");
  console.log(formData);
  console.log("====================================");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();

    // Append simple fields
    data.append("amount_spent", String(formData.amount_spent));
    data.append("date", formData.date);
    data.append("description", formData.description);

    // Append files (if selected)
    if (formData.proof_pdf) data.append("proof_pdf", formData.proof_pdf);

    const result = await Add_Expenses({ query: `/${id}/`, body: data });
    console.log(result);
    console.log(data);

    const is_message = result.error?.data?.errors;

    if ("error" in result) {
      return response_message({
        message: is_message
          ? `${result.error?.data?.errors[0]?.detail} ${result.error?.data?.errors[0]?.attr}`
          : "Something went wrong?",
        option: "err",
      });
    }

    response_message({
      message: "expenses added successfully",
      option: "scc",
    });
    setTimeout(
      () =>
        router.push(
          `/dashboard/campaign/overview/milestones-&-expenses?id=${id}`
        ),
      2000
    );
  };

  // console.log("====================================");
  // console.log(formData);
  // console.log("====================================");

  return (
    <div className="relative px-5 md:px-10 mt-10">
      <div className="">
        <div className="relative w-full h-full flex flex-col justify-between md:px-10">
          <h1 className="text-4xl font-bold relative">Add / Expenses</h1>
          <p className="relative w-[80%] lg:w-[70%] mt-5">
            We built United4Change to solve the trust problem in charity, by
            using technology that proves every donation does what it says it
            will. Giving has never been this transparent or borderless
          </p>
        </div>

        <div className="relative mt-5 md:p-5">
          <BackButton
            route={`/dashboard/campaign/overview/milestones-&-expenses?id=${id}`}
            parent_wind="flex mb-5"
          />

          <form
            onSubmit={submit}
            id="gradient-border"
            className="bg-[#fcfcfc] rounded-[1rem] border-2 px-2 md:px-7 py-10"
          >
            <div className="flex flex-col md:grid grid-cols-2 gap-5 px-3">
              <label className="col-span-1">
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Amount Spent
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
                    name="amount_spent"
                    sub-child={"false"}
                    value={formData.amount_spent}
                    onChange={editFormData}
                    className="w-full px-5 py-2 border border-black/15 outline-0 rounded-r-md"
                  />
                </div>
              </label>

              <label className="col-span-1">
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">Date</p>
                </div>

                <input
                  required
                  type="date"
                  name="date"
                  sub-child={"false"}
                  value={formData.date}
                  onChange={editFormData}
                  // placeholder="smith"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>

              <label className="col-span-2">
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    PDF Proof
                  </p>
                </div>

                <input
                  required
                  type="file"
                  sub-child={"false"}
                  onChange={addFile}
                  // placeholder="smith"
                  accept=".pdf"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>

              <label className="col-span-2">
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Description
                  </p>
                </div>

                <textarea
                  required
                  minLength={20}
                  name="description"
                  sub-child={"false"}
                  value={formData.description}
                  onChange={editFormData}
                  // placeholder="smith"
                  className="w-full h-[10rem] resize-none px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>
            </div>

            <button
              disabled={isLoading}
              className="w-full font-semibold button_ cursor-pointer mt-7 py-3 flex items-center justify-center gap-2"
            >
              {isLoading && (
                <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
              )}
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
