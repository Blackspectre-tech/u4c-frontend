import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { stickyNav } from "../utils";
import logoAlt from "../assets/ORIGINAL-LOGO.png";
import logo from "../assets/ORIGINAL-LOGO.png"; // import your alternate logo
import { ProfileDropdown } from "../components/Dropdown2";

const Header = ({ transparentTop, transparentHeader, topSecondaryBg }) => {
  const [isSticky, setIsSticky] = useState(false);

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

  return (
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
                  className={isSticky ? null : `flat`}
                  src={isSticky ? logoAlt : logo}
                  alt="U4C"
                />
              </Link>
            </div>
            <div className="nav-menu" id="menu">
              <ul className="d-flex flex-row list-unstyled gap-3 mb-0 p-0">
                <li>
                  <Link
                    to="/"
                    className={`nav-link ${
                      isSticky ? "sticky-nav-link" : "sticky-nav-link"
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/explore"
                    className={`nav-link ${
                      isSticky ? "sticky-nav-link" : "sticky-nav-link"
                    }`}
                  >
                    Explore
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className={`nav-link ${
                      isSticky ? "sticky-nav-link" : "sticky-nav-link"
                    }`}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cvp"
                    className={`nav-link ${
                      isSticky ? "sticky-nav-link" : "sticky-nav-link"
                    }`}
                  >
                    How Digital Giving works
                  </Link>
                </li>
              </ul>
            </div>
            <div className="navbar-extra d-flex align-items-center">
              {/*  */}
              {/* {!isConnected ? (
                // <SignAction />
              ) : ( */}
              {/* <Link
                to="/signup"
                className="main-btn nav-btn d-none d-sm-inline-block"
              >
                Sign up <i className="far fa-arrow-right" />
              </Link> */}
              {/* )} */}
              <ProfileDropdown />
              <div>
                {/* 
                {isConnected ? (
                  <ProfileDropdown />
                ) : status === "connecting" || status === "reconnecting" ? (
                  <span className="main-btn nav-btn d-none d-sm-inline-block opacity-50 cursor-not-allowed">
                    Connecting...
                  </span>
                ) : (
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      open({ view: "Connect" });
                    }}
                    className="main-btn nav-btn d-none d-sm-inline-block"
                  >
                    Connect Wallet <i className="far fa-arrow-right" />
                  </span>
                )} */}

                <a href="#" className="nav-toggler">
                  <span />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
