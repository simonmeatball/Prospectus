import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./RegisterPage.jsx";
import LoginPage from "./LoginPage.jsx";
import PostPage from "./PostPage.jsx";
import UploadPage from "./UploadPage.jsx";
import PostsPage from "./PostsPage.jsx";
import ProfilePage from "./ProfilePage.jsx";
import "../styles/App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div class="pt-16">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/post/:postID" element={<PostPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  </React.StrictMode>
);
