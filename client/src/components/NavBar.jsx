// import React from "react";
// import "../styles/NavBar.css";
// import moodyLogo from "../images/moody.png"; // Import the image properly
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";

// const NavBar = () => {
//   const navigate = useNavigate();
//   const { setAuth } = useAuth(); // Use setAuth from AuthContext

//   const handleLogout = () => {
//     fetch(`${backendUrl}/api/logout`, {
//       method: "GET",
//       credentials: "include", // Ensure the session cookie is sent
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Logout failed");
//         }
//         console.log("Logout successful");
//         // Redirect to login or clear local state
//         window.location.href = "/login";
//       })
//       .catch((error) => console.error("Error during logout:", error));
//   };
  

//   // const handleLogout = async () => {
//   //   try {
//   //     const response = await fetch("/api/logout", {
//   //       method: "GET",
//   //       credentials: "include", // Ensures cookies are sent
//   //     });

//   //     if (response.ok) {
//   //       // Clear authentication state
//   //       setAuth({
//   //         isAuthenticated: false,
//   //         user: null,
//   //         loading: false,
//   //       });

//   //       // Optionally clear localStorage if you're persisting auth state
//   //       localStorage.removeItem("authState");

//   //       // Redirect to the landing page
//   //       navigate("/");
//   //     } else {
//   //       console.error("Logout failed");
//   //     }
//   //   } catch (err) {
//   //     console.error("Error during logout:", err);
//   //   }

//   return (
//     <div className="nav-bar">
//       {/* Use the imported image */}
//       <img src={moodyLogo} alt="Moody Logo" className="nav-logo" />
//       <div className="nav-buttons-container">
//         <button
//           className="nav-button"
//           onClick={() => navigate("/mood-selection")}
//         >
//           Mood Selection
//         </button>
//         <button className="nav-button" onClick={() => navigate("/community")}>
//           Community
//         </button>
//         <button className="nav-button" onClick={handleLogout}>
//           Log Out
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NavBar;

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
      credentials: "include", // Ensure the session cookie is sent
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Logout failed");
        }
        console.log("Logout successful");
        // Clear authentication state
        setAuth({
          isAuthenticated: false,
          user: null,
          loading: false,
        });

        // Clear localStorage if persisting auth state
        localStorage.removeItem("authState");

        // Redirect to the login page
        navigate("/login");
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