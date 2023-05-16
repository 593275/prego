import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase-config" 
import "../css/Beskrivelse.css"

//Getting data 
function MyPage() {

const [land, setLand] = useState([])

const getLand = async () => {
    const land = localStorage.getItem("userInput")
    const docRef = doc(db, "Land", land)
    const docSnap = await getDoc(docRef)
    setLand(docSnap.data());
    
  };
  
  useEffect(() => {
    getLand();
  }, []);

  return (
    <div>
      <h1 className="Land">{land.ctry}</h1>
      <p className="Beskrivelse">{land.beskrivelse}</p>
      <Navbar/>
    </div>
  );
}

export default MyPage;