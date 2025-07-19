import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";
import PageBanner from "../components/PageBanner";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <PageBanner pageName="Privacy Policy" />

      <section className="privacy-section section-gap">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12">
              <div className="privacy-header text-center mb-60">
                <div className="common-heading text-center">
                  <span className="tagline">
                    <i className="fas fa-shield-alt" /> Your Data Protection
                    <span className="heading-shadow-text">Privacy</span>
                  </span>
                  <h1 className="title">United4Change Privacy Policy</h1>
                  <p className="subtitle">
                    Last Updated: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="privacy-content">
                <div className="privacy-intro">
                  <p>
                    At United4Change, we are committed to protecting your
                    privacy. This policy explains how we collect, use, and
                    safeguard your personal information when you use our
                    platform.
                  </p>
                </div>

                <div className="privacy-card">
                  <h2 className="section-title">
                    <i className="fas fa-database"></i> 1. What Data We Collect
                  </h2>
                  <p>
                    We collect personal information necessary for participation,
                    including:
                  </p>
                  <ul className="privacy-list">
                    <li>
                      <i className="fas fa-user"></i> Name, email address, and
                      phone number
                    </li>
                    <li>
                      <i className="fas fa-wallet"></i> Wallet address (for
                      digital transactions)
                    </li>
                    <li>
                      <i className="fas fa-file-alt"></i> NGO documents (e.g.,
                      registration, identity verification)
                    </li>
                  </ul>
                </div>

                <div className="privacy-card">
                  <h2 className="section-title">
                    <i className="fas fa-cogs"></i> 2. How We Use Your Data
                  </h2>
                  <p>We use your data to:</p>
                  <div className="usage-grid">
                    <div className="usage-item">
                      <div className="usage-icon">
                        <i className="fas fa-hand-holding-usd"></i>
                      </div>
                      <p>Process and verify donations</p>
                    </div>
                    <div className="usage-item">
                      <div className="usage-icon">
                        <i className="fas fa-users-cog"></i>
                      </div>
                      <p>Onboard and authenticate NGOs</p>
                    </div>
                    <div className="usage-item">
                      <div className="usage-icon">
                        <i className="fas fa-balance-scale"></i>
                      </div>
                      <p>Comply with legal requirements</p>
                    </div>
                    <div className="usage-item">
                      <div className="usage-icon">
                        <i className="fas fa-bullhorn"></i>
                      </div>
                      <p>Communicate updates and platform changes</p>
                    </div>
                  </div>
                </div>

                <div className="privacy-card">
                  <h2 className="section-title">
                    <i className="fas fa-lock"></i> 3. Data Storage and
                    Protection
                  </h2>
                  <ul className="privacy-list">
                    <li>
                      <i className="fas fa-check-circle"></i> Data is securely
                      stored on GDPR-compliant infrastructure
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Access is limited
                      to authorized personnel and trusted partners
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Blockchain
                      transactions are immutable but pseudonymous
                    </li>
                  </ul>
                </div>

                <div className="privacy-card">
                  <h2 className="section-title">
                    <i className="fas fa-share-alt"></i> 4. Sharing of Data
                  </h2>
                  <p>We may share data with:</p>
                  <div className="sharing-grid">
                    <div className="sharing-item">
                      <div className="sharing-icon">
                        <i className="fas fa-user-shield"></i>
                      </div>
                      <p>Identity verification providers (e.g. KYC)</p>
                    </div>
                    <div className="sharing-item">
                      <div className="sharing-icon">
                        <i className="fas fa-exchange-alt"></i>
                      </div>
                      <p>Payment and blockchain processing partners</p>
                    </div>
                    <div className="sharing-item">
                      <div className="sharing-icon">
                        <i className="fas fa-gavel"></i>
                      </div>
                      <p>Legal or regulatory authorities if required</p>
                    </div>
                  </div>
                </div>

                <div className="privacy-card">
                  <h2 className="section-title">
                    <i className="fas fa-user-shield"></i> 5. Your Rights
                  </h2>
                  <p>Depending on your location, you may:</p>
                  <div className="rights-grid">
                    <div className="rights-item">
                      <h4>Access</h4>
                      <p>Request access to your personal data</p>
                    </div>
                    <div className="rights-item">
                      <h4>Correction</h4>
                      <p>Request correction of inaccurate data</p>
                    </div>
                    <div className="rights-item">
                      <h4>Deletion</h4>
                      <p>Request deletion of your data</p>
                    </div>
                    <div className="rights-item">
                      <h4>Complaint</h4>
                      <p>Lodge a complaint with your national data authority</p>
                    </div>
                  </div>
                </div>

                <div className="privacy-card">
                  <h2 className="section-title">
                    <i className="fas fa-cookie-bite"></i> 6. Cookies and
                    Analytics
                  </h2>
                  <p>We use cookies and tracking tools to:</p>
                  <div className="cookies-flex">
                    <div className="cookie-item">
                      <i className="fas fa-chart-line"></i>
                      <span>Monitor performance and security</span>
                    </div>
                    <div className="cookie-item">
                      <i className="fas fa-user-edit"></i>
                      <span>Improve user experience</span>
                    </div>
                    <div className="cookie-item">
                      <i className="fas fa-project-diagram"></i>
                      <span>Analyze engagement patterns</span>
                    </div>
                  </div>
                </div>

                <div className="privacy-card">
                  <h2 className="section-title">
                    <i className="fas fa-archive"></i> 7. Retention
                  </h2>
                  <p>
                    Your data is retained only as long as necessary for legal,
                    operational, or compliance purposes.
                  </p>
                </div>

                <div className="privacy-card">
                  <h2 className="section-title">
                    <i className="fas fa-sync-alt"></i> 8. Updates to this
                    Policy
                  </h2>
                  <p>
                    We may revise this Privacy Policy. Significant changes will
                    be communicated via the website or email.
                  </p>
                </div>

                <div className="contact-card">
                  <h2 className="section-title">
                    <i className="fas fa-envelope"></i> 9. Contact Us
                  </h2>
                  <div className="contact-methods">
                    <a
                      href="mailto:support@united4change.org"
                      className="contact-button"
                    >
                      <i className="fas fa-paper-plane"></i> Email:
                      support@united4change.org
                    </a>
                  </div>
                </div>

                <div className="policy-footer">
                  <p>
                    By using United4Change, you acknowledge you have read and
                    understood this Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
