import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage.jsx";
import RegisterPage from "./RegisterPage.jsx";

import PostPage from "./PostPage.jsx";
import UploadPage from "./UploadPage.jsx";
import PostsPage from "./PostsPage.jsx";
import ProfilePage from "./ProfilePage.jsx";
import HomePage from "./HomePage.jsx";
import ProfileSettingsPage from "./ProfileSettingsPage.jsx";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "@/components/ui/sonner"
import "../styles/App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <div className="pt-16">
        <Router>
          <Routes>
            <Route path="/" element={<PostsPage />} />

            <Route path ="/home" element = {<HomePage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/post/:postID" element={<PostPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/profile/:username/settings" element={<ProfileSettingsPage />} />
          </Routes>
        </Router>
        <Toaster />
      </div>
    </AuthProvider>
  </React.StrictMode>
);
