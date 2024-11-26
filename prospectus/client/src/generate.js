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

export function generateReview(rating, text) {
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
    rating: rating ? rating : Math.floor(Math.random() * 5) + 1,
    text: text
      ? text
      : reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
    reviewerProfile: generateProfile(),
    time: text
      ? new Date()
      : new Date(
          Math.floor(Math.random() * 25) + 2000,
          Math.floor(Math.random() * 12)
        ),
  };
}

export function generateProfile() {
  const names = ["Angela", "Arnav", "Jason", "Larry", "William"];
  return {
    name: names[Math.floor(Math.random() * names.length)],
    username: "username",
    avatar:
      "https://picsum.photos/id/" +
      (Math.floor(Math.random() * 100) + 1) +
      "/500",
  };
}

export function generatePost() {
  return {
    posterProfile: generateProfile(),
    time: new Date(
      Math.floor(Math.random() * 25) + 2000,
      Math.floor(Math.random() * 12)
    ),
    likes: Math.floor(Math.random() * 1000) + 1,
    reviews: Array.from({ length: 50 }, () => generateReview()),
    numReviews: function () {
      return this.reviews.length;
    },
    avgRating: function () {
      let sum = 0;
      for (const review of this.reviews) {
        sum += review.rating;
      }
      return (sum / this.numReviews()).toFixed(1);
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
}