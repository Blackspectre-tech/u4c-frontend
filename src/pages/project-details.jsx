import { Link } from "react-router-dom";
import PageBanner from "../components/PageBanner";
import Layout from "../layouts/Layout";
import bg from "../assets/img/tmri.jpg";

const ProjectDetails = () => {
  return (
    <Layout>
      <PageBanner pageName="Project Details" />
      <section className="project-details-area section-gap-extra-bottom">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6 col-md-10">
              <div className="project-thumb mb-md-50">
                <div
                  className="thumb"
                  style={{
                    backgroundImage: `url(${bg})`, 
                    height: "900px",
                    width: "600px",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "8px"
                  }}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="project-summery">
                <Link to="/" className="category">Ongoing</Link>
                <h3 className="project-title">
                  Tamarind Community Donation Drive
                </h3>
                <div className="meta">
                  <div className="author">
                    <Link to="/">tamarind.initiative@gmail.com</Link>
                  </div>
                  <Link to="/" className="date">
                    <i className="far fa-calendar-alt" />
                    14 June 2025
                  </Link>
                </div>
                <p className="description">
                  Help provide food, clothing, blankets, kitchenware, hygiene products,
                  and dignity to struggling families in Yobe State. Every contribution
                  counts.
                </p>
                <div className="project-funding-info">
                  <div className="info-box">
                    <span>₦30,000</span>
                    <span className="info-title">Goal</span>
                  </div>
                  <div className="info-box">
                    <span>42%</span>
                    <span className="info-title">Funded</span>
                  </div>
                  <div className="info-box">
                    <span>15</span>
                    <span className="info-title">Days Left</span>
                  </div>
                </div>
                <div className="project-raised clearfix">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="raised-label">Raised of ₦30,000</div>
                    <div className="percent-raised">42%</div>
                  </div>
                  <div className="stats-bar" data-value={42}>
                    <div className="bar-line" />
                  </div>
                </div>
                <div className="project-form">
                  <form onSubmit={(e) => e.preventDefault()} action="#">
                    <ul className="donation-amount">
                      <li>₦500</li>
                      <li>₦1000</li>
                      <li>₦2500</li>
                      <li>₦5000</li>
                      <li>₦10000</li>
                    </ul>
                    <button type="submit" className="main-btn">
                      Donate Now <i className="far fa-arrow-right" />
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="project-details-tab">
                <div className="tab-content" id="projectTabContent">
                  <div className="tab-pane fade show active" id="description" role="tabpanel">
                    <div className="row justify-content-center">
                      <div className="col-lg-12">
                        <div className="description-content">
                          <h4 className="description-title">
                            About Tamarind Donation Drive
                          </h4>
                          <p>
                            Tamarind Initiative for Community Development is a non-profit organization
                            dedicated to helping individuals and families facing hardship in Yobe State.
                            Through your donations, we provide essential resources to restore dignity,
                            comfort, and hope.
                          </p>
                          <h4 className="description-title">
                            What Your Donation Provides
                          </h4>
                          <ul className="description-list">
                            <li>Non-perishable food items</li>
                            <li>Clothing and shoes</li>
                            <li>Blankets and bedding</li>
                            <li>Kitchen utensils and home appliances</li>
                            <li>Toiletries and hygiene products</li>
                          </ul>
                          <p>
                            Donations can be made in person at: Shop No 12 First Floor, Old Legislative Quarters, Gujba Road, Damaturu, Yobe State.
                          </p>
                          <p>
                            For more information, call <strong>+2348032837243</strong> or email <strong>tamarind.initiative@gmail.com</strong>.
                          </p>
                          <p>
                            Let’s give a little and help a lot.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tab-pane fade" id="update" role="tabpanel">
                    <div className="row justify-content-center">
                      <div className="col-lg-8">
                        <h4>Project Updates</h4>
                        <p>Updates about donation milestones and community impact will be posted here.</p>
                      </div>
                    </div>
                  </div>

                  <div className="tab-pane fade" id="bascker-list" role="tabpanel">
                    <div className="row justify-content-center">
                      <div className="col-lg-8">
                        <h4>Our Supporters</h4>
                        <p>Thanks to everyone who has donated to support this cause.</p>
                      </div>
                    </div>
                  </div>

                  <div className="tab-pane fade" id="reviews" role="tabpanel">
                    <div className="row justify-content-center">
                      <div className="col-lg-8">
                        <h4>Testimonials</h4>
                        <p>Community members share the impact of your support.</p>
                      </div>
                    </div>
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

export default ProjectDetails;
