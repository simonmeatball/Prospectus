import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./RegisterPage.jsx";
import LoginPage from "./LoginPage.jsx";
import PostPage from "./PostPage.jsx";
import "../styles/App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} /> {/*Register page */}
        <Route path="/login" element={<LoginPage />} /> {/*Login page */}
        <Route path="/post" element={<PostPage />} /> {/*Post page */}
      </Routes>
    </Router>
  </React.StrictMode>
);
