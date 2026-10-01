"use client";

import { get_random_int, response_message } from "@/components/utilities/utils";
import { NavigationTemplate } from "@/components/utilities/utils.template";
import { useGetKycMutation, useVerifyKycMutation } from "@/redux/api/main";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { PhoneInput } from "react-international-phone";
import { BiSolidUserDetail } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import "react-international-phone/style.css";
import { FaCircleCheck } from "react-icons/fa6";
import { MdDocumentScanner } from "react-icons/md";
import { FaEdit, FaFilePdf, FaIdCard, FaRegImages } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { setKyc } from "@/redux/slice/users";

type KycFormData = {
  cac_document: File | null;
  rep_idcard: File | null;
  rep_phone: string;
  rep_email: string;
  reg_no: string;
};

type KycStatus = {
  value: boolean;
  pending: boolean;
  approved: boolean;
  rejected: boolean;
};

type SelectedTab = "cac-document" | "id-card" | "ngo-details";

const KYC_KEYS = [
  "cac document",
  "representative idcard",
  "registeration number",
] as const;

const SELECTED_TO_KYC_KEY: Record<SelectedTab, string> = {
  "cac-document": "cac document",
  "id-card": "representative idcard",
  "ngo-details": "registeration number",
};

const STEP_CARDS = [
  {
    id: "cac-document" as const,
    num: 1,
    Icon: MdDocumentScanner,
    iconClass: "text-[4rem]",
    title: "CAC Document",
    desc: "Upload your NGO's CAC registration document to verify legal registration and authorization to operate.",
  },
  {
    id: "id-card" as const,
    num: 2,
    Icon: FaIdCard,
    iconClass: "text-[4rem]",
    title: "ID Card",
    desc: "Upload a valid government-issued ID of an authorized representative for identity verification.",
  },
  {
    id: "ngo-details" as const,
    num: 3,
    Icon: BiSolidUserDetail,
    iconClass: "text-[5rem]",
    title: "NGO Details",
    desc: "Provide your NGO's official details, including phone number, registration number, and official email address for verification and communication.",
  },
] as const;

export default function VerifyKycPage() {
  const [selected, setSelected] = useState<SelectedTab>("cac-document");
  const [open, setOpen] = useState<"closed" | SelectedTab>("closed");
  const [formData, setFormData] = useState<KycFormData>({
    cac_document: null,
    rep_idcard: null,
    rep_phone: "",
    rep_email: "",
    reg_no: "",
  });
  const [cacReady, setCacReady] = useState(false);
  const [submitted, setSubmitted] = useState(true);
  const cacLoaderRef = useRef<HTMLDivElement | null>(null);

  const { organization, kyc } = useSelector((state: RootState) => state.user);
  const [Verify_Kyc, { isLoading }] = useVerifyKycMutation();
  const [Get_Kyc] = useGetKycMutation();

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (organization === false) {
      router.back();
      return;
    }

    (async () => {
      try {
        const kyc_res = await Get_Kyc({ params: {} });
        if ("error" in kyc_res) return;

        console.log("[ kyc_res ]: ", kyc_res);

        const requirements: any[] = kyc_res.data?.requirements ?? [];
        const verified = requirements.every(
          (r) => r?.status === "pending" || r?.status === "approved",
        );

        dispatch(setKyc({ verified, data: requirements }));
      } catch (err) {
        console.error("Error fetching KYC:", err);
      }
    })();
  }, [submitted]);

  const getKycStatus = (name: string): KycStatus => {
    const status: KycStatus = {
      value: false,
      pending: false,
      approved: false,
      rejected: false,
    };
    const entries: any[] = Array.isArray(kyc?.data) ? kyc.data : [];

    for (const item of entries) {
      if (item?.name !== name) continue;
      status.approved = item.status === "approved";
      status.pending = item.status === "pending";
      status.rejected = item.status === "rejected";
      status.value = status.approved || status.pending;
      break;
    }

    return status;
  };

  const startCacProgress = () => {
    if (!cacLoaderRef.current) return;
    const el = cacLoaderRef.current;
    const amount = { value: 0 };

    const interval = setInterval(() => {
      amount.value = Math.min(amount.value + get_random_int(5, 20), 100);
      el.style.width = `${amount.value}%`;

      if (amount.value >= 100) {
        setCacReady(true);
        clearInterval(interval);
      }
    }, 1000);
  };

  const addFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "cac_document" | "rep_idcard",
  ) => {
    const file = e.target.files?.[0];
    if (!file) {
      response_message({
        message: "You didn't select any file",
        option: "wrn",
      });
      return;
    }
    setFormData((prev) => ({ ...prev, [key]: file }));
    if (key === "cac_document") startCacProgress();
  };

  const editFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = async (e: React.FormEvent, type: string) => {
    e.preventDefault();

    const kyc_details: FormData[] = [];

    if (type === "cac_document") {
      const d = new FormData();
      d.append("name", "cac document");
      d.append("file", formData.cac_document!);
      kyc_details.push(d);
    } else if (type === "id_card") {
      const d = new FormData();
      d.append("name", "representative idcard");
      d.append("file", formData.rep_idcard!);
      kyc_details.push(d);
    } else if (type === "ngo_details") {
      const phone = new FormData();
      phone.append("name", "phone number");
      phone.append("value", formData.rep_phone);

      const reg = new FormData();
      reg.append("name", "registeration number");
      reg.append("value", formData.reg_no);

      kyc_details.push(phone, reg);
    } else {
      response_message({ message: "Something went wrong", option: "err" });
      return;
    }

    console.log("[ kyc_details ]: ", kyc_details);

    const results = await Promise.allSettled(
      kyc_details.map((d) => Verify_Kyc({ params: {}, body: d })),
    );

    const failed = results.find(
      (r) =>
        r.status === "rejected" ||
        (r.status === "fulfilled" && "error" in r.value),
    );

    if (failed) {
      const msg =
        failed.status === "fulfilled"
          ? (failed.value.error?.data?.detail ?? "Something went wrong")
          : ((failed as PromiseRejectedResult).reason?.message ??
            "Network error");
      response_message({ message: msg, option: "err" });
      return;
    }

    response_message({
      message: "KYC documents submitted successfully",
      option: "scc",
    });
    setSubmitted((prev) => !prev);
    setOpen("closed");
  };

  const openModal = () => {
    const kycKey = SELECTED_TO_KYC_KEY[selected];
    const status = getKycStatus(kycKey);

    if (status.approved) {
      response_message({
        message:
          selected === "ngo-details"
            ? "These details have already been approved"
            : "This document has already been approved",
        option: "wrn",
      });
      return;
    }

    setOpen(selected);
  };

  const statusBg = (s: KycStatus) =>
    s.rejected
      ? "bg-red-400"
      : s.approved
        ? "bg-green-400"
        : s.pending
          ? "bg-[#33b2ba]"
          : "bg-gray-400";

  const statusDotBg = (s: KycStatus) =>
    s.rejected
      ? "bg-red-600"
      : s.approved
        ? "bg-green-600"
        : s.pending
          ? "bg-[#2097a0]"
          : "bg-gray-600";

  const statusLabel = (s: KycStatus) =>
    s.rejected
      ? "Rejected"
      : s.approved
        ? "Approved"
        : s.pending
          ? "Pending"
          : "Waiting";

  const selectedCardClass =
    "bg-primary10 gradient-cto-border border-[1px] border-transparent";
  const modalOverlay =
    "fixed top-0 left-0 z-[1000] w-full h-full bg-gray-800/40 flex justify-center items-center";
  const modalCard = "bg-[#fffff9] w-[25rem] rounded-lg p-7";

  return (
    <div className="relative px-5 md:px-10 mt-10">
      <NavigationTemplate
        title="Verify KYC"
        navigation={[
          { title: "Settings", path: "/dashboard/setting" },
          { title: "Verify KYC", path: "#" },
        ]}
      />

      {/* CAC Document Modal */}
      {open === "cac-document" && (
        <div className={modalOverlay}>
          <div className={modalCard}>
            <div className="flex justify-end">
              <IoClose
                onClick={() => setOpen("closed")}
                className="text-[1.5rem] cursor-pointer"
              />
            </div>

            <div className="flex flex-col items-center justify-center p-5">
              <div className="relative min-h-50 w-full h-50 border-2 border-dashed border-gray-500 bg-gray-100 flex justify-center items-center rounded-xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-7">
                  <label
                    htmlFor="cac-file-input"
                    className="w-full h-full text-black bg-white/80 rounded-xl flex flex-col items-center justify-center cursor-pointer gap-3 px-5 py-3"
                  >
                    <FaFilePdf className="text-[1.5rem]" />
                    <p>Upload CAC PDF Document</p>
                  </label>
                  <input
                    id="cac-file-input"
                    type="file"
                    onChange={(e) => addFile(e, "cac_document")}
                    accept=".pdf"
                    className="absolute opacity-0 pointer-events-none"
                  />
                </div>
              </div>

              <div className="w-full h-2 bg-red-100 rounded-full overflow-hidden mt-3">
                <div
                  ref={cacLoaderRef}
                  className="h-full rounded-full gradient-cto"
                  style={{ width: "0%" }}
                />
              </div>

              <button
                onClick={(e) => submit(e, "cac_document")}
                disabled={!cacReady || isLoading}
                className={`${!cacReady ? "bg-gray-200 text-gray-400" : "gradient-cto text-white"} w-[70%] rounded-full cursor-pointer flex items-center justify-center gap-1 text-[1.2rem] py-3 mt-5`}
              >
                {isLoading ? (
                  <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
                ) : (
                  <FaEdit />
                )}
                <p>Submit</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ID Card Modal */}
      {open === "id-card" && (
        <div className={modalOverlay}>
          <div className={modalCard}>
            <div className="flex justify-end">
              <IoClose
                onClick={() => setOpen("closed")}
                className="text-[1.5rem] cursor-pointer"
              />
            </div>

            <div className="flex flex-col items-center justify-center p-5">
              <div className="relative min-w-50 w-full h-50 border-2 border-dashed border-gray-500 bg-gray-100 flex justify-center items-center rounded-xl overflow-hidden">
                {formData.rep_idcard ? (
                  <img
                    className="object-cover w-full h-full"
                    src={URL.createObjectURL(formData.rep_idcard)}
                    alt="ID card preview"
                  />
                ) : (
                  <Image
                    src="/icons/profile-icon.png"
                    className="opacity-20"
                    alt=""
                    width={80}
                    height={80}
                  />
                )}

                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-7">
                  <label
                    htmlFor="idcard-file-input"
                    className="w-full h-full text-black bg-white/50 rounded-xl flex items-center justify-center cursor-pointer gap-3 px-5 py-3"
                  >
                    <FaRegImages className="text-[1.5rem]" />
                    <p>Upload</p>
                  </label>
                  <input
                    id="idcard-file-input"
                    type="file"
                    onChange={(e) => addFile(e, "rep_idcard")}
                    accept=".jpg,.jpeg,.png"
                    className="absolute opacity-0 pointer-events-none"
                  />
                </div>
              </div>

              <button
                onClick={(e) => submit(e, "id_card")}
                disabled={!formData.rep_idcard || isLoading}
                className={`${!formData.rep_idcard ? "bg-gray-200 text-gray-400" : "gradient-cto text-white"} w-[70%] rounded-full cursor-pointer flex items-center justify-center gap-1 text-[1.2rem] py-3 mt-5`}
              >
                {isLoading ? (
                  <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
                ) : (
                  <FaEdit />
                )}
                <p>Submit</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NGO Details Modal */}
      {open === "ngo-details" && (
        <div className={modalOverlay}>
          <div className={modalCard}>
            <div className="flex justify-end">
              <IoClose
                onClick={() => setOpen("closed")}
                className="text-[1.5rem] cursor-pointer"
              />
            </div>

            <form
              onSubmit={(e) => submit(e, "ngo_details")}
              className="flex flex-col items-center justify-center p-5"
            >
              <div className="w-full flex flex-col gap-5">
                <label>
                  <div className="flex items-center gap-3 pl-3 mb-3">
                    <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full" />
                    <p className="text-sm font-semibold text-gray-500">
                      Phone number
                    </p>
                  </div>
                  <PhoneInput
                    defaultCountry="ng"
                    value={formData.rep_phone}
                    onChange={(phone) =>
                      setFormData((prev) => ({ ...prev, rep_phone: phone }))
                    }
                    inputStyle={{
                      padding: "1.3rem 0.5rem",
                      border: "1px solid rgba(0,0,0,0.15)",
                      borderTopRightRadius: "0.375rem",
                      borderBottomRightRadius: "0.375rem",
                      outline: "none",
                      width: "100%",
                    }}
                    countrySelectorStyleProps={{
                      buttonStyle: {
                        padding: "1.3rem 1rem",
                        borderRight: "1px solid #d1d5db",
                        backgroundColor: "#f9fafb",
                        borderTopLeftRadius: "0.375rem",
                        borderBottomLeftRadius: "0.375rem",
                      },
                    }}
                  />
                </label>

                <label>
                  <div className="flex items-center gap-3 pl-3">
                    <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full" />
                    <p className="text-sm font-semibold text-gray-500">Email</p>
                  </div>
                  <input
                    required
                    type="email"
                    name="rep_email"
                    value={formData.rep_email}
                    onChange={editFormData}
                    className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                  />
                </label>

                <label>
                  <div className="flex items-center gap-3 pl-3">
                    <div className="w-2 h-2 min-w-2 min-h-2 bg-primary rounded-full" />
                    <p className="text-sm font-semibold text-gray-500">
                      CAC Number
                    </p>
                  </div>
                  <input
                    required
                    type="text"
                    name="reg_no"
                    value={formData.reg_no}
                    onChange={editFormData}
                    className="w-full px-5 py-2 border border-black/15 outline-0 rounded-md mt-3"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="gradient-cto text-white w-full rounded-full cursor-pointer flex items-center justify-center gap-1 text-[1.2rem] py-3 mt-5"
              >
                {isLoading ? (
                  <AiOutlineLoading3Quarters className="button_loading_ text-[1.2rem]" />
                ) : (
                  <FaEdit />
                )}
                <p>Submit</p>
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="gradient-cto-border rounded-2xl border-2 border-white/90 p-5 lg:p-10 mt-5">
        {/* Status tracker */}
        <div className="mb-10 min-[450px]:mb-20 min-[450px]:mt-10 lg:mt-3">
          <div className="w-px min-[450px]:w-[95%] lg:w-[70%] h-48 min-[500px]:h-px bg-gray-300 flex flex-col min-[450px]:flex-row items-center justify-between mx-auto">
            {KYC_KEYS.map((key, index) => {
              const s = getKycStatus(key);
              return (
                <div
                  key={index}
                  className="rounded-md bg-white flex justify-center items-center min-[500px]:p-2 sm:p-5"
                >
                  <div
                    className={`rounded-md ${statusBg(s)} flex items-center justify-center gap-2 px-3 py-2`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-white ${statusDotBg(s)}`}
                    >
                      <p className="text-xs min-[450px]:text-[0.7rem] min-[500px]:text-xs">
                        {index + 1}
                      </p>
                    </div>
                    <h1 className="font-semibold text-xs min-[450px]:text-[0.7rem] min-[500px]:text-xs sm:text-sm text-white">
                      {statusLabel(s)}
                    </h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step selection cards */}
        <div className="grid min-[850px]:grid-cols-2 min-[1200px]:grid-cols-3 gap-5">
          {STEP_CARDS.map(({ id, num, Icon, iconClass, title, desc }) => {
            const isSelected = selected === id;
            return (
              <div
                key={id}
                onClick={() => setSelected(id)}
                className={`relative cursor-pointer ${isSelected ? selectedCardClass : "bg-gray-50 border border-gray-200"} rounded-lg p-5`}
              >
                {isSelected && (
                  <FaCircleCheck className="absolute top-3 left-13 w-7 h-7 rounded-full text-primary text-[1.8rem]" />
                )}
                <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                  {num}
                </div>
                <div
                  className={`flex flex-col justify-center items-center ${!isSelected && "opacity-50"} py-5`}
                >
                  <Icon className={iconClass} />
                  <h2 className="text-[1.2rem] font-semibold mt-4">{title}</h2>
                  <p className="text-center text-[0.9rem] mt-2">{desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          disabled={isLoading}
          onClick={openModal}
          className="gradient-cto rounded-full font-semibold cursor-pointer flex items-center justify-center gap-2 mt-10 mx-auto py-3 px-20"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
