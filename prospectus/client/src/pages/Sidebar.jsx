import React, { useState, useEffect } from 'react';
import { Users, Search, Rss, UserPen, FileText } from 'lucide-react';
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

    const { user } = useAuth();
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


    const getMaxLikes = () => {
        const likeCounts = [];

        for (let i = 0; i < posts.length; i++) {
            likeCounts.push(posts[i].likes);
        }

        const max1 = Math.max(...likeCounts);


        const indexOfMax1 = likeCounts.indexOf(max1);

        const arrayWithoutMax1 = [...likeCounts];
        arrayWithoutMax1.splice(indexOfMax1, 1);

        const max2 = Math.max(...arrayWithoutMax1);

        const indexOfMax2 = arrayWithoutMax1.indexOf(max2);

        // Adjust the index of max2 to account for the removed value of max1
        const finalIndexOfMax2 = (indexOfMax2 >= indexOfMax1) ? indexOfMax2 + 1 : indexOfMax2;

        return [indexOfMax1, finalIndexOfMax2];
    }

    const getpdfPosts = () => {
        const pdfs = [];
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].fileType === "application/pdf") {
                pdfs.push(posts[i]);
            }
        }

        return pdfs;
    }

    const getimagePosts = () => {
        const images = [];
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].fileType !== "application/pdf") {
                images.push(posts[i]);
            }
        }

        return images;
    }


    const displayPostsByCategory = () => {   // ALL THE POST CATEGORIES 
        switch (activeCategory) {
            case 'new':
                return (
                    <div className="flex justify-start items-start ml-72  max-w-10xl min-h-screen ">
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
                    <div className="flex justify-start items-start ml-72  max-w-10xl  min-h-screen">
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

            case 'popular':
                const maxLikes = getMaxLikes(); // get the indices of the 2 posts with the most likes
                return (
                    <div className="flex justify-start items-start ml-72  max-w-10xl min-h-screen ">
                        <div className="grid grid-cols-1 px-4">
                            <h1 className="text-3xl text-center text-white font-bold drop-shadow-m animate-bounce">
                                <span style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>
                                    Most Popular 🌟
                                </span>
                            </h1>

                            <PostCard key={posts[maxLikes[0]]._id} post={posts[maxLikes[0]]} />
                            <PostCard key={posts[maxLikes[1]]._id} post={posts[maxLikes[1]]} />
                        </div>
                    </div>
                );

            case 'pdf':
                const pdfs = getpdfPosts();
                return (
                    <div className="flex justify-start items-start ml-72  max-w-10xl min-h-screen ">
                        <div className="grid grid-cols-1 px-4">
                            <h1 className="text-3xl text-center text-white font-bold drop-shadow-m animate-bounce">
                                <span style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>
                                    PDFs 📄
                                </span>
                            </h1>


                            {pdfs.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}

                        </div>
                    </div>
                );

            case 'image':
                const images = getimagePosts();
                return (
                    <div className="flex justify-start items-start ml-72 max-w-10xl min-h-screen ">
                        <div className="grid grid-cols-1 px-4">
                            <h1 className="text-3xl text-center text-white font-bold drop-shadow-m animate-bounce">
                                <span style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>
                                    Images 📸
                                </span>
                            </h1>


                            {images.map((post) => (
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

                    <hr className="border-black" />


                    <div className="flex items-center w-full p-3 rounded-lg ">
                        <div className="mr-3 font-semibold">TOPICS</div>
                    </div>


                    <button onClick={() => setActiveCategory('editors')} className="flex items-center w-full p-3 rounded-lg hover:bg-white">
                        <UserPen strokeWidth={3} />
                        <div className="ml-2 z-0">Editor's Choice</div>
                    </button>

                    <button onClick={() => setActiveCategory('new')} className="flex items-center w-full p-3 rounded-lg hover:bg-white">
                        <Rss strokeWidth={3} />
                        <div className="ml-2">New</div>
                    </button>

                    <button onClick={() => setActiveCategory('popular')} className="flex items-center w-full p-3 rounded-lg hover:bg-white">
                        <Users strokeWidth={3} />
                        <div className="ml-2">Most Popular</div>
                    </button>

                    <button onClick={() => setActiveCategory('pdf')} className="flex items-center w-full p-3 rounded-lg hover:bg-white">
                        <FileText strokeWidth={3} />
                        <div className="ml-2">PDFs</div>
                    </button>

                    <button onClick={() => setActiveCategory('image')} className="flex items-center w-full p-3 rounded-lg hover:bg-white">
                        <FileText strokeWidth={3} />
                        <div className="ml-2">Images</div>
                    </button>

                    <hr className="border-black" />

                    <br />




                    {/* <div className="ml-2 mt-3 w-12 h-12 rounded-full overflow-hidden">
                        <img
                            alt="Avatar"
                            src={user?.avatarUrl || "https://via.placeholder.com/150"}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <p className="font-semibold">{user?.username || "Guest"}</p> */}

                </nav>

            </div>

            {displayPostsByCategory()}
        </>
    );
};

export default Sidebar;
