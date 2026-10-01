export default function TermsOfUsePage() {
  const sections = [
    { id: "eligibility", title: "Eligibility & Age Restriction" },
    { id: "account", title: "Account Registration" },
    { id: "acceptable-use", title: "Acceptable Use" },
    { id: "user-content", title: "User Content" },
    { id: "ip", title: "Intellectual Property" },
    { id: "privacy", title: "Privacy & Data Protection" },
    { id: "payment", title: "Payment" },
    { id: "termination", title: "Suspension & Termination" },
    { id: "disclaimers", title: "Disclaimers" },
    { id: "indemnity", title: "Indemnity" },
    { id: "governing-law", title: "Governing Law" },
    { id: "updates", title: "Updates to Terms" },
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
              United4Change (U4C) – Terms Of Use
            </h1>
            <p className="relative z-10 mt-5">
              Effective Date: 25th November 2025. These Terms of Use ("Terms")
              govern your access to and use of the U4C platform, services, and
              related applications ("U4C", "we", "our", "the Platform"). By
              accessing or using U4C, you agree to these Terms. If you do not
              agree, do not use the Platform.
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
              Terms Of Use
            </h1>
            <p className="text-gray-500 mt-2">
              Effective Date: 25th November 2025 • BlackSpectre Technology
              Limited
            </p>
          </header>

          {/* Section: Eligibility */}
          <section id="eligibility" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Eligibility & Age Restriction
            </h2>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 text-sm text-slate-600 leading-relaxed">
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
          </section>

          {/* Section: Account Registration */}
          <section id="account" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Account Registration
            </h2>
            <div className="prose prose-slate max-w-none text-gray-600 leading-relaxed">
              <p className="text-sm mb-4">
                To use U4C platform, you may be required to create an account.
                By creating an account, you agree:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Provide accurate and complete information",
                  "Maintain the security of your login details",
                  "Notify us of any unauthorized use of your account",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 bg-slate-50 py-3 px-5 rounded-xl border border-slate-100"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                    <span className="text-sm font-medium text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm mt-4 text-slate-600">
                U4C is not responsible for losses arising from unauthorized
                access due to your negligence.
              </p>
            </div>
          </section>

          {/* Section: Acceptable Use */}
          <section id="acceptable-use" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Acceptable Use
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              By using U4C platform, you agree not to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Use the Platform for unlawful purposes",
                "Upload harmful, malicious, or fraudulent content",
                "Infringe intellectual property rights",
                "Attempt unauthorized access to systems",
                "Use automated tools (bots, scrapers) without consent",
                "Misrepresent your identity",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 bg-slate-50 py-3 px-5 rounded-xl border border-slate-100"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                  <span className="text-sm font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Violation may lead to suspension or permanent termination.
            </p>
          </section>

          {/* Section: User Content */}
          <section id="user-content" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              User Content
            </h2>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>Users may post or upload content to the Platform.</p>
              <p>
                You retain ownership of your content but grant U4C a limited
                license to store, process, display, and transmit your content as
                needed to operate the platform.
              </p>
              <p>You are solely responsible for your content.</p>
            </div>
          </section>

          {/* Section: Intellectual Property */}
          <section id="ip" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Intellectual Property
            </h2>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 text-sm text-slate-600 leading-relaxed space-y-3">
              <p>
                All trademarks, logos, code, UI/UX design, and materials on U4C
                are the exclusive property of U4C or its licensors.
              </p>
              <p>
                You may not copy, modify, reverse-engineer, or distribute any
                part of U4C without explicit written consent.
              </p>
            </div>
          </section>

          {/* Section: Privacy */}
          <section id="privacy" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Privacy & Data Protection
            </h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Your use of U4C platform is governed by our:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  "Privacy Policy",
                  "Cookie Policy",
                  "Data Retention Schedule",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 bg-slate-50 py-3 px-5 rounded-xl border border-slate-100"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                    <span className="text-sm font-medium text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-5 border border-slate-100 rounded-xl bg-slate-50/50 text-sm text-slate-600 space-y-2">
                <p>These documents explain:</p>
                <ul className="space-y-1 ml-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                    What data we collect
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                    How it is used
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                    Your rights under NDPA, GDPR, and other laws
                  </li>
                </ul>
              </div>
              <p className="text-sm text-gray-600">
                By using U4C, you consent to processing as described in our
                privacy notices.
              </p>
            </div>
          </section>

          {/* Section: Payment */}
          <section id="payment" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Payment (If Applicable)
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Where paid services are offered:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                "Fees will be clearly stated",
                "Payments are non-refundable except as required by law",
                "U4C may modify pricing with reasonable notice",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 bg-slate-50 py-3 px-5 rounded-xl border border-slate-100"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                  <span className="text-sm font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Termination */}
          <section id="termination" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Suspension and Termination
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              We may suspend or terminate your access if:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "You violate these Terms of Use",
                "You engage in harmful or unlawful activity",
                "We are required by law to do so",
                "You provide misleading account information",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 bg-slate-50 py-3 px-5 rounded-xl border border-slate-100"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                  <span className="text-sm font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              You may also terminate your account at any time.
            </p>
          </section>

          {/* Section: Disclaimers */}
          <section id="disclaimers" className="mb-16 scroll-mt-10">
            <div className="bg-gray-900 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">Disclaimers</h2>
              <p className="text-slate-400 text-sm mb-8">
                U4C is provided{" "}
                <span className="font-semibold text-white">"as is"</span>{" "}
                without warranties of any kind. We do not guarantee:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Uninterrupted Service",
                    desc: "No guarantee of continuous uptime",
                  },
                  {
                    title: "Error-Free Performance",
                    desc: "No guarantee of bug-free operation",
                  },
                  {
                    title: "Content Accuracy",
                    desc: "No guarantee of user-generated content accuracy",
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
              <p className="text-slate-400 text-sm mt-6">
                To the fullest extent permitted by law, U4C disclaims liability
                for indirect or consequential damages.
              </p>
            </div>
          </section>

          {/* Section: Indemnity */}
          <section id="indemnity" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Indemnity
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              You agree to indemnify and hold U4C harmless from claims arising
              from:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                "Your misuse of the platform",
                "Your breach of these Terms",
                "Your content posted on the platform",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 bg-slate-50 py-3 px-5 rounded-xl border border-slate-100"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                  <span className="text-sm font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Governing Law */}
          <section id="governing-law" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Governing Law & Dispute Resolution
            </h2>
            <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-blue-50 bg-blue-50/30">
              <div className="md:w-1/3">
                <h3 className="font-bold text-blue-900">Applicable Law</h3>
                <p className="text-xs text-blue-700/70 mt-1">
                  Jurisdiction-based governance.
                </p>
              </div>
              <div className="md:w-2/3 space-y-2 text-sm text-blue-700">
                <p>
                  • The Federal Republic of Nigeria, if you access the platform
                  from Africa
                </p>
                <p>• Or the relevant jurisdiction where U4C legally operates</p>
                <p className="mt-2 text-blue-800">
                  Disputes will be resolved through negotiation, then mediation,
                  and finally competent courts if necessary.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Updates */}
          <section id="updates" className="mb-16 scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Line />
              Updates to Terms
            </h2>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 text-sm text-slate-600 leading-relaxed">
              <p>
                We may update these Terms from time to time. If we make material
                changes, we will notify users via email or platform notice.
                Continued use after updates means acceptance of the revised
                Terms.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <footer className="mt-20 pt-10 border-t border-gray-100">
            <div className="bg-gray-950 text-white rounded-2xl p-8">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <p className="text-gray-400 text-sm mb-6">
                For questions about these Terms:
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-500">Entity:</span> BlackSpectre
                  Technology Limited
                </p>
                <p>
                  <span className="text-gray-500">Email:</span> legal@u4c.com
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
