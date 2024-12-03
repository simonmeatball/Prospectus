import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


import Logo1 from "../../images/logo1.png";

export default function Homenavbar() {
  const { isAuthenticated, logout , user} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="navbar bg-base-100 fixed top-0 z-10 bg-white ">
      <div className="flex-1">

        <img className="w-16" src = {Logo1} draggable="false"/>
        <div className=" text-amber-500 text-center font-bold italic text-2xl tracking-wide" >
                prospectus
        </div>
        
      </div>
      
    </div>
  );
  
}