import React, { useState, useEffect } from "react";
import "../css/index.css";
import Navbar from "./Navbar";
import { db } from "../config/firebase-config"
import { useNavigate } from 'react-router-dom';
import { collection, query, doc, getDocs } from "firebase/firestore"; 

//Logic for the searchbar
const SearchBar =  () => {
  let land = ""
  const navigate = useNavigate();
  let filteredItems = ""
  const landCollectionRef = collection(db, "Land");
  const [query, setQuery] = useState(""); 
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true);
 
//Fetching all the countries in the database 
  useEffect(() => {
    const getLand = async () => {
      const data = await getDocs(landCollectionRef);
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsLoading(false);
    };

    getLand();
  }, []);


//Waiting for the the countries to be fetched from database 
  if (isLoading === false) {
    
    filteredItems = items.filter((item) =>
    item.ctry.toLowerCase().includes(query.toLowerCase()));
    
    filteredItems.sort((a, b) => {
      if (a.ctry < b.ctry) {
        return -1;
      }
      if (a.ctry > b.ctry) {
        return 1;
      }
      return 0;
    }); 
  }
    

//Handling click event where user select a country 
  const handleItemClick = (item) => {
    setQuery(item);
  };

//Navigating user to selected country 
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      land = query
      localStorage.setItem('userInput', query);
      navigate("/Land")
    }

  };

  return (
    <div className="dashboard">
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Søk etter land"
        />
        <ul>
          {filteredItems && filteredItems.slice(0, 5).map((item) => (
            <li key={item.id} onClick={() => handleItemClick(item.ctry)}>
              {item.ctry}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Navbar />
      </div>
    </div>
  );
};

export default SearchBar;