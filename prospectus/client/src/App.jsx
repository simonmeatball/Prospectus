import { useState, useEffect } from 'react';
import axios from "axios";
import "./App.css"

function App() {
  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    setArray(response.data.fruits);
    console.log(response.data.fruits);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
    <div class = "container">
      <h1 className = "Heading">Welcome to Prospectus</h1>
     </div>
     
     </>
  )
}

export default App
