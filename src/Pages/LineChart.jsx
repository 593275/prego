import React from "react";
import { Line } from "react-chartjs-2";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { collection, query, doc, getDoc, updateDoc, deleteDoc, where , getDocs} from "firebase/firestore";
import { db } from "../config/firebase-config"

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
  } from "chart.js";
  
  ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function LineChart() {
    const [items, setItems] = useState([])
    const [items2, setItems2] = useState([])
    const landAar = []
    const dataArray = []
  
    useEffect(() => {

      const getNorgeData = async () => {
        const land = "Norge";
        const yearArray = [2001,2005,2009,2013,2017,2021];
        for(let index = 0; index < yearArray.length; index ++) {
          const docRef = doc(db, "Land" + yearArray[index], land + yearArray[index])
          const docSnap = await getDoc(docRef)
          landAar[index] = (docSnap.data());
        }
      
        
      
      console.log(landAar)
      };
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
          const totalN_fa = dataArray.reduce((acc, cur) => acc + cur.n_cs, 0);
  
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
  

  
      getNorgeData();
      getLandData();
    }, []);
  
    
  
  
    const data = {
      labels: ['2001', '2005', '2009', '2013', '2017', '2021'],
      datasets: [
        {
          label: 'Norge',
          data: [items.pct_sb, items.pct_lbw, items.pct_pet, items.pct_gdm, items.pct_cs, items.pct_fa],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: [localStorage.getItem("userInput")],
          data: [items2.pct_sb, items2.pct_lbw, items2.pct_pet, items2.pct_gdm, items2.pct_cs, items2.pct_fa],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ]
    };
  
    const options = {};
  
    return (
        
      <div style={{ width: '50%', margin: '0 auto', textAlign: 'center' }}>
        <Navbar />
        <Line data ={data} options = {options}></Line>
      </div>
    );
  }

export default LineChart;