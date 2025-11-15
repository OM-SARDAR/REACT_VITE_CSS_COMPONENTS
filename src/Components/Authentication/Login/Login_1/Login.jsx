import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import "./Login.css";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error] = useState("");
  const [success] = useState("");

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setFormData({ name: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // UI-only submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      isSignUp
        ? "Sign Up (Demo Only — No Backend)"
        : "Sign In (Demo Only — No Backend)"
    );
  };

  return (
    <div className="LOGIN-body">
      <div className="Background-goldandblack">
        <div
          className={`LOGIN-container ${isSignUp ? "active" : ""}`}
          id="LOGIN-container"
        >
          <div className={`form-container ${isSignUp ? "sign-up" : "sign-in"}`}>
            <form onSubmit={handleSubmit}>
              <h1>{isSignUp ? "Create Account" : "Sign In"}</h1>

              <div className="LOGIN-social-icons">
                <a className="icon" style={{ cursor: "pointer" }}>
                  <FontAwesomeIcon icon={faGoogle} />
                </a>
              </div>

              <span>
                {isSignUp
                  ? "or use your email for registration"
                  : "or use your email and password"}
              </span>

              {isSignUp && (
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              )}

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              {!isSignUp && (
                <Link to="/forgetpassword">Forget Your Password?</Link>
              )}

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? isSignUp
                    ? "Signing up..."
                    : "Signing in..."
                  : isSignUp
                  ? "Sign Up"
                  : "Sign In"}
              </button>

              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}
            </form>
          </div>

          <div className="LOGIN-toggle-container">
            <div className="LOGIN-toggle">
              <div className="LOGIN-toggle-panel LOGIN-toggle-left">
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use all site features</p>
                <button className="LOGIN-hidden" onClick={handleToggle}>
                  Sign In
                </button>
              </div>

              <div className="LOGIN-toggle-panel LOGIN-toggle-right">
                <h1>Hello, Friend!</h1>
                <p>
                  Register with your personal details to use all site features
                </p>
                <button className="LOGIN-hidden" onClick={handleToggle}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
