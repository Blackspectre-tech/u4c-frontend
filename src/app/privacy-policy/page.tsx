export default function Home() {
  const sections = [
    { id: "scope", title: "Scope of Policy" },
    { id: "collection", title: "Data Collection" },
    { id: "basis", title: "Lawful Basis" },
    { id: "sharing", title: "Data Sharing" },
    { id: "rights", title: "Your Rights" },
    { id: "security", title: "Security" },
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
        <div className="gradient-cto-two text-white rounded-b-4xl text-whit p-7 sm:p-10 lg:p-20">
          <div className="lg:w-[75%]">
            <h1 className="text-3xl sm:text-4xl font-bold relative z-10">
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
              Privacy Policy
            </h1>
            <p className="text-gray-500 mt-2">
              Last Updated: October 2023 • BlackSpectre Technology Limited
            </p>
          </header>

          {/* Section: Scope */}
          <section id="scope" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Scope of this Privacy Policy
            </h2>
            <div className="prose prose-slate max-w-none text-gray-600 leading-relaxed">
              <p>This Policy applies to:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {[
                  "Donors",
                  "NGOs & Representatives",
                  "Platform Users",
                  "Third-party Partners",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 bg-slate-50 py-3 px-5 rounded-xl border border-slate-100"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span className="text-sm font-medium text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section: Personal Data */}
          <section id="collection" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Personal Data We Collect
            </h2>

            <div className="space-y-8">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Blockchain & Smart Contract Data
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  <li className="text-sm text-slate-600 flex items-start gap-2">
                    <Disc /> Wallet addresses
                  </li>
                  <li className="text-sm text-slate-600 flex items-start gap-2">
                    <Disc /> Transaction hashes
                  </li>
                  <li className="text-sm text-slate-600 flex items-start gap-2">
                    <Disc /> USDC activity
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                  <p className="text-xs text-amber-800 leading-tight">
                    <strong>Note:</strong> Public blockchain data is immutable
                    and outside U4C’s control (GDPR-recognized exemption).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Lawful Bases */}
          <section id="basis" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Lawful Bases for Processing
            </h2>
            <p className="text-gray-600 mb-8">
              We process data under the following lawful bases as defined by
              GDPR and NDPA:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Consent",
                  items: [
                    "Marketing communications",
                    "Cookie tracking preferences",
                  ],
                  icon: "✨",
                },
                {
                  title: "Performance of Contract",
                  items: [
                    "User accounts",
                    "Donation processing",
                    "NGO onboarding",
                  ],
                  icon: "🤝",
                },
                {
                  title: "Legitimate Interests",
                  items: [
                    "Fraud prevention",
                    "Platform security",
                    "System analytics",
                  ],
                  icon: "🛡️",
                },
                {
                  title: "Legal Obligation",
                  items: ["AML/CFT laws", "Tax regulations", "Court requests"],
                  icon: "⚖️",
                },
              ].map((basis) => (
                <div
                  key={basis.title}
                  className="p-5 border border-slate-100 rounded-xl bg-slate-50/50"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{basis.icon}</span>
                    <h3 className="font-bold text-slate-900">{basis.title}</h3>
                  </div>
                  <ul className="space-y-1">
                    {basis.items.map((item) => (
                      <li
                        key={item}
                        className="text-xs text-slate-600 flex items-center gap-2"
                      >
                        <Disc styles="" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Data Sharing */}
          <section id="sharing" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Data Sharing & Disclosures
            </h2>

            <div className="space-y-6">
              {/* Third Party Processors */}
              <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-blue-50 bg-blue-50/30">
                <div className="md:w-1/3">
                  <h3 className="font-bold text-blue-900">Service Providers</h3>
                  <p className="text-xs text-blue-700/70 mt-1">
                    Infrastructure and compliance partners.
                  </p>
                </div>
                <div className="md:w-2/3 flex items-center flex-wrap gap-2">
                  {[
                    "Cloud Hosting",
                    "KYC Vendors",
                    "Payment Gateways",
                    "Analytics",
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

              {/* NGO Disclosure */}
              <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2">
                  NGOs & Representatives
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We only disclose donor information based on your{" "}
                  <span className="font-semibold text-black underline decoration-primary">
                    privacy preference
                  </span>{" "}
                  (Visible vs. Anonymous).
                </p>
              </div>

              {/* Cross-Border */}
              <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4">
                  Cross-Border Transfers
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  We ensure data safety across borders using:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Standard Contractual Clauses",
                    "Adequacy Decisions",
                    "Internal Agreements",
                    "Security Safeguards",
                  ].map((item) => (
                    <div
                      key={item}
                      className="text-[11px] font-mono text-slate-500 uppercase bg-slate-50 px-5 py-3 rounded-xl"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section: Your Rights */}
          <section id="rights" className="mb-16 scroll-mt-10">
            <div className="bg-gray-900 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">Your Rights</h2>
              <p className="text-slate-400 text-sm mb-8">
                Depending on your jurisdiction (GDPR/NDPA), you have the
                following controls over your data:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { title: "Access", desc: "Request a copy of your data" },
                  {
                    title: "Rectification",
                    desc: "Correct inaccurate info",
                  },
                  { title: "Erasure", desc: "Request data deletion" },
                  { title: "Portability", desc: "Transfer your data" },
                  { title: "Objection", desc: "Halt specific processing" },
                  { title: "Withdraw", desc: "Revoke consent anytime" },
                ].map((right) => (
                  <div
                    key={right.title}
                    className="group border-b border-slate-700 pb-4"
                  >
                    <h4 className="font-bold group-hover:text-blue-400 transition-colors">
                      {right.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">{right.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section: Retention & Security */}
          <section id="security" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Retention & Security
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Retention Card */}
              <div className="p-6 border border-gray-200 rounded-2xl bg-white">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="p-1.5 bg-blue-100 text-blue-600 rounded-md">
                    🕒
                  </span>
                  Data Retention
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex gap-2">
                    <b>Legal/Tax:</b> Retained for statutory periods.
                  </li>
                  <li className="flex gap-2">
                    <b>AML/CFT:</b> Held per international compliance.
                  </li>
                  <li className="flex gap-2 text-amber-700">
                    <b>Blockchain:</b> Permanent/Indefinite.
                  </li>
                </ul>
              </div>

              {/* Security Card */}
              <div className="p-6 border border-gray-200 rounded-2xl bg-white">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="p-1.5 bg-green-100 text-green-600 rounded-md">
                    🛡️
                  </span>
                  Security Measures
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "End-to-End Encryption",
                    "Zero-Trust",
                    "Pen-Testing",
                    "Incident Response",
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
                  Breach notification within 72 hours (GDPR/NDPA).
                </p>
              </div>
            </div>
          </section>

          {/* Section: Cookies */}
          <section className="mb-16 border-t border-gray-100 pt-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Cookies & Tracking
            </h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">✅ Authentication</span>
              <span className="flex items-center gap-1">
                ✅ Session Management
              </span>
              <span className="flex items-center gap-1">✅ Analytics</span>
              <span className="flex items-center gap-1">
                ✅ UX Personalization
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              You can adjust your preferences via our Cookie Consent Banner at
              any time.
            </p>
          </section>

          {/* Add more sections following this pattern... */}

          {/* Contact Section */}
          <footer className="mt-20 pt-10 border-t border-gray-100">
            <div className="bg-gray-950 text-white rounded-2xl p-8">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <p className="text-gray-400 text-sm mb-6">
                For privacy inquiries, rights requests, or complaints:
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-500">Entity:</span> BlackSpectre
                  Technology Limited
                </p>
                <p>
                  <span className="text-gray-500">Email:</span> privacy@u4c.com
                </p>
                <p>
                  <span className="text-gray-500">DPO:</span> dpo@u4c.com
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
