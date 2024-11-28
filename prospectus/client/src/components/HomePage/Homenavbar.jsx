import React from "react";
import PrivacyModal from "./Privacy.jsx";

export default function Homenavbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-2">
        <a href="mailto:prospectusucla@gmail.com" className="btn btn-ghost text-xl">Contact Us
        </a>

        <PrivacyModal/>
      </div>

    </div>

  );
}