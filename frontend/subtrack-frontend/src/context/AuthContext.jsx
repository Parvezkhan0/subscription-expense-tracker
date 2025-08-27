import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("subtrack_user");
    console.log("Initial user state:", savedUser);
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password) => {
    console.log("AuthContext: login called with", { email, password });
    try {
      // Login endpoint expects URL-encoded form data, not FormData object
      const formData = new URLSearchParams();
      formData.append('username', email); // FastAPI OAuth2 expects 'username'
      formData.append('password', password);
      
      console.log("AuthContext: making API call to /auth/login");
      const response = await api.post("/auth/login", formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      console.log("AuthContext: API response:", response.data);
      
      // Handle response
      const userData = response.data.user || response.data;
      const token = response.data.token || response.data.access_token;
      
      console.log("AuthContext: setting user and token", { userData, token });
      setUser(userData);
      localStorage.setItem("subtrack_user", JSON.stringify(userData));
      localStorage.setItem("subtrack_token", token);
      
      return { success: true };
    } catch (err) {
      console.error("AuthContext: Login error:", err);
      const errorMessage = err.response?.data?.detail || 
                          err.response?.data?.message || 
                          "Login failed";
      return { success: false, error: errorMessage };
    }
  };

  const register = async (email, password, name) => {
    console.log("AuthContext: register called with", { email, password, name });
    try {
      const response = await api.post("/auth/signup", { 
        email, 
        password, 
        name,
        full_name: name // Some backends expect full_name
      });
      
      console.log("AuthContext: register response:", response.data);
      
      // Handle response
      const userData = response.data.user || response.data;
      const token = response.data.token || response.data.access_token;
      
      setUser(userData);
      localStorage.setItem("subtrack_user", JSON.stringify(userData));
      localStorage.setItem("subtrack_token", token);
      
      return { success: true };
    } catch (err) {
      console.error("AuthContext: Register error:", err);
      const errorMessage = err.response?.data?.detail || 
                          err.response?.data?.message || 
                          "Registration failed";
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    console.log("AuthContext: logout called");
    setUser(null);
    localStorage.removeItem("subtrack_user");
    localStorage.removeItem("subtrack_token");
  };

  useEffect(() => {
    const token = localStorage.getItem("subtrack_token");
    console.log("AuthContext: useEffect - token:", token);
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [user]);

  console.log("AuthContext: current user state:", user);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export const useAuth = () => useContext(AuthContext);
