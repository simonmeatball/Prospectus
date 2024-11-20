import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";



function App() {
  return (
    <Router>
       <Routes> 
        <Route path = "/" element = {<Home />} /> {/*Home page */}
        <Route path = "/login" element = {<Login/>} />  {/*Login page */}


       </Routes>
    </Router>
  );
}


export default App;