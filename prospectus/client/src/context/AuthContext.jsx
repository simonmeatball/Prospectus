import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    return !!token && !!storedUser;
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      updateProfilePic(userData.userId);
    }
  }, []);

  const updateProfilePic = async (userId) => {
    try {
      setProfilePic(`${API_BASE_URL}/users/${userId}/profile-pic`);
    } catch (err) {
      console.error("Error setting profile pic URL:", err);
      setProfilePic(
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
      );
    }
  };

  const login = async (userData) => {
    try {
      // Fetch complete user data
      const response = await axios.get(
        `${API_BASE_URL}/users/${userData.userId}`
      );
      const completeUserData = response.data;

      setIsAuthenticated(true);
      setUser(completeUserData);
      localStorage.setItem("user", JSON.stringify(completeUserData));
      await updateProfilePic(userData.userId);
    } catch (err) {
      console.error("Error fetching complete user data:", err);
      // Fallback to basic user data if fetch fails
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      await updateProfilePic(userData.userId);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setProfilePic(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        user,
        profilePic,
        updateProfilePic,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
