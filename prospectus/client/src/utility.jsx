import React from "react";
import { Star, StarHalf } from "lucide-react";

export const tags = {
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

const sentences = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse",
  "Excepteur sint occaecat cupidatat non proident sunt in culpa",
  "Nulla facilisi morbi tempus iaculis urna id volutpat lacus",
  "Vitae suscipit tellus mauris a diam maecenas sed enim",
  "Cursus sit amet dictum sit amet justo donec enim",
  "Pellentesque habitant morbi tristique senectus et netus et malesuada",
  "Amet consectetur adipiscing elit pellentesque habitant morbi tristique",
  "Elementum nibh tellus molestie nunc non blandit massa enim",
  "Morbi tincidunt augue interdum velit euismod in pellentesque massa",
  "Sit amet purus gravida quis blandit turpis cursus in",
  "Ultrices eros in cursus turpis massa tincidunt dui ut",
  "Lectus quam id leo in vitae turpis massa sed",
  "Facilisis magna etiam tempor orci eu lobortis elementum nibh",
  "Feugiat in ante metus dictum at tempor commodo ullamcorper",
  "Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada",
  "Eget nulla facilisi etiam dignissim diam quis enim lobortis",
  "Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu",
  "Viverra nam libero justo laoreet sit amet cursus sit",
  "Maecenas pharetra convallis posuere morbi leo urna molestie at",
  "Elementum eu facilisis sed odio morbi quis commodo odio",
  "Euismod lacinia at quis risus sed vulputate odio ut",
  "Consequat semper viverra nam libero justo laoreet sit amet",
  "Egestas integer eget aliquet nibh praesent tristique magna sit",
  "Diam maecenas ultricies mi eget mauris pharetra et ultrices",
  "Adipiscing elit ut aliquam purus sit amet luctus venenatis",
  "Viverra aliquet eget sit amet tellus cras adipiscing enim",
  "Ut tellus elementum sagittis vitae et leo duis ut",
  "Egestas pretium aenean pharetra magna ac placerat vestibulum lectus",
  "Venenatis urna cursus eget nunc scelerisque viverra mauris in",
  "Tempor orci dapibus ultrices in iaculis nunc sed augue",
  "Eget mi proin sed libero enim sed faucibus turpis",
  "Sagittis orci a scelerisque purus semper eget duis at",
  "Tortor dignissim convallis aenean et tortor at risus viverra",
  "Sit amet nisl suscipit adipiscing bibendum est ultricies integer",
  "Nunc sed augue lacus viverra vitae congue eu consequat",
  "Cursus risus at ultrices mi tempus imperdiet nulla malesuada",
  "Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida",
  "Amet mattis vulputate enim nulla aliquet porttitor lacus luctus",
  "Arcu non sodales neque sodales ut etiam sit amet",
  "Dignissim suspendisse in est ante in nibh mauris cursus",
  "Amet volutpat consequat mauris nunc congue nisi vitae suscipit",
  "Orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt",
  "Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec",
  "Vestibulum morbi blandit cursus risus at ultrices mi tempus",
  "Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum",
  "Tellus integer feugiat scelerisque varius morbi enim nunc faucibus",
  "Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget",
  "Suspendisse sed nisi lacus sed viverra tellus in hac",
  "Amet justo donec enim diam vulputate ut pharetra sit",
  "Feugiat in fermentum posuere urna nec tincidunt praesent semper",
  "Faucibus vitae aliquet nec ullamcorper sit amet risus nullam",
  "Morbi tempus iaculis urna id volutpat lacus laoreet non",
  "Egestas dui id ornare arcu odio ut sem nulla",
  "Nibh nisl condimentum id venenatis a condimentum vitae sapien",
  "Amet risus nullam eget felis eget nunc lobortis mattis",
  "Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet",
  "Ultrices gravida dictum fusce ut placerat orci nulla pellentesque",
  "Massa vitae tortor condimentum lacinia quis vel eros donec",
  "Praesent elementum facilisis leo vel fringilla est ullamcorper eget",
  "Volutpat est velit egestas dui id ornare arcu odio",
  "Facilisis sed odio morbi quis commodo odio aenean sed",
  "Amet cursus sit amet dictum sit amet justo donec",
  "Pretium quam vulputate dignissim suspendisse in est ante in",
  "Velit aliquet sagittis id consectetur purus ut faucibus pulvinar",
  "Amet nulla facilisi morbi tempus iaculis urna id volutpat",
  "Eget dolor morbi non arcu risus quis varius quam",
  "Pharetra vel turpis nunc eget lorem dolor sed viverra",
  "Lacus sed viverra tellus in hac habitasse platea dictumst",
  "Viverra vitae congue eu consequat ac felis donec et",
  "Habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper",
  "Amet tellus cras adipiscing enim eu turpis egestas pretium",
  "Odio ut sem nulla pharetra diam sit amet nisl",
  "Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque",
  "Dignissim sodales ut eu sem integer vitae justo eget",
  "Commodo viverra maecenas accumsan lacus vel facilisis volutpat est",
  "Nullam vehicula ipsum a arcu cursus vitae congue mauris",
  "Amet porttitor eget dolor morbi non arcu risus quis",
  "Elementum integer enim neque volutpat ac tincidunt vitae semper",
  "Nibh praesent tristique magna sit amet purus gravida quis",
  "Amet venenatis urna cursus eget nunc scelerisque viverra mauris",
  "Viverra mauris in aliquam sem fringilla ut morbi tincidunt",
  "Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula",
  "Amet luctus venenatis lectus magna fringilla urna porttitor rhoncus",
  "Consectetur lorem donec massa sapien faucibus et molestie ac",
  "Sed tempus urna et pharetra pharetra massa massa ultricies",
  "Egestas purus viverra accumsan in nisl nisi scelerisque eu",
  "Sit amet facilisis magna etiam tempor orci eu lobortis",
  "Cursus euismod quis viverra nibh cras pulvinar mattis nunc",
  "Tempor nec feugiat nisl pretium fusce id velit ut",
  "Amet aliquam id diam maecenas ultricies mi eget mauris",
  "Ut placerat orci nulla pellentesque dignissim enim sit amet",
  "Lobortis feugiat vivamus at augue eget arcu dictum varius",
  "Pellentesque dignissim enim sit amet venenatis urna cursus eget",
  "Sed risus ultricies tristique nulla aliquet enim tortor at",
  "Amet purus gravida quis blandit turpis cursus in hac",
  "Nunc pulvinar sapien et ligula ullamcorper malesuada proin libero",
  "Viverra suspendisse potenti nullam ac tortor vitae purus faucibus",
];

export function getAverageRating(reviews) {
  let sum = 0;
  for (const review of reviews) {
    sum += review.rating;
  }
  return (sum / reviews.length).toFixed(1);
}

export function getStars(reviews, size = 36) {
  const roundedRating = Math.round(getAverageRating(reviews) * 2) / 2; // round to nearest half
  const fullStars = Math.floor(roundedRating);
  const halfStar = roundedRating % 1 === 0.5;
  const starsLeft = halfStar ? 5 - fullStars - 1 : 5 - fullStars;

  return (
    <div className="flex">
      {Array.from({ length: fullStars }, () => (
        <Star size={size} absoluteStrokeWidth fill="#000000" />
      ))}
      {halfStar && (
        <StarHalf
          size={size}
          absoluteStrokeWidth
          fill="#000000"
          className={"-mr-" + size / 4}
        />
      )}
      {halfStar && (
        <StarHalf size={size} absoluteStrokeWidth className="-scale-x-100" />
      )}
      {Array.from({ length: starsLeft }, () => (
        <Star size={size} absoluteStrokeWidth />
      ))}
    </div>
  );
}

export function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// GENERATE PROFILES
function generateProfile(id) {
  const names = ["Angela", "Arnav", "Jason", "Larry", "William"];
  const name = randomElement(names);
  return {
    id: id,
    name: name,
    username: name.toLowerCase() + id,
    avatar: `https://picsum.photos/id/${randomInt(1, 100)}/500`,
    postIDs: [], // posts that this profile has posted
    reviewIDs: [], // reviews that this profile has posted
  };
}

// GENERATE POSTS
function generatePost(id) {
  return {
    id: id,
    title: randomElement(sentences),
    text: randomElement(sentences),
    time: new Date(2024, randomInt(0, 11)),
    tags: Array.from({ length: 5 }, () => randomElement(Object.keys(tags))),
    likes: randomInt(1, 1000),
    profileID: null, // profile that posted this post
    reviewIDs: [], // reviews that this post has
  };
}

// GENERATE REVIEWS
export function generateReview(id, text, rating) {
  return {
    id: id,
    text: text || randomElement(sentences),
    rating: rating || randomInt(1, 5),
    time: text ? new Date() : new Date(2024, randomInt(0, 11)),
    profileID: null, // profile that posted this review
    postID: null, // post that this review is for
  };
}

export const allProfiles = [];
export const allPosts = [];
export const allReviews = [];

for (let i = 0; i < 10; i++) {
  const profile = generateProfile(i);
  for (let j = i * 10; j < (i + 1) * 10; j++) {
    const post = generatePost(j);
    profile.postIDs.push(j);
    post.profileID = i;
    allPosts.push(post);
  }
  for (let k = i * 100; k < (i + 1) * 100; k++) {
    const review = generateReview(k);
    profile.reviewIDs.push(k);
    review.profileID = i;
    allReviews.push(review);
  }
  allProfiles.push(profile);
}

const usedReviewIDs = [];

allPosts.forEach((post) => {
  while (post.reviewIDs.length < 10) {
    const i = randomInt(0, 999);
    if (!usedReviewIDs.includes(i)) {
      post.reviewIDs.push(i);
      allReviews[i].postID = post.id;
      usedReviewIDs.push(i);
    }
  }
});

console.log(allProfiles);
console.log(allPosts);
console.log(allReviews);

console.log(allProfiles.filter((profile) => profile.postIDs.length === 0));
console.log(allProfiles.filter((profile) => profile.reviewIDs.length === 0));
console.log(allPosts.filter((post) => post.profileID === null));
console.log(allPosts.filter((post) => post.reviewIDs.length === 0));
console.log(allReviews.filter((review) => review.profileID === null));
console.log(allReviews.filter((review) => review.postID === null));
