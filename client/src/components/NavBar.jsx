// // // import React from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import "../styles/NavBar.css";
// // // import moodyLogo from "../images/moody.png";

// // // const NavBar = () => {
// // //   const navigate = useNavigate();

// // //   const handleLogout = () => {
// // //     fetch("/api/logout")
// // //       .then((response) => {
// // //         if (response.ok) {
// // //           navigate("/"); // Navigate to the Landing Page
// // //         } else {
// // //           alert("Error logging out");
// // //         }
// // //       })
// // //       .catch((error) => console.error("Error during logout:", error));
// // //   };

// // //   return (
// // //     <div className="nav-bar">
// // //       <div className="logo-container">
// // //         <img
// // //           src={moodyLogo}
// // //           alt="Moody Logo"
// // //           className="nav-logo"
// // //           onClick={() => navigate("/")}
// // //         />
// // //       </div>
// // //       <div className="nav-buttons-container">
// // //         <button
// // //           className="nav-button"
// // //           onClick={() => navigate("/community")}
// // //         >
// // //           Community Page
// // //         </button>
// // //         <button className="nav-button" onClick={handleLogout}>
// // //           Log Out
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default NavBar;

// // // import React from "react";
// // // import "../styles/NavBar.css";
// // // import moodyLogo from "../images/moody.png";
// // // import { useNavigate } from "react-router-dom";
// // // import { useAuth } from "../AuthContext";

// // // const NavBar = () => {
// // //   const navigate = useNavigate();
// // //   const { setIsAuthenticated } = useAuth();

// // //   const handleLogout = async () => {
// // //     try {
// // //       const response = await fetch("/api/logout", {
// // //         method: "GET",
// // //         credentials: "include", // Ensures cookies are sent
// // //       });

// // //       if (response.ok) {
// // //         setIsAuthenticated(false); // Update auth state
// // //         navigate("/"); // Redirect to landing page
// // //       } else {
// // //         console.error("Logout failed");
// // //       }
// // //     } catch (err) {
// // //       console.error("Error during logout:", err);
// // //     }
// // //   };

// // //   return (
// // //     <div className="nav-bar">
// // //       <img src="/images/moody.png" alt="Moody Logo" className="nav-logo" />
// // //       <div className="nav-buttons-container">
// // //         <button className="nav-button" onClick={() => navigate("/community")}>
// // //           Community
// // //         </button>
// // //         <button className="nav-button" onClick={handleLogout}>
// // //           Log Out
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default NavBar;

// // import React from "react";
// // import "../styles/NavBar.css";
// // import moodyLogo from "../images/moody.png"; // Import the image properly
// // import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../AuthContext";

// // const NavBar = () => {
// //   const navigate = useNavigate();
// //   const { setIsAuthenticated } = useAuth();

// //   const handleLogout = async () => {
// //     try {
// //       const response = await fetch("/api/logout", {
// //         method: "GET",
// //         credentials: "include", // Ensures cookies are sent
// //       });

// //       if (response.ok) {
// //         setIsAuthenticated(false); // Update auth state
// //         navigate("/"); // Redirect to landing page
// //       } else {
// //         console.error("Logout failed");
// //       }
// //     } catch (err) {
// //       console.error("Error during logout:", err);
// //     }
// //   };

// //   return (
// //     <div className="nav-bar">
// //       {/* Use the imported image */}
// //       <img src={moodyLogo} alt="Moody Logo" className="nav-logo" />
// //       <div className="nav-buttons-container">
// //         <button className="nav-button" onClick={() => navigate("/community")}>
// //           Community
// //         </button>
// //         <button className="nav-button" onClick={handleLogout}>
// //           Log Out
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default NavBar;

// import React from "react";
// import "../styles/NavBar.css";
// import moodyLogo from "../images/moody.png"; // Import the image properly
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";

// const NavBar = () => {
//   const navigate = useNavigate();
//   const { setAuth } = useAuth(); // Use setAuth from AuthContext

//   const handleLogout = async () => {
//     try {
//       const response = await fetch("/api/logout", {
//         method: "GET",
//         credentials: "include", // Ensures cookies are sent
//       });

//       if (response.ok) {
//         // Clear authentication state
//         setAuth({
//           isAuthenticated: false,
//           user: null,
//           loading: false,
//         });

//         // Optionally clear localStorage if you're persisting auth state
//         localStorage.removeItem("authState");

//         // Redirect to the landing page
//         navigate("/");
//       } else {
//         console.error("Logout failed");
//       }
//     } catch (err) {
//       console.error("Error during logout:", err);
//     }
//   };

//   return (
//     <div className="nav-bar">
//       {/* Use the imported image */}
//       <img src={moodyLogo} alt="Moody Logo" className="nav-logo" />
//       <div className="nav-buttons-container">
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

const NavBar = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth(); // Use setAuth from AuthContext

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "GET",
        credentials: "include", // Ensures cookies are sent
      });

      if (response.ok) {
        // Clear authentication state
        setAuth({
          isAuthenticated: false,
          user: null,
          loading: false,
        });

        // Optionally clear localStorage if you're persisting auth state
        localStorage.removeItem("authState");

        // Redirect to the landing page
        navigate("/");
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
        <button className="nav-button" onClick={() => navigate("/mood-selection")}>
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
