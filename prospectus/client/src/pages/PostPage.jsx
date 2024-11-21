import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
import { Heart, MessageCircle, Star, StarHalf, Plus } from "lucide-react";
import { formatDistance } from "date-fns";
import Review from "../components/PostPage/Review";

const names = ["Angela", "Arnav", "Jason", "Larry", "William"];

const tags = {
  "Software Engineer": "bg-blue-300 text-black",
  "Data Scientist": "bg-green-300 text-black",
  "Full Stack Developer": "bg-indigo-300 text-black",
  "Machine Learning Engineer": "bg-yellow-300 text-black",
  "DevOps Engineer": "bg-purple-300 text-black",
  "Web Developer": "bg-teal-300 text-black",
  "Cloud Architect": "bg-gray-300 text-black",
  "Cybersecurity Analyst": "bg-red-300 text-black",
  "Product Manager": "bg-orange-300 text-black",
  "UI/UX Designer": "bg-pink-300 text-black",
  "QA Engineer": "bg-lime-300 text-black",
  "Network Engineer": "bg-cyan-300 text-black",
  "Database Administrator": "bg-amber-300 text-black",
  "iOS Developer": "bg-sky-300 text-black",
  "Android Developer": "bg-fuchsia-300 text-black",
  "Blockchain Developer": "bg-indigo-400 text-black",
  "AI Researcher": "bg-green-400 text-black",
  "Automation Engineer": "bg-blue-400 text-black",
  "Business Intelligence Analyst": "bg-yellow-400 text-black",
};

function generateRandomReview() {
  const reviewTexts = [
    "Great product!", // Very short review
    "Love it! Highly recommend.", // Short review
    "Good value for the price.", // Short review
    "This is a decent product but could use some improvements.", // Medium review
    "I was impressed with the quality and design, but the shipping took longer than expected.", // Medium review
    "This product exceeded my expectations. It's exactly what I needed, and it works perfectly. Highly recommend it to anyone looking for something similar.", // Medium review
    "Good product, but the customer service was a bit slow in responding. Overall, it's still worth buying because of the quality and performance.", // Medium review
    "I've been using this product for a couple of weeks now and I'm very satisfied. It's durable, easy to use, and performs as expected. However, I wish it came in more colors. Shipping was quick, and the packaging was secure, so I'm happy with my purchase.", // Long review
    "I have been using this product for about a month and I can say it has definitely made a positive impact on my daily routine. The build quality is top-notch, and the performance is outstanding. However, there is a slight issue with the battery life, which could definitely be improved. Despite that, I would still recommend this to others because of its overall utility and ease of use.", // Long review
    "This is hands down one of the best purchases I've made in a while! The product is well-made, easy to use, and incredibly effective. The quality is unmatched, and it's obvious that a lot of thought went into the design. I use it daily, and it has helped me streamline my workflow. There were no defects when it arrived, and the packaging was very secure. The only downside I encountered was a slight delay in delivery, but customer service was quick to resolve that. If you're looking for something in this category, I would highly recommend this product without hesitation. It's worth every penny!", // Very long review
  ];

  return {
    rating: Math.floor(Math.random() * 5) + 1,
    text: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
    reviewerProfile: {
      name: names[Math.floor(Math.random() * names.length)],
      avatar:
        "https://picsum.photos/id/" +
        (Math.floor(Math.random() * 100) + 1) +
        "/500",
    },
    time: new Date(
      Math.floor(Math.random() * 25) + 2000,
      Math.floor(Math.random() * 12)
    ),
  };
}

const reviews = [];
for (let i = 0; i < 50; i++) {
  reviews.push(generateRandomReview());
}

const post = {
  posterProfile: {
    name: names[Math.floor(Math.random() * names.length)],
    username: "username",
    avatar:
      "https://picsum.photos/id/" +
      (Math.floor(Math.random() * 100) + 1) +
      "/500",
  },
  time: new Date(
    Math.floor(Math.random() * 25) + 2000,
    Math.floor(Math.random() * 12)
  ),
  likes: Math.floor(Math.random() * 1000) + 1,
  reviews: reviews,
  numReviews: function () {
    return this.reviews.length;
  },
  avgRating: function () {
    let sum = 0;
    for (const review of this.reviews) {
      sum += review.rating;
    }
    return sum / this.numReviews();
  },
  title: "Idk whats wrong with my resume. Help.",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  tags: [
    Object.keys(tags)[Math.floor(Math.random() * Object.keys(tags).length)],
    Object.keys(tags)[Math.floor(Math.random() * Object.keys(tags).length)],
    Object.keys(tags)[Math.floor(Math.random() * Object.keys(tags).length)],
    Object.keys(tags)[Math.floor(Math.random() * Object.keys(tags).length)],
    Object.keys(tags)[Math.floor(Math.random() * Object.keys(tags).length)],
  ],
};

export default function PostPage() {
  const [liked, setLiked] = useState(false);
  const [sortBy, setSortBy] = useState("Most recent");
  const [dropdownShown, setDropdownShown] = useState(false);

  function updateLikes() {
    setLiked(!liked);
    // TODO: update the actual post object's likes
  }

  function addReview() {
    // TODO: implement this
  }

  function getStars() {
    const roundedRating = Math.floor(post.avgRating() * 2) / 2; // round down to nearest half
    const fullStars = Math.floor(roundedRating);
    const halfStar = roundedRating % 1 === 0.5;
    const starsLeft = halfStar ? 5 - fullStars - 1 : 5 - fullStars;

    return (
      <div className="flex">
        {Array.from({ length: fullStars }, () => (
          <Star size={36} absoluteStrokeWidth fill="#fcba03" />
        ))}
        {halfStar && (
          <StarHalf
            size={36}
            absoluteStrokeWidth
            fill="#fcba03"
            className="-mr-9"
          />
        )}
        {halfStar && (
          <StarHalf size={36} absoluteStrokeWidth className="-scale-x-100" />
        )}
        {Array.from({ length: starsLeft }, () => (
          <Star size={36} absoluteStrokeWidth />
        ))}
      </div>
    );
  }

  function sortReviews(reviews, sortBy) {
    switch (sortBy) {
      case "Most recent":
        return reviews.sort((a, b) => b.time - a.time);
      case "Least recent":
        return reviews.sort((a, b) => a.time - b.time);
      case "Highest rating":
        return reviews.sort((a, b) => b.rating - a.rating);
      case "Lowest rating":
        return reviews.sort((a, b) => a.rating - b.rating);
      default:
        return reviews.sort();
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex gap-8 m-8 justify-center">
        <div className="flex flex-col items-center">
          <div className="avatar mb-2">
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
              <img src={post.posterProfile.avatar} />
            </div>
          </div>
          {post.posterProfile.name}
          <p className="text-gray-500">{"@" + post.posterProfile.username}</p>
          <p className="text-gray-500 mb-4">
            {formatDistance(post.time, Date(), { addSuffix: true })}
          </p>
          <div className="flex flex-col gap-4 items-center">
            <div className="flex gap-2 items-center">
              <Heart
                size={36}
                absoluteStrokeWidth
                className={
                  "cursor-pointer marker:hover:text-red-400 " +
                  (liked ? "text-red-500" : "")
                }
                onClick={updateLikes}
              />
              {post.likes + (liked ? 1 : 0)}
            </div>
            <div className="flex gap-2 items-center">
              <MessageCircle
                size={36}
                absoluteStrokeWidth
                className="cursor-pointer"
                onClick={addReview}
              />
              {post.numReviews()}
            </div>
            <div className="flex gap-2 items-center">
              {getStars()}
              {post.avgRating()}
            </div>
          </div>
        </div>
        <div className="w-3/4">
          <h1 className="text-3xl mb-2">{post.title}</h1>
          <div className="flex gap-2 mb-2">
            {post.tags.map((tag) => (
              <div className={"rounded-lg p-1.5 " + tags[tag]}>{tag}</div>
            ))}
          </div>
          <div className="mb-2">{post.text}</div>
          <div className="bg-gray-200 h-64 flex justify-center items-center">
            Sample Resume
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto h-px bg-gray-500"></div>
      <div className="w-11/12 mx-auto">
        <div className="flex justify-between items-center">
          <div>
            Sort by:
            <div className="dropdown dropdown-bottom">
              <div
                tabIndex={0}
                role="button"
                className="btn m-1"
                onClick={() => setDropdownShown(!dropdownShown)}
              >
                {sortBy}
              </div>
              {dropdownShown && (
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  {[
                    "Most recent",
                    "Least recent",
                    "Highest rating",
                    "Lowest rating",
                  ].map((option) => (
                    <li>
                      <a
                        onClick={() => {
                          setSortBy(option);
                          setDropdownShown(false);
                        }}
                      >
                        {option}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <button className="btn" onClick={addReview}>
            Add a review
            <Plus />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center">
          {sortReviews(post.reviews, sortBy).map((reviewItem) => (
            <div className="mb-4">
              <Review review={reviewItem} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
