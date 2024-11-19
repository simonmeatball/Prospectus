import { useState } from "react";
import Home from "./pages/Home.jsx"
import React from "react";



function App() {
  const [page, setPage] = useState("Home");
 
  return (
    <div>
      {
      
      /* <nav>
        <button onClick={() => setPage("Home")}>Home</button>
       
      </nav> */}


      {page === "Home" && <Home />}
      
    </div>
  );
}


export default App;