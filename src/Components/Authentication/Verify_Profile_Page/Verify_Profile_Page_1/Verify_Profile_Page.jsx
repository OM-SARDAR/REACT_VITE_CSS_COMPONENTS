import React, { useEffect, useState } from "react";
import "./Verify_Profile_Page.css";

const VerifyProfilePage = () => {
  // Demo data (normally from URL)
  const token = "demo_token";
  const name = "Demo User";
  const email = "demo@example.com";

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const validateMobileNumber = (mobileNumber) => /^\d{10}$/.test(mobileNumber);

  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    // Simulated upload progress (UI only)
    setUploadProgress(0);
    let progress = 0;

    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);

      if (progress >= 100) clearInterval(interval);
    }, 150);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Mobile validation (UI only)
    if (!validateMobileNumber(phone)) {
      setError("Please enter a valid mobile number (10 digits).");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setSuccess("Profile verified successfully! (Demo Mode)");
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="VerifyProfilePage-body">
      <div className="VerifyProfilePage-user-profile-container">
        <h1>Verify Your Profile</h1>

        {error && <p className="VerifyProfilePage-error-message">{error}</p>}
        {success && (
          <p className="VerifyProfilePage-success-message">{success}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="VerifyProfilePage-form-group">
            <label>UserName</label>
            <input type="text" value={name} disabled />
          </div>

          <div className="VerifyProfilePage-form-group">
            <label>Email</label>
            <input type="email" value={email} disabled />
          </div>

          <div className="VerifyProfilePage-form-group">
            <label>Address</label>
            <input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="VerifyProfilePage-form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="VerifyProfilePage-form-group">
            <label>Gender (Optional)</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* UI-only file upload */}
          <input
            type="file"
            className="form-control"
            id="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
          />

          {files.length > 0 && (
            <div style={{ marginTop: "10px" }}>
              <strong>Selected Files:</strong>
              <ul>
                {files.map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ margin: "10px 0" }}>
            Upload Progress: {uploadProgress}%
          </div>

          <button
            className="VerifyProfilePage-Verify-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyProfilePage;
