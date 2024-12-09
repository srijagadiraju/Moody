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
