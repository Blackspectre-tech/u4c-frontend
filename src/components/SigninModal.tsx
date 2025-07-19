import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SigninModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
}

const SigninModal: React.FC<SigninModalProps> = ({
  isOpen,
  onClose,
  onSwitchToSignup,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Signin form submitted:", formData);

      // Close modal and navigate to dashboard
      onClose();
      navigate("/dashboard");
    } catch (error) {
      console.error("Signin error:", error);
      setErrors({ general: "Signin failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
    // Handle forgot password
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        .modal-backdrop-custom {
          background: linear-gradient(135deg, rgba(45, 212, 191, 0.15), rgba(236, 72, 153, 0.15), rgba(251, 146, 60, 0.15));
          backdrop-filter: blur(12px);
        }
        .modal-content-custom {
          border: none;
          border-radius: 24px;
          box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.05);
          overflow: hidden;
          background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
          position: relative;
        }
        .modal-content-custom::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(90deg, #2dd4bf 0%, #ec4899 35%, #fb923c 70%, #fbbf24 100%);
        }
        .modal-header-custom {
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          color: white;
          border-bottom: none;
          padding: 3rem 2.5rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .modal-header-custom::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(45, 212, 191, 0.1) 0%, transparent 70%);
          animation: float 6s ease-in-out infinite;
        }
        .modal-header-custom::after {
          content: '';
          position: absolute;
          bottom: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(251, 146, 60, 0.1) 0%, transparent 70%);
          animation: float 8s ease-in-out infinite reverse;
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        .btn-close-custom {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(255, 255, 255, 0.15);
          border: 2px solid rgba(255, 255, 255, 0.2);
          color: white;
          font-size: 1.25rem;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          z-index: 10;
        }
        .btn-close-custom:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.4);
          transform: scale(1.1) rotate(90deg);
        }
        .form-control-custom {
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          padding: 22px 24px;
          font-size: 16px;
          transition: all 0.3s ease;
          background: #f8fafc;
          font-weight: 500;
          height: 64px;
        }
        .form-control-custom:focus {
          border-color: #2dd4bf;
          box-shadow: 0 0 0 4px rgba(45, 212, 191, 0.1);
          background: white;
          transform: translateY(-2px);
        }
        .form-control-custom:hover {
          border-color: #cbd5e1;
          transform: translateY(-1px);
        }
        .btn-primary-custom {
          background: linear-gradient(135deg, #ec4899 0%, #f97316 100%);
          border: none;
          border-radius: 16px;
          padding: 18px 24px;
          font-size: 16px;
          font-weight: 700;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          overflow: hidden;
        }
        .btn-primary-custom::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s;
        }
        .btn-primary-custom:hover::before {
          left: 100%;
        }
        .btn-primary-custom:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 24px rgba(236, 72, 153, 0.4);
          background: linear-gradient(135deg, #db2777 0%, #ea580c 100%);
        }
        .btn-primary-custom:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        .form-check-custom {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .form-check-input-custom {
          width: 20px;
          height: 20px;
          accent-color: #2dd4bf;
          cursor: pointer;
          border-radius: 6px;
        }
        .text-link-custom {
          color: #ec4899;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          position: relative;
        }
        .text-link-custom::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #ec4899, #f97316);
          transition: width 0.3s ease;
        }
        .text-link-custom:hover::after {
          width: 100%;
        }
        .text-link-custom:hover {
          color: #be185d;
          transform: translateX(2px);
        }
        .modal-title-custom {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #2dd4bf 0%, #ec4899 50%, #fb923c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
          position: relative;
          z-index: 5;
        }
        .modal-subtitle-custom {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1rem;
          font-weight: 400;
          position: relative;
          z-index: 5;
        }
        .form-floating-custom {
          position: relative;
          margin-bottom: 1.5rem;
        }
        .form-floating-custom label {
          position: absolute;
          top: 24px;
          left: 24px;
          color: #64748b;
          font-weight: 500;
          transition: all 0.3s ease;
          pointer-events: none;
          font-size: 16px;
          background: transparent;
          z-index: 1;
        }
        .form-floating-custom input:focus + label,
        .form-floating-custom input:not(:placeholder-shown) + label {
          top: -8px;
          left: 20px;
          font-size: 12px;
          color: #2dd4bf;
          background: white;
          padding: 0 8px;
          border-radius: 4px;
          z-index: 2;
        }
        .form-floating-custom input::placeholder {
          color: transparent;
          transition: color 0.3s ease;
        }
        .form-floating-custom input:focus::placeholder {
          color: #94a3b8;
        }
        .password-toggle-btn {
          border: none;
          background: transparent;
          color: #64748b;
          padding: 18px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 64px;
        }
        .password-toggle-btn:hover {
          color: #2dd4bf;
          transform: scale(1.1);
        }
        .error-message {
          background: #fee2e2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 1rem;
          font-size: 14px;
          font-weight: 500;
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="modal-backdrop show modal-backdrop-custom"
        onClick={onClose}
        style={{ zIndex: 1040 }}
      />

      {/* Modal */}
      <div
        className="modal show d-block"
        style={{ zIndex: 1050 }}
        onClick={onClose}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content modal-content-custom">
            {/* Header */}
            <div className="modal-header-custom">
              <button
                type="button"
                className="btn-close-custom"
                onClick={onClose}
              >
                ×
              </button>
              <h2 className="modal-title-custom">Welcome Back</h2>
              <p className="modal-subtitle-custom">
                Sign in to continue your journey with United 4 Change
              </p>
            </div>

            {/* Body */}
            <div className="modal-body p-5">
              {/* General Error Display */}
              {errors.general && (
                <div className="error-message">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {errors.general}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="form-floating-custom">
                  <input
                    type="email"
                    className={`form-control form-control-custom ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    id="signinEmail"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder=" "
                  />
                  <label htmlFor="signinEmail">Email Address</label>
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="form-floating-custom">
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control form-control-custom ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      id="signinPassword"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder=" "
                      style={{
                        borderRight: "none",
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    />
                    <button
                      className="password-toggle-btn"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        borderLeft: "none",
                        borderColor: "#e2e8f0",
                        background: "#f8fafc",
                        borderRadius: "0 16px 16px 0",
                        border: "2px solid #e2e8f0",
                      }}
                    >
                      {showPassword ? (
                        <svg
                          width="20"
                          height="20"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="20"
                          height="20"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  <label htmlFor="signinPassword">Password</label>
                  {errors.password && (
                    <div className="invalid-feedback d-block">
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check-custom">
                    <input
                      type="checkbox"
                      className="form-check-input-custom"
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                    />
                    <label
                      className="form-check-label fw-medium"
                      htmlFor="rememberMe"
                    >
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    className="btn btn-link p-0 text-link-custom"
                    onClick={handleForgotPassword}
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary-custom w-100 mb-4"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>
              </form>

              {/* Footer */}
              <div className="text-center">
                <p className="mb-0 text-muted">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="btn btn-link p-0 text-link-custom"
                    onClick={onSwitchToSignup}
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninModal;
