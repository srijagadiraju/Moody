// import React, { createContext, useContext, useState, useEffect } from "react";

// // Create the AuthContext
// const AuthContext = createContext();

// // Custom hook to use AuthContext
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   // Check the authentication status on app load
//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       try {
//         const response = await fetch("/api/check-auth", {
//           credentials: "include",
//         });
//         console.log("Auth response:", response);
//         if (response.ok) {
//           const data = await response.json();
//           setIsAuthenticated(true);
//           setUser(data.user);
//         } else {
//           setIsAuthenticated(false);
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("Error checking authentication:", error);
//         setIsAuthenticated(false);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuthStatus();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         loading,
//         user,
//         setIsAuthenticated,
//         setUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    loading: true,
    user: null,
  });

  // Load auth state from localStorage on initial load
  useEffect(() => {
    const savedAuthState = JSON.parse(localStorage.getItem("authState"));
    if (savedAuthState) {
      setAuthState({ ...savedAuthState, loading: false });
    } else {
      setAuthState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  // Update auth state and persist it in localStorage
  const setAuth = (newState) => {
    setAuthState((prev) => {
      const updatedState = { ...prev, ...newState };
      localStorage.setItem("authState", JSON.stringify(updatedState));
      return updatedState;
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
