import React from "react";
import ReactDOM from "react-dom/client";
import App from "../components/App.jsx";
import Button from "../components/Button.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <div class="flex items-center justify-center">
      <Button />
    </div>
  </React.StrictMode>
);
