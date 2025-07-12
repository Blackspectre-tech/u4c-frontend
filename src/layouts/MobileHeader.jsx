import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home, News, Pages, Project } from "./menus";
import logo from "../assets/ORIGINAL-LOGO.png";

const MobileHeader = ({
  transparentTop,
  transparentHeader,
  topSecondaryBg,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const [toggle, setToggle] = useState(false);
  const [activeToggle, setActiveToggle] = useState("");
  const setActive = (value) =>
      setActiveToggle(value === activeToggle ? "" : value),
    activeLi = (value) =>
      value === activeToggle ? { display: "block" } : { display: "none" },
    activeArrow = (value) => (value === activeToggle ? "submenu-opened" : "");
  return (
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
              <Link
                to="/events"
                className="main-btn nav-btn d-none d-sm-inline-block"
              >
                Donate Now <i className="far fa-arrow-right" />
              </Link>
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
          <a href="#" className="main-btn btn-white">
            Start A Campaign <i className="far fa-arrow-right" />
          </a>
        </div>
        <a href="#" className="panel-close" onClick={() => setToggle(false)}>
          <i className="fal fa-times" />
        </a>
      </div>
    </header>
  );
};

export default MobileHeader;
