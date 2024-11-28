import React from "react";
import{ useState } from "react";
import Swal from 'sweetalert2'
import LoginButton from "../components/HomePage/Loginbutton.jsx";
import Homenavbar from "../components/HomePage/Homenavbar.jsx"
import Terms from "../components/HomePage/Terms.jsx"

import Logo1 from "../images/logo1.png"
import Logo2 from "../images/logo2.png"
import { ClipboardPenLine } from 'lucide-react';
import { UserCheck } from 'lucide-react';
import { BicepsFlexed } from 'lucide-react';
import { BadgeDollarSign } from 'lucide-react';

function RegisterPage() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    agreeToTerms: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    let validAccount = false
    e.preventDefault(); // Prevent the default form submission

    // Check if passwords match
    if (formData.password !== formData.repeatPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Passwords do not match!',
        text: 'Please check your password entries.'
      })
    }
    else {
      validAccount = true
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Redirecting you...'
      })
    }

  if(validAccount) {
    try {
      // Send the data to the server.
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", { // this is a placeholder server
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      

      console.log("Server Response:", data);

    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  }

  
    
  };

  return (
    <div style={{ userSelect: "none" }}>
      
      <div className="font-sans">

      <Homenavbar/>
        <div class="bg-[url('../images/homebg.png')] h-64 w-full bg-cover bg-no-repeat bg-center h-screen w-full">

          <div className="  text-amber-500 font-bold italic text-8xl tracking-wide pt-12 text-center ">
            prospectus
          </div>
          <div className="animate-pulse pt-8 text-2xl italic text-center">
            {" "} 
            your resume's new best friend.
          </div>

          {/* email and password form */}

          <img src= {Logo1} className="absolute animate-bounce  p-0 border-0 left-0  mt-12 max-w-full h-auto" alt="Positioned Image" draggable="false" />
          <img src= {Logo2} className="absolute animate-bounce  p-0 border-0 right-0  mt-12 max-w-full h-auto" alt="Positioned Image" draggable="false" />  
          
          <form onSubmit={handleSubmit} class=" relative max-w-sm mx-auto mt-12 bg-local">
          

            <div class="mb-9">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Your Email:
              </label>
              <input
                type="email"
                id="email"
                value={formData.email} // The value of the user's email
                onChange={handleChange} // Capture input

                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="name@ucla.com"
                required
              />
            </div>
            <div class="mb-9">
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Your Password:
              </label>

              <input
                type="password"
                id="password"
                value={formData.password} // The value of the user's password.
                onChange={handleChange} // Capture input

                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            <div class="mb-9">
              <label
                for="repeat-password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Repeat Password:
              </label>
              <input
                type="password"
                id="repeatPassword"
                value={formData.repeatPassword} // The value of the user's repeated password.
                onChange={handleChange} // Capture input

                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
              
            </div>
            <div class="right-30 flex items-start mb-9">
              <div class="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  type="checkbox"

                  checked={formData.agreeToTerms} // Whether or not the user checked the box
                  onChange={handleChange} // Capture checkbox state
                  class="w-4 h-4  border border-gray-300 rounded bg-white focus:ring-3 focus:ring-cyan-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-white-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
              </div>

              <label
                for="terms"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-black"
              >
               <Terms/>
              </label>
            </div>

            <div className = "flex">  
              <button   // REGISTER BUTTON
                type="submit"
                className="btn btn-primary w-50 h-10 text-white ml-15 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-500 dark:hover:bg-cyan-600 ">
                Register new account
              </button>

              {/* This button allows users to navigate to the login page, if they already have an account and don't want to register a new one. */}
              <LoginButton />
            </div>
          </form>

         

        </div>

        <div className = "bg-white text-black">
        
        <h1 className = " text-center mt-8 text-7xl text-cyan-600 font-semibold"> Not a member yet?</h1>
        <p className = "text-center mt-8 mb-10 text-2xl font-semibold ">Boost your career search with Prospectus!</p>

        
      <div className = "flex justify-left p-8" alt = "Reasons">
        
        <div className = "mb-10 " alt="Reason1">   
          <ClipboardPenLine size={64} color = "#1ed5f6" />  
          <p className = "ml-4 text-2xl font-medium "> Tailored Suggestions:  <br/> <p className = "mt-1 text-xl font-normal">  Learn how to customize your resume for particular job applications, increasing your chances of standing out. </p> </p>
        </div>

        <div alt="Reason2">   
          <UserCheck size={64} color = "#b456e9"/>  
          <p className = "ml-4 text-2xl font-medium "> Expert Feedback: <br/> <p className = "mt-1 text-xl font-normal">  Receive guidance from professionals, and get insights on formatting, grammar, and tailoring your resume for specific industries. </p> </p>
        </div>

        <div alt="Reason3">   
          <BadgeDollarSign size={64} color = "#43e654" />  
          <p className = "ml-4 text-2xl font-medium "> Affordable and Accessible: <br/> <p className = "mt-1 text-xl font-normal"> Our resume reviewer app provide cost-effective options compared to hiring a professional resume writer. </p> </p>
        </div>

        <div alt="Reason4">   
          <BicepsFlexed size={64} color = "#f7be4c"/>  
          <p className = "ml-4 text-2xl font-medium "> Stay Competitive: <br/> <p className = "mt-1 text-xl font-normal">  Learn about trends in resume writing to stay up-to-date in an ever-evolving job market. </p> </p>
        </div>


      </div>
      </div>


        
        

        
      </div>
       
      </div>
    
  );
}

export default RegisterPage;
