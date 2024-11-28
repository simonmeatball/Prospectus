import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import LoginPage from "./LoginPage.jsx";
import PostPage from "./PostPage.jsx";
import UploadPage from "./UploadPage.jsx";
import PostsPage from "./PostsPage.jsx";
import "../styles/App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div class="pt-16">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/posts" element={<PostsPage />} />
        </Routes>
      </Router>
    </div>
  </React.StrictMode>
);
