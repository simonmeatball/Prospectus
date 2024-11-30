import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { House, Search, Rss, UserPen, Settings, LogOut } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import axios from "axios";
import { API_BASE_URL } from "../config";
import PostCard from "../components/PostCard";
import { useAuth } from "../context/AuthContext";



const Sidebar = () => {

    const [activeCategory, setActiveCategory] = useState('editors'); // Default category to "new"
    //const [showNewPosts, setShowNewPosts] = useState(false);
    //const [showEditorsPicks, setEditorsPicks] = useState(true);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/posts`);
                if (response.data?.success) {
                    setPosts(response.data.data);
                }
            } catch (err) {
                setError(err.message);
                console.error("Error fetching posts:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };



    const displayPostsByCategory = () => {
        switch (activeCategory) {
            case 'new':
                return (
                    <div className="flex justify-start items-start ml-72 ">
                        <div className="grid grid-cols-1 px-4">
                            <h1 className="text-3xl text-center text-white font-bold drop-shadow-m animate-bounce">
                                <span style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>
                                    New ✨
                                </span>
                            </h1>
                            {posts.slice(-2).map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>
                    </div>
                );
            case 'editors':
                return (
                    <div className="flex justify-start items-start ml-72 ">
                        <div className="grid grid-cols-1 px-4">
                            <h1 className="text-3xl text-center text-white font-bold drop-shadow-m animate-bounce">
                                <span style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>
                                    Editor's Choice ⭐ 
                                </span>
                            </h1>
                            {posts.slice(0, 2).map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>
                    </div>
                );
                default:
                return null;
        }
    };

    const sidebarStyle = {
        height: '64vh',
        width: isHovered ? '16rem' : '4rem',
        opacity: isHovered ? 1 : 0.1,
        transition: 'all 0.5s ease-in-out',
        position: 'fixed',
        top: 0,
        left: 0,
        padding: '1rem',
        overflow: 'hidden',
    };

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Navbar />
                <div className="flex justify-center items-center h-screen">
                    <div className="text-red-500">Error: {error}</div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div
                style={sidebarStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans ">

                    

                    <Link to="/" className="flex items-center w-full p-3 rounded-lg hover:bg-white mt-16">
                        <Search strokeWidth={3} />
                        <div className="ml-2">Explore</div>
                    </Link>

                    <div className="flex items-center w-full p-3 rounded-lg ">
                        <div className="mr-3 font-semibold">TOPICS</div>
                    </div>


                    <button onClick={() => setActiveCategory('editors')} className="flex items-center w-full p-3 rounded-lg hover:bg-white">
                        <UserPen strokeWidth={3} />
                        <div className="ml-2">Editor's Choice</div>
                    </button>

                    <button onClick={() => setActiveCategory('new')} className="flex items-center w-full p-3 rounded-lg hover:bg-white">
                        <Rss strokeWidth={3} />
                        <div className="ml-2">New</div>
                    </button>

                    <button onClick={handleLogout} className="flex items-center w-full p-3 rounded-lg hover:bg-white">
                        <LogOut strokeWidth={3} />
                        <div className="ml-2">Logout</div>
                    </button>
                    <div className="ml-2 mt-3 w-12 h-12 rounded-full overflow-hidden">
                        <img
                            alt="Avatar"
                            src={user?.avatarUrl || "https://via.placeholder.com/150"}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <p className="font-semibold">{user?.username || "Guest"}</p>
                </nav>

            </div>

            {displayPostsByCategory()}
        </>
    );
};

export default Sidebar;
