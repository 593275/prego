import React, { useState } from "react";
import '../css/index.css'
import Navbar from "./Navbar";



const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([
    "apple",
    "banana",
    "orange",
    "pineapple",
    "watermelon",
  ]);

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
  <div className="dashboard">
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for items..."
      />
      <ul>
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>

    <div><Navbar/></div>
  </div>
    
  
  );
};


export default SearchBar;

