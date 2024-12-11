import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

// const backendUrl = "https://moody-backend.onrender.com";
const backendUrl = "https://moody-be.onrender.com";
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      console.log(
        "User has logged out and is being redirected to the login page."
      );

      // Attempt a backend verification of logout
      fetch(`${backendUrl}/api/check-auth`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            console.log("Backend indicates user is not authenticated.");
          } else {
            console.log(
              "Backend indicates user is still authenticated. This might be an error."
            );
          }
        })
        .catch((error) => {
          console.log("Error connecting to backend for auth check:", error);
        });
    }
  }, [isAuthenticated, loading]);

  console.log("Loading:", loading);
  console.log("Is Authenticated:", isAuthenticated);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
