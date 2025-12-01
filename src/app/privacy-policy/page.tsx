"use client";

import CustomSelector from "@/components/SelectTag";
import { response_message } from "@/components/utilities/utils";
import { setVerifyEmail } from "@/redux/slice/users";
import { Platform_Address } from "@/Wallet/ConnectContract";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { PhoneInput } from "react-international-phone";
import { useDispatch, useSelector } from "react-redux";
import "react-international-phone/style.css";
import { Send_ERC20 } from "@/Wallet/Utilities";
import { RootState } from "@/redux/store";
import { useAddHashMutation } from "@/redux/api/main";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useAppKitAccount } from "@/Wallet/reown/Index";

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

  const editFormData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
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

    console.log("====================================");
    console.log(wallet.account);
    console.log("working");
    console.log(token);
    console.log("====================================");

    // USDT
    const result = await Send_ERC20(
      formData.currency === "USDT"
        ? "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"
        : formData.currency === "USDC"
        ? "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359"
        : "", // USDT address
      token || "",
      String(formData.donation_amount),
      formData.currency
    );

    if (result?.status === true && online === true) {
      const result_hash = await Add_Hash({
        body: {
          wallet_address: wallet.account,
          tx_hash: result?.data?.hash,
        },
      });

      console.log(result_hash);
      if ("error" in result_hash) console.log("[ result_hash ]: ", result_hash);
    }

    setIsLoading(false);
  };

  // console.log("====================================");
  // console.log(formData);
  // console.log("====================================");

  const image = ["/icons/usdc-logo.png", "/icons/usdt-logo.png"];

  return (
    <div className="mt-[5rem] flex justify-center items-center">
      <div className="lg:w-[85%] px-5 sm:px-10 md:px-20">
        <div className="relative w-full h-full flex flex-col justify-between text-whit p-7 sm:p-10">
          <div
            // id="gradient-border"
            className="absolute top-0 left-0 w-full h-[150%] rounded-b-lg bg-[#33b1ba1c]/10 border-2 border-[#33b1baa2]/30 rounded-md"
          ></div>

          <div className="">
            <h1 className="text-3xl font-bold relative z-10">
              United4Change (U4C) – Privacy Policy
            </h1>
            <p className="relative z-10 mt-5">
              United4Change (“U4C”, “the Platform”) is operated by BlackSpectre
              Technology Limited (“BlackSpectre”, “we”, “our”, or “us”). This
              Privacy Policy explains how we collect, process, use, store,
              protect, and disclose personal data when users access the U4C
              website, mobile application, dashboards, or any services
              (“Services”). This Policy complies with the EU General Data
              Protection Regulation (GDPR), the Nigeria Data Protection Act
              (NDPA), and other relevant global data-protection standards. By
              accessing or using U4C, you acknowledge that you have read and
              understand this Policy.
            </p>
          </div>
        </div>

        <div className="relative z-10 p-3 sm:p-5">
          <div
            id="gradient-border"
            className="bg-[#fcfcfc] rounded-[1rem] p-4 sm:p-7"
          >
            <div className="">
              <h1 className="font-bold text-xl">
                Scope of this Privacy Policy
              </h1>
              <p>This Policy applies to:</p>

              <ul className="list-item ml-10 my-5">
                <li className="list-disc">Donors</li>
                <li className="list-disc">NGOs and their representatives</li>
                <li className="list-disc">Platform users and visitors</li>
                <li className="list-disc">
                  Third-party partners interacting with U4C
                </li>
              </ul>
              <p>It governs all personal data collected online and offline</p>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-xl">Personal Data We Collect</h1>
              <p>We collect the following categories of personal data:</p>

              <h1 className="font-bold text-lg mt-5">
                Data You Provide Voluntarily
              </h1>
              <ul className="list-item ml-10 my-2">
                <li className="list-disc">Full name</li>
                <li className="list-disc">Email address</li>
                <li className="list-disc">Mobile number</li>
                <li className="list-disc">Country of residence</li>
                <li className="list-disc">
                  NGO documentation (CAC registration, IDs, certifications)
                </li>
                <li className="list-disc">
                  Payment information (via compliant third-party partners)
                </li>
                <li className="list-disc">Profile information</li>
                <li className="list-disc">
                  Communications and support messages
                </li>
              </ul>

              <h1 className="font-bold text-lg mt-5">
                Automatically Collected Data
              </h1>
              <ul className="list-item ml-10 my-2">
                <li className="list-disc">IP address</li>
                <li className="list-disc">Geolocation (approximate)</li>
                <li className="list-disc">Device information</li>
                <li className="list-disc">Browser type and identifiers</li>
                <li className="list-disc">Usage logs and interaction data</li>
                <li className="list-disc">Cookies and tracking identifiers</li>
              </ul>

              <h1 className="font-bold text-lg mt-5">
                Blockchain and Smart Contract Data
              </h1>
              <ul className="list-item ml-10 my-2">
                <li className="list-disc">Wallet addresses</li>
                <li className="list-disc">On-chain transaction hashes</li>
                <li className="list-disc">USDC donation activity</li>
                <li className="list-disc">Smart contract interactions</li>
              </ul>
              <p>
                <span className="font-semibold">Note:</span> Public blockchain
                data is immutable and outside U4C’s control (GDPR-recognized
                exemption).
              </p>

              <h1 className="font-bold text-lg mt-5">
                Third-Party Data Sources
              </h1>
              <ul className="list-item ml-10 my-2">
                <li className="list-disc">Identity verification partners</li>
                <li className="list-disc">
                  Payment gateway partners (licensed)
                </li>
                <li className="list-disc">NGO due-diligence vendors</li>
                <li className="list-disc">Analytics providers</li>
              </ul>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-xl">Analytics providers</h1>
              <p>We process data under the following lawful bases:</p>

              <h1 className="font-bold text-lg mt-5">Consent</h1>
              <ul className="list-item ml-10 my-2">
                <li className="list-disc">Marketing communications</li>
                <li className="list-disc">Cookie tracking preferences</li>
              </ul>

              <h1 className="font-bold text-lg mt-5">
                Performance of a Contract
              </h1>
              <ul className="list-item ml-10 my-2">
                <li className="list-disc">User accounts and access</li>
                <li className="list-disc">Donation processing</li>
                <li className="list-disc">NGO onboarding and verification</li>
                <li className="list-disc">Dashboard functionality</li>
              </ul>

              <h1 className="font-bold text-lg mt-5">Legitimate Interests</h1>
              <ul className="list-item ml-10 my-2">
                <li className="list-disc">Fraud prevention</li>
                <li className="list-disc">Platform security</li>
                <li className="list-disc">System improvement analytics</li>
                <li className="list-disc">
                  Anti-money laundering (AML) monitoring A legitimate interest
                  assessment (LIA) is maintained internally.
                </li>
              </ul>

              <h1 className="font-bold text-lg mt-5">
                Legal or Regulatory Obligation
              </h1>
              <p>
                Required for NDPA, AML/CFT laws, tax regulations, or court
                requests.
              </p>

              <h1 className="font-bold text-lg mt-5">Vital Interests</h1>
              <p>
                Where necessary to protect the rights, safety, or security of
                users.
              </p>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-xl">
                Purpose of Processing Personal Data
              </h1>
              <p>We process personal data to:</p>

              <ul className="list-item ml-10 my-2">
                <li className="list-disc">
                  Create, manage, and verify accounts
                </li>
                <li className="list-disc">
                  Verify NGOs and their compliance obligations
                </li>
                <li className="list-disc">
                  Facilitate donations via non-custodial smart contracts
                </li>
                <li className="list-disc">
                  Provide dashboards and transaction transparency
                </li>
                <li className="list-disc">
                  Conduct analytics, platform security, and error detection
                </li>
                <li className="list-disc">
                  Prevent fraud, misuse, or money laundering
                </li>
                <li className="list-disc">
                  Respond to inquiries or support requests
                </li>
                <li className="list-disc">
                  Comply with local and international regulatory frameworks
                </li>
              </ul>
              <p>We do not sell personal data.</p>
              <p>We do not sell personal data.</p>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-xl">
                Data Sharing and Disclosures
              </h1>
              <p>
                We may share personal data only where necessary, and only with
                entities operating under strict data-protection agreements.
              </p>

              <h1 className="font-bold text-lg mt-5">
                Third-Party Service Providers (Processors)
              </h1>
              <ul className="list-item ml-10 my-2">
                <li className="list-disc">Cloud hosting providers</li>
                <li className="list-disc">AML/KYC verification vendors</li>
                <li className="list-disc">
                  Payment processors and USDC on/off-ramp partners
                </li>
                <li className="list-disc">
                  Blockchain infrastructure providers
                </li>
                <li className="list-disc">Analytics services</li>
              </ul>

              <h1 className="font-bold text-lg mt-5">
                NGOs (Limited Disclosure)
              </h1>
              <p>
                Only donor information the donor chooses to make visible
                (visible vs. anonymous donation preference).
              </p>

              <h1 className="font-bold text-lg mt-5">
                Legal and Regulatory Authorities
              </h1>
              <p>
                When required by law, court order, or for the prevention of
                fraud.
              </p>

              <h1 className="font-bold text-lg mt-5">
                Cross-Border Data Transfers
              </h1>
              <p>
                We comply with GDPR Chapter V and NDPA cross-border restrictions
                using:
              </p>
              <ul className="list-item ml-10 my-2">
                <li className="list-disc">
                  Standard Contractual Clauses (SCCs)s
                </li>
                <li className="list-disc">Adequacy decisions</li>
                <li className="list-disc">Internal transfer agreements</li>
                <li className="list-disc">Approved security safeguards</li>
              </ul>

              <h1 className="font-bold text-lg mt-5">
                Children’s Data Protection (GDPR Art. 8 / NDPA)
              </h1>

              <p>
                This platform is{" "}
                <span className="font-semibold">
                  not intended for use by children
                </span>
                , as defined under the applicable data protection and
                child-protection laws of relevant jurisdictions, including the
                Nigeria Data Protection Act (NDPA), the EU General Data
                Protection Regulation (GDPR), and any other regional
                regulations.
              </p>

              <p>
                U4C does not knowingly collect or process personal data from
                individuals below the legal age of digital consent in their
                respective jurisdictions. If we become aware that personal data
                belonging to a child has been collected, we will take immediate
                steps to delete such data and restrict the associated account.
                Users must ensure they meet the minimum legal age requirement
                before accessing or using the platform.
              </p>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5">Data Retention Policy</h1>
              <p>
                We retain personal data only for as long as necessary to fulfill
                the purposes described, including:
              </p>

              <ul className="list-item ml-10 my-2">
                <li className="list-disc">
                  Legal, tax, and regulatory requirements
                </li>
                <li className="list-disc">AML/CFT obligations</li>
                <li className="list-disc">Dispute handling</li>
              </ul>

              <p>
                Blockchain transaction data is retained indefinitely as required
                by blockchain architecture. Retention schedules are documented
                in accordance with the GDPR and NDPA statutory requirements.
              </p>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5">Data Security</h1>
              <p>
                BlackSpectre implements industry-standard technical and
                organizational security measures, including:{" "}
              </p>

              <ul className="list-item ml-10 my-2">
                <li className="list-disc">End-to-end encryption</li>
                <li className="list-disc">Multi-layered access control</li>
                <li className="list-disc">Regular penetration testing</li>
                <li className="list-disc">Encrypted backups</li>
                <li className="list-disc">Zero-trust cloud principles</li>
                <li className="list-disc">
                  Incident response and disaster recovery plans
                </li>
              </ul>

              <p>
                We also maintain a GDPR-compliant Data Breach Response Plan,
                including:{" "}
              </p>

              <ul className="list-item ml-10 my-2">
                <li className="list-disc">
                  Notification within 72 hours (GDPR)
                </li>
                <li className="list-disc">
                  Notification to NDPC within required timelines (NDPA)
                </li>
              </ul>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5">Your Rights</h1>
              <p>
                Depending on your jurisdiction, you may exercise the following
                rights:{" "}
              </p>

              <ul className="list-item ml-10 my-2">
                <li className="list-disc">Right to access your data</li>
                <li className="list-disc">Right to rectification</li>
                <li className="list-disc">
                  Right to deletion (“Right to be Forgotten”)
                </li>
                <li className="list-disc">Right to restrict processing</li>
                <li className="list-disc">Right to data portability</li>
                <li className="list-disc">Right to object to processing</li>
                <li className="list-disc">
                  Right to withdraw consent at any time
                </li>
                <li className="list-disc">
                  Right not to be subject to automated decision-making
                </li>
                <li className="list-disc">
                  Right to lodge a complaint with a supervisory authority.
                </li>
                <li className="list-disc">
                  Right to data portability in Nigeria.
                </li>
                <li className="list-disc">
                  Right to data processing limitation.
                </li>
                <li className="list-disc">
                  Right to data confidentiality and non-discrimination
                </li>
              </ul>

              <p>Requests must be submitted via email to ______ </p>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5">
                Cookies and Tracking Technologies{" "}
              </h1>
              <p>U4C uses cookies for: </p>

              <ul className="list-item ml-10 my-2">
                <li className="list-disc">Authentication</li>
                <li className="list-disc">Session management</li>
                <li className="list-disc">Analytics</li>
                <li className="list-disc">User experience personalization</li>
              </ul>

              <p>
                A Cookie Consent Banner is displayed as required under the
                privacy rules and users may adjust cookie preferences at any
                time.
              </p>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5">Your Rights</h1>
              <p>
                Depending on your jurisdiction, you may exercise the following
                rights:{" "}
              </p>

              <ul className="list-item ml-10 my-2">
                <li className="list-disc">Right to access your data</li>
                <li className="list-disc">Right to rectification</li>
                <li className="list-disc">
                  Right to deletion (“Right to be Forgotten”)
                </li>
                <li className="list-disc">Right to restrict processing</li>
                <li className="list-disc">Right to data portability</li>
                <li className="list-disc">Right to object to processing</li>
                <li className="list-disc">
                  Right to withdraw consent at any time
                </li>
                <li className="list-disc">
                  Right not to be subject to automated decision-making
                </li>
                <li className="list-disc">
                  Right to lodge a complaint with a supervisory authority.
                </li>
                <li className="list-disc">
                  Right to data portability in Nigeria.
                </li>
                <li className="list-disc">
                  Right to data processing limitation.
                </li>
                <li className="list-disc">
                  Right to data confidentiality and non-discrimination
                </li>
              </ul>

              <p>Requests must be submitted via email to ______ </p>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5">
                Automated Decision-Making and Profiling
              </h1>
              <p>
                U4C does not perform automated decision-making that produces
                legal or similarly significant effects, in accordance with GDPR
                Art. 22. Any AML/KYC automated checks are subject to human
                review.{" "}
              </p>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5">
                Data Processor Agreements & Record Keeping{" "}
              </h1>
              <p>We maintain: </p>

              <ul className="list-item ml-10 my-2">
                <li className="list-disc">
                  A{" "}
                  <span className="font-semibold">
                    Record of Processing Activities (ROPA)
                  </span>{" "}
                  (GDPR Art. 30 / NDPA requirement)
                </li>
                <li className="list-disc">
                  Data Processing Agreements (DPAs) with all third-party
                  processors
                </li>
                <li className="list-disc">
                  Vendor due-diligence checks and annual reviews
                </li>
              </ul>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5">Updates to this Policy</h1>
              <p>
                We may update this Privacy Policy periodically and all material
                changes will be communicated via email notifications, Platform
                announcements or Policy update banners.
              </p>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5">Contact Information</h1>
              <p>
                For privacy inquiries, rights requests, complaints, or DPO
                contact:
              </p>

              <h1 className="font-bold text-lg mt-5">
                BlackSpectre Technology Limited
              </h1>
              <h1 className="text-[0.9rem] mt-2">
                <span className="font-semibold">Email:</span>{" "}
              </h1>
              <h1 className="text-[0.9rem]">
                <span className="font-semibold">DPO Contact:</span>{" "}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
