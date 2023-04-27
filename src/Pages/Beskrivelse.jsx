import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { collection, query, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase-config" 
import "../css/Beskrivelse.css"

useEffect

function MyPage() {

const [items, setItems] = useState([])

const getLand = async () => {
    const land = localStorage.getItem("userInput")
    const docRef = doc(db, "Land", land)
    const docSnap = await getDoc(docRef)
    setItems(docSnap.data());
    
  };
  
  useEffect(() => {
    getLand();
  }, []);

  return (
    <div>
      <h1 className="Land">{items.ctry}</h1>
      <p className="Beskrivelse">{items.beskrivelse}</p>
      <Navbar/>
    </div>
  );
}

export default MyPage;