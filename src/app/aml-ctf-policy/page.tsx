"use client";

import React, { useState } from "react";

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
              UNITED4CHANGE (U4C) – ANTI-MONEYLAUNDERING(AML)&COUNTER-TERRORIST
              FINANCING (CTF) POLICY
            </h1>
            <div className="mt-5">
              <h1 className="text-[0.9rem] mt-2">
                <span className="font-semibold">Issued by:</span> BlackSpectre
                Technology Limited
              </h1>
              <h1 className="text-[0.9rem] mt-2">
                <span className="font-semibold">Effective Date: </span> November
                2025
              </h1>
            </div>
          </div>
        </div>

        <div className="relative z-10 p-3 sm:p-5">
          <div
            id="gradient-border"
            className="bg-[#fcfcfc] rounded-[1rem] p-4 sm:p-7"
          >
            <div className="">
              <h1 className="font-bold text-xl">INTRODUCTION</h1>
              <p>
                United4Change (U4C) is a social-impact donation platform that
                enables global donors to support verified NGOs through a
                transparent, blockchain-powered system. Powered by USDC
                stablecoin, U4C is non-custodial donations move directly from
                donor → smart contract → NGO upon milestone verification.
              </p>
              <p className="mt-3">
                This AML/CTF Policy establishes U4C’s framework for preventing,
                detecting, and reporting money laundering, terrorism financing,
                sanctions evasion, and other financial crimes, and is
                implemented by BlackSpectre Technology Limited as the platform
                operator.
              </p>
              <p className="mt-3">
                This Policy is designed in line with internationally recognized
                anti–money laundering and counter-terrorist financing standards,
                including relevant national regulations, global supervisory
                expectations, and leading industry practices applicable to
                blockchain-based financial environments.
              </p>
              <p className="mt-3">
                Compliance with this Policy is{" "}
                <span className="font-semibold">mandatory</span> for all U4C and
                BlackSpectre staff, partners, and contractors.
              </p>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5">PURPOSE</h1>
              <p>The purpose of this AML/CTF Policy is to:</p>

              <ul className="list-item ml-10 my-2">
                <li className="list-disc">
                  Ensure U4C does not facilitate money laundering, terrorist
                  financing, fraud, sanctions evasion, or illicit financial
                  flows.
                </li>
                <li className="list-disc">
                  Establish processes for identity verification, risk
                  monitoring, and enhanced due diligence.
                </li>
                <li className="list-disc">
                  Integrate blockchain-specific AML controls, including on-chain
                  analytics.
                </li>
                <li className="list-disc">
                  Define roles and responsibilities for AML governance.{" "}
                </li>
                <li className="list-disc">
                  Provide procedures for reporting suspicious transactions.{" "}
                </li>
                <li className="list-disc">
                  {" "}
                  Protect the integrity and reputation of U4C.{" "}
                </li>
              </ul>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5">SCOPE</h1>
              <p>This Policy applies to:</p>
              <ul className="list-item ml-10 my-2">
                <li className="list-disc">
                  • All donors using the U4C platform
                </li>
                <li className="list-disc">• All NGOs onboarded onto U4C</li>
                <li className="list-disc">
                  • All third-party service providers (fiat-to-USDC partners,
                  API partners, wallet providers)
                </li>
                <li className="list-disc">
                  • All smart contract transactions routed on U4C
                </li>
                <li className="list-disc">
                  • All U4C Treasury operations (tips and grants only)
                </li>
                <li className="list-disc">
                  • All BlackSpectre employees, contractors, and agents
                </li>
              </ul>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5"> AML/CTF GOVERNANCE</h1>
              <h1 className="font-bold text-lg mt-2">
                AML/CTF Compliance Officer (CCO)
              </h1>
              <p>
                BlackSpectre shall appoint a senior-level AML/CTF Compliance
                Officer who will be responsible for overseeing all AML/CTF
                activities, approving KYC and KYB processes, reviewing flagged
                donations and NGO activities, filing Suspicious Transaction
                Reports, maintaining sanctions lists and screening tools, and
                coordinating AML/CTF training across the organization.{" "}
              </p>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5">AML Steering Committee</h1>
              <p>
                The AML Steering Committee shall function as a cross-functional
                body responsible for overseeing AML risk management, approving
                high-risk onboarding decisions, reviewing audit findings, and
                endorsing updates to this Policy and related compliance
                frameworks.
              </p>{" "}
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5">Staff Responsibilities</h1>
              <p>
                All personnel involved in KYC, monitoring, verification,
                treasury operations, or platform oversight are required to
                understand AML/CTF red flags, promptly escalate any suspicious
                behaviour, maintain strict confidentiality in handling sensitive
                information, and complete mandatory annual AML/CTF training.
              </p>{" "}
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg">RISK ASSESSMENT FRAMEWORK</h1>
              <p>
                U4C uses a risk-based approach consistent with Financial Action
                Task Force (FATF) standards.
              </p>

              <h1 className="font-bold text-lg mt-5">Risk Categories</h1>
              <ul className="list-item ml-10 my-2">
                <li className="list-disc">
                  • <span className="font-semibold">• Geographical risk: </span>{" "}
                  high-risk jurisdictions, sanctioned countries
                </li>
                <li className="list-disc">
                  • <span className="font-semibold">• Transaction risk:</span>{" "}
                  unusual donation patterns, large transfers, rapid withdrawal
                </li>
                <li className="list-disc">
                  • <span className="font-semibold">• Platform risk:</span>{" "}
                  exposure to mixing services, OFAC-listed wallets
                </li>
                <li className="list-disc">
                  •{" "}
                  <span className="font-semibold">
                    • Delivery channel risk:
                  </span>
                  fiat-to-crypto, crypto-to-NGO routing
                </li>
              </ul>

              <h1 className="font-bold text-lg mt-5">Risk Rating</h1>
              <ul className="list-item ml-10 my-2">
                <li className="list-disc">• Low Risk </li>
                <li className="list-disc">• Medium Risk </li>
                <li className="list-disc">• High Risk (EDD required) </li>
              </ul>

              <p>
                Risk scores are updated dynamically using blockchain analytics.{" "}
              </p>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-lg mt-5">
                CUSTOMER DUE DILIGENCE (CDD)
              </h1>
              <h1 className="font-bold text-lg mt-2">
                NGOs (High-Risk Category by Default)
              </h1>
              <p>NGOs must undergo full KYB onboarding:</p>

              <ul className="list-item ml-10 my-2">
                <li className="list-disc">
                  • Registration documents (CAC/INC/NGO certificate)
                </li>
                <li className="list-disc">• Governance documents</li>
                <li className="list-disc">• Valid ID of trustees/directors</li>
                <li className="list-disc">
                  • Verification of beneficial owners
                </li>
                <li className="list-disc">• Proof of physical address</li>
                <li className="list-disc">• Bank account verification</li>
                <li className="list-disc">
                  • Screening against OFAC, UN sanctions, EU/UK sanctions, PEP
                  lists, Adverse media
                </li>
              </ul>

              <h1 className="font-bold text-lg mt-5">Donors</h1>
              <p>Donor CDD is risk-based:</p>

              <h1 className="font-bold text-lg mt-5">
                Tier 1: Low-risk donors
              </h1>
              <p>Small donations (below defined threshold):</p>

              <ul className="list-item ml-10 my-2">
                <li className="list-disc">• KYC not required</li>
                <li className="list-disc">• Wallet screening still applied</li>
              </ul>

              <h1 className="font-bold text-lg mt-5">
                Tier 2: Medium-risk donors
              </h1>
              <p>Transactions above threshold or unusual patterns:</p>

              <ul className="list-item ml-10 my-2">
                <li className="list-disc">• Name</li>
                <li className="list-disc">• Email</li>
                <li className="list-disc">
                  • ID verification (where required by local regulation)
                </li>
              </ul>

              <h1 className="font-bold text-lg mt-5">
                Tier 3: High-risk or flagged donors
              </h1>

              <ul className="list-item ml-10 my-2">
                <li className="list-disc">• Full KYC</li>
                <li className="list-disc">• EDD including source-of-funds</li>
                <li className="list-disc">
                  • Sanctions and adverse media screening
                </li>
              </ul>

              <h1 className="font-bold text-lg mt-5">
                Partners (Licensed Third-Party Providers)
              </h1>
              <p>Must provide:</p>

              <ul className="list-item ml-10 my-2">
                <li className="list-disc">• AML/CTF policy</li>
                <li className="list-disc">• Regulatory licenses</li>
                <li className="list-disc">• Proof of compliance audits</li>
                <li className="list-disc">
                  • Beneficial ownership information
                </li>
                <li className="list-disc">
                  • Transaction monitoring capabilities
                </li>
              </ul>

              <h1 className="font-bold text-lg mt-5">
                ENHANCED DUE DILIGENCE (EDD)
              </h1>
              <p>EDD is required when:</p>

              <ul className="list-item ml-10 my-2">
                <li className="list-disc">
                  • NGO is in or operates from a high-risk jurisdiction
                </li>
                <li className="list-disc">
                  • Donations exceed threshold amounts
                </li>
                <li className="list-disc">
                  • Funds originate from high-risk wallets
                </li>
                <li className="list-disc">
                  • Donor is a PEP (Politically Exposed Person)
                </li>
                <li className="list-disc">
                  • On-chain analytics show red flags (e.g., mixing, darknet
                  links)
                </li>
              </ul>

              <p className="font-bold text-lg mt-5">EDD may include:</p>

              <ul className="list-item ml-10 my-2">
                <li className="list-disc">• Source of funds/wealth</li>
                <li className="list-disc">• Manual review by AML officer</li>
                <li className="list-disc">• Additional identity documents</li>
                <li className="list-disc">• Board or AML Committee approval</li>
                <li className="list-disc">
                  • Background and reputational checks
                </li>
              </ul>

              <h1 className="font-bold text-lg mt-5">ONGOING MONITORING</h1>
              <h1 className="font-bold text-lg mt-2">Blockchain Analytics</h1>
              <p className="font-bold text-lg mt-5">
                U4C will utilise enterprise tools to monitor:
              </p>

              <ul className="list-item ml-10 my-2">
                <li className="list-disc">• Wallet risk scores</li>
                <li className="list-disc">• Sanctions-listed wallets</li>
                <li className="list-disc">• Use of mixers/tumblers</li>
                <li className="list-disc">• Cross-chain anonymization</li>
                <li className="list-disc">
                  • Rapid or unusual movement of funds
                </li>
                <li className="list-disc">• Suspicious NGO activity</li>
              </ul>

              <h1 className="font-bold text-lg mt-5">Real-Time Screening</h1>
              <p className="text-lg">
                All donations and NGO withdrawals are screened at:
              </p>

              <ul className="list-item ml-10 my-2">
                <li className="list-disc">• Onboarding</li>
                <li className="list-disc">• Each transaction</li>
                <li className="list-disc">• Milestone approval</li>
                <li className="list-disc">• Withdrawal request</li>
              </ul>

              <h1 className="font-bold text-lg mt-5">Behavioural Monitoring</h1>
              <p className="text-lg">AI and rule-based systems detect:</p>

              <ul className="list-item ml-10 my-2">
                <li className="list-disc">• Donation structuring/smurfing</li>
                <li className="list-disc">• Frequent high-value donations</li>
                <li className="list-disc">
                  • NGO withdrawals inconsistent with project milestones
                </li>
                <li className="list-disc">• Unusual refund requests</li>
                <li className="list-disc">• Unusual refund requests</li>
              </ul>

              <h1 className="font-bold text-lg mt-5">SANCTIONS COMPLIANCE</h1>
              <p className="text-lg">
                U4C strictly prohibits any interaction with:
              </p>

              <ul className="list-item ml-10 my-2">
                <li className="list-disc">• OFAC-sanctioned jurisdictions</li>
                <li className="list-disc">
                  • UN-sanctioned individuals/entities
                </li>
                <li className="list-disc">
                  • Countries classified as high-risk by FATF
                </li>
                <li className="list-disc">
                  • Wallets flagged for terrorism financing
                </li>
                <li className="list-disc">
                  • Blacklisted stablecoin addresses
                </li>
              </ul>

              <p className="text-lg mt-5">Automatically blocked:</p>

              <ul className="list-item ml-10 my-2">
                <li className="list-disc">
                  • Donations from sanctioned or high-risk wallets
                </li>
                <li className="list-disc">
                  • NGOs registered in prohibited countries
                </li>
                <li className="list-disc">
                  • Partners without verified licensing
                </li>
              </ul>

              <h1 className="font-bold text-lg mt-5">
                SUSPICIOUS TRANSACTION REPORTING (STR/SAR)
              </h1>
              <h1 className="font-bold text-lg mt-1">Internal Reporting</h1>
              <p className="text-lg">
                Staff must immediately escalate suspicious activity to the
                AML/CTF Officer.
              </p>

              <h1 className="font-bold text-lg mt-5">External Reporting</h1>
              <p className="text-lg mt-2">
                The CCO is responsible for filing Suspicious Transaction Reports
                or Suspicious Activity Reports to the Nigeria Financial
                Intelligence Unit, to relevant FinCEN-partner channels through
                licensed U.S. service providers handling USDC, and to any other
                applicable regulators based on jurisdiction. All reports must be
                submitted within the required statutory timelines and without
                disclosing or tipping off the user involved.{" "}
              </p>

              <h1 className="font-bold text-lg mt-5">RECORD KEEPING</h1>
              <p className="text-lg mt-2">
                Records must be retained for a period of five to seven years and
                should include all KYC and KYB documentation, transaction logs,
                wallet screening results, blockchain analytics reports,
                suspicious activity reviews, STR/SAR filings, training records,
                and audit trails. All stored information must be handled and
                protected in compliance with the NDPA, GDPR, and other
                applicable international data privacy standards.{" "}
              </p>

              <h1 className="font-bold text-lg mt-5">AML/CTF TRAINING</h1>
              <p className="text-lg mt-2">
                Mandatory annual training shall be provided to all relevant
                staff, covering key areas such as AML/CTF legal requirements,
                blockchain-related money laundering typologies, sanctions
                screening procedures, red flags associated with NGO misuse, the
                use of analytics and monitoring tools, and all applicable
                reporting obligations.{" "}
              </p>

              <h1 className="font-bold text-lg mt-5">INDEPENDENT AUDIT</h1>
              <p className="text-lg mt-2">
                U4C’s AML/CTF framework will be subject to an annual independent
                AML audit, an annual smart contract audit, periodic regulatory
                audits, and ongoing technical reviews of monitoring tools. All
                resulting reports shall be reviewed by the AML Committee and the
                Board of BlackSpectre.{" "}
              </p>

              <h1 className="font-bold text-lg mt-5">INDEPENDENT AUDIT</h1>
              <p className="text-lg mt-2">
                U4C’s AML/CTF framework will be subject to an annual independent
                AML audit, an annual smart contract audit, periodic regulatory
                audits, and ongoing technical reviews of monitoring tools. All
                resulting reports shall be reviewed by the AML Committee and the
                Board of BlackSpectre.{" "}
              </p>

              <h1 className="font-bold text-lg mt-5">
                DATA PRIVACY, SECURITY & CONFIDENTIALITY
              </h1>
              <p className="text-lg mt-2">
                All AML/CTF data shall be securely managed and always protected.
                Access to such data must be strictly controlled and limited to
                authorized personnel with a legitimate need to know. All
                information must be encrypted and handled in full compliance
                with the Nigeria Data Protection Act (NDPA), the General Data
                Protection Regulation (GDPR), and other applicable international
                data protection and security standards.{" "}
              </p>

              <h1 className="font-bold text-lg mt-5">POLICY REVIEW</h1>
              <p className="text-lg mt-2">
                This Policy shall be reviewed annually, and additionally
                whenever there are major regulatory changes or significant
                compliance-related incidents. Any amendments or updates to the
                Policy must be approved by the AML Committee before they take
                effect.
              </p>

              <h1 className="font-bold text-lg mt-5">
                ENFORCEMENT & PENALTIES
              </h1>
              <p className="text-lg mt-2">
                Any violation of this Policy may result in disciplinary action,
                suspension of access rights, termination of employment or
                contractual engagement, reporting to the relevant regulatory
                authorities, and potential civil or criminal liability.{" "}
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
