// src/layouts/Layout2.tsx
import { useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { activeNavMenu, animation, aTagClick, dataPoggress } from "../utils";
import Footer from "./Footer";
import Header2 from "./Header2";
import MobileHeader from "./MobileHeader";
import CookieConsent from "../pages/cookieconsent";
import ScrollToTop from "../pages/ScrollToTop";

interface Layout2Props {
  children: ReactNode;
  transparentTop?: boolean;
  transparentHeader?: boolean;
  topSecondaryBg?: boolean;
  footerSolidBg?: boolean;
}

const Layout = ({
  children,
  transparentTop,
  transparentHeader,
  topSecondaryBg,
  footerSolidBg,
}: Layout2Props) => {
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
      <Header2
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
