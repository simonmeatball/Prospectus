import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
import { Heart, MessageCircle, Star, StarHalf, Plus, X } from "lucide-react";
import { formatDistance } from "date-fns";
import Review from "../components/PostPage/Review";
import { useNavigate } from "react-router-dom";
import { tags, generateReview, generatePost } from "../generate";

export default function PostPage() {
  const [liked, setLiked] = useState(false);
  const [sortBy, setSortBy] = useState("Most recent");
  const [dropdownShown, setDropdownShown] = useState(false);
  const [reviewFormShown, setReviewFormShown] = useState(false);
  const [inputText, setInputText] = useState("");
  const [post, setPost] = useState(generatePost());
  const navigate = useNavigate();

  function getStars() {
    const roundedRating = Math.round(post.avgRating() * 2) / 2; // round to nearest half
    const fullStars = Math.floor(roundedRating);
    const halfStar = roundedRating % 1 === 0.5;
    const starsLeft = halfStar ? 5 - fullStars - 1 : 5 - fullStars;

    return (
      <div className="flex">
        {Array.from({ length: fullStars }, () => (
          <Star size={36} absoluteStrokeWidth fill="#000000" />
        ))}
        {halfStar && (
          <StarHalf
            size={36}
            absoluteStrokeWidth
            fill="#000000"
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
        return reviews.sort((a, b) => {
          if (b.rating === a.rating) {
            return b.time - a.time;
          }
          return b.rating - a.rating;
        });
      case "Lowest rating":
        return reviews.sort((a, b) => {
          if (a.rating === b.rating) {
            return b.time - a.time;
          }
          return a.rating - b.rating;
        });
      default:
        return reviews.sort();
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex gap-8 m-8 justify-center">
        <div className="flex flex-col items-center">
          <div
            className="avatar mb-2 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
              <img src={post.posterProfile.avatar} />
            </div>
          </div>
          {post.posterProfile.name}
          <p className="text-gray-500">@{post.posterProfile.username}</p>
          <div>
            <p
              className="text-gray-500 mb-4 tooltip tooltip-primary tooltip-bottom"
              data-tip={post.time.toLocaleString()}
            >
              {formatDistance(post.time, Date(), { addSuffix: true })}
            </p>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <div className="flex gap-2 items-center">
              <Heart
                size={36}
                absoluteStrokeWidth
                className={
                  "cursor-pointer marker:hover:text-red-400 " +
                  (liked ? "text-red-500" : "")
                }
                onClick={() => {
                  liked
                    ? setPost((prevPost) => ({
                        ...prevPost,
                        likes: prevPost.likes - 1,
                      }))
                    : setPost((prevPost) => ({
                        ...prevPost,
                        likes: prevPost.likes + 1,
                      }));
                  setLiked(!liked);
                }}
              />
              {post.likes}
            </div>
            <div className="flex gap-2 items-center">
              <MessageCircle
                size={36}
                absoluteStrokeWidth
                className="cursor-pointer"
                onClick={() => {
                  setReviewFormShown(!reviewFormShown);
                  setInputText("");
                }}
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
          <div className={reviewFormShown ? "invisible" : ""}>
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
          <button
            className="btn"
            onClick={() => {
              setReviewFormShown(!reviewFormShown);
              setInputText("");
            }}
          >
            {reviewFormShown ? (
              <div className="flex items-center gap-2">
                Cancel
                <X />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Add a review
                <Plus />
              </div>
            )}
          </button>
        </div>
        {reviewFormShown && (
          <div>
            <div className="max-w-3xl mx-auto p-4 border rounded-lg shadow">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!inputText) {
                    return;
                  }
                  setPost((prevPost) => ({
                    ...prevPost,
                    reviews: [
                      ...prevPost.reviews,
                      generateReview(
                        +document.querySelector(
                          'input[name="rating-8"]:checked'
                        ).value,
                        inputText
                      ),
                    ],
                  }));
                  setReviewFormShown(!reviewFormShown);
                  setInputText("");
                }}
              >
                <h1 className="text-2xl mb-2">Add a review</h1>
                <div className="rating rating-md mb-4">
                  {[1, 2, 3, 4].map((value) => (
                    <input
                      type="radio"
                      name="rating-8"
                      value={value}
                      className="mask mask-star-2"
                    />
                  ))}
                  <input
                    type="radio"
                    name="rating-8"
                    value={5}
                    className="mask mask-star-2"
                    defaultChecked
                  />
                </div>
                <input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="p-2 border rounded-lg w-full mb-4"
                  placeholder="Review"
                />
                <button className="btn">Post</button>
              </form>
            </div>
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
          </div>
        )}
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
