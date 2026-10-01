"use client";

import CustomSelector from "@/components/SelectTag";
import { response_message } from "@/components/utilities/utils";
import { setVerifyEmail } from "@/redux/slice/users";
import { Donate_To_Treasury, Platform_Address } from "@/Wallet/ConnectContract";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { PhoneInput } from "react-international-phone";
import { useDispatch, useSelector } from "react-redux";
import "react-international-phone/style.css";
import { RootState } from "@/redux/store";
import { useAddHashMutation } from "@/redux/api/main";
import Image from "next/image";
import { useWallets } from "@privy-io/react-auth";
import {
  useGetWallet,
  USDC_ADDRESS,
  USDT_ADDRESS,
} from "@/Wallet/privy/privy.utils";
import { Smart_Donate_To_Treasury_Smart } from "@/Wallet/ConnectSmartContract";
import Link from "next/link";

export default function Home() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    donation_amount: 0,
    currency: "USDC",
    note: "",
    anonymous: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { wallet, online } = useSelector((state: RootState) => state.user);
  const [Add_Hash, {}] = useAddHashMutation();
  const use_wallet = useGetWallet();

  const editFormData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFormData((priv) => ({ ...priv, [e.target.name]: e.target.value }));
  };

  const router = useRouter();
  const dispatch = useDispatch();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet.account) {
      return response_message({
        message: "Kindly connect your wallet to continue.",
        option: "wrn",
      });
    }

    setIsLoading(true);
    dispatch(setVerifyEmail(formData.email));

    // const signin_result = await Sign_In({ params: {}, body: formData });
    // if (is_error(signin_result) === true) return;

    const token = await Platform_Address();
    const default_data = {
      full_name: "",
      email: "",
      phone: "",
      donation_amount: 0,
      currency: "USDC",
      note: "",
      anonymous: false,
    };

    // console.log("====================================");
    // console.log("====================================");
    // console.log("====================================");
    // console.log("====================================");
    // console.log("====================================");
    // console.log("====================================");
    // console.log("====================================");
    // console.log("====================================");
    // console.log("====================================");
    // console.log("====================================");
    // console.log(wallet.account);
    // console.log("working");
    // console.log(token);
    // console.log("USDC_ADDRESS: ", USDC_ADDRESS);
    // console.log("USDT_ADDRESS: ", USDT_ADDRESS);
    // console.log(formData.currency);
    // console.log(formData.currency === "USDT");
    // console.log(formData.currency === "USDT" ? USDT_ADDRESS : USDC_ADDRESS);
    // console.log("====================================");

    // USDT
    const currency_check = formData.currency === "USDT";
    let pledge = null;

    if (use_wallet.isSmartAccount) {
      pledge = await Smart_Donate_To_Treasury_Smart({
        tokenAddress: USDC_ADDRESS, // USDT address
        to: token || "",
        amount: String(formData.donation_amount),
        currency: formData.currency,
        smartClient: use_wallet.connector,
      });
    } else {
      pledge = await Donate_To_Treasury(
        currency_check ? USDT_ADDRESS : USDC_ADDRESS, // USDT address
        token || "",
        String(formData.donation_amount),
        formData.currency,
        use_wallet.connector,
      );
    }

    console.log("[ ***** ]");
    console.log("[ ***** ]");
    console.log("[ ***** ]");
    console.log("[ ***** ]");
    console.log("[ ***** ]");
    console.log(pledge);

    if (pledge?.status === true && online === true) {
      const result_hash = await Add_Hash({
        body: {
          wallet_address: wallet.account,
          tx_hash: (pledge as any)?.hash,
        },
      });

      response_message({
        message: "Treasury donation successful",
        option: "scc",
      });

      console.log(result_hash);
      setFormData(default_data);
      if ("error" in result_hash) console.log("[ result_hash ]: ", result_hash);
    } else {
      const err_msg = {
        status: use_wallet.isSmartAccount === true,
        processing_status:
          pledge?.error ===
            "Transaction is processing. Please check your balance in a moment." &&
          use_wallet.isSmartAccount === true,
      };

      if (err_msg.processing_status) {
        setIsLoading(false);
        setFormData(default_data);
        setFormData({
          full_name: "",
          email: "",
          phone: "",
          donation_amount: 0,
          currency: "USDC",
          note: "",
          anonymous: false,
        });

        return response_message({
          message: pledge?.error as string,
          option: "scc",
        });
      }

      if (err_msg.status)
        response_message({ message: pledge?.error as string, option: "wrn" });
    }

    setIsLoading(false);
  };

  // console.log("====================================");
  // console.log(formData);
  // console.log("====================================");

  const image = ["/icons/usdt-logo.png", "/icons/usdc-logo.png"];

  return (
    <div className="mt-20 flex justify-center items-center">
      <div className="lg:w-[85%] px-5 sm:px-10 md:px-20">
        <div className="relative w-full h-full flex flex-col justify-between text-whit p-7 sm:p-10">
          <div className="absolute top-0 left-0 w-full h-[150%] rounded-3xl bg-[#33b1ba1c]/10 border-2 border-[#33b1baa2]/30"></div>

          <div className="">
            <h1 className="text-3xl font-bold relative z-10">
              In App Donation
            </h1>
            <p className="relative z-10 mt-5">
              We built United4Change to solve the trust problem in charity, by
              using technology that proves every donation does what it says it
              will. Giving has never been this transparent or borderless
            </p>
          </div>
        </div>

        <div className="relative z-10 p-3 sm:p-5">
          <form
            onSubmit={submit}
            className="gradient-cto-border rounded-2xl border border-transparent bg-[#fcfcfc] p-4 sm:p-7"
          >
            <div className="flex flex-col gap-5 px-2">
              <label>
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Full name
                  </p>
                </div>

                <input
                  required
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={editFormData}
                  // placeholder="example@gmail.com"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>
              <label>
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">Email</p>
                </div>

                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={editFormData}
                  // placeholder="example@gmail.com"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>
              <label>
                <div className="flex items-center gap-3 mb-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Phone number{" "}
                    <span className="text-gray-400">/ optional</span>
                  </p>
                </div>

                <PhoneInput
                  defaultCountry="ng"
                  value={formData.phone}
                  required={false}
                  onChange={(phone) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: phone,
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
                    Donation amount
                  </p>
                </div>

                <input
                  required
                  type="number"
                  name="donation_amount"
                  value={formData.donation_amount}
                  onChange={editFormData}
                  // placeholder="**********"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>
              <label>
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Currency
                  </p>
                </div>

                <CustomSelector
                  // optionsList={["USDT", "USDC", "Fiat VIA Transak/Card"]}
                  optionsList={["USDC_0"]}
                  placeholder="Currency"
                  changeEvent={(selected) =>
                    setFormData((prev) => ({
                      ...prev,
                      currency: String(selected?.value ?? "")?.replace(
                        "_0",
                        "",
                      ),
                    }))
                  }
                  mapOption={(val) => ({
                    value: val,
                    name: val,
                    label: (
                      <div className="flex items-center">
                        <div className="min-w-10 min-h-[2.63rem] rounded-l-md flex justify-center items-center">
                          <Image src={image[1]} alt="" width={25} height={25} />
                        </div>
                        <p>{val?.replace("_0", "")?.replace("_1", "")}</p>
                      </div>
                    ),
                  })}
                />
              </label>
              <label>
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-500">
                    Note <span className="text-gray-400">/ optional</span>
                  </p>
                </div>

                <input
                  type="text"
                  name="noteq"
                  value={formData.note}
                  onChange={editFormData}
                  // placeholder="**********"
                  className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                />
              </label>
              <label className="flex justify-start gap-2 text-sm">
                <input
                  type="checkbox"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormData((priv) => ({
                      ...priv,
                      anonymous: e.target.checked,
                    }));
                  }}
                />
                <p className="">
                  I understand this donation goes to the U4C Treasury, managed
                  transparently on-chain
                </p>
              </label>

              <label className="flex justify-start gap-2 text-sm">
                <input
                  type="checkbox"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormData((priv) => ({
                      ...priv,
                      anonymous: e.target.checked,
                    }));
                  }}
                />
                <p>
                  I agree to U4C’s{" "}
                  <Link href={"/terms-of-use"} className="">
                    Terms of Service
                  </Link>
                </p>
              </label>

              <label className="flex justify-start gap-2 text-sm">
                <input
                  type="checkbox"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormData((priv) => ({
                      ...priv,
                      anonymous: e.target.checked,
                    }));
                  }}
                />
                <p className="">Donate anonymously</p>
              </label>
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
