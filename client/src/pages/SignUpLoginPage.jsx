import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../styles/SignUpLoginPage.css";

const SignUpLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth(); // Use the auth context

  const [isSignUp, setIsSignUp] = useState(location.state?.isSignUp ?? true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [prefilledLoginData, setPrefilledLoginData] = useState(null);

  const backendUrl = "https://moody-be.onrender.com"; // Backend base URL

  useEffect(() => {
    if (!isSignUp && prefilledLoginData) {
      setFormData(prefilledLoginData);
    }
  }, [isSignUp, prefilledLoginData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignUp
      ? `${backendUrl}/api/signup`
      : `${backendUrl}/api/login`;
    const body = isSignUp
      ? formData
      : { email: formData.email, password: formData.password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to process request");
      }

      const data = await response.json();
      console.log("Server response:", data);

      if (isSignUp) {
        setIsSignUp(false);
        setPrefilledLoginData({
          email: formData.email,
          password: formData.password,
        });
        alert("Sign up successful! Please log in.");
      } else if (data.message && data.message.includes("successful")) {
        setAuth({ isAuthenticated: true, user: data.user, loading: false });
        navigate("/mood-selection");
      }
    } catch (err) {
      console.error("Error:", err.message);
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="auth-container">
      <button className="back-arrow" onClick={() => navigate("/")}>
        ← Back
      </button>
      <div className="toggle-buttons">
        <button
          className={`toggle-button ${isSignUp ? "active" : ""}`}
          onClick={() => setIsSignUp(true)}
        >
          Sign Up
        </button>
        <button
          className={`toggle-button ${!isSignUp ? "active" : ""}`}
          onClick={() => setIsSignUp(false)}
        >
          Log In
        </button>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </>
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
          <button type="submit">{isSignUp ? "Register" : "Login"}</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpLoginPage;
