"use client";

import CountrySelector from "@/components/CountrySelector";
import BackButton from "@/components/dashboard/BackButton";
import CustomSelector from "@/components/SelectTag";
import { response_message } from "@/components/utilities/utils";
import { NavigationTemplate } from "@/components/utilities/utils.template";
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
  document_type: "Invoice" | "Receipt";
  amount_spent: number;
  description: string;
  document: any;
  date: string;
};

export default function Home() {
  const { organization } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<formType>({
    document_type: "Invoice",
    date: new Date().toISOString(),
    amount_spent: 0,
    description: "",
    document: {},
  });

  const [Add_Expenses, { isLoading }] = useAddExpensesMutation();

  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  const surplus = params.get("surplus");
  const deployed = params.get("deployed");
  const project_id = params.get("project_id");
  const campaign_percentage = params.get("campaign_percentage");

  useEffect(() => {
    if (organization === false || !id) return router.back();

    return () => {};
  }, [organization]);

  const editFormData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
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

    // 1MB Limit (1,048,576 bytes)
    const MAX_SIZE = 1 * 1024 * 1024;

    if (selectedFile.size > MAX_SIZE) {
      // Reset the input so the user can try a different file
      e.target.value = "";

      return response_message({
        message: "File is too large. Maximum size allowed is 1MB.",
        option: "wrn",
      });
    }

    setFormData((prev) => ({ ...prev, document: selectedFile }));
  };

  console.log("====================================");
  console.log(formData);
  console.log("====================================");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();

    // Append simple fields
    data.append("date", formData.date);
    data.append("description", formData.description);
    data.append("document_type", formData.document_type);
    data.append("amount_spent", String(formData.amount_spent));

    // Append files (if selected)
    if (formData.document) data.append("document", formData.document);

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
          `/dashboard/campaign/overview/milestones-&-expenses?id=${id}&project_id=${project_id}&campaign_percentage=${campaign_percentage}&surplus=${surplus}&deployed=${deployed}`,
        ),
      2000,
    );
  };

  console.log("====================================");
  console.log(formData);
  console.log("====================================");

  return (
    <div className="relative px-5 md:px-10 pb-5">
      <NavigationTemplate
        title="Edit Comment"
        navigation={[
          {
            title: "Overview",
            path: `/dashboard/campaign/overview/milestones-&-expenses?id=${id}&project_id=${project_id}&campaign_percentage=${campaign_percentage}`,
          },
          {
            title: "Milestone",
            path: `/dashboard/campaign/overview/milestones-&-expenses?id=${id}`,
          },
          { title: "Edit Comment", path: "#" },
        ]}
      />

      <form
        onSubmit={submit}
        className="gradient-cto-border rounded-2xl border-2 border-transparent p-5 lg:p-10 mt-5"
      >
        <div className="flex flex-col md:grid grid-cols-2 gap-5 px-3">
          <label className="col-span-1">
            <div className="flex items-center gap-4 pl-3">
              <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
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
                className="w-full px-5 py-2 border border-black/30 outline-0 rounded-r-md"
              />
            </div>
          </label>

          <label className="col-span-1">
            <div className="flex items-center gap-4 pl-3">
              <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
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
              className="w-full px-5 py-2 border border-black/30 outline-0 rounded-md mt-3"
            />
          </label>

          <label className="col-span-1">
            <div className="flex items-center gap-4 pl-3">
              <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
              <p className="text-sm font-semibold text-gray-500">
                Document Type
              </p>
            </div>

            <div className="mt-3">
              <CustomSelector
                optionsList={["Invoice", "Receipt"]}
                control_class=""
                control_style={{
                  borderRadius: "0.5rem",
                  border: "1px solid rgba(0,0,0,0.15)",
                  padding: "0.25rem 0.75rem",
                  backgroundColor: "transparent",
                }}
                placeholder="Invoice"
                changeEvent={(selected) => {
                  // console.log(selected);

                  setFormData((prev) => ({
                    ...prev,
                    document_type: selected?.value as "Invoice" | "Receipt",
                  }));
                }}
                mapOption={(val) => ({
                  value: val,
                  name: val,
                  label: (
                    <div className="flex items-center capitalize gap-2">
                      <p>{val}</p>
                    </div>
                  ),
                })}
              />
            </div>
          </label>

          <label className="col-span-1">
            <div className="flex items-center gap-4 pl-3">
              <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
              <p className="text-sm font-semibold text-gray-500">PDF Proof</p>
            </div>

            <input
              required
              type="file"
              sub-child={"false"}
              onChange={addFile}
              // placeholder="smith"
              accept=".pdf"
              className="w-full px-5 py-2 border border-black/30 outline-0 rounded-md mt-3"
            />
          </label>

          <label className="col-span-2">
            <div className="flex items-center gap-4 pl-3">
              <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
              <p className="text-sm font-semibold text-gray-500">Description</p>
            </div>

            <textarea
              required
              minLength={20}
              name="description"
              sub-child={"false"}
              value={formData.description}
              onChange={editFormData}
              // placeholder="smith"
              className="w-full h-40 resize-none px-5 py-2 border border-black/30 outline-0 rounded-md mt-3"
            />
          </label>
        </div>

        <button
          disabled={isLoading}
          className="gradient-cto rounded-full w-full font-semibold cursor-pointer mt-7 py-3 flex items-center justify-center gap-2"
        >
          {isLoading && (
            <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
          )}
          Submit
        </button>
      </form>
    </div>
  );
}
