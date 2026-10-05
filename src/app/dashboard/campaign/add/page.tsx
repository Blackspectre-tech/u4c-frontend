"use client";

import CountrySelector from "@/components/CountrySelector";
import BackButton from "@/components/dashboard/BackButton";
import MilestoneCurrencySelector from "@/components/dashboard/MilestoneCurrencySelector";
import LandscapeCropper from "@/components/LandscapeCropper";
import CustomSelector from "@/components/SelectTag";
import {
  get_percentage_in_total,
  getCroppedImageFile,
  response_message,
} from "@/components/utilities/utils";
import { NavigationTemplate } from "@/components/utilities/utils.template";
import {
  FormSection,
  PreviewSection,
  SectionHeader,
  campaignTypes,
  campaignTypeValue,
  impactFields,
  previewBadgeClass,
  sadaqahFields,
  zakatFields,
} from "@/components/dashboard/CampaignFormUI";
import { useCreateCampaignMutation } from "@/redux/api/main";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Area } from "react-easy-crop";
import { AiOutlineLoading3Quarters, AiOutlinePercentage } from "react-icons/ai";
import {
  FaHandHoldingHeart,
  FaMosque,
  FaPlus,
  FaRegImages,
  FaUsers,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import {
  MdCancel,
  MdCheckCircle,
  MdOutlineAttachFile,
  MdOutlineDescription,
  MdOutlineFlag,
  MdOutlineInfo,
  MdOutlineSubject,
  MdOutlineTune,
} from "react-icons/md";
import { PiEmptyBold } from "react-icons/pi";
import { useSelector } from "react-redux";

type milestoneType = {
  value?: any;
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
  sadaqah: boolean;
};

type options_type = [
  { value: any; id: string; label: string; type: "icon" | "image" | string },
  { value: any; id: string; label: string; type: "icon" | "image" | string },
];

const options: options_type = [
  {
    type: "icon",
    id: "percentage",
    label: "Percentage",
    value: "icon-goes-here",
  },
  { id: "usdc", type: "image", label: "USDC", value: "/icons/usdc-logo.png" },
];

export default function Home() {
  // UI-only campaign type. "Sadaqah" also drives the existing formData.sadaqah
  // field; "Zakat" is preview-only and is not sent to the API.
  const [campaignType, setCampaignType] =
    useState<campaignTypeValue>("General");
  const total_milestone = useRef(100);
  const [crop, setCrop] = useState<boolean>(false);
  const [selected, setSelected] = useState(options[0]);
  const [formData, setFormData] = useState<formType>({
    title: "",
    goal: 100,
    country: "Nigeria",
    description: "",
    image: null,
    summary: "",
    milestones: [
      {
        title: "",
        details: "",
        percentage: 100,
        value: { index: 1, amount: 100 },
      },
    ],
    categories: [],
    address: "",
    duration_in_days: 14,
    sadaqah: false,
  });
  const categories = [
    "Clean Water",
    "Education",
    "Healthcare",
    "Childcare",
    "Climate Change",
    "Disaster Recovery",
    // "Development",
    "Hunger",
  ];

  const { organization } = useSelector((state: RootState) => state.user);
  const [Create_Campaign, { isLoading }] = useCreateCampaignMutation();
  const inputRefs = useRef<Map<string, HTMLInputElement>>(new Map());
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const change_milestone = useRef("none");
  const router = useRouter();

  useEffect(() => {
    if (organization === false) return router.back();

    if (focusedId) {
      const element = inputRefs.current.get(focusedId);
      if (element && change_milestone.current === "percentage") {
        element.focus();
        // Move cursor to the end of the text
        const val = element.value;
        element.setSelectionRange(val.length, val.length);
      }
    }

    return () => {};
  }, [organization, formData.milestones]);

  const editFormData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (e.target.name === "duration_in_days") {
      // Only allow a plain positive whole number (no sign, no decimal, no
      // leading zero) so the duration can never go negative or to zero.
      const pattern = /^[1-9][0-9]*$/;
      if (e.target.value !== "" && !pattern.test(e.target.value)) return;
    }

    if (e.target.name === "goal") {
      const value = e.target.value === "" ? "0" : e.target.value;
      console.log("000000: ", !/^(0|[1-9][0-9]*)$/.test(value), " : ", value);

      const pattern = /^(0|[1-9][0-9]*)$/;
      if (!pattern.test(value)) return;

      setFormData((prev) => {
        const milestones = prev.milestones;

        for (let i = 0; i < milestones.length; i++)
          if (milestones[i].percentage < 100)
            milestones[i].value = {
              ...milestones[i].value,
              amount: `${get_percentage(
                milestones[i].percentage,
                Number(e.target.value),
              )}`,
            };

        return { ...prev, milestones: milestones };
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
    index: number,
    id: string,
  ) => {
    setFocusedId(id);

    setFormData((prev) => {
      const name = e.target.name;

      // 1. Create a brand new array for milestones to avoid mutating 'prev'
      const newMilestones = [...prev.milestones];
      change_milestone.current = name;

      // 2. Update the specific milestone at the index
      let updated = {
        ...newMilestones[index],
        [name]: e.target.value,
      };

      // 3. Handle the percentage logic
      if (name === "percentage") {
        const value = e.target.value === "" ? "0" : e.target.value;
        const pattern = /^(?:[1-9]?[0-9])$/;

        if (pattern.test(value)) {
          updated = {
            ...updated,
            value: {
              ...updated.value,
              amount: `${get_percentage(Number(value), prev.goal)}`,
            },
          };
        }
      }

      // 4. Put the updated milestone back into our NEW array
      newMilestones[index] = updated;

      // 5. Calculate the total (using the new array)
      const totalValue = newMilestones.reduce(
        (acc, curr) => acc + Number(curr.percentage || 0),
        0,
      );
      total_milestone.current = totalValue;

      // 6. Sort the NEW array (This won't break anything now because it's a copy)
      newMilestones.sort((a, b) => Number(a.percentage) - Number(b.percentage));

      // 7. Return the brand new state object
      return {
        ...prev,
        milestones: newMilestones,
      };
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
    setCrop(true);
  };

  const addMilestone = () => {
    if (formData.milestones.length === 3)
      return response_message({
        message: "You can't add more than 3 milestones",
        option: "wrn",
      });

    setFormData((prev: formType) => {
      const milestone_data = [
        {
          title: "",
          details: "",
          percentage: 1,
          value: {
            index: prev.milestones.length + 1,
            amount: 1,
          },
        },
        ...prev.milestones,
      ];

      milestone_data.sort((a, b) => b.value?.index - a.value?.index);
      const total_milestone_ = { value: 0 };

      milestone_data.forEach((element) => {
        total_milestone_.value =
          total_milestone_.value + Number(element.percentage);
      });

      total_milestone.current = total_milestone_.value;

      return {
        ...prev,
        milestones: milestone_data,
      };
    });
  };

  const removeMilestone = (percentage: number, index: number) => {
    if (formData.milestones.length === 1)
      return response_message({
        message: "Milestone is required to create a campaign.",
        option: "wrn",
      });

    setFormData((prev) => {
      const arr = prev.milestones.filter((_, i) => i !== index);
      const total_milestone_ = { value: 0 };

      const new_arr = arr
        .sort((a, b) => a.percentage - b.percentage)
        .map((item, i) => {
          return { ...item, value: { ...item.value, index: i + 1 } };
        });

      new_arr.forEach((element) => {
        total_milestone_.value =
          total_milestone_.value + Number(element.percentage);
      });

      total_milestone.current = total_milestone_.value;

      // new_arr.sort((a, b) => b.value.index - a.value.index);
      const new_data: formType = {
        ...prev,
        milestones: new_arr,
      };
      return new_data;
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const goal = formData.goal;
    const is_icon = selected.type === "icon";

    if (!(Number(formData.duration_in_days) >= 1))
      return response_message({
        message: "Duration in days must be at least 1.",
        option: "wrn",
      });

    const condition =
      total_milestone.current > (is_icon ? 100 : goal) ||
      total_milestone.current < (is_icon ? 100 : goal);

    if (condition)
      return response_message({
        message: `Milestone must sum up to ${is_icon ? "100%" : `${goal} USDC`}`,
        option: "wrn",
      });

    const milestones_: milestoneType[] = [];

    formData.milestones.map((milestone, index) => {
      if (Number(milestone.percentage) <= 0)
        return response_message({
          message: `Milestone can not be less than or equal to 0`,
          option: "wrn",
        });

      milestones_[milestones_.length] = {
        ...milestone,
        percentage: is_icon
          ? milestone.percentage
          : get_percentage_in_total(milestone.percentage, goal, 0),
      };
    });

    console.log("\n\n milestones_");
    console.log("milestones_");
    console.log(milestones_);

    const milestone_data: milestoneType[] = [];
    const milestones = [...milestones_]?.sort(
      (a: any, b: any) => b?.percentage - a?.percentage,
    );

    for (let i = 0; i < milestones?.length; i++) {
      const goal = Number(milestones[i]?.percentage || 0);
      const next_goal = Number(milestones?.[i + 1]?.percentage || 0);

      milestone_data[milestone_data.length] = {
        ...milestones[i],
        percentage: i === 0 ? 100 : goal + next_goal,
      };
    }

    milestone_data.reverse();

    console.log("\n\n milestone_data");
    console.log("milestone_data");
    console.log(milestone_data);
    console.log(milestones);

    // throw Error("Wait.");
    const data = new FormData();

    // Append simple fields
    data.append("title", formData.title);
    data.append("country", formData.country);
    data.append("summary", formData.summary);
    data.append("address", formData.address);
    data.append("goal", formData.goal.toString());
    data.append("description", formData.description);
    data.append("duration_in_days", formData.duration_in_days.toString());
    data.append("sadaqah", String(formData.sadaqah));

    // Append arrays — backend usually expects JSON string
    data.append("milestones", JSON.stringify(milestone_data));
    data.append("categories", JSON.stringify(formData.categories));

    // Append files (if selected)
    if (formData.image) data.append("image", formData.image);

    const result = await Create_Campaign({ params: {}, body: data });
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
      message: "Campaign created successfully",
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

  const image_is_ready = async (croppedAreaPixels: Area) => {
    setCrop(false);

    console.log("====================================");
    console.log(formData.image);
    console.log("====================================");

    const result = await getCroppedImageFile(
      URL.createObjectURL(formData.image),
      croppedAreaPixels,
      formData.image?.name,
    );

    console.log("====================================");
    console.log(result);
    console.log("====================================");
    setFormData((prev) => ({ ...prev, image: result }));
  };

  const select_campaign_type = (type: campaignTypeValue) => {
    setCampaignType(type);
    setFormData((prev) => ({ ...prev, sadaqah: type === "Sadaqah" }));
  };

  return (
    <div className="px-5 md:px-10 pb-5">
      <NavigationTemplate
        title="Create Campaign"
        navigation={[
          { title: "Dashboard", path: "/dashboard" },
          { title: "Create campaign", path: "#" },
        ]}
      />

      <div className="mt-5">
        {formData?.image && crop === true && (
          <div className="fixed top-0 left-0 z-50 w-full h-full bg-red-200">
            <div
              onClick={() => setFormData((prev) => ({ ...prev, image: null }))}
              className="absolute z-1 top-5 right-5 bg-primary rounded-md cursor-pointer hover:bg-primary-shade p-3"
            >
              <IoClose className="text-[1.5rem] text-white" />
            </div>

            <LandscapeCropper
              imageSrc={URL.createObjectURL(formData.image)}
              onCropComplete={image_is_ready}
            />
          </div>
        )}

        <div className="mb-4">
          <SectionHeader
            icon={<FaRegImages />}
            title="Campaign Image"
            subtitle="A clear landscape photo works best."
          />
        </div>

        <div className="relative w-full min-h-80 flex items-center justify-center rounded-4xl bg-gray-100 border-2 border-dashed border-gray-500 p-5 mx-auto">
          {formData?.image && crop === false && (
            <div className="rounded-4xl overflow-hidden top-0 left-0 w-full h-full">
              <img
                className="w-full h-full object-cover object-center rounded-4xl"
                src={URL.createObjectURL(formData.image)}
                alt=""
              />
            </div>
          )}

          <div className="absolute w-[95%] h-[75%] bg-white/70 rounded-4xl z-10 flex flex-col items-center justify-center">
            <label
              htmlFor="Campaign-Banner"
              className="gradient-cto text-white rounded-lg flex items-center gap-3 cursor-pointer px-5 py-3"
            >
              <FaRegImages className="text-[1.5rem]" />
              <p>Upload Image</p>
            </label>

            <input
              required
              id="Campaign-Banner"
              type="file"
              sub-child={"false"}
              onChange={addFile}
              accept=".jpg,.jpeg,.png"
              className="absolute opacity-0 pointer-events-none"
            />

            <p className="mt-2">Select an image, JPG, JPEG, PNG, Max 5mb.</p>
          </div>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-6 mt-6">
          <FormSection
            icon={<MdOutlineTune />}
            title="Campaign Type"
            subtitle="Choose what kind of campaign you are creating."
          >
            <div
              role="radiogroup"
              aria-label="Campaign type"
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {campaignTypes.map(({ value, Icon, description }) => {
                const active = campaignType === value;

                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => select_campaign_type(value)}
                    className={`relative text-left rounded-2xl border-2 p-5 cursor-pointer transition-colors ${
                      active
                        ? "gradient-cto-border border-transparent shadow-md"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    {active && (
                      <MdCheckCircle className="absolute top-4 right-4 text-[1.4rem] text-[#f4901e]" />
                    )}

                    <Icon
                      className={`text-[1.8rem] ${active ? "text-[#f4901e]" : "text-gray-400"}`}
                    />
                    <p className="font-bold text-lg mt-3">{value}</p>
                    <p className="text-sm text-gray-500 mt-1">{description}</p>
                  </button>
                );
              })}
            </div>
          </FormSection>

          <FormSection
            icon={<MdOutlineInfo />}
            title="Basic Information"
            subtitle="The essentials donors see first."
          >
            <div className="flex flex-col md:grid grid-cols-6 gap-5">
              <label className="col-span-6 lg:col-span-3 xl:col-span-2">
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#f4901e] rounded-full"></div>
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
                  className="w-full px-5 py-2 border border-black/30 outline-0 rounded-md mt-3"
                />
              </label>

              <label className="col-span-6 lg:col-span-3 xl:col-span-2">
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#f4901e] rounded-full"></div>
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
                    className="w-full px-5 py-2 border-y border-r border-black/30 outline-0 rounded-r-md"
                  />
                </div>
              </label>

              <label className="col-span-6 lg:col-span-3 xl:col-span-2">
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#f4901e] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">Country</p>
                </div>

                <CountrySelector setCountry={setCountry} />
              </label>

              <label className="col-span-6 lg:col-span-4">
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#f4901e] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">Address</p>
                </div>

                <input
                  required
                  type="text"
                  name="address"
                  sub-child={"false"}
                  value={formData.address}
                  onChange={editFormData}
                  // placeholder="smith"
                  className="w-full px-5 py-2 border border-black/30 outline-0 rounded-md mt-3"
                />
              </label>

              <label className="col-span-6 lg:col-span-3 xl:col-span-2">
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#f4901e] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Duration in days
                  </p>
                </div>

                <input
                  required
                  type="number"
                  min={1}
                  step={1}
                  name="duration_in_days"
                  sub-child={"false"}
                  value={formData.duration_in_days}
                  onChange={editFormData}
                  // placeholder="smith"
                  className="w-full px-5 py-2 border border-black/30 outline-0 rounded-md mt-3"
                />
              </label>

              <label className="col-span-6">
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-[#f4901e] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Category
                  </p>
                </div>

                <div
                  className={`w-full border border-black/30 rounded-md ${
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
                            backgroundColor: "transparent",
                          }
                        : {
                            border: "none",
                            backgroundColor: "transparent",
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
                                (_, i) => i !== index,
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
            </div>
          </FormSection>

          {campaignType === "Sadaqah" && (
            <PreviewSection
              icon={<FaHandHoldingHeart />}
              title="Sadaqah Details"
              subtitle="Extra information for Sadaqah campaigns."
              fields={sadaqahFields}
            />
          )}

          {campaignType === "Zakat" && (
            <PreviewSection
              icon={<FaMosque />}
              title="Zakat Details"
              subtitle="Extra information for Zakat campaigns."
              fields={zakatFields}
            />
          )}

          <PreviewSection
            icon={<FaUsers />}
            title="Beneficiary & Impact"
            subtitle="Who this campaign helps and the change it will create."
            fields={impactFields}
          />

          <FormSection
            icon={<MdOutlineFlag />}
            title="Milestones"
            subtitle="Break your goal into stages and describe how each one will be delivered."
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mt-5 pb-3">
                <div className="flex flex-wrap items-center gap-4 mt-5 pb-3">
                  <MilestoneCurrencySelector
                    options={options}
                    selected={selected}
                    setSelected={(val: any) => setSelected(val)}
                  />

                  <div className="flex items-center gap-2">
                    <p>Total-Milestone: </p>

                    {"( "}

                    <div
                      className={`flex items-center ${(selected.type === "icon" ? total_milestone.current > 100 || total_milestone.current < 100 : total_milestone.current > formData.goal || total_milestone.current < formData.goal) ? "text-red-700" : "text-green-700"}`}
                    >
                      <p className="">{` ${total_milestone.current} ${selected.type === "icon" ? "%" : "USDC"}`}</p>
                    </div>

                    {" )"}
                  </div>
                </div>

                <div
                  onClick={addMilestone}
                  className="gradient-cto flex items-center gap-1 font-semibold text-white cursor-pointer rounded-full px-4 py-2"
                >
                  <FaPlus className="text-sm" /> <p>Add</p>
                </div>
              </div>

              <div className="flex flex-col gap-5 mt-3">
                {formData.milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border border-[#1e6f75]/20 rounded-2xl p-5"
                  >
                    <div className="flex items-center gap-2 mb-5">
                      <MdCancel
                        onClick={() =>
                          removeMilestone(milestone.percentage, index)
                        }
                        className="text-[1.2rem] cursor-pointer"
                      />

                      <p className="font-semibold text-sm">
                        Milestone:{" "}
                        {selected.type === "icon" ? (
                          <span className="text-gray-500">
                            ({" "}
                            {milestone.percentage === 100
                              ? Number(formData.goal)
                              : milestone.value.amount}{" "}
                            USDC )
                          </span>
                        ) : (
                          <span className="text-gray-500">
                            ({" "}
                            {milestone.percentage === Number(formData.goal)
                              ? 100
                              : get_percentage_in_total(
                                  Number(milestone.percentage),
                                  Number(formData.goal),
                                )}{" "}
                            % )
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <input
                        required
                        type="text"
                        name="title"
                        value={milestone.title}
                        onChange={(e) =>
                          editMilestone(e, index, milestone.value.index)
                        }
                        placeholder="Title"
                        className="col-span-2 md:col-span-1 w-full border border-black/30 outline-0 rounded-md px-5 py-2 bg-white"
                      />
                      <div className="col-span-2 md:col-span-1 flex items-center">
                        <input
                          ref={(el) => {
                            const id = milestone.value.index;

                            if (el) inputRefs.current.set(id, el);
                            else inputRefs.current.delete(id);
                          }}
                          required
                          type="text"
                          name="percentage"
                          value={milestone.percentage}
                          onChange={(e) =>
                            editMilestone(e, index, milestone.value.index)
                          }
                          placeholder="Percentage in numbers"
                          className="w-full border-y border-l border-black/30 outline-0 rounded-l-md px-5 py-2 bg-white"
                        />

                        <div className="bg-gray-200 min-w-[3.6rem] min-h-[2.63rem] rounded-r-md border-y border-r border-black/30 flex justify-center items-center">
                          {selected.type === "icon" ? (
                            <AiOutlinePercentage className="text-[1.3rem]" />
                          ) : (
                            <Image
                              src={selected.value}
                              alt=""
                              width={22}
                              height={22}
                            />
                          )}
                        </div>
                      </div>

                      <textarea
                        required
                        minLength={20}
                        sub-child={"false"}
                        name="details"
                        value={milestone.details}
                        onChange={(e) =>
                          editMilestone(e, index, milestone.value.index)
                        }
                        placeholder="Details"
                        className="col-span-2 w-full h-20 resize-none px-5 py-2 border border-black/30 outline-0 rounded-md mt-3 bg-white"
                      />

                      {/* UI-only: evidence is not stored or submitted yet. */}
                      <label className="col-span-2 flex flex-wrap items-center gap-3 rounded-md border border-dashed border-black/30 bg-white px-5 py-3 cursor-pointer hover:bg-gray-50">
                        <MdOutlineAttachFile className="text-[1.3rem] text-gray-500" />
                        <span className="text-sm font-semibold text-gray-500">
                          Evidence
                        </span>
                        <input
                          type="file"
                          multiple
                          accept=".jpg,.jpeg,.png,.pdf"
                          className="text-sm text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 file:font-semibold file:cursor-pointer"
                        />
                        <span className={`ml-auto ${previewBadgeClass}`}>
                          Preview
                        </span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FormSection>

          <FormSection
            icon={<MdOutlineDescription />}
            title="Description"
            subtitle="Tell the full story: the need, who you are helping and how funds will be used."
          >
            <textarea
              required
              minLength={20}
              name="description"
              sub-child={"false"}
              aria-label="Description"
              value={formData.description}
              onChange={editFormData}
              className="w-full h-40 resize-none px-5 py-2 border border-black/30 outline-0 rounded-md"
            />
          </FormSection>

          <FormSection
            icon={<MdOutlineSubject />}
            title="Summary"
            subtitle="A short overview of your campaign."
          >
            <textarea
              required
              minLength={20}
              name="summary"
              sub-child={"false"}
              aria-label="Summary"
              value={formData.summary}
              onChange={editFormData}
              className="w-full h-28 resize-none px-5 py-2 border border-black/30 outline-0 rounded-md"
            />
          </FormSection>

          <button
            disabled={isLoading}
            className="gradient-cto rounded-full w-full font-semibold cursor-pointer py-3 flex items-center justify-center gap-2"
          >
            {isLoading && (
              <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
            )}
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
