export default function TreasuryPolicyPage() {
  const sections = [
    { id: "purpose", title: "Purpose" },
    { id: "principles", title: "Guiding Principles" },
    { id: "governance", title: "Treasury Governance & Security" },
    { id: "approved-use", title: "Approved Use of Funds" },
    { id: "restrictions", title: "Restrictions" },
    { id: "conflict", title: "Conflict of Interest" },
    { id: "audit", title: "Audit and Oversight" },
    { id: "review", title: "Review & Amendment" },
    { id: "compliance", title: "Compliance with Laws" },
    { id: "enforcement", title: "Enforcement" },
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
              Impact-Bridge Grassroot Empowerment Foundation Treasury Policy
            </h1>
            <p className="relative z-10 mt-5">
              The Impact-Bridge Grassroot Empowerment Foundation Treasury exists
              solely to advance social impact through transparent, accountable,
              and technology-enabled charitable initiatives. Treasury funds are
              not used for platform profit or personal gain. The Treasury
              operates in compliance with all applicable laws, regulations, and
              reporting requirements.
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
              Treasury Policy
            </h1>
            <p className="text-gray-500 mt-2">
              Impact-Bridge Grassroot Empowerment Foundation
            </p>
          </header>

          {/* Section: Purpose */}
          <section id="purpose" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Purpose
            </h2>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 text-sm text-slate-600 leading-relaxed">
              <p>
                The Impact-Bridge Grassroot Empowerment Foundation Treasury
                exists solely to advance social impact through transparent,
                accountable, and technology-enabled charitable initiatives.
                Treasury funds are not used for platform profit or personal
                gain. The Treasury operates in compliance with all applicable
                laws, regulations, and reporting requirements, while ensuring
                that allocations maximize humanitarian, development, and
                ecosystem-building outcomes.
              </p>
            </div>
          </section>

          {/* Section: Guiding Principles */}
          <section id="principles" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Guiding Principles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Social Impact First",
                  desc: "All treasury allocations must directly support verified humanitarian, development, or ecosystem-building outcomes.",
                  icon: "🌍",
                },
                {
                  title: "Transparency",
                  desc: "All treasury transactions are recorded on-chain, auditable, and publicly verifiable.",
                  icon: "🔍",
                },
                {
                  title: "Integrity",
                  desc: "Funds are released only for approved purposes and, where applicable, upon verified milestones.",
                  icon: "✅",
                },
                {
                  title: "Shared Control",
                  desc: "No single individual can unilaterally control or move treasury funds.",
                  icon: "🤝",
                },
                {
                  title: "Risk Management",
                  desc: "Treasury operations shall minimize financial, operational, and cybersecurity risks through controlled procedures and multi-layered safeguards.",
                  icon: "🛡️",
                },
                {
                  title: "Accountability",
                  desc: "All Treasury activities are subject to oversight by the Board of Trustees, Compliance Committee, and independent auditors.",
                  icon: "⚖️",
                },
              ].map((principle) => (
                <div
                  key={principle.title}
                  className="p-5 border border-slate-100 rounded-xl bg-slate-50/50"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{principle.icon}</span>
                    <h3 className="font-bold text-slate-900">
                      {principle.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {principle.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Governance */}
          <section id="governance" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Treasury Governance & Security
            </h2>
            <div className="space-y-4">
              {[
                "All Treasury funds are held in a multi-signature (multi-sig) wallet, requiring the approval of at least 3 authorized signatories before disbursement.",
                "Signatories may include Foundation trustees, compliance representatives, or other custodians appointed by the Board.",
                "In the event an authorized signatory is unavailable, alternate signatories may be temporarily appointed in accordance with the Foundation's governance framework.",
                "All approvals, disbursements, and transactions are recorded on-chain and maintained in auditable logs to ensure full transparency and accountability.",
                "The Treasury shall not engage in speculative investments or high-risk financial instruments without explicit Board approval.",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-slate-50 py-3 px-5 rounded-xl border border-slate-100"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5"></div>
                  <span className="text-sm text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Approved Use */}
          <section id="approved-use" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Approved Use of Treasury Funds
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              Treasury funds may be allocated only for the following purposes:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Validator Compensation",
                  desc: "Paying independent local validators who verify project milestones, confirm progress, and maintain platform integrity.",
                  icon: "✔️",
                },
                {
                  title: "Emergency Response",
                  desc: "Rapid disbursement of funds for humanitarian crises, disaster relief, and urgent social needs.",
                  icon: "🚨",
                },
                {
                  title: "Outreach & Education",
                  desc: "Training NGOs, onboarding grassroots organizations, and providing educational resources promoting ethical and transparent giving.",
                  icon: "📚",
                },
                {
                  title: "Research & Innovation",
                  desc: "Developing and improving blockchain-based tools, verification systems, and infrastructure to enhance accountability and efficiency.",
                  icon: "🔬",
                },
                {
                  title: "Marketing & Awareness",
                  desc: "Promoting verified NGO campaigns, increasing donor engagement, and expanding platform visibility globally.",
                  icon: "📣",
                },
                {
                  title: "DAO & Governance Experiments",
                  desc: "Testing community-driven governance models for treasury allocation and platform decision-making, subject to defined safeguards.",
                  icon: "🏛️",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-5 border border-slate-100 rounded-xl bg-slate-50/50"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{item.icon}</span>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-xl">
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>Allocation Oversight:</strong> All allocations are
                reviewed at least quarterly by the Board and Compliance
                Committee. Any allocation exceeding 10% of Treasury funds
                requires explicit Board approval.
              </p>
            </div>
          </section>

          {/* Section: Restrictions */}
          <section id="restrictions" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Restrictions
            </h2>
            <div className="space-y-4">
              {[
                "Treasury funds must not be used for shareholder profit, personal enrichment, or general platform operating expenses.",
                "All disbursements must strictly comply with this Policy and receive the required multi-sig approvals.",
                "Unauthorized investments, speculative transactions, or transfers outside approved purposes are strictly prohibited.",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-slate-50 py-3 px-5 rounded-xl border border-slate-100"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5"></div>
                  <span className="text-sm text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Conflict of Interest */}
          <section id="conflict" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Conflict of Interest
            </h2>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 text-sm text-slate-600 leading-relaxed">
              <p>
                All signatories, validators, and personnel involved in Treasury
                operations must disclose any actual or potential conflicts of
                interest. Any conflicts must be resolved in accordance with
                Board-approved procedures before participation in Treasury
                decisions.
              </p>
            </div>
          </section>

          {/* Section: Audit */}
          <section id="audit" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Audit and Oversight
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border border-gray-200 rounded-2xl bg-white">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="p-1.5 bg-blue-100 text-blue-600 rounded-md">
                    🔎
                  </span>
                  Audit Process
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li>
                    Periodic internal and independent external audits to ensure
                    compliance.
                  </li>
                  <li>
                    Audit findings reported to the Board of Trustees and
                    relevant stakeholders.
                  </li>
                </ul>
              </div>
              <div className="p-6 border border-gray-200 rounded-2xl bg-white">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="p-1.5 bg-green-100 text-green-600 rounded-md">
                    📋
                  </span>
                  Record Keeping
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "On-Chain Logs",
                    "Transaction Records",
                    "Approval Trails",
                    "Regulatory Compliance",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-4 italic">
                  Records maintained for statutory minimum periods.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Review */}
          <section id="review" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Review & Amendment
            </h2>
            <div className="space-y-4">
              {[
                "This Treasury Policy shall be reviewed at least annually by the Board of Trustees and Compliance Committee.",
                "Amendments may be made with Board approval and must be documented, communicated to stakeholders, and reflected in all Treasury operations.",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-slate-50 py-3 px-5 rounded-xl border border-slate-100"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5"></div>
                  <span className="text-sm text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Compliance */}
          <section id="compliance" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Compliance with Laws and Regulations
            </h2>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 text-sm text-slate-600 leading-relaxed">
              <p>
                The Treasury shall operate in full compliance with all
                applicable laws, including charity regulations, anti-money
                laundering (AML) rules, data protection laws, and any
                sector-specific requirements relevant to financial operations or
                blockchain-based systems.
              </p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                "Charity Regulations",
                "AML Rules",
                "Data Protection Laws",
                "Blockchain Compliance",
              ].map((item) => (
                <div
                  key={item}
                  className="text-[11px] font-mono text-slate-500 uppercase bg-slate-50 px-5 py-3 rounded-xl border border-slate-100"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* Section: Enforcement */}
          <section id="enforcement" className="mb-16 scroll-mt-10">
            <div className="bg-gray-900 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">Enforcement</h2>
              <p className="text-slate-400 text-sm">
                Any violation of this Treasury Policy may result in disciplinary
                action, removal from Treasury responsibilities, or legal action
                where appropriate. All personnel and signatories are required to
                adhere strictly to the provisions of this Policy.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
