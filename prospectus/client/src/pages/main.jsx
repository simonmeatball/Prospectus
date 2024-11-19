import React from "react";
import ReactDOM from "react-dom/client";
import '../styles/App.css';
import Navbar from "./Navbar.jsx";
import PostPage from "./PostPage.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Navbar />
    <PostPage />
  </React.StrictMode>
);
