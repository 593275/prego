import React from "react";
import { Bar } from "react-chartjs-2";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { collection, query, doc, getDoc, updateDoc, deleteDoc, where , getDocs} from "firebase/firestore";
import { db } from "../config/firebase-config"
import "../css/Graph.css"

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
  const dataArray = []

  useEffect(() => {
    const getLandData = async () => {
      const land = localStorage.getItem("userInput")
      const docRef = doc(db, "Land", land)
      const docSnap = await getDoc(docRef)
      if(docSnap.data().N < 1000) {
        const landRef = collection(db, "Land");
        const queryGBD = query(landRef, where("gbd", "==", docSnap.data().gbd))
        const querySnapshot = await getDocs(queryGBD)

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          dataArray.push(data);
        });

        const totalN = dataArray.reduce((acc, cur) => acc + cur.N, 0);
        const totalN_sb = dataArray.reduce((acc, cur) => acc + cur.n_sb, 0);
        const totalN_lbw = dataArray.reduce((acc, cur) => acc + cur.n_lbw, 0);
        const totalN_pet = dataArray.reduce((acc, cur) => acc + cur.n_pet, 0);
        const totalN_gdm = dataArray.reduce((acc, cur) => acc + cur.n_gdm, 0);
        const totalN_cs = dataArray.reduce((acc, cur) => acc + cur.n_cs, 0);
        const totalN_fa = dataArray.reduce((acc, cur) => acc + cur.n_fa, 0);

        const dataGBD = {
          pct_sb: (totalN_sb / totalN)*100,
          pct_lbw: (totalN_lbw / totalN)*100,
          pct_pet: (totalN_pet / totalN)*100,
          pct_gdm: (totalN_gdm / totalN)*100,
          pct_cs: (totalN_cs / totalN)*100,
          pct_fa: (totalN_fa / totalN)*100
        }

        setItems2(dataGBD)
     

      } else {
        setItems2(docSnap.data());
      }
    };

    const getNorgeData = async () => {
      const land = "Norge"
      const docRef = doc(db, "Land", land)
      const docSnap = await getDoc(docRef)
      setItems(docSnap.data());
    };

    getNorgeData();
    getLandData();
  }, []);

  


  const data = {
    labels: ['', '', '', '', '', ''],
    datasets: [
      {
        label: 'Norge',
        data: [
          //toFixed(1) fungerer ikke med databasen
          Math.round(parseFloat(items.pct_sb) * 10) / 10,
          Math.round(parseFloat(items.pct_lbw) * 10) / 10,
          Math.round(parseFloat(items.pct_pet) * 10) / 10,
          Math.round(parseFloat(items.pct_gdm) * 10) / 10,
          Math.round(parseFloat(items.pct_cs) * 10) / 10,
          Math.round(parseFloat(items.pct_fa) * 10) / 10
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: [localStorage.getItem("userInput")],
        data: [
          //toFixed(1) fungerer ikke med databasen
          Math.round(parseFloat(items2.pct_sb) * 10) / 10,
          Math.round(parseFloat(items2.pct_lbw) * 10) / 10,
          Math.round(parseFloat(items2.pct_pet) * 10) / 10,
          Math.round(parseFloat(items2.pct_gdm) * 10) / 10,
          Math.round(parseFloat(items2.pct_cs) * 10) / 10,
          Math.round(parseFloat(items2.pct_fa) * 10) / 10
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ]
  };
  
  

  const options = {};

  return (
    <div className="App">
      
      <div className="graf">
        <h1>PreGO Graf</h1>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default Tester;
