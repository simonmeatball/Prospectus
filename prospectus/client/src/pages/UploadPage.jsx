import React, { useState } from "react";
import Navbar from "./Navbar.jsx";

// change the character limit of title and body here
const TITLELIMIT = 75;
const BODYLIMIT = 500;

function UploadPage() {
  const [titleCount, setTitleCount] = useState(0);
  const [bodyCount, setBodyCount] = useState(0);

  const handleTitleChange = (event) => {
    setTitleCount(event.target.value.length);
  };

  const handleBodyChange = (event) => {
    setBodyCount(event.target.value.length);
  };

  const isTitleLimitReached = titleCount >= TITLELIMIT;
  const isBodyLimitReached = bodyCount >= BODYLIMIT;

  return (
    <div>
      <Navbar />
      <div class="bg-[url('../images/homebg.png')] h-64 w-full bg-cover bg-no-repeat bg-center h-screen w-full px-4">
        <div className="font-sans">
          {/* email and password form */}
          <form class="max-w-sm mx-auto mt-12 bg-local">
            <div className="text-2xl font-bold pb-4">Create Post</div>
            <div class="mb-7">
              <label
                for="title"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Title<span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Title"
                maxlength="75"
                count={titleCount}
                onChange={handleTitleChange}
                required
              />
              <p
                class={`text-sm ${isTitleLimitReached ? "text-red-500" : "text-gray-500"} mt-1`}
              >
                {titleCount}/{TITLELIMIT} characters
              </p>
            </div>
            <div class="mb-7">
              <label
                for="body"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Body
              </label>
              <textarea
                type="text"
                id="body"
                class="shadow-sm h-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                count={bodyCount}
                maxlength="500"
                onChange={handleBodyChange}
                placeholder="Description"
              ></textarea>
              <p
                class={`text-sm ${isBodyLimitReached ? "text-red-500" : "text-gray-500"} mt-1`}
              >
                {bodyCount}/{BODYLIMIT} characters
              </p>
            </div>
            <div class="mb-9">
              <label
                for="resume"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Upload Resume
              </label>
              <input
                type="file"
                id="resume"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required={bodyCount === 0}
              />
            </div>
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
