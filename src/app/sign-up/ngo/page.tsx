"use client";

import { response_message } from "@/components/utilities/utils";
import { useSignUpNgoMutation } from "@/redux/api/main";
import { setVerifyEmail } from "@/redux/slice/users";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { TbExternalLink } from "react-icons/tb";
import CountrySelect from "@/components/CountrySelector";
import { useDispatch } from "react-redux";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

type formType = {
  name: string;
  country: string;
  address: string;
  description: string;
  user: {
    email: string;
    phone_number: string;
    password: string;
    password2: string;
  };
  socials: Record<string, string>;
  website: string;
};

export default function Home() {
  const [social, setSocial] = useState<string>("twitter");
  const socials = useRef<Array<string>>([
    "twitter",
    "youtube",
    "facebook",
    "instagram",
  ]);
  const [formData, setFormData] = useState<formType>({
    name: "",
    country: "Nigeria",
    address: "",
    description: "",
    user: { email: "", phone_number: "+234", password: "", password2: "" },
    website: "",
    socials: {},
  });
  const [Sign_Up, { isLoading, data, error }] = useSignUpNgoMutation();

  const dispatch = useDispatch();
  const router = useRouter();

  const editFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sub_child = e.target.attributes.getNamedItem("sub-child")?.value;
    console.log("sub_child: ", sub_child);

    switch (sub_child) {
      case "user":
        setFormData((priv) => ({
          ...priv,
          user: { ...priv.user, [e.target.name]: e.target.value },
        }));
        break;

      default:
        setFormData((priv) => ({ ...priv, [e.target.name]: e.target.value }));
        break;
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setVerifyEmail(formData.user.email));

    const result = await Sign_Up({ params: {}, body: formData });
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

    response_message({ message: result.data?.message, option: "scc" });
    setTimeout(() => router.push("/verify-email"), 2000);

    // router.push("/dashboard");
  };

  console.log("====================================");
  console.log(formData);
  console.log("====================================");

  const setCountry = (country: string) => {
    setFormData((prev) => ({ ...prev, country: country }));
  };

  return (
    <div className="mt-[5rem] flex justify-center items-center">
      <div className="xl:w-[85%] lg:grid grid-cols-1 px-5 sm:px-10 md:px-20">
        <div className="col-span-4 relative w-full h-full flex flex-col justify-between p-7 sm:p-10">
          <div className="absolute top-0 left-0 w-full h-[150%] rounded-b-lg bg-[#33b1ba1c]/10 border-2 border-[#33b1baa2]/30 rounded-md"></div>

          <div className="">
            <h1 className="text-4xl font-bold relative z-10">
              NGO Registration
            </h1>
            <p className="relative z-10 mt-5">
              We built United4Change to solve the trust problem in charity, by
              using technology that proves every donation does what it says it
              will. Giving has never been this transparent or borderless
            </p>
          </div>

          <div className="mt-5">
            <p className="relative z-10 mt-5">Don't have an account?</p>

            <Link
              href={"/sign-up"}
              className="flex justify-start items-center gap-2 text-xl font-semibold relative cursor-pointer pl-2 z-10 mt-2"
            >
              Sign-In <TbExternalLink className="text-[1.2rem]" />
            </Link>
          </div>
        </div>

        <div className="col-span-6 relative z-10 p-3 sm:p-5">
          <form
            onSubmit={submit}
            className="gradient-cto-border border-2 border-transparent  bg-[#fcfcfc] rounded-[1rem] p-4 sm:p-7"
          >
            <div className="flex flex-col gap-5 px-2">
              <label>
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">Email</p>
                </div>

                <input
                  required
                  type="email"
                  name="email"
                  sub-child={"user"}
                  value={formData.user.email}
                  onChange={editFormData}
                  // placeholder="example@gmail.com"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>

              <label>
                <div className="flex items-center gap-3 pl-3 mb-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Phone number
                  </p>
                </div>

                <PhoneInput
                  defaultCountry="ng"
                  value={formData.user.phone_number}
                  onChange={(phone) =>
                    setFormData((prev) => ({
                      ...prev,
                      user: { ...prev.user, phone_number: phone },
                    }))
                  }
                  inputStyle={{
                    padding: "1.3rem 0.5rem", // py-2 (0.5rem) and px-20 (~5rem)
                    border: "1px solid rgba(0,0,0,0.15)",
                    borderTopRightRadius: "0.375rem", // rounded-md
                    borderBottomRightRadius: "0.375rem", // rounded-md
                    outline: "none",
                    width: "100%",
                  }}
                  countrySelectorStyleProps={{
                    buttonStyle: {
                      padding: "1.3rem 0.5rem",
                      borderRight: "1px solid #d1d5db", // Tailwind's border-gray-300
                      backgroundColor: "#f9fafb", // Tailwind's bg-gray-50
                      borderTopLeftRadius: "0.375rem", // rounded-md
                      borderBottomLeftRadius: "0.375rem", // rounded-md
                    },
                  }}
                />
              </label>

              <label>
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Password
                  </p>
                </div>

                <input
                  required
                  type="password"
                  name="password"
                  sub-child={"user"}
                  value={formData.user.password}
                  onChange={editFormData}
                  // placeholder="**********"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>

              <label>
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Confirm password
                  </p>
                </div>

                <input
                  required
                  type="password"
                  name="password2"
                  sub-child={"user"}
                  value={formData.user.password2}
                  onChange={editFormData}
                  // placeholder="**********"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>

              <label>
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Company name
                  </p>
                </div>

                <input
                  required
                  type="text"
                  name="name"
                  sub-child={"false"}
                  value={formData.name}
                  onChange={editFormData}
                  // placeholder="adam@123"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>

              <label>
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">Country</p>
                </div>

                <CountrySelect setCountry={setCountry} />
              </label>

              <label>
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
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
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>

              <label>
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
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

              <label className="col-span-2">
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">Socials</p>
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
                    className={`flex flex-col md:grid grid-cols-2 gap-5 ${
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
                            ]
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
                              setFormData((priv) => {
                                const copy = { ...priv };
                                const key = Object.keys(formData.socials)[
                                  index
                                ];

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

              <label>
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">Website</p>
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

              <div className="flex items-center gap-3">
                <input type="checkbox" required />
                <p className="text-sm">
                  Accept our{" "}
                  <Link href={"/privacy-policy"} className="font-bold">
                    privacy policy
                  </Link>{" "}
                  and{" "}
                  <Link href={"/terms-of-use"} className="font-bold">
                    terms of use
                  </Link>
                </p>
              </div>
            </div>

            <button
              disabled={isLoading}
              className="gradient-cto rounded-xl w-full font-semibold cursor-pointer mt-7 py-3 flex items-center justify-center gap-2"
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
