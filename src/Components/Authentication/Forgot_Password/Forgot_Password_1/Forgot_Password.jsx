import React, { useState } from "react";
import "./Forgot_Password.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // UI-only demo submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    setTimeout(() => {
      if (email.trim() === "") {
        setError("Please enter your email.");
      } else {
        alert(`Demo: OTP would be sent to ${email}`);
      }

      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="FORGET-body">
      <div className="FORGET-user-profile-container">
        <h1>Forget Password</h1>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="FORGET-form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="FORGET-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending OTP..." : "Forget Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
