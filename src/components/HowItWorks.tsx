"use client";

import Image from "next/image";
import React from "react";

const how_it_works = [
  {
    heading: "Create Your Verified NGO Profile",
    icon: "/icons/Create Your Project (2).png",
    paragraph:
      "Before launching any campaign, NGOs register and complete verification (KYC, wallet setup, and proof of legitimacy). Once approved by the U4C team, your NGO gains access to the dashboard where you can create, track, and manage fundraising campaigns securely.",
  },
  {
    heading: "Build and Personalize Your Campaign",
    icon: "/icons/PERSONALISE YOUR PROJECT (2).png",
    paragraph:
      "Create a project, define your goal, and set clear milestones each representing a stage of impact. Add photos, videos, and proof documents to build donor confidence. Every campaign is linked to a unique smart contract, ensuring that funds are held safely until goals are verified.",
  },
  {
    heading: "Launch and Share Transparently",
    icon: "/icons/Launch and share.png",
    paragraph:
      "Once approved, your campaign goes live on the U4C platform. Donors from anywhere can contribute using crypto or fiat through our secure payment partners. Every donation instantly appears on the blockchain and in your NGO dashboard no hidden fees, no intermediaries.",
  },
  {
    heading: "Donors Track Progress in Real-Time",
    icon: "/icons/Receive Donations Globally2.png",
    paragraph:
      "Donors can log into their dashboard to see every donation, milestone verification, and media proof shared by the NGO. Each transaction is visible on-chain, maintaining 100% transparency while protecting donor privacy.",
  },
  {
    heading: "Withdraw Funds Securely",
    icon: "/icons/Withdraw Funds Securely 2 (2).png",
    paragraph:
      "When a milestone is verified, funds are released directly from the smart contract vault to the NGO’s linked wallet or approved payout account. U4C never holds user funds everything is non-custodial and transparent by design. U4C Treasury - 100% Transparent. 100% Social. Every donor can also support the U4C Treasury through optional tips or direct contributions. The Treasury funds validator compensation, emergency response, outreach, research, and DAO experiments all governed collectively by the community.",
  },
];

function HowItWorks() {
  const count = { value: 0 };

  return (
    <div className="mt-20 text-center">
      <div className="w-full flex flex-col items-center gap-10 md:gap-20 mt-20  px-5 sm:px-20">
        {how_it_works.map((step, index) => {
          if (count.value === 1) count.value = 0;
          else if (count.value === 0) count.value = 1;

          return (
            <div
              key={index}
              className={`relative bg-linear-to-br from-[#eb2027]/10 to-[#812880]/5 rounded-xl`}
            >
              <div className="relative z-1 flex flex-col lg:flex-row justify-center items-center gap-10 p-5 sm:p-14">
                <Image
                  src={step.icon}
                  alt=""
                  width={400}
                  height={400}
                  className="w-68 lg:w-92 rounded-2xl"
                />

                <div className="md:w-[90%] lg:w-160 text-center lg:text-left">
                  {/* <div className="flex justify-center lg:justify-start mb-3">
                    <div
                      id="gradient-border"
                      className={`bg-red-100 rounded-md font-semibold text-[1.5rem] lg:text-[2.5rem] px-5`}
                    >
                      0.{index + 1}
                    </div>
                  </div> */}

                  <h1 className="text-2xl sm:text-3xl md:text-4xl leading-8 lg:leading-[2.9rem] font-semibold mb-3">
                    {step.heading}
                  </h1>
                  <p>{step.paragraph}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HowItWorks;
