import React from "react";
import Navbar from "./Navbar.jsx";

function UploadPage() {
  return (
    <div>
      <Navbar />
      <div className="font-sans">
        <div class="bg-[url('../images/homebg.png')] bg-cover bg-no-repeat bg-center h-screen w-full">
          {/* email and password form */}
          <form class="max-w-sm mx-auto mt-12 bg-local">
            <div className="text-2xl font-bold pb-4">Create Post</div>
            <div class="mb-9">
              <label
                for="title"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Post Title
              </label>
              <input
                type="text"
                id="title"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Title"
                required
              />
            </div>
            <div class="mb-9">
              <label
                for="body"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Post Description
              </label>
              <textarea
                type="text"
                id="body"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Description"
              ></textarea>
            </div>
            <div class="mb-9">
              <label
                for="resume"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Upload Resume:
              </label>
              <input
                type="file"
                id="resume"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
