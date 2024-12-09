import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  console.log("Loading:", loading);
  console.log("Is Authenticated:", isAuthenticated);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
