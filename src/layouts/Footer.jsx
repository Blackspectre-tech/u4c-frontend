import { Link } from "react-router-dom";
import logo from "../assets/img/u4cw.png";
import { Button } from "react-bootstrap";
const Footer = ({ footerSolidBg }) => {
  return (
    <footer
      className={`site-footer ${
        footerSolidBg ? "" : "with-footer-cta with-footer-bg"
      }`}
    >
      {!footerSolidBg && (
        <div className="footer-cta">
          <div className="container">
            <div className="row justify-content-lg-between justify-content-center align-items-center">
              <div className="col-lg-7 col-md-8 col-sm-10">
                <h3 className="cta-title">Get Involved</h3>
                <p className="cta-subtitle text-white">
                  Whether you’re donating, fundraising, or spreading the word,
                  you’re shaping lives.
                </p>
              </div>
              <div className="col-lg-auto col-md-6">
                <Link to="/explore">
                  <Button className="primaryy-btn mt-md-30">
                    Make A Digital Donation <i className="far fa-arrow-right" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="footer-content-area">
        <div className="container">
          <div className="footer-widgets">
            <div className="row justify-content-between">
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="widget about-widget">
                  <div className="footer-logo">
                    <img src={logo} alt="u4c" />
                  </div>
                  <p>
                    Driven by compassion, powered by technology — we connect
                    people to purpose and bring resources where
                    they’re needed most{" "}
                  </p>
                </div>
              </div>
              <div className="col-lg-2 col-md-5 col-sm-6">
                <div className="widget nav-widget">
                  <h4 className="widget-title">Get Involved</h4>
                  <ul>
                    <li>
                      <Link to="/">Explore Projects</Link>
                    </li>
                    <li>
                      <Link to="/">Completed Projects</Link>
                    </li>
                    <li>
                      <Link to="/">Fundraise</Link>
                    </li>
                    <li>
                      <Link to="/">Donate</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-6 col-sm-6">
                <div className="widget nav-widget">
                  <h4 className="widget-title">About Us</h4>
                  <ul>
                    <li>
                      <Link to="/">Our Mission</Link>
                    </li>
                    <li>
                      <Link to="/">Our Vision</Link>
                    </li>
                    <li>
                      <Link to="/">History</Link>
                    </li>
                    <li>
                      <Link to="/">Team</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-auto col-md-5 col-sm-8">
                <div className="widget contact-widget">
                  <h4 className="widget-title">Contact Us</h4>
                  <ul className="info-list">
                    <li>
                      <span className="icon">
                        <i className="far fa-phone" />
                      </span>
                      <span className="info">
                        <span className="info-title">Phone Number</span>
                        <a href="#">+1-(314) 892-2600</a>
                      </span>
                    </li>
                    <li>
                      <span className="icon">
                        <i className="far fa-envelope-open" />
                      </span>
                      <span className="info">
                        <span className="info-title">Email Address</span>
                        <a href="#">Holyway@mail.com</a>
                      </span>
                    </li>
                    {/* <li>
                      <span className="icon">
                        <i className="far fa-map-marker-alt" />
                      </span>
                      <span className="info">
                        <span className="info-title">Locations</span>
                        <a href="#">59 Main Street, USA</a>
                      </span>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright-area">
            <div className="row flex-md-row-reverse">
              <div className="col-md-6">
                <ul className="social-icons">
                  <li>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/terms-and-conditions">Terms and Conditions</Link>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-youtube" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-behance" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-google-plus-g" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <p className="copyright-text">
                  © {new Date().getFullYear()}{" "}
                  <a href="#">United 4 Change | All Rights Reserved</a>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
