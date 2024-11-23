import React from "react";
import "../styles/NavBar.css";
import moodyLogo from "../images/moody.png"; // Import the image properly
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "GET",
        credentials: "include", // Ensures cookies are sent
      });

      if (response.ok) {
        setIsAuthenticated(false); // Update auth state
        navigate("/"); // Redirect to landing page
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <div className="nav-bar">
      {/* Use the imported image */}
      <img src={moodyLogo} alt="Moody Logo" className="nav-logo" />
      <div className="nav-buttons-container">
        {/* Button to navigate to the Community Page */}
        <button className="nav-button" onClick={() => navigate("/community")}>
          Community
        </button>

        {/* Button to navigate to the Profile Page */}
        <button className="nav-button" onClick={() => navigate("/profile")}>
          Profile
        </button>

        {/* New button for "How I'm feeling" */}
        <button className="nav-button" onClick={() => navigate("/mood-selection")}>
          How I feel today
        </button>

        {/* Button to log out */}
        <button className="nav-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default NavBar;
