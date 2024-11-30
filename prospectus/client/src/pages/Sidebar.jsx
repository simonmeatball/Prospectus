import React, { useState } from 'react';

import { House, Search, CloudUpload, UserPen, Settings, LogOut } from 'lucide-react'; // Replace with your actual imports

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
    const [isHovered, setIsHovered] = useState(false);

    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const sidebarStyle = {
        height: '56vh', // Full height
        width: isHovered ? '16rem' : '4rem', // Full width on hover, small width by default
        opacity: isHovered ? 1 : 0.1, // Fully visible on hover
        transition: 'all 0.5s ease-in-out', // Smooth transition for width and opacity
        position: 'fixed',
        top: 0,
        left: 0,
        padding: '1rem',
        overflow: 'hidden',

    };

    return (
        <div
            style={sidebarStyle}
            onMouseEnter={() => setIsHovered(true)} // Set hover state to true when mouse enters
            onMouseLeave={() => setIsHovered(false)} // Set hover state to false when mouse leaves
        >
            <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                <div
                    role="button"
                    className="flex items-center w-full p-3 transition-all rounded-lg hover:bg-blue-200"
                >
                    <div className="grid place-items-center" />
                    <House strokeWidth={3} />
                    <div className="ml-2">Dashboard</div>
                </div>

                <div
                    role="button"
                    className="flex items-center w-full p-3 transition-all rounded-lg hover:bg-blue-200"
                >

                    <Link to="/" className="flex items-center">
                        <Search strokeWidth={3} />
                        <div className="ml-2">Explore</div>
                    </Link>
                </div>

                <div
                    role="button"
                    className="flex items-center w-full p-3 transition-all rounded-lg hover:bg-blue-200"
                >

                    <Link to="/upload" className="flex items-center">
                        <CloudUpload strokeWidth={3} />
                        <div className="ml-2">Upload</div>
                    </Link>
                </div>

                <div
                    role="button"
                    className="flex items-center w-full p-3 transition-all rounded-lg hover:bg-blue-200"
                >

                    <Link to={`/profile/${user?.username}`} className="flex items-center">
                        <UserPen strokeWidth={3} />
                        <div className="ml-2">
                            Profile </div>
                    </Link>


                </div>

                <button className="flex items-center w-full p-3 transition-all rounded-lg hover:bg-blue-200">
                    <div className="flex grid place-items-center" />
                    <Settings strokeWidth={3} />
                    <div className="ml-2">Settings</div>
                </button>

                <button
                    onClick={handleLogout}
                    className="flex items-center w-full p-3 transition-all rounded-lg hover:bg-blue-200"
                >
                    <div className="grid place-items-center" />
                    <LogOut strokeWidth={3} />
                    <div className="ml-2">Log Out</div>
                </button>

                <div className="ml-2 mt-3 w-12 h-12 rounded-full overflow-hidden">
                    <img
                        alt="Avatar"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        className="object-cover w-full h-full"
                    />

                    
                </div>
                <p className = "font-semibold"> {user?.username} </p>
                

            </nav>
        </div>
    );
};

export default Sidebar;
