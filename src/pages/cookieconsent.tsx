import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consentGiven = localStorage.getItem("cookieConsent");
    if (!consentGiven) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "all");
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "necessary");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-consent-banner">
      <div className="cookie-content">
        <p>
          We use cookies to enhance your browsing experience, analyze site
          traffic, and support our fundraising efforts—including processing
          donations in both traditional (FIAT) currencies and cryptocurrency. By
          continuing to use our site, you consent to our use of cookies as
          described in our <Link to="/privacy-policy">Privacy Policy</Link> and{" "}
          Cookie Policy.
        </p>
        <div className="cookie-buttons">
          <button className="accept-all" onClick={handleAccept}>
            Accept All
          </button>
          <button className="customize-btn">Customize Settings</button>
          <button className="reject-btn" onClick={handleReject}>
            Reject Non-Essential
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
