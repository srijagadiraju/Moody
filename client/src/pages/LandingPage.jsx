import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1 className="landing-title">Moody</h1>
      <p className="landing-description">
        Your Personalized Mental Health Assistant - Shivam
      </p>
      <div className="button-group">
        <button
          className="auth-button"
          onClick={() => navigate("/signup", { state: { isSignUp: true } })}
        >
          Sign Up
        </button>
        <button
          className="auth-button"
          onClick={() => navigate("/signup", { state: { isSignUp: false } })}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
