"use client";

import BackButton from "@/components/dashboard/BackButton";
import EditProfile from "@/components/dashboard/EditProfile";
import { response_message } from "@/components/utilities/utils";
import {
  useCreateCampaignMutation,
  useGetCampaignNgoMutation,
  useGetNgoMutation,
  usePatchCampaignMutation,
  usePatchNgoMutation,
} from "@/redux/api/main";
import { RootState } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { PiEmptyBold } from "react-icons/pi";
import { useSelector } from "react-redux";

type formType = {
  description: string;
  website: string;
  location: string;
  socials: Record<string, string>;
};

export default function Home() {
  const { organization } = useSelector((state: RootState) => state.user);
  const [social, setSocial] = useState<string>("tweeter");
  const socials = useRef<Array<string>>([
    "twitter",
    "youtube",
    "facebook",
    "instagram",
  ]);
  const [formData, setFormData] = useState<formType>({
    description: "",
    website: "",
    location: "",
    socials: {},
  });

  const [Patch_Ngo, { isLoading }] = usePatchNgoMutation();
  const [Get_Ngo, {}] = useGetNgoMutation();

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
      const result = await Get_Ngo({ query: `/${id}/` });

      console.log(result);
      console.log(result.data?.video);

      if ("error" in result) return;

      setFormData((priv) => ({
        ...priv,
        description: result.data?.description || "",
        website: result.data?.website || "",
        location: result.data?.address || "",
        socials: result.data?.socials ? { ...result.data?.socials } : {},
      }));
    })();

    return () => {};
  }, []);

  const editFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((priv) => ({ ...priv, [e.target.name]: e.target.value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await Patch_Ngo({ body: formData });
    console.log(result);

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
      message: "Profile edited successfully",
      option: "scc",
    });
    setTimeout(() => router.push("/dashboard/profile"), 2000);
  };

  // console.log("====================================");
  // console.log(formData);
  // console.log("====================================");

  return (
    <div className="relative px-5 md:px-10 mt-10">
      <div className="">
        <div className="relative w-full h-full flex flex-col justify-between md:px-10">
          <h1 className="text-4xl font-bold relative">Edit / Ngo Details</h1>
          <p className="relative md:w-[80%] lg:w-[70%] mt-5">
            We built United4Change to solve the trust problem in charity, by
            using technology that proves every donation does what it says it
            will. Giving has never been this transparent or borderless
          </p>
        </div>

        <div className="relative mt-5 md:not-first:p-5">
          <BackButton route="/dashboard/setting" parent_wind="flex mb-5" />
          <div
            id="gradient-border"
            className="relative bg-[#fcfcfc] rounded-[1rem] border-2 mt-5 px-2 md:px-7 py-7 md:py-10"
          >
            <div className="px-1 md:px-0">
              <EditProfile />
            </div>

            <form onSubmit={submit} className="">
              <div className="flex flex-col md:grid grid-cols-2 gap-5 px-2">
                <label className="col-span-1">
                  <div className="flex items-center gap-4 pl-3">
                    <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                    <p className="text-sm font-semibold text-gray-500">
                      Description
                    </p>
                  </div>

                  <input
                    required
                    type="text"
                    name="description"
                    sub-child={"false"}
                    value={formData.description}
                    onChange={editFormData}
                    // placeholder="smith"
                    className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                  />
                </label>

                <label className="col-span-1">
                  <div className="flex items-center gap-4 pl-3">
                    <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                    <p className="text-sm font-semibold text-gray-500">
                      Website
                    </p>
                  </div>

                  <input
                    required
                    type="text"
                    name="website"
                    sub-child={"false"}
                    value={formData.website}
                    onChange={editFormData}
                    // placeholder="smith"
                    className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                  />
                </label>

                <label className="col-span-2">
                  <div className="flex items-center gap-4 pl-3">
                    <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                    <p className="text-sm font-semibold text-gray-500">
                      Location
                    </p>
                  </div>

                  <input
                    required
                    type="text"
                    name="location"
                    sub-child={"false"}
                    value={formData.location}
                    onChange={editFormData}
                    // placeholder="smith"
                    className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                  />
                </label>

                <label className="col-span-2">
                  <div className="flex items-center gap-4 pl-3">
                    <div className="w-2 h-2 min-w-2 min-h-2 bg-[#812880] rounded-full"></div>
                    <p className="text-sm font-semibold text-gray-500">
                      Socials
                    </p>
                  </div>

                  <div
                    className={`w-full border border-black/15 rounded-md ${
                      Object.values(formData.socials).length > 0 && "p-3"
                    } mt-3`}
                  >
                    <div className="relative flex items-center">
                      <select
                        onChange={(e) => setSocial(e.target.value)}
                        className={`w-full outline-0 ${
                          Object.values(formData.socials).length > 0 &&
                          "border-y border-l border-black/10 rounded-l-md"
                        } px-5 py-2`}
                      >
                        {socials.current.map((social, index) => (
                          <option key={index} value={social}>
                            {social}
                          </option>
                        ))}
                      </select>

                      <div
                        onClick={() => {
                          console.log("====================================");
                          console.log("hiii");
                          console.log("====================================");

                          setFormData((priv) => ({
                            ...priv,
                            socials: { ...priv.socials, [social]: "" },
                          }));
                        }}
                        className={`bg-black/5 cursor-pointer ${
                          Object.values(formData.socials).length > 0 &&
                          "border-y border-r border-[#0000000a]/50 rounded-r-md"
                        } px-5 py-[.47rem]`}
                      >
                        Add
                      </div>
                    </div>

                    <div
                      className={`flex flex-col xl:grid grid-cols-2 gap-5 ${
                        Object.values(formData.socials).length > 0 && "mt-5"
                      } px-3`}
                    >
                      {Object.values(formData.socials).map((social, index) => (
                        <div
                          key={index}
                          className="w-full bg-[#0000000a]/40 border-1 border-[#00000028] flex items-center gap-2 rounded-lg"
                        >
                          {/* {typeof social === "string" && social}{" "} */}

                          <div className="bg-black/5 px-5 py-[.52rem]">
                            {Object.keys(formData.socials)[index]}
                          </div>

                          <input
                            type="text"
                            value={
                              formData.socials[
                                Object.keys(formData.socials)[index]
                              ] || ""
                            }
                            onChange={(e) => {
                              setFormData((priv) => ({
                                ...priv,
                                socials: {
                                  ...priv.socials,
                                  [Object.keys(priv.socials)[index]]:
                                    e.target.value,
                                },
                              }));
                            }}
                            className="outline-0 w-full p-2"
                            placeholder="link to social..."
                          />

                          <div className="bg-[#0000008c]/5 cursor-pointer px-5 py-[.72rem]">
                            <MdCancel
                              onClick={() => {
                                const key = Object.keys(formData.socials)[
                                  index
                                ];
                                console.log("===============================");
                                console.log(key);
                                console.log(formData.socials);
                                console.log(key in formData.socials);
                                console.log("===============================");

                                setFormData((priv) => {
                                  const copy = { ...priv };

                                  if (key in copy.socials)
                                    delete copy.socials[key]; // delete inside socials, not top-level

                                  return copy;
                                });
                              }}
                              className="text-[1.1rem] cursor-pointer"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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
    </div>
  );
}
