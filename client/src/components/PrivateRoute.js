// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";

// const PrivateRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();

//   console.log("Loading:", loading);
//   console.log("Is Authenticated:", isAuthenticated);

//   if (loading) return <div>Loading...</div>;

//   return isAuthenticated ? children : <Navigate to="/" />;
// };

// export default PrivateRoute;

// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";

// const PrivateRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();

//   console.log("Loading:", loading);
//   console.log("Is Authenticated:", isAuthenticated);

//   if (loading) return <div>Loading...</div>;

//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;

import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      console.log("User is not authenticated. Redirecting to login page.");
    }
  }, [isAuthenticated, loading]);

  console.log("Loading:", loading);
  console.log("Is Authenticated:", isAuthenticated);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
