import React, { useState } from "react";
import "./Reset_Password.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simple front-end validation
    setTimeout(() => {
      if (newPassword.trim() === "" || confirmPassword.trim() === "") {
        alert("Please fill in both fields");
        setIsSubmitting(false);
        return;
      }

      if (newPassword !== confirmPassword) {
        alert("Passwords do not match");
        setIsSubmitting(false);
        return;
      }

      // Demo only – no backend
      alert("Demo: Password reset successful!");

      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="ResetPassword-body">
      <div className="ResetPassword-user-profile-container">
        <h1>Reset Password</h1>

        <form onSubmit={handleSubmit}>
          <div className="ResetPassword-form-group">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="ResetPassword-form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="ResetPassword-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
