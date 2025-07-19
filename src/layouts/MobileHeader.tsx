import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/ORIGINAL-LOGO.png";
import SignupModal from "../components/SignupModal";
import SigninModal from "../components/SigninModal";

interface MobileHeaderProps {
  transparentTop?: boolean;
  transparentHeader?: boolean;
  topSecondaryBg?: boolean;
}

const MobileHeader = ({
  transparentTop,
  transparentHeader,
  topSecondaryBg,
}: MobileHeaderProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleJoinUsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowSignupModal(true);
  };

  const handleCloseModals = () => {
    setShowSignupModal(false);
    setShowSigninModal(false);
  };

  const handleSwitchToSignin = () => {
    setShowSignupModal(false);
    setShowSigninModal(true);
  };

  const handleSwitchToSignup = () => {
    setShowSigninModal(false);
    setShowSignupModal(true);
  };

  return (
    <Fragment>
      <header
        className={`site-header sticky-header  d-lg-none ${
          transparentTop ? "topbar-transparent" : ""
        } ${transparentHeader ? "transparent-header" : ""}`}
        id="header-sticky"
      >
        {/* <div
          className={`header-topbar d-none d-sm-block ${
            topSecondaryBg ? "topbar-secondary-bg" : ""
          }`}
        >
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="col-auto">
                <ul className="contact-info">
                  <li>
                    <a href="#">
                      <i className="far fa-envelope" /> support@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="far fa-map-marker-alt" /> 250 Main Street, 2nd
                      Floor, USA
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-auto d-none d-md-block">
                <ul className="social-icons">
                  <li>
                    <a href="#">
                      <i className="fab fa-twitter" />
                    </a>
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
            </div>
          </div>
        </div> */}
        <div className="navbar-wrapper breakpoint-on">
          <div className="container">
            <div className="navbar-inner">
              <div className="site-logo">
                <Link to="/">
                  <img src={logo} alt="u4c" />
                </Link>
              </div>
              <div className="navbar-extra d-flex align-items-center">
                <button
                  onClick={handleJoinUsClick}
                  className="main-btn nav-btn d-none d-sm-inline-block"
                  style={{
                    backgroundColor: "#e9262a",
                    border: "2px solid #e3cda8",
                    color: "white",
                  }}
                >
                  Join Us <i className="far fa-arrow-right" />
                </button>
                <a
                  href="#"
                  className={`nav-toggler ${toggle ? "panel-opened" : ""}`}
                  onClick={() => setToggle(!toggle)}
                >
                  <span />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`mobile-menu-panel ${toggle ? "panel-opened" : ""} ${
            !isMounted ? "initially-hidden" : ""
          }`}
        >
          <div className="panel-logo">
            <Link to="/">
              <img src={logo} alt="Funden" />
            </Link>
          </div>
          <ul className="panel-menu" id="menu">
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/explore">Explore</Link>
            </li>

            <li>
              <Link to="/about">About Us</Link>
            </li>

            <li>
              <Link to="/cvp">How Digital Giving works</Link>
            </li>
          </ul>
          <div className="panel-extra">
            <Link to="/explore" className="main-btn btn-white">
              Start A Campaign <i className="far fa-arrow-right" />
            </Link>
          </div>
          <a href="#" className="panel-close" onClick={() => setToggle(false)}>
            <i className="fal fa-times" />
          </a>
        </div>
      </header>

      {/* Modals */}
      <SignupModal
        isOpen={showSignupModal}
        onClose={handleCloseModals}
        onSwitchToSignin={handleSwitchToSignin}
      />
      <SigninModal
        isOpen={showSigninModal}
        onClose={handleCloseModals}
        onSwitchToSignup={handleSwitchToSignup}
      />
    </Fragment>
  );
};

export default MobileHeader;
