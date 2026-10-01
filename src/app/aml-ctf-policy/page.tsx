export default function AmlCtfPolicyPage() {
  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "purpose", title: "Purpose" },
    { id: "scope", title: "Scope" },
    { id: "governance", title: "AML/CTF Governance" },
    { id: "risk", title: "Risk Assessment Framework" },
    { id: "cdd", title: "Customer Due Diligence" },
    { id: "edd", title: "Enhanced Due Diligence" },
    { id: "monitoring", title: "Ongoing Monitoring" },
    { id: "sanctions", title: "Sanctions Compliance" },
    { id: "str", title: "Suspicious Transaction Reporting" },
    { id: "records", title: "Record Keeping" },
    { id: "training", title: "AML/CTF Training" },
    { id: "audit", title: "Independent Audit" },
    { id: "data-privacy", title: "Data Privacy & Security" },
    { id: "policy-review", title: "Policy Review" },
    { id: "enforcement", title: "Enforcement & Penalties" },
  ];

  const Disc = ({
    styles = "relative top-[50%] translate-y-[-50%]",
  }: {
    styles?: string;
  }) => (
    <span className={`bg-primary w-1.5 h-1.5 rounded-full ${styles}`}></span>
  );

  const Line = ({}: {}) => (
    <span className="w-4 md:w-8 h-1 bg-black rounded-full hidden sm:block"></span>
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="px-5">
        <div className="gradient-cto-two text-white rounded-b-4xl p-7 sm:p-10 lg:p-20">
          <div className="lg:w-[75%]">
            <h1 className="text-3xl sm:text-4xl font-bold relative z-10">
              United4Change (U4C) – Anti-Money Laundering (AML) &
              Counter-Terrorist Financing (CTF) Policy
            </h1>
            <p className="relative z-10 mt-5">
              Issued by BlackSpectre Technology Limited • Effective Date:
              November 2025. This Policy establishes U4C's framework for
              preventing, detecting, and reporting money laundering, terrorism
              financing, sanctions evasion, and other financial crimes.
            </p>
          </div>
        </div>
      </div>

      <div className="sm:w-[90%] xl:w-[80%] mx-auto flex flex-col lg:flex-row gap-10 px-5 sm:px-0 mt-10">
        {/* --- LEFT: STICKY NAVIGATION --- */}
        <aside className="hidden lg:block w-64 h-fit sticky top-10">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
            Contents
          </h2>
          <nav className="flex flex-col gap-2 border-l border-gray-200">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="pl-4 py-1 text-gray-600 hover:text-black hover:border-l-2 hover:border-black transition-all text-sm"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* --- RIGHT: THE CONTENT --- */}
        <main className="flex-1 bg-white border border-gray-100 rounded-md p-8 sm:p-12">
          <header className="mb-12 border-b border-gray-100 pb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              AML/CTF Policy
            </h1>
            <p className="text-gray-500 mt-2">
              Effective: November 2025 • BlackSpectre Technology Limited
            </p>
          </header>

          {/* Section: Introduction */}
          <section id="introduction" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Introduction
            </h2>
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-xl p-6 border border-slate-100">
              <p>
                United4Change (U4C) is a social-impact donation platform that
                enables global donors to support verified NGOs through a
                transparent, blockchain-powered system. Powered by USDC
                stablecoin, U4C is non-custodial — donations move directly from
                donor → smart contract → NGO upon milestone verification.
              </p>
              <p>
                This AML/CTF Policy establishes U4C's framework for preventing,
                detecting, and reporting money laundering, terrorism financing,
                sanctions evasion, and other financial crimes, and is
                implemented by BlackSpectre Technology Limited as the platform
                operator.
              </p>
              <p>
                This Policy is designed in line with internationally recognized
                anti-money laundering and counter-terrorist financing standards,
                including relevant national regulations, global supervisory
                expectations, and leading industry practices applicable to
                blockchain-based financial environments.
              </p>
              <p>
                Compliance with this Policy is{" "}
                <span className="font-semibold text-slate-900">mandatory</span>{" "}
                for all U4C and BlackSpectre staff, partners, and contractors.
              </p>
            </div>
          </section>

          {/* Section: Purpose */}
          <section id="purpose" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Purpose
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              The purpose of this AML/CTF Policy is to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Ensure U4C does not facilitate money laundering, terrorist financing, fraud, sanctions evasion, or illicit financial flows",
                "Establish processes for identity verification, risk monitoring, and enhanced due diligence",
                "Integrate blockchain-specific AML controls, including on-chain analytics",
                "Define roles and responsibilities for AML governance",
                "Provide procedures for reporting suspicious transactions",
                "Protect the integrity and reputation of U4C",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 bg-slate-50 py-3 px-5 rounded-xl border border-slate-100"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5"></div>
                  <span className="text-sm text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Scope */}
          <section id="scope" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Scope
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              This Policy applies to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "All donors using the U4C platform",
                "All NGOs onboarded onto U4C",
                "All third-party service providers (fiat-to-USDC partners, API partners, wallet providers)",
                "All smart contract transactions routed on U4C",
                "All U4C Treasury operations (tips and grants only)",
                "All BlackSpectre employees, contractors, and agents",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 bg-slate-50 py-3 px-5 rounded-xl border border-slate-100"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                  <span className="text-sm font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Governance */}
          <section id="governance" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              AML/CTF Governance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "AML/CTF Compliance Officer (CCO)",
                  desc: "BlackSpectre shall appoint a senior-level AML/CTF Compliance Officer responsible for overseeing all AML/CTF activities, approving KYC and KYB processes, reviewing flagged donations, filing Suspicious Transaction Reports, maintaining sanctions lists, and coordinating AML/CTF training.",
                  icon: "👤",
                },
                {
                  title: "AML Steering Committee",
                  desc: "A cross-functional body responsible for overseeing AML risk management, approving high-risk onboarding decisions, reviewing audit findings, and endorsing updates to this Policy and related compliance frameworks.",
                  icon: "🏛️",
                },
                {
                  title: "Staff Responsibilities",
                  desc: "All personnel involved in KYC, monitoring, verification, treasury operations, or platform oversight are required to understand AML/CTF red flags, promptly escalate suspicious behaviour, maintain confidentiality, and complete mandatory annual training.",
                  icon: "👥",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-5 border border-slate-100 rounded-xl bg-slate-50/50"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{item.icon}</span>
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Risk Assessment */}
          <section id="risk" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Risk Assessment Framework
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              U4C uses a risk-based approach consistent with Financial Action
              Task Force (FATF) standards.
            </p>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-blue-50 bg-blue-50/30">
                <div className="md:w-1/3">
                  <h3 className="font-bold text-blue-900">Risk Categories</h3>
                  <p className="text-xs text-blue-700/70 mt-1">
                    Types of risk U4C monitors.
                  </p>
                </div>
                <div className="md:w-2/3 flex items-center flex-wrap gap-2">
                  {[
                    "Geographical Risk",
                    "Transaction Risk",
                    "Platform Risk",
                    "Delivery Channel Risk",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white border border-blue-100 text-blue-600 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    level: "Low Risk",
                    color: "bg-green-50 border-green-100 text-green-700",
                  },
                  {
                    level: "Medium Risk",
                    color: "bg-amber-50 border-amber-100 text-amber-700",
                  },
                  {
                    level: "High Risk",
                    color: "bg-red-50 border-red-100 text-red-700",
                  },
                ].map((item) => (
                  <div
                    key={item.level}
                    className={`p-4 rounded-xl border text-sm font-semibold text-center ${item.color}`}
                  >
                    {item.level}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 italic">
                Risk scores are updated dynamically using blockchain analytics.
              </p>
            </div>
          </section>

          {/* Section: CDD */}
          <section id="cdd" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Customer Due Diligence (CDD)
            </h2>
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  NGOs (High-Risk Category by Default)
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  NGOs must undergo full KYB onboarding:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  {[
                    "Registration documents (CAC/INC/NGO certificate)",
                    "Governance documents",
                    "Valid ID of trustees/directors",
                    "Verification of beneficial owners",
                    "Proof of physical address",
                    "Bank account verification",
                    "Screening against OFAC, UN, EU/UK sanctions, PEP lists, Adverse media",
                  ].map((item) => (
                    <li
                      key={item}
                      className="text-sm text-slate-600 flex items-start gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    tier: "Tier 1",
                    label: "Low-Risk Donors",
                    desc: "Small donations below defined threshold.",
                    items: [
                      "KYC not required",
                      "Wallet screening still applied",
                    ],
                    color: "border-green-100 bg-green-50/50",
                    badge: "bg-green-100 text-green-700",
                  },
                  {
                    tier: "Tier 2",
                    label: "Medium-Risk Donors",
                    desc: "Transactions above threshold or unusual patterns.",
                    items: [
                      "Name",
                      "Email",
                      "ID verification (where required)",
                    ],
                    color: "border-amber-100 bg-amber-50/50",
                    badge: "bg-amber-100 text-amber-700",
                  },
                  {
                    tier: "Tier 3",
                    label: "High-Risk Donors",
                    desc: "Flagged or high-risk activity detected.",
                    items: [
                      "Full KYC",
                      "EDD including source-of-funds",
                      "Sanctions and adverse media screening",
                    ],
                    color: "border-red-100 bg-red-50/50",
                    badge: "bg-red-100 text-red-700",
                  },
                ].map((tier) => (
                  <div
                    key={tier.tier}
                    className={`p-5 border rounded-xl ${tier.color}`}
                  >
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${tier.badge}`}
                    >
                      {tier.tier}
                    </span>
                    <h3 className="font-bold text-slate-900 mt-2 mb-1 text-sm">
                      {tier.label}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3">{tier.desc}</p>
                    <ul className="space-y-1">
                      {tier.items.map((item) => (
                        <li
                          key={item}
                          className="text-xs text-slate-600 flex items-center gap-2"
                        >
                          <div className="w-1 h-1 rounded-full bg-slate-400 shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Partners (Licensed Third-Party Providers)
                </h3>
                <p className="text-sm text-slate-600 mb-3">Must provide:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  {[
                    "AML/CTF policy",
                    "Regulatory licenses",
                    "Proof of compliance audits",
                    "Beneficial ownership information",
                    "Transaction monitoring capabilities",
                  ].map((item) => (
                    <li
                      key={item}
                      className="text-sm text-slate-600 flex items-start gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section: EDD */}
          <section id="edd" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Enhanced Due Diligence (EDD)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border border-gray-200 rounded-2xl bg-white">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="p-1.5 bg-amber-100 text-amber-600 rounded-md">
                    ⚠️
                  </span>
                  EDD is required when:
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {[
                    "NGO is in or operates from a high-risk jurisdiction",
                    "Donations exceed threshold amounts",
                    "Funds originate from high-risk wallets",
                    "Donor is a PEP (Politically Exposed Person)",
                    "On-chain analytics show red flags (e.g., mixing, darknet links)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 border border-gray-200 rounded-2xl bg-white">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="p-1.5 bg-blue-100 text-blue-600 rounded-md">
                    🔍
                  </span>
                  EDD may include:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Source of Funds/Wealth",
                    "Manual AML Review",
                    "Additional Identity Docs",
                    "Board/AML Committee Approval",
                    "Background Checks",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section: Ongoing Monitoring */}
          <section id="monitoring" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Ongoing Monitoring
            </h2>
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Blockchain Analytics
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  U4C will utilise enterprise tools to monitor:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  {[
                    "Wallet risk scores",
                    "Sanctions-listed wallets",
                    "Use of mixers/tumblers",
                    "Cross-chain anonymization",
                    "Rapid or unusual movement of funds",
                    "Suspicious NGO activity",
                  ].map((item) => (
                    <li
                      key={item}
                      className="text-sm text-slate-600 flex items-start gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-gray-200 rounded-2xl bg-white">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="p-1.5 bg-blue-100 text-blue-600 rounded-md">
                      🔄
                    </span>
                    Real-Time Screening
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    All donations and NGO withdrawals are screened at:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Onboarding",
                      "Each Transaction",
                      "Milestone Approval",
                      "Withdrawal Request",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-wider font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6 border border-gray-200 rounded-2xl bg-white">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="p-1.5 bg-purple-100 text-purple-600 rounded-md">
                      🤖
                    </span>
                    Behavioural Monitoring
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    AI and rule-based systems detect:
                  </p>
                  <ul className="space-y-1 text-sm text-slate-600">
                    {[
                      "Donation structuring/smurfing",
                      "Frequent high-value donations",
                      "NGO withdrawals inconsistent with milestones",
                      "Unusual refund requests",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Sanctions */}
          <section id="sanctions" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Sanctions Compliance
            </h2>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-red-50 bg-red-50/30">
                <div className="md:w-1/3">
                  <h3 className="font-bold text-red-900">
                    Strictly Prohibited
                  </h3>
                  <p className="text-xs text-red-700/70 mt-1">
                    U4C strictly prohibits any interaction with:
                  </p>
                </div>
                <div className="md:w-2/3 flex items-center flex-wrap gap-2">
                  {[
                    "OFAC-Sanctioned Jurisdictions",
                    "UN-Sanctioned Entities",
                    "FATF High-Risk Countries",
                    "Terrorism-Financing Wallets",
                    "Blacklisted Stablecoin Addresses",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white border border-red-100 text-red-600 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm">
                <h3 className="font-bold text-slate-900 mb-3">
                  Automatically Blocked
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {[
                    "Donations from sanctioned or high-risk wallets",
                    "NGOs registered in prohibited countries",
                    "Partners without verified licensing",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section: STR */}
          <section id="str" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Suspicious Transaction Reporting (STR/SAR)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border border-gray-200 rounded-2xl bg-white">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="p-1.5 bg-blue-100 text-blue-600 rounded-md">
                    📋
                  </span>
                  Internal Reporting
                </h3>
                <p className="text-sm text-slate-600">
                  Staff must immediately escalate suspicious activity to the
                  AML/CTF Officer.
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-2xl bg-white">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="p-1.5 bg-green-100 text-green-600 rounded-md">
                    📤
                  </span>
                  External Reporting
                </h3>
                <p className="text-sm text-slate-600">
                  The CCO files STRs/SARs to the Nigeria Financial Intelligence
                  Unit, relevant FinCEN-partner channels, and other applicable
                  regulators. Reports must be submitted within statutory
                  timelines without tipping off the user involved.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Records */}
          <section id="records" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Record Keeping
            </h2>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <p className="text-sm text-slate-600 mb-4">
                Records must be retained for a period of five to seven years and
                should include:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "KYC & KYB Documentation",
                  "Transaction Logs",
                  "Wallet Screening Results",
                  "Blockchain Analytics Reports",
                  "Suspicious Activity Reviews",
                  "STR/SAR Filings",
                  "Training Records",
                  "Audit Trails",
                ].map((item) => (
                  <div
                    key={item}
                    className="text-[11px] font-mono text-slate-500 uppercase bg-white px-5 py-3 rounded-xl border border-slate-100"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <p className="text-xs text-amber-800">
                  All stored information must comply with NDPA, GDPR, and other
                  applicable international data privacy standards.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Training */}
          <section id="training" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              AML/CTF Training
            </h2>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <p className="text-sm text-slate-600 mb-4">
                Mandatory annual training shall be provided to all relevant
                staff, covering:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "AML/CTF legal requirements",
                  "Blockchain-related money laundering typologies",
                  "Sanctions screening procedures",
                  "Red flags associated with NGO misuse",
                  "Use of analytics and monitoring tools",
                  "All applicable reporting obligations",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 bg-white py-3 px-5 rounded-xl border border-slate-100"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                    <span className="text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section: Audit */}
          <section id="audit" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Independent Audit
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Annual Independent AML Audit",
                "Annual Smart Contract Audit",
                "Periodic Regulatory Audits",
                "Ongoing Technical Reviews",
              ].map((item) => (
                <div
                  key={item}
                  className="text-[11px] font-mono text-slate-500 uppercase bg-slate-50 px-5 py-3 rounded-xl border border-slate-100"
                >
                  {item}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4 italic">
              All resulting reports shall be reviewed by the AML Committee and
              the Board of BlackSpectre.
            </p>
          </section>

          {/* Section: Data Privacy */}
          <section id="data-privacy" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Data Privacy, Security & Confidentiality
            </h2>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 text-sm text-slate-600 leading-relaxed space-y-3">
              <p>
                All AML/CTF data shall be securely managed and always protected.
                Access to such data must be strictly controlled and limited to
                authorized personnel with a legitimate need to know.
              </p>
              <p>
                All information must be encrypted and handled in full compliance
                with the Nigeria Data Protection Act (NDPA), the General Data
                Protection Regulation (GDPR), and other applicable international
                data protection and security standards.
              </p>
            </div>
          </section>

          {/* Section: Policy Review */}
          <section id="policy-review" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Policy Review
            </h2>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 text-sm text-slate-600 leading-relaxed">
              <p>
                This Policy shall be reviewed annually, and additionally
                whenever there are major regulatory changes or significant
                compliance-related incidents. Any amendments or updates to the
                Policy must be approved by the AML Committee before they take
                effect.
              </p>
            </div>
          </section>

          {/* Section: Enforcement */}
          <section id="enforcement" className="mb-16 scroll-mt-10">
            <div className="bg-gray-900 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">
                Enforcement & Penalties
              </h2>
              <p className="text-slate-400 text-sm mb-8">
                Any violation of this Policy may result in:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Disciplinary Action",
                    desc: "Internal sanctions for policy breaches",
                  },
                  { title: "Suspension", desc: "Suspension of access rights" },
                  {
                    title: "Termination",
                    desc: "Termination of employment or contract",
                  },
                  {
                    title: "Regulatory Reporting",
                    desc: "Reporting to relevant regulatory authorities",
                  },
                  {
                    title: "Civil Liability",
                    desc: "Potential civil legal proceedings",
                  },
                  {
                    title: "Criminal Liability",
                    desc: "Potential criminal prosecution",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="border-b border-slate-700 pb-4"
                  >
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <footer className="mt-20 pt-10 border-t border-gray-100">
            <div className="bg-gray-950 text-white rounded-2xl p-8">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <p className="text-gray-400 text-sm mb-6">
                For AML/CTF inquiries or compliance questions:
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-500">Entity:</span> BlackSpectre
                  Technology Limited
                </p>
                <p>
                  <span className="text-gray-500">Email:</span>{" "}
                  compliance@u4c.com
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
