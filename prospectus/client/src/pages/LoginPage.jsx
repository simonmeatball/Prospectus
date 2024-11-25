import React from "react";
import Loginnavbar from "../components/LoginPage/Loginnavbar.jsx";
import Homebutton from "../components/LoginPage/Homebutton.jsx";

function LoginPage() {
  return (
    
    <div className = "font-sans" >
      <Loginnavbar/>
      
    <div className = "text-blue-600 mt-36 ml-20">
      <h1 className = "font-bold text-7xl"> Welcome Back!</h1>
      <p className = "ml-2 mt-3"> Please enter your details</p>

      <form className=" max-w-sm mt-5 bg-local">
      <div className="mb-9">
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Email address:
              </label>
              
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="name@ucla.com"
                required
              />
            </div>

            <div className="mb-9">
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>

      <button type="submit"
      className = "btn btn-primary w-50 h-10 text-white ml-15 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 w-full"> Sign In</button>
      
    </form>

    <Homebutton/>
    

    
    </div>

    </div>
  );
}

export default LoginPage;
