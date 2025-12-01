"use client";

import CountrySelector from "@/components/CountrySelector";
import BackButton from "@/components/dashboard/BackButton";
import CustomSelector from "@/components/SelectTag";
import { response_message } from "@/components/utilities/utils";
import {
  useCreateCampaignMutation,
  useGetCampaignNgoMutation,
  usePatchCampaignMutation,
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

type milestoneType = {
  title: string;
  details: string;
  percentage: number;
};
type formType = {
  title: string;
  goal: number;
  country: string;
  description: string;
  image: any;
  summary: string;
  milestones: milestoneType[];
  categories: Array<string>;
  address: string;
  duration_in_days: number;
};

export default function Home() {
  const { organization } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<formType>({
    title: "",
    goal: 100,
    country: "Nigeria",
    description: "",
    image: {},
    summary: "",
    milestones: [
      {
        title: "",
        details: "",
        percentage: 100,
      },
    ],
    categories: [],
    address: "",
    duration_in_days: 14,
  });
  const [milestoneReference, setMilestoneReference] = useState<milestoneType[]>(
    [
      {
        title: "milestone 1",
        details: "",
        percentage: 100,
      },
    ]
  );
  const categories = [
    "Clean Water",
    "Education",
    "Healthcare",
    "Childcare",
    "Climate Change",
    "Disaster Recovery",
    "Hunger",
  ];

  const [Patch_Campaign, { isLoading }] = usePatchCampaignMutation();
  const [Get_Campaign, {}] = useGetCampaignNgoMutation();

  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  useEffect(() => {
    console.log("====================================");
    console.log(id);
    console.log("====================================");

    if (!id) return router.back();
    if (organization === false) return router.back();

    (async () => {
      const result = await Get_Campaign({ query: `/${id}/` });

      console.log(result);
      console.log(result.data?.video);

      if ("error" in result) return;

      setFormData((priv) => ({
        ...priv,
        title: result.data?.title || "",
        goal: result.data?.goal || "",
        country: result.data?.country || "",
        description: result.data?.description || "",
        // image: {},
        summary: result.data?.summary || "",
        video: result.data?.video || "",
        milestones: result.data?.milestones || [],
        categories: result.data?.categories_display || [],
        address: result.data?.address || "",
        duration_in_days: result.data?.duration_in_days || "",
      }));
    })();

    return () => {};
  }, []);

  const editFormData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.name === "goal") {
      const value = e.target.value === "" ? "0" : e.target.value;
      console.log("000000: ", !/^(0|[1-9][0-9]*)$/.test(value), " : ", value);

      const pattern = /^(0|[1-9][0-9]*)$/;
      if (!pattern.test(value)) return;

      setMilestoneReference((prev) => {
        for (let i = 0; i < prev.length; i++)
          if (prev[i].percentage < 100)
            prev[i].details = `${get_percentage(
              prev[i].percentage,
              Number(e.target.value)
            )}`;

        return prev;
      });
    }

    setFormData((priv) => ({ ...priv, [e.target.name]: e.target.value }));
  };

  function get_percentage(percentage: number, amount: number): number {
    if (amount === 0) return 0;
    return (percentage / 100) * amount;
  }

  const editMilestone = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    if (e.target.name === "percentage") {
      const value = e.target.value === "" ? "0" : e.target.value;
      // console.log("000000: ", !/^(?:[1-9]?[0-9])$/.test(value), " : ", value);

      const pattern = /^(?:[1-9]?[0-9])$/;
      if (!pattern.test(value)) return;

      setMilestoneReference((prev) => {
        const updated = {
          ...prev[index],
          details: `${get_percentage(Number(e.target.value), formData.goal)}`,
          percentage: Number(e.target.value),
        };

        prev[index] = updated;

        return prev;
      });
    }

    setFormData((prev) => {
      const updated = {
        ...prev.milestones[index],
        [e.target.name]: e.target.value,
      };

      const form_data = { ...prev };
      prev.milestones[index] = updated;

      return form_data;
    });
  };

  const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]; // safe check
    if (!selectedFile) {
      return response_message({
        message: "You didn't select any file",
        option: "wrn",
      });
    }

    setFormData((prev) => ({ ...prev, image: selectedFile }));
  };

  const addMilestone = () => {
    if (formData.milestones.length === 2)
      return response_message({
        message: "You can't add more than 2 milestones",
        option: "wrn",
      });

    setFormData((prev) => ({
      ...prev,
      milestones: [
        {
          title: "",
          details: "",
          percentage: 1,
        },
        ...prev.milestones,
      ],
    }));

    setMilestoneReference((prev) => [
      {
        title: `milestone ${prev.length + 1}`,
        details: `${get_percentage(1, formData.goal)}`,
        percentage: 1,
      },
      ...prev,
    ]);
  };

  const removeMilestone = (percentage: number, index: number) => {
    if (percentage === 100)
      return response_message({
        message: "You can not delete the default Milestone",
        option: "wrn",
      });

    setFormData((prev) => {
      const new_data: formType = {
        ...prev,
        milestones: prev.milestones.filter((_, i) => i !== index),
      };
      return new_data;
    });

    setMilestoneReference((prev) => {
      const new_data: milestoneType[] = prev.filter((_, i) => i !== index);
      console.log("====================================");
      console.log(new_data);
      console.log("====================================");
      return new_data;
    });
  };

  console.log("====================================");
  console.log(formData.milestones);
  console.log(milestoneReference);
  console.log("====================================");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();

    // Append simple fields
    data.append("title", formData.title);
    data.append("goal", formData.goal.toString());
    data.append("country", formData.country);
    data.append("description", formData.description);
    data.append("summary", formData.summary);
    data.append("address", formData.address);
    data.append("duration_in_days", formData.duration_in_days.toString());

    // Append arrays — backend usually expects JSON string
    data.append("milestones", JSON.stringify(formData.milestones));
    data.append("categories", JSON.stringify(formData.categories));

    // Append files (if selected)
    if (formData.image) data.append("image", formData.image);

    const result = await Patch_Campaign({ query: `/${id}/`, body: data });
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
      message: "Campaign edited successfully",
      option: "scc",
    });
    setTimeout(() => router.push("/dashboard/campaign"), 2000);
  };

  const setCountry = (country: string) => {
    setFormData((prev) => ({ ...prev, country: country }));
  };

  // console.log("====================================");
  // console.log(formData);
  // console.log("====================================");

  return (
    <div className="relative px-5 md:px-10 mt-10">
      <div className="">
        <div className="relative w-full h-full flex flex-col justify-between md:px-10">
          <h1 className="text-4xl font-bold relative">Add / Campaign</h1>
          <p className="relative md:w-[80%] lg:w-[70%] mt-5">
            We built United4Change to solve the trust problem in charity, by
            using technology that proves every donation does what it says it
            will. Giving has never been this transparent or borderless
          </p>
        </div>

        <div className="relative mt-5 md:p-5">
          <BackButton route="/dashboard/campaign" parent_wind="flex mb-5" />

          <form
            onSubmit={submit}
            id="gradient-border"
            className="bg-[#fcfcfc] rounded-[1rem] border-2 px-2 md:px-7 py-10"
          >
            <div className="flex flex-col md:grid grid-cols-2 gap-5 px-3">
              <label className="col-span-1">
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">Title</p>
                </div>

                <input
                  required
                  type="text"
                  name="title"
                  sub-child={"false"}
                  value={formData.title}
                  onChange={editFormData}
                  // placeholder="adam@123"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>

              <label className="col-span-1">
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">Goal</p>
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
                    type="text"
                    name="goal"
                    sub-child={"false"}
                    value={formData.goal}
                    onChange={editFormData}
                    // placeholder="adam"
                    className="w-full px-5 py-2 border border-black/15 outline-0 rounded-r-md"
                  />
                </div>
              </label>

              <label className="col-span-1">
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">Country</p>
                </div>

                <CountrySelector setCountry={setCountry} />
              </label>

              <label className="col-span-1">
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">image</p>
                </div>

                <input
                  required
                  type="file"
                  sub-child={"false"}
                  onChange={addFile}
                  // placeholder="smith"
                  accept=".jpg,.jpeg,.png"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>

              <label className="col-span-1">
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">address</p>
                </div>

                <input
                  required
                  type="text"
                  name="address"
                  sub-child={"false"}
                  value={formData.address}
                  onChange={editFormData}
                  // placeholder="smith"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>

              <label className="col-span-1">
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Duration in days
                  </p>
                </div>

                <input
                  required
                  type="number"
                  name="duration_in_days"
                  sub-child={"false"}
                  value={formData.duration_in_days}
                  onChange={editFormData}
                  // placeholder="smith"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>

              <label className="col-span-2">
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    categories
                  </p>
                </div>

                <div
                  className={`w-full border border-black/15 rounded-md ${
                    formData.categories.length > 0 ? "p-3" : "p-1"
                  } mt-3`}
                >
                  <CustomSelector
                    optionsList={[...categories]}
                    control_class=""
                    control_style={
                      formData.categories.length > 0
                        ? {
                            borderRadius: "0.5rem",
                            border: "1px solid rgba(0,0,0,0.15)",
                            padding: "0.25rem 0.75rem",
                          }
                        : {
                            border: "none",
                          }
                    }
                    placeholder="Select a category"
                    changeEvent={(selected) => {
                      if (
                        formData.categories.includes(selected?.value as string)
                      )
                        return;

                      setFormData((prev) => ({
                        ...prev,
                        categories: [
                          ...prev.categories,
                          String(selected?.value ?? ""),
                        ],
                      }));
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

                  <div
                    className={`flex flex-wrap gap-5 ${
                      formData.categories.length > 0 && "mt-5"
                    } px-3`}
                  >
                    {formData.categories.map((category, index) => (
                      <div
                        key={index}
                        className="bg-[#0000000a]/40 border-2 border-[#0000000a]/50 flex items-center gap-2 rounded-lg px-5 py-2"
                      >
                        {category}{" "}
                        <MdCancel
                          onClick={() =>
                            setFormData((prev) => {
                              const new_data: formType = { ...prev };
                              new_data.categories = new_data.categories.filter(
                                (_, i) => i !== index
                              );
                              return new_data;
                            })
                          }
                          className="text-[1.0rem] cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </label>

              <label className="col-span-2">
                <div className="flex items-center justify-between gap-4 pl-3">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                    <p className="text-sm font-semibold text-gray-500">
                      milestones
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-gray-500 cursor-pointer pr-3">
                    <FaPlus onClick={addMilestone} />
                  </p>
                </div>

                {formData.milestones.length > 0 ? (
                  <div className="flex flex-col gap-5 mt-3">
                    {formData.milestones.map((milestone, index) => (
                      <div
                        key={index}
                        className="bg-[#33b1ba41]/7 border-1 border-[#1e6f75]/10 rounded-lg p-5"
                      >
                        <div className="flex items-center gap-2 mb-5">
                          <MdCancel
                            onClick={() =>
                              removeMilestone(milestone.percentage, index)
                            }
                            className="text-[1.2rem] cursor-pointer"
                          />

                          <p className="font-semibold text-sm">
                            {milestoneReference[index].title}{" "}
                            <span className="text-gray-500">
                              ({" "}
                              {milestone.percentage === 100
                                ? Number(formData.goal)
                                : milestoneReference[index].details}{" "}
                              USDC )
                            </span>
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                          <input
                            required
                            type="text"
                            name="title"
                            value={milestone.title}
                            onChange={(e) => editMilestone(e, index)}
                            placeholder="Title"
                            className="col-span-2 md:col-span-1 w-full border border-black/30 outline-0 rounded-md px-5 py-2"
                          />
                          <div className="col-span-2 md:col-span-1 flex items-center">
                            <input
                              required
                              type="text"
                              name="percentage"
                              value={milestone.percentage}
                              onChange={(e) => editMilestone(e, index)}
                              placeholder="Percentage in numbers"
                              disabled={milestone.percentage === 100}
                              className="w-full border-y border-l border-black/30 outline-0 rounded-l-md px-5 py-2"
                            />

                            <div className="bg-gray-200 min-w-[3.6rem] min-h-[2.63rem] rounded-r-md border-y border-r border-black/30 flex justify-center items-center">
                              <AiOutlinePercentage className="text-[1.5rem]" />
                            </div>
                          </div>

                          <textarea
                            required
                            minLength={20}
                            sub-child={"false"}
                            name="details"
                            value={milestone.details}
                            onChange={(e) => editMilestone(e, index)}
                            placeholder="Details"
                            className="col-span-2 w-full h-[5rem] resize-none px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-[#0000000a]/40 border border-black/10 rounded-lg p-5 mt-3">
                    <div className="flex items-center justify-center gap-3 pl-3">
                      <PiEmptyBold className="text-red-600" />
                      <p className="text-sm font-semibold text-gray-500">
                        you don't have any milestones added
                      </p>
                    </div>
                  </div>
                )}
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

              <label className="col-span-2">
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">Summary</p>
                </div>

                <textarea
                  required
                  minLength={20}
                  name="summary"
                  sub-child={"false"}
                  value={formData.summary}
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
