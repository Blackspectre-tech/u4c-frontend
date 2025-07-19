import { Link } from "react-router-dom";
import { useState } from "react";
import Layout from "../layouts/Layout";
import PageBanner from "../components/PageBanner";
import img1 from "../assets/img/U4C4.png";
import '../App.css'

const Terms = () => {
  return (
    <Layout>
      <PageBanner pageName="Terms & Conditions" />

      <section className="terms-section section-gap">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12">
              <div className="terms-header text-center mb-60">
                <div className="common-heading text-center">
                  <span className="tagline">
                    <i className="fas fa-plus" /> Legal Agreement:
                    <span className="justify-content-center heading-shadow-text centerr">
                      Terms
                    </span>
                  </span>
                  <h1 className="title">United4Change Terms and Conditions</h1>
                  <p className="subtitle">
                    Last Updated: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="terms-content">
                <div className="terms-card">
                  <h2 className="section-title">1. Overview</h2>
                  <p>
                    United4Change ("we", "us", "our", or "the Platform") is a
                    digital donation platform that connects donors to grassroots
                    projects via secure, blockchain-powered vaults. By accessing
                    or using our platform at{" "}
                    <a href="https://www.united-4-change.org">
                      www.united-4-change.org
                    </a>
                    , you agree to these Terms of Use.
                  </p>
                </div>

                <div className="terms-card">
                  <h2 className="section-title">2. Eligibility</h2>
                  <p>To use our platform, you must:</p>
                  <ul className="styled-list">
                    <li>Be at least 18 years old</li>
                    <li>
                      Live in a jurisdiction where digital giving is legally
                      permitted
                    </li>
                    <li>
                      If representing an NGO, be legally registered in your
                      country and provide required verification
                    </li>
                  </ul>
                </div>

                <div className="terms-card">
                  <h2 className="section-title">3. Services</h2>
                  <ul className="styled-list">
                    <li>
                      Donors can contribute using traditional payment methods or
                      approved digital cash (e.g., USDC, USDT on Polygon).
                    </li>
                    <li>
                      Funds are held in smart contract vaults and released upon
                      successful milestone verification.
                    </li>
                    <li>NGOs must submit KYC documentation to participate.</li>
                  </ul>
                </div>

                <div className="terms-card">
                  <h2 className="section-title">4. Acceptable Use</h2>
                  <p>You agree not to:</p>
                  <ul className="styled-list">
                    <li>
                      Misuse the platform, submit false information, or
                      impersonate others
                    </li>
                    <li>Attempt to tamper with the smart contract system</li>
                    <li>
                      Post or transmit offensive, harmful, or misleading content
                    </li>
                  </ul>
                </div>

                <div className="terms-card">
                  <h2 className="section-title">5. Donations & Refunds</h2>
                  <ul className="styled-list">
                    <li>
                      Donations are non-refundable unless specified conditions
                      (e.g. milestone failure) are met
                    </li>
                    <li>
                      Refunds are processed automatically through smart contract
                      logic when applicable
                    </li>
                  </ul>
                </div>

                <div className="terms-card">
                  <h2 className="section-title">6. Compliance</h2>
                  <p>
                    We follow Know Your Customer (KYC) and Anti-Money Laundering
                    (AML) standards.
                  </p>
                  <ul className="styled-list">
                    <li>
                      NGOs and high-value donors may be required to verify
                      identity
                    </li>
                    <li>
                      Suspicious activity may lead to account suspension or
                      reporting
                    </li>
                  </ul>
                </div>

                <div className="terms-card">
                  <h2 className="section-title">7. Platform Limitations</h2>
                  <ul className="styled-list">
                    <li>
                      United4Change does not guarantee the outcome of any
                      campaign
                    </li>
                    <li>
                      Blockchain transactions may be irreversible and subject to
                      market risks
                    </li>
                    <li>
                      Users accept responsibility for their use of the platform
                    </li>
                  </ul>
                </div>

                <div className="terms-card">
                  <h2 className="section-title">8. Termination</h2>
                  <p>
                    We reserve the right to suspend or terminate accounts for
                    violations, non-compliance, or operational reasons.
                  </p>
                </div>

                <div className="terms-card">
                  <h2 className="section-title">9. Changes to These Terms</h2>
                  <p>
                    We may update these Terms. You will be notified of material
                    changes through platform notifications or email.
                  </p>
                </div>

                <div className="terms-card">
                  <h2 className="section-title">10. Governing Law</h2>
                  <p>
                    These terms are governed by the laws of Nigeria. Disputes
                    shall be resolved through mediation, and if necessary, the
                    jurisdiction of local commercial courts.
                  </p>
                </div>

                <div className="terms-card">
                  <h2 className="section-title">11. Contact</h2>
                  <p>
                    For any questions regarding these Terms, please contact us
                    at:{" "}
                    <a href="mailto:support@united4change.org">
                      support@united4change.org
                    </a>
                  </p>
                </div>

                <div className="acceptance-box mb-[100px]">
                  <div className="acceptance-content">
                    <i className="fas fa-file-contract"></i>
                    <p>
                      By using United4Change, you acknowledge that you have
                      read, understood, and agree to be bound by these Terms and
                      Conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
