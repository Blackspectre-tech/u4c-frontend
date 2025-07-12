// src/layouts/Layout.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { activeNavMenu, animation, aTagClick, dataPoggress } from "../utils";
import Footer from "./Footer";
import Header from "./Header2";
import MobileHeader from "./MobileHeader";
import CookieConsent from "../pages/cookieconsent";
import ScrollToTop from "../pages/ScrollToTop";

const Layout = ({
  children,
  transparentTop,
  transparentHeader,
  topSecondaryBg,
  footerSolidBg,
}) => {
  const location = useLocation();

  useEffect(() => {
    activeNavMenu(location.pathname);
    animation();
    aTagClick();
    dataPoggress();
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <Header
        transparentTop={transparentTop}
        transparentHeader={transparentHeader}
        topSecondaryBg={topSecondaryBg}
      />
      <MobileHeader
        transparentTop={transparentTop}
        transparentHeader={transparentHeader}
        topSecondaryBg={topSecondaryBg}
      />
      {children}
      <CookieConsent />
      <Footer footerSolidBg={footerSolidBg} />
    </>
  );
};

export default Layout;
