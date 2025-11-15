import React, { useState, useEffect } from "react";
import "./OTP_Page.css";

const OtpInput = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // DEMO OTP (no backend)
  const demoOtp = "1234";

  const handleChange = (element, index) => {
    let newOtp = [...otp];
    if (isNaN(element.value)) return;

    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    let newOtp = [...otp];
    if (e.key === "Backspace") {
      if (newOtp[index] === "") {
        if (index > 0) {
          newOtp[index - 1] = "";
          setOtp(newOtp);
          document.getElementById(`otp-${index - 1}`).focus();
        }
      } else {
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleVerifyOtp = () => {
    setIsSubmitting(true);
    const enteredOtp = otp.join("");

    setTimeout(() => {
      if (enteredOtp === demoOtp) {
        alert("Demo: OTP Verified Successfully!");
      } else {
        alert("Demo: Invalid OTP");
      }
      setIsSubmitting(false);
    }, 800);
  };

  const handleResendOtp = () => {
    setOtp(new Array(4).fill(""));
    setTimer(30);
    setIsResendDisabled(true);

    alert("Demo: New OTP Sent!");
  };

  // Timer countdown
  useEffect(() => {
    let interval = null;

    if (isResendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
    }

    return () => clearInterval(interval);
  }, [isResendDisabled, timer]);

  return (
    <div className="otp-body-container">
      <div className="otp-outer-container otp-reset">
        <div className="otp-inner-container otp-container">
          <h3 className="otp-header">Enter OTP</h3>

          <div className="otp-input-container">
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="number"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e.target, index)}
                className="otp-input-box"
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
                disabled={isSubmitting}
              />
            ))}
          </div>

          <button
            onClick={handleVerifyOtp}
            className="otp-verify-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "VERIFY OTP"}
          </button>

          <button
            onClick={handleResendOtp}
            disabled={isResendDisabled}
            className={`otp-resend-button ${
              isResendDisabled ? "otp-disabled" : "otp-enabled"
            }`}
          >
            RESEND OTP
          </button>

          <p className="otp-timer-text">
            You can resend OTP after {timer} seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpInput;
