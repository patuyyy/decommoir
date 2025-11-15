import React, { createContext, useState, useContext } from "react";
import { loginUser } from "../actions/auth.actions";
import { registerUserWithGoogle } from "../actions/auth.actions";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [googleToken, setGoogleToken] = useState(null);

  const login = async (credentials) => {
    try {
      const result = await loginUser(credentials);
      const token = result.data.token;
      const user = result.data.user;

      setToken(token);
      setUser(user);

      return { user, token };
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const setGoogleAuthToken = (token) => {
    setGoogleToken(token);
  };

  const clearGoogleAuthToken = () => {
    setGoogleToken(null);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const authFetch = async (url, options = {}) => {
    if (!token) throw new Error("No token in memory");
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
    return fetch(url, { ...options, headers });
  };

  return (
    <AuthContext.Provider value={{ user, token, googleToken, login, logout, authFetch, setGoogleAuthToken, clearGoogleAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
