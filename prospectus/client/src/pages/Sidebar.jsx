import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Users, Search, Rss, UserPen, FileText, Image } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import axios from "axios";
import { API_BASE_URL } from "../config";
import PostCard from "../components/PostCard";

import ucla from "../images/ucla.png"
import usc from "../images/usc.png"




const Sidebar = () => {


    const [activeCategory, setActiveCategory] = useState('editors'); // Default category to "new"


    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isHovered, setIsHovered] = useState(false);





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
        if (!posts || posts.length === 0) return [];
        
        const likeCounts = posts.map(post => post.likes || 0);
        
        if (posts.length === 1) return [0];
        
        const max1 = Math.max(...likeCounts);
        const indexOfMax1 = likeCounts.indexOf(max1);
        
        const arrayWithoutMax1 = [...likeCounts];
        arrayWithoutMax1[indexOfMax1] = -1; // Set to -1 instead of removing to keep indices intact
        
        const max2 = Math.max(...arrayWithoutMax1);
        const indexOfMax2 = arrayWithoutMax1.indexOf(max2);
        
        return [indexOfMax1, indexOfMax2];
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
            if (posts[i].image && posts[i].fileType !== "application/pdf") {
                images.push(posts[i]);
            }
        }

        return images;
    }

    const getPostsWithTags = (desiredTag) => {
        const desiredTagLower = desiredTag.toLowerCase(); // Convert desiredTag to lowercase
        return posts.filter((post) =>
            post.tags.some((tag) => tag.toLowerCase() === desiredTagLower) // Convert each tag to lowercase
        );
    };


    const displayPostsByCategory = () => {   // ALL THE POST CATEGORIES 
        switch (activeCategory) {

            case 'editors':
                return (
                    <div className="container mx-auto pl-56 flex justify-center items-start w-full min-h-screen">
                        <div className="flex flex-col items-center w-full px-4"> {/* Use flex for vertical alignment */}
                            <h1 className="text-3xl text-center text-black font-bold drop-shadow-m animate-bounce">
                                <span style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>
                                    Editor's Choice ⭐
                                </span>
                            </h1>

                            <div className="flex flex-wrap justify-center w-full">
                                {posts.slice(0, 2).map((post) => (
                                    <div
                                        key={post._id}
                                        className="lg:w-80 md:w-50 sm:w-30 h-auto bg-amber-200 rounded-sm shadow-md overflow-hidden mx-auto mt-6"
                                        style={{ minWidth: '320px' }}
                                    >
                                        <PostCard post={post} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'new':
                return (
                    <div className="container mx-auto pl-56 flex justify-center items-start w-full min-h-screen">
                        <div className="flex flex-col items-center w-full px-4">

                            <h1 className=" text-3xl text-center text-black font-bold drop-shadow-m animate-bounce">
                                <span style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>
                                    New ✨
                                </span>
                            </h1>

                            <div className="flex flex-wrap justify-center w-full">
                                {posts.slice(-2).map((post) => (

                                    <div
                                        key={post._id}
                                        className="lg:w-80 md:w-50 sm:w-30 h-auto bg-amber-200 rounded-sm shadow-md overflow-hidden mx-auto mt-6"
                                        style={{ minWidth: '320px' }}
                                    >
                                        <PostCard post={post} />
                                    </div>
                                ))}

                            </div>


                        </div>

                    </div>
                );



            case 'popular':
                const maxLikes = getMaxLikes(); // get the indices of the 2 posts with the most likes
                return (
                    <div className="container mx-auto pl-56 flex justify-center items-start w-full min-h-screen ">
                        <div className="flex flex-col items-center w-full px-4">
                            <h1 className="text-3xl text-center text-black font-bold drop-shadow-m  animate-bounce">
                                <span style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>
                                    Most Popular 🌟
                                </span>
                            </h1>

                            <div className="flex flex-wrap justify-center w-full">
                                {maxLikes.length > 0 ? (
                                    <>
                                        <div
                                            key={posts[maxLikes[0]]._id}
                                            className="lg:w-80 md:w-50 sm:w-30 h-auto bg-amber-200 rounded-sm shadow-md overflow-hidden mx-auto mt-6"
                                            style={{ minWidth: '320px' }}
                                        >
                                            <PostCard post={posts[maxLikes[0]]} />
                                        </div>

                                        {maxLikes.length > 1 && (
                                            <div
                                                key={posts[maxLikes[1]]._id}
                                                className="lg:w-80 md:w-50 sm:w-30 h-auto bg-amber-200 rounded-sm shadow-md overflow-hidden mx-auto mt-6"
                                                style={{ minWidth: '320px' }}
                                            >
                                                <PostCard post={posts[maxLikes[1]]} />
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="text-center mt-6">
                                        No posts available
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );

            case 'pdf':
                const pdfs = getpdfPosts();
                return (
                    <div className="container mx-auto pl-56 flex justify-center items-start w-full min-h-screen ">
                        <div className="flex flex-col items-center w-full px-4">
                            <h1 className="text-3xl text-center text-black font-bold drop-shadow-m animate-bounce">
                                <span style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>
                                    PDFs 📄
                                </span>
                            </h1>

                            <div className="flex flex-wrap justify-center w-full">
                                {pdfs.map((post) => (
                                    <div
                                        key={post._id}
                                        className="lg:w-80 md:w-50 sm:w-30 h-auto bg-amber-200 rounded-sm shadow-md overflow-hidden mx-auto mt-6"
                                        style={{ minWidth: '320px' }}
                                    >
                                        <PostCard post={post} />
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                );

            case 'image':
                const images = getimagePosts();
                return (
                    <div className="container mx-auto pl-56 flex justify-center items-start w-full min-h-screen ">
                        <div className="flex flex-col items-center w-full px-4">
                            <h1 className="text-3xl text-center text-black font-bold drop-shadow-m animate-bounce">
                                <span style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>
                                    Images 📸
                                </span>
                            </h1>

                            <div className="flex flex-wrap justify-center w-full">
                                {images.map((post) => (
                                    <div
                                        key={post._id}
                                        className="lg:w-80 md:w-50 sm:w-30 h-auto bg-amber-200 rounded-sm shadow-md overflow-hidden mx-auto mt-6"
                                        style={{ minWidth: '320px' }}>

                                        <PostCard post={post} />
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                );

            case 'ucla':
                const uclaPosts = getPostsWithTags("ucla")

                return (
                    <div className="container mx-auto pl-56 flex justify-center items-start w-full min-h-screen ">
                        <div className="flex flex-col items-center w-full px-4">
                            <h1 className="text-3xl text-center text-black font-bold drop-shadow-m animate-bounce">
                                <span style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>
                                    UCLA 🐻
                                </span>
                            </h1>

                            <div className="flex flex-wrap justify-center w-full">
                                {uclaPosts.map((post) => (
                                    <div
                                        key={post._id}
                                        className="lg:w-80 md:w-50 sm:w-30 h-auto bg-amber-200 rounded-sm shadow-md overflow-hidden mx-auto mt-6"
                                        style={{ minWidth: '320px' }}>

                                        <PostCard post={post} />
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>)

            case 'usc':
                const uscPosts = getPostsWithTags("usc")
                return (
                    <div className="container mx-auto pl-56 flex justify-center items-start w-full min-h-screen ">
                        <div className="flex flex-col items-center w-full px-4">
                            <h1 className="text-3xl text-center text-black font-bold drop-shadow-m animate-bounce">
                                <span style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>
                                    USC ✌️
                                </span>
                            </h1>

                            <div className="flex flex-wrap justify-center w-full">
                                {uscPosts.map((post) => (
                                    <div
                                        key={post._id}
                                        className="lg:w-80 md:w-50 sm:w-30 h-auto bg-amber-200 rounded-sm shadow-md overflow-hidden mx-auto mt-6"
                                        style={{ minWidth: '320px' }}>

                                        <PostCard post={post} />
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>)


            default:
                return null;
        }
    };


    const sidebarStyle = {
        height: '96vh',
        width: isHovered ? '12rem' : '4rem',
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
                onMouseEnter={() => setIsHovered(true)} // Set hover state to true when mouse enters
                onMouseLeave={() => setIsHovered(false)} // Set hover state to false when mouse leaves

            >
                <nav className="flex min-w-[300px] flex-col gap-1 p-2 font-sans z-100 ">

                    <Link to="/" className="flex items-center w-40 p-3 rounded-lg hover:bg-gray-200 mt-16">
                        <Search strokeWidth={3} />
                        <div className="ml-2">Explore</div>
                    </Link>

                    <hr className="border-black" />





                    <button onClick={() => setActiveCategory('editors')} className="flex items-center w-40 p-3 rounded-lg hover:bg-gray-200">
                        <UserPen strokeWidth={3} />
                        <div className="ml-2 text-sm z-0">Editor's Choice</div>
                    </button>

                    <button onClick={() => setActiveCategory('new')} className="flex items-center w-40 p-3 rounded-lg hover:bg-gray-200">
                        <Rss strokeWidth={3} />
                        <div className="ml-2 text-sm ">New</div>
                    </button>

                    <button onClick={() => setActiveCategory('popular')} className="flex items-center w-40 p-3 rounded-lg hover:bg-gray-200">
                        <Users strokeWidth={3} />
                        <div className="ml-2 text-sm ">Most Popular</div>
                    </button>

                    <button onClick={() => setActiveCategory('pdf')} className="flex items-center w-40 p-3 rounded-lg hover:bg-gray-200">
                        <FileText strokeWidth={3} />
                        <div className="ml-2 text-sm ">PDFs</div>
                    </button>

                    <button onClick={() => setActiveCategory('image')} className="flex items-center w-40 p-3 rounded-lg hover:bg-gray-200">
                        <Image strokeWidth={3} />
                        <div className="ml-2 text-sm ">Images</div>
                    </button>

                    <hr className="border-black" />

                    <button onClick={() => setActiveCategory('ucla')} className="flex items-center justify-center w-40 h-20 p-2 rounded-lg hover:bg-gray-200">
                        <img src={ucla} className="w-40 h-15" />

                    </button>

                    <button onClick={() => setActiveCategory('usc')} className="flex items-center justify-center w-40 h-20 p-2 rounded-lg hover:bg-gray-200">
                        <img src={usc} className="w-30 h-20" />

                    </button>


                </nav>

            </div>

            {displayPostsByCategory()}
        </>
    );
};

export default Sidebar;
