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
    const [items3, setItems3] = useState([])
    const dataArray = []
    const yearArray = [2001,2005,2009,2013,2017,2021];
    let data = ""
  
    useEffect(() => {

      const landAar = []

      const getNorgeData = async () => {
      const land = "Norge";
      for(let index = 0; index < yearArray.length; index ++) {
          const docRef = doc(db, "Land" + yearArray[index], land + yearArray[index])
          const docSnap = await getDoc(docRef)
          landAar[index] = (docSnap.data());
      }
      setItems3(landAar)
      };

      const getLandData = async () => {

        const landAar2 = []
        const land = "Etiopia"
         for(let index = 0; index < yearArray.length; index ++) {
          const docRef = doc(db, "Land" + yearArray[index], land + yearArray[index])
          const docSnap = await getDoc(docRef)
          landAar2[index] = (docSnap.data());
      }
      setItems2(landAar2)
      };
  

  
      getNorgeData();
      getLandData();
    }, []);
  
   
  if(typeof items3 !== 'undefined' && typeof items2 !== 'undefined') {
     data = {
      
      labels: ['2001', '2005', '2009', '2013', '2017', '2021'],
      datasets: [
        {
          label: 'Norge',
          data: [items3[0]?.pct_sb,items3[1]?.pct_sb,items3[2]?.pct_sb,items3[3]?.pct_sb,items3[4]?.pct_sb],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: [localStorage.getItem("userInput")],
          data: [items2[0]?.pct_sb,items2[1]?.pct_sb,items2[2]?.pct_sb,items2[3]?.pct_sb,items2[4]?.pct_sb],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ]
    };
  }
  
    const options = {};
  
    return (
        
      <div style={{ width: '50%', margin: '0 auto', textAlign: 'center' }}>
        <Navbar />
        <Line data ={data} options = {options}></Line>
      </div>
    );
  }

export default LineChart;