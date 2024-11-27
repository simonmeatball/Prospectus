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
    title: "Title",
    text: "Text",
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
    text: text || "Text",
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
