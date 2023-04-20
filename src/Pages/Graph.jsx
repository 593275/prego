import React from "react";
import { Bar } from "react-chartjs-2";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { collection, query, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase-config"

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Tester() {

  const [items, setItems] = useState([])
  const [items2, setItems2] = useState([])


  useEffect(() => {
    const getNorge = async () => {
      const land = "Norge"
      const docRef = doc(db, "Land", land)
      const docSnap= await getDoc(docRef)
      setItems(docSnap.data());
      console.log(docSnap.data())
    };

    const getLand = async () => {
      const land = localStorage.getItem("userInput")
      const docRef = doc(db, "Land", land)
      const docSnap= await getDoc(docRef)
      setItems2(docSnap.data());
      console.log(docSnap.data())
    };

    getNorge();
    getLand();
  }, []);

  


  const data = {
    labels: ['Stillbirth', 'Low birthweight', 'Preeclampsia', 'Gestational diabetes', 'Cesarean section', 'Folic acid'],
    datasets: [
      {
        label: 'Norge',
        data: [items.pct_sb, items.pct_lbw, items.pct_pet, items.pct_gdm, items.pct_cs, items.pct_fa],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: [items2.ctry],
        data: [items2.pct_sb, items2.pct_lbw, items2.pct_pet, items2.pct_gdm, items2.pct_cs, items2.pct_fa],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ]
  };

  const options = {};

  return (
    <div className="App">
      <h1>PreGO Graf</h1>
      <Navbar/>
      <div style={{ width: '50%', margin: '0 auto', textAlign: 'center' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default Tester;
