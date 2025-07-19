import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { stickyNav } from "../utils";
import logoAlt from "../assets/ORIGINAL-LOGO.png";
import logo from "../assets/img/icons/ORIGINAL LOGO WHITE 2.svg"; // import your alternate logo
import SignupModal from "../components/SignupModal";
import SigninModal from "../components/SigninModal";

interface HeaderProps {
  transparentTop?: boolean;
  transparentHeader?: boolean;
  topSecondaryBg?: boolean;
}

const Header = ({
  transparentTop,
  transparentHeader,
  topSecondaryBg,
}: HeaderProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if window is defined (for SSR)
      if (typeof window !== "undefined") {
        const scrollPosition = window.scrollY;
        // Change state when scrolled past 100px (adjust as needed)
        setIsSticky(scrollPosition > 100);
      }
      stickyNav(); // keep your existing sticky functionality
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
        className={`site-header sticky-header d-none d-lg-block ${
          transparentTop ? "topbar-transparent" : ""
        } ${transparentHeader ? "transparent-header" : ""} ${
          isSticky ? "sticky-active" : ""
        }`}
        id="header-sticky"
      >
        <div className="navbar-wrapper">
          <div className="container">
            <div className="navbar-inner">
              <div className="site-logo">
                <Link to="/">
                  {/* Change logo based on sticky state */}
                  <img
                    className={isSticky ? undefined : `flat`}
                    src={isSticky ? logoAlt : logo}
                    alt="U4C"
                  />
                </Link>
              </div>
              <div className="nav-menu" id="menu">
                <ul className="d-flex flex-row list-unstyled gap-3 mb-0 p-0">
                  <li>
                    <Link to="/" className="nav-link sticky-nav-link">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/explore" className="nav-link sticky-nav-link">
                      Explore
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="nav-link sticky-nav-link">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/cvp" className="nav-link sticky-nav-link">
                      How Digital Giving works
                    </Link>
                  </li>
                </ul>
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
                <div>
                  <a href="#" className="nav-toggler">
                    <span />
                  </a>
                </div>
              </div>
            </div>
          </div>
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

export default Header;
