import React from "react";
import "./PasswordResetSuccess.css"; // Import your CSS

const PasswordResetSuccess = () => {
  return (
    <div className="password-reset-container">
      <div className="icon-container">
        <div className="circle">
          <div className="checkmark">&#10003;</div>
        </div>
      </div>

      <h1>Password rest successfully</h1>
      <p>Your password has successfully been reset.</p>

      <p>
        If you have any questions or need help with your account,{" "}
        <a href="#">reach out to our support team.</a>
      </p>

      <footer className="footer">
        <div className="logo">
          <div className="block teal"></div>
          <div className="block purple"></div>
          <div className="block orange"></div>
          <span className="logo-text">
            United<span className="four">4</span>Change
          </span>
        </div>
        <p>© 2025 United 4 Change</p>
        <p>All rights reserved</p>
      </footer>
    </div>
  );
};

export default PasswordResetSuccess;
