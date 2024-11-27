import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import {
  tags,
  getAverageRating,
  getStars,
  randomElement,
  randomInt,
  generateReview,
  allProfiles,
  allPosts,
  allReviews,
} from "../utility.jsx";
import { Heart, MessageCircle, Plus, X } from "lucide-react";
import { formatDistance } from "date-fns";
import Review from "../components/PostPage/Review";
import DropdownMenu from "../components/PostPage/DropdownMenu";

export default function PostPage() {
  const [post, setPost] = useState(randomElement(allPosts));
  const profile = allProfiles[post.profileID];
  const reviews = post.reviewIDs.map((reviewID) => allReviews[reviewID]);
  const [liked, setLiked] = useState(false);
  const [reviewFormShown, setReviewFormShown] = useState(false);
  const [inputText, setInputText] = useState("");
  const [dropdownShown, setDropdownShown] = useState(false);
  const [sortBy, setSortBy] = useState("Most recent");
  const navigate = useNavigate();

  function sortReviews() {
    switch (sortBy) {
      case "Most recent":
        return reviews.sort((a, b) => b.time - a.time);
      case "Least recent":
        return reviews.sort((a, b) => a.time - b.time);
      case "Highest rating":
        return reviews.sort((a, b) =>
          b.rating === a.rating ? b.time - a.time : b.rating - a.rating
        );
      case "Lowest rating":
        return reviews.sort((a, b) =>
          a.rating === b.rating ? b.time - a.time : a.rating - b.rating
        );
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
            onClick={() => navigate(`/profile/${profile.username}`)}
          >
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
              <img src={profile.avatar} />
            </div>
          </div>
          {profile.name}
          <p className="text-gray-500">@{profile.username}</p>
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
                className={`cursor-pointer marker:hover:text-red-400 ${
                  liked && "text-red-500"
                }`}
                onClick={() => {
                  setPost((prevPost) => ({
                    ...prevPost,
                    likes: prevPost.likes + (liked ? -1 : 1),
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
              {reviews.length}
            </div>
            <div className="flex gap-2 items-center">
              {getStars(reviews)}
              {getAverageRating(reviews)}
            </div>
          </div>
        </div>
        <div className="w-3/4">
          <h1 className="text-3xl mb-2">{post.title}</h1>
          <div className="flex gap-2 mb-2">
            {post.tags.map((tag) => (
              <div className={`rounded-lg p-1.5 ${tags[tag]}`}>{tag}</div>
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
          <div className={reviewFormShown && "invisible"}>
            <DropdownMenu
              sortBy={sortBy}
              setSortBy={setSortBy}
              dropdownShown={dropdownShown}
              setDropdownShown={setDropdownShown}
            />
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
                  const review = generateReview(
                    allReviews.length,
                    inputText,
                    +document.querySelector('input[name="rating-8"]:checked')
                      .value
                  );
                  review.profileID = randomInt(0, 9);
                  review.postID = post.id;
                  allReviews.push(review);
                  allProfiles[review.profileID].reviewIDs.push(review.id);
                  allPosts[post.id].reviewIDs.push(review.id);
                  setReviewFormShown(false);
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
              <DropdownMenu
                sortBy={sortBy}
                setSortBy={setSortBy}
                dropdownShown={dropdownShown}
                setDropdownShown={setDropdownShown}
              />
            </div>
          </div>
        )}
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center">
          {sortReviews().map((reviewItem) => (
            <div className="mb-4">
              <Review review={reviewItem} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
