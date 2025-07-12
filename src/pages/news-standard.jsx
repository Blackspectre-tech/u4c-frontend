import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PageBanner from "../components//PageBanner";
import VideoPopup from "../components//VideoPopup";
import Layout from "../layouts/Layout2";
import { getPagination, pagination } from "../utils";
import img from "../assets/img/gik.jpg";

const NewsStandard = () => {
  const [video, setVideo] = useState(false);
  let sort = 2;
  const [active, setActive] = useState(1);
  const [state, setstate] = useState([]);
  useEffect(() => {
    pagination(".post-item", sort, active);
    let list = document.querySelectorAll(".post-item");
    setstate(getPagination(list.length, sort));
  }, [active]);
  return (
    <Layout>
      {video && <VideoPopup close={setVideo} />}
      <PageBanner pageName="How Digital Giving works" />
      <section className="blog-area section-gap-extra-bottom primary-soft-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="blog-post-loop">
                <div className="post-item video-post">
                  <div className="post-thumbnail">
                    <img src={img} alt="Thumbnail" />
                    <a
                      href="#"
                      className="video-popup"
                      onClick={() => setVideo(true)}
                    >
                      <i className="fas fa-play" />
                    </a>
                  </div>
                  <div className="post-content">
                    <ul className="post-meta">
                      <li>
                        <a href="#">
                          <i className="far fa-user-circle" />
                          United 4 Change
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="far fa-calendar-alt" />5 June 2025
                        </a>
                      </li>
                    </ul>
                    <h3 className="text-smm">
                      <Link to="/news-details">
                        United 4 Change is a game-changing donation platform for
                        nonprofits that provides transparency and accountability
                        to donors by sharing financial information and direct
                        project results in real-time. We understood the impact
                        blockchain technology could have on many of the pain
                        points nonprofits often suffer: lower costs in fees,
                        faster transaction times, precise tracking of donor
                        funds from beginning to end, and removal of misuse of
                        funds.
                      </Link>
                    </h3>
                    <Link to="/cvp-details" className="post-link">
                      Read More <i className="far fa-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Content Sections */}
      <section className="impact-section section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="section-title">
                See Your Impact: How Your Donation Helps
              </h2>
              <p className="section-subtitle">
                See the Difference Your Contribution Makes.
              </p>

              <div className="impact-content">
                <p>Experience the impact of your generosity firsthand.</p>
                <ul className="impact-list">
                  <li>
                    Showcase of the positive changes and impact made by
                    United4Change in different countries
                  </li>
                  <li>
                    Real success stories from communities you've supported and
                    current projects
                  </li>
                  <li>
                    Video content illustrating how contributions are utilized
                    for health, education, living essentials, and rebuilding
                    infrastructure to empower local communities.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="section-title">FAQ</h2>
              <h3 className="section-subtitle">
                Frequently Asked Questions (FAQ) - United4Change
              </h3>

              <div className="faq-item">
                <h4>What is the mission of United4Change?</h4>
                <p>
                  Our mission is to connect donors directly to grassroots causes
                  through transparent, secure giving, using digital tools that
                  ensure funds are used responsibly and visibly.
                </p>
              </div>

              <div className="faq-item">
                <h4>
                  Is United4Change affiliated with any specific organization?
                </h4>
                <p>
                  United4Change operates independently but works with verified
                  nonprofits and local organizations that align with our values.
                  We ensure every partner is vetted and community-focused.
                </p>
              </div>

              <div className="faq-item">
                <h4>Can I see the impact of my donation?</h4>
                <p>
                  Yes. Every campaign provides updates, milestones, and visual
                  evidence of progress. You'll also see exactly when your
                  contribution is released.
                </p>
              </div>

              <div className="faq-item">
                <h4>Why does United4Change use digital cash?</h4>
                <p>
                  Digital cash (like digital dollars or eNaira equivalents)
                  allows us to send donations directly to secure vaults, without
                  middlemen or delays. It also reduces fees and improves
                  tracking.
                </p>
              </div>

              <div className="faq-item">
                <h4>How do I donate?</h4>
                <p>
                  It's simple. Choose a campaign and donate using your bank
                  card, transfer, or digital cash. You'll receive confirmation
                  and can track your donation in real time.
                </p>
              </div>

              <div className="faq-item">
                <h4>What forms of digital cash can I donate with?</h4>
                <p>
                  We currently accept trusted digital currencies such as USDC,
                  USDT, and others — all stable, reliable, and always equal to a
                  fixed value. More options will be added soon.
                </p>
              </div>

              <div className="faq-item">
                <h4>Is my donation safe?</h4>
                <p>
                  Yes. All donations are secured in digital vaults powered by
                  automated systems. Funds are only released when milestones are
                  confirmed. Everything is transparent and traceable.
                </p>
              </div>

              <div className="faq-item">
                <h4>Can I remain anonymous when donating?</h4>
                <p>
                  Absolutely. You can choose to give privately or publicly.
                  Either way, you'll still be able to track how your donation
                  was used.
                </p>
              </div>

              <div className="faq-item">
                <h4>
                  I've never used digital giving before. Can I still support a
                  cause?
                </h4>
                <p>
                  Definitely. You can use your regular bank card or transfer. If
                  you'd like to try digital cash, we'll guide you step-by-step.
                </p>
              </div>

              <div className="faq-item">
                <h4>Where does my donation go?</h4>
                <p>
                  Directly to the campaign you choose. Your donation is stored
                  securely and released only when results are verified.
                </p>
              </div>

              <div className="faq-item">
                <h4>Is my donation tax-deductible?</h4>
                <p>
                  We're working on enabling tax-deduction options in more
                  countries. In the meantime, we recommend consulting your local
                  tax advisor.
                </p>
              </div>

              <div className="faq-footer">
                <p>
                  If you have any specific inquiries or need further assistance,
                  We've got you. Reach out to our support team via{" "}
                  <a href="mailto:support@united4change.org">
                    support@united4change.org
                  </a>
                  . Thank you for supporting United4Change!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NewsStandard;
