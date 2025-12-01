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
              United4Change (U4C) – Terms Of Use
            </h1>
            <p className="relative z-10 mt-5">
              Effective Date: 25th November 2025
            </p>
            <p className="relative z-10 mt-1">
              These Terms of Use (“Terms”) govern your access to and use of the
              U4C platform, services, and related applications (“U4C”, “we”,
              “our”, “the Platform”). By accessing or using U4C, you agree to
              these Terms.
            </p>
            <p className="relative z-10 mt-1">
              If you do not agree, do not use the Platform.
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
                Eligibility & Age Restriction
              </h1>
              <p>
                You must be at least 18 years old to use U4C. U4C is not
                designed for or directed at children as defined under the laws
                of Nigeria (NDPA), the European Union (GDPR), the United States
                (COPPA), and any other relevant jurisdiction. We do not
                knowingly collect or process personal data of children. If we
                discover that a child has used the Platform, the account will be
                immediately terminated and data erased.
              </p>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5">Account Registration</h1>
              <p>
                To use U4C platform, you may be required to create an account.
                By creating an account, you agree:
              </p>
              <ul className="list-item ml-10 my-2">
                <li className="list-disc">
                  Provide accurate and complete information
                </li>
                <li className="list-disc">
                  Maintain the security of your login details
                </li>
                <li className="list-disc">
                  Notify us of any unauthorized use of your account
                </li>
              </ul>
              <p>
                U4C is not responsible for losses arising from unauthorized
                access due to your negligence.
              </p>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5">Acceptable Use</h1>
              <p>By using U4C platform, you agree not to:</p>
              <ul className="list-item ml-10 my-2">
                <li className="list-disc">
                  Use the Platform for unlawful purposes
                </li>
                <li className="list-disc">
                  Upload harmful, malicious, or fraudulent content
                </li>
                <li className="list-disc">
                  Infringe intellectual property rights
                </li>
                <li className="list-disc">
                  Attempt unauthorized access to systems
                </li>
                <li className="list-disc">
                  Use automated tools (bots, scrapers) without consent
                </li>
                <li className="list-disc">Misrepresent your identity</li>
              </ul>
              <p>Violation may lead to suspension or permanent termination.</p>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5">User Content</h1>
              <p>Users may post or upload content to the Platform.</p>
              <p>
                You retain ownership of your content but grant U4C a limited
                license to:
              </p>
              <ul className="list-item ml-10 my-2">
                <li className="list-disc">
                  Store, process, display, and transmit your content as needed
                  to operate the platform.
                </li>
              </ul>
              <p>You are solely responsible for your content.</p>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg">Intellectual Property</h1>
              <p>
                All trademarks, logos, code, UI/UX design, and materials on U4C
                are the exclusive property of U4C or its licensors.
              </p>
              <p className="mt-2">
                You may not copy, modify, reverse-engineer, or distribute any
                part of U4C without explicit written consent.
              </p>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5">
                Privacy & Data Protection
              </h1>
              <p>Your use of U4C platform is governed by our:</p>
              <ul className="list-item ml-10 my-2">
                <li className="list-disc">Privacy Policy</li>
                <li className="list-disc">Cookie Policy</li>
                <li className="list-disc">Data Retention Schedule</li>
              </ul>
              <p>These documents explain:</p>
              <ul className="list-item ml-10 my-2">
                <li className="list-disc">What data we collect</li>
                <li className="list-disc">How it is used</li>
                <li className="list-disc">
                  Your rights under NDPA, GDPR, and other laws.
                </li>
              </ul>
              <p>
                By using U4C, you consent to processing as described in our
                privacy notices.
              </p>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5">
                Payment (If Applicable)
              </h1>
              <p>Where paid services are offered:</p>
              <ul className="list-item ml-10 my-2">
                <li className="list-disc">Fees will be clearly stated</li>
                <li className="list-disc">
                  Payments are non-refundable except as required by law.
                </li>
                <li className="list-disc">
                  U4C may modify pricing with reasonable notice.
                </li>
              </ul>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5">
                Suspension and Termination
              </h1>
              <p>We may suspend or terminate your access if:</p>
              <ul className="list-item ml-10 my-2">
                <li className="list-disc">You violate these Terms of Use</li>
                <li className="list-disc">
                  You engage in harmful or unlawful activity
                </li>
                <li className="list-disc">We are required by law to do so</li>
                <li className="list-disc">
                  You provide misleading account information
                </li>
              </ul>
              <p>You may also terminate your account at any time.</p>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5">Disclaimers</h1>
              <p>
                U4C is provided <span className="font-semibold">“as is”</span>{" "}
                without warranties of any kind. We do not guarantee:
              </p>
              <ul className="list-item ml-10 my-2">
                <li className="list-disc">Uninterrupted service</li>
                <li className="list-disc">Error-free performance</li>
                <li className="list-disc">
                  Accuracy of user-generated content
                </li>
              </ul>
              <p>
                To the fullest extent permitted by law, U4C disclaims liability
                for indirect or consequential damages.
              </p>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5">Indemnity</h1>
              <p>
                You agree to indemnify and hold U4C harmless from claims arising
                from:
              </p>
              <ul className="list-item ml-10 my-2">
                <li className="list-disc">Your misuse of the platform</li>
                <li className="list-disc">Your breach of these Terms</li>
                <li className="list-disc">
                  Your content posted on the platform
                </li>
              </ul>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5">
                Governing Law & Dispute Resolution
              </h1>
              <p>These Terms are governed by the laws of:</p>
              <ul className="list-item ml-10 my-2">
                <li className="list-disc">
                  The Federal Republic of Nigeria, if you access the platform
                  from Africa
                </li>
                <li className="list-disc">
                  Or the relevant jurisdiction where U4C legally operates.
                </li>
              </ul>
              <p>
                Disputes will be resolved through negotiation, then mediation,
                and finally competent courts if necessary.
              </p>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5">Updates to Terms</h1>
              <p>
                We may update these Terms from time to time.If we make material
                changes, we will notify users via email or platform notice.
                Continued use after updates means acceptance of the revised
                Terms.
              </p>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5">Contact</h1>
              <h1 className="font-bold text-lg mt-5">For questions:</h1>
              <h1 className="text-[0.9rem] mt-2">
                <span className="font-semibold">Email:</span>{" "}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
