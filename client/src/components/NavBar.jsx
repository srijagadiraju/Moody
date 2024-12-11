import React from "react";
import "../styles/NavBar.css";
import moodyLogo from "../images/moody.png"; // Import the image properly
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const backendUrl = "https://moody-backend.onrender.com"; // Add backendUrl here

const NavBar = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth(); // Use setAuth from AuthContext

  const handleLogout = () => {
    fetch(`${backendUrl}/api/logout`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            console.error("Backend logout error:", error);
            throw new Error("Logout failed on backend.");
          });
        }
        console.log("Backend confirmed logout.");

        // Clear authentication state
        setAuth({
          isAuthenticated: false,
          user: null,
          loading: false,
        });

        // Clear localStorage if persisting auth state
        localStorage.removeItem("authState");

        // Redirect to the landing page
        navigate("/");
      })
      .catch((error) => console.error("Error during logout:", error));
  };

  return (
    <div className="nav-bar">
      {/* Use the imported image */}
      <img src={moodyLogo} alt="Moody Logo" className="nav-logo" />
      <div className="nav-buttons-container">
        <button
          className="nav-button"
          onClick={() => navigate("/mood-selection")}
        >
          Mood Selection
        </button>
        <button className="nav-button" onClick={() => navigate("/community")}>
          Community
        </button>
        <button className="nav-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default NavBar;
