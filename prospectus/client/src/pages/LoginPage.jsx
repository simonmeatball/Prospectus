import React from "react";
import Loginnavbar from "../components/LoginPage/Loginnavbar.jsx";
import Homebutton from "../components/LoginPage/Homebutton.jsx";

import Login1 from "../images/login1.jpg"
import Login2 from "../images/login2.jpg"
import Login3 from "../images/login3.jpg"
import Login4 from "../images/login4.jpg"
import ducks from "../images/ducks.png"

function LoginPage() {
  return (
    
    <div className = "bg-cyan-100 font-sans" >
      <Loginnavbar/>
      
    <div className = "absolute text-cyan-500 mt-36 ml-20 bg-white rounded-3xl p-5">
      <h1 className = "font-bold text-7xl"> Welcome Back!</h1>
      <p className = "ml-2 mt-3"> Please enter your details</p>

      <form className=" max-w-sm mt-5 bg-local">
      <div className="mb-6">
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
      className = "btn btn-primary w-50 h-10 text-white ml-15 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-500 dark:hover:bg-cyan-600 w-full"> Sign In</button>
      

    </form>

    
    <Homebutton/>
    </div>
  
    <div className="carousel h-screen w-screen">
    
  <div id="slide1" className="carousel-item w-full">
    <img
      src={ducks} draggable = "false" 
      className=" w-full h-3/5 object-cover" />

    
  </div>
      
  <div id="slide2" className="carousel-item w-full">
    <img
      src={Login1}
      className="w-full h-3/5 object-cover" />

    
  </div>
  <div id="slide3" className="carousel-item w-full">
    <img
      src={Login2}
      className="w-full h-3/5 object-cover" />

  </div>

  <div id="slide4" className="carousel-item w-full">
    <img
      src={Login3}
      className="w-full h-3/5 object-cover" />


  </div>
  
  <div id="slide5" className="carousel-item w-full">
    <img
      src={Login4}
      className="w-full h-3/5 object-cover" />

  </div>
</div>

<div className="w-full flex justify-end pr-52" alt = "Testimonal">
  <p className="italic max-w-md -mt-60">
    
    <span className="animate-pulse">
    "Prospectus transformed my job application process! The personalized feedback was spot-on, and the clear, actionable suggestions helped me craft a resume that stood out to employers. Thanks to Prospectus, I landed my dream internship this summer. I can't recommend it enough!" 
    </span>

    <span className="animate-none not-italic font-bold">- Jason Ni</span>
  </p>
</div>
    

    </div>
  );
}

export default LoginPage;
