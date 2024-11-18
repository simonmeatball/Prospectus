import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "../components/Navbar.jsx";
import Profile from "../components/Profile.jsx"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Navbar />
    <Profile />
  </React.StrictMode>
);
