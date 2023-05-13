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

function LineChart(label) {
    const risiko =label.label
    const [items, setItems] = useState("Ikke nok data")
    const [items2, setItems2] = useState([])
    const [items3, setItems3] = useState([])
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
      
      const riktigRisiko = landAar.map(item => item[risiko])
      setItems3(riktigRisiko)
      
      };

      const getLandData = async () => {

        const landAar2 = []
        const land = localStorage.getItem("userInput")
         for(let index = 0; index < yearArray.length; index ++) {
          const docRef = doc(db, "Land" + yearArray[index], land + yearArray[index])
          const docSnap = await getDoc(docRef)
          landAar2[index] = (docSnap.data());
      }
      if(landAar2[0] !=='undefined') {
        const riktigRisiko = landAar2.map(item => item[risiko]);
        setItems2(riktigRisiko)
        setItems(land)
      } else {
        setItems("Ikke nok data")
      }
    

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
          data: [items3[0], items3[1], items3[2], items3[3], items3[4], items3[5]],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: [items],
          data: [items2[0], items2[1], items2[2], items2[3], items2[4], items2[5]],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ]
    };
  }
  
    const options = {};
  
    return (
        
      <div style={{ width: '100%', margin: '0 auto', textAlign: 'center' }}>
        <Navbar />
        <Line data ={data} options = {options}></Line>
      </div>
    );
  }

export default LineChart;