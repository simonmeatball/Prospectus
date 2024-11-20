import React from 'react';
import LoginButton from '../components/Loginbutton.jsx';

function Home() {
    return (
        <div className = "font-sans">

            <div class="bg-[url('../images/homebg.png')] h-64 w-full bg-cover bg-no-repeat bg-center h-screen w-full">
                <div className=' font-bold italic text-8xl tracking-wide pt-12 text-center '>
                    prospectus
                 </div>
                <div className = "pt-8 text-2xl italic text-center"> your resume's new best friend.</div>


{/* email and password form */}
<form class="max-w-sm mx-auto mt-12 bg-local">
  <div class="mb-9">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your Email:</label>
    <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@ucla.com" required />
  </div>
  <div class="mb-9">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your Password:</label>
    <input type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
  </div>
  <div class="mb-9">
    <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Repeat Password:</label>
    <input type="password" id="repeat-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
  </div>
  <div class="flex items-start mb-9">
    <div class="flex items-center h-5">
      <input id="terms" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-white focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-white-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
    </div>

    <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-black">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
  </div>
  <div>
  <button type="submit" class="text-white bg-yellow-700 hover:bg-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700">Register new account</button>

  {/* This button allows users to navigate to the login page, if they already have an account and don't want to register a new one. */}
  <LoginButton/>
  </div>
</form>

</div>
       
</div>
             
            
)
    
   
}

export default Home