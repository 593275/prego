import React from "react";
import { Line } from "react-chartjs-2";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { doc, getDoc} from "firebase/firestore";
import { db } from "../config/firebase-config"

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
  } from "chart.js";
  
  ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

//Function for linechart that displays risk factors over the years
function LineChart(label) {
    const risiko =label.label
    const [UserCountry, setUserCountry] = useState("Ikke nok data")
    const [UserCountryData, setUserCountryData] = useState([])
    const [NorgeData, setNorgeData] = useState([])
    const yearArray = [2001,2005,2009,2013,2017,2021];
    let data = ""

  
  //Fetching data from database that will be used in the linecharts 
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
      setNorgeData(riktigRisiko)
      
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
        setUserCountryData(riktigRisiko)
        setUserCountry(land)
      } else {
        setUserCountry("Ikke nok data")
      }
    

      };
  
      getNorgeData();
      getLandData();
    }, []);
  
  //Displaying data from database in linecharts when the data is ready
  if(typeof NorgeData !== 'undefined' && typeof UserCountryData !== 'undefined') {

     data = {
      
      labels: ['2001', '2005', '2009', '2013', '2017', '2021'],
      datasets: [
        {
          label: 'Norge',
          data: [
            //toFixed(1) fungerer ikke med databasen
            Math.round(parseFloat(NorgeData[0]) * 10) / 10,
            Math.round(parseFloat(NorgeData[1]) * 10) / 10,
            Math.round(parseFloat(NorgeData[2]) * 10) / 10,
            Math.round(parseFloat(NorgeData[3]) * 10) / 10,
            Math.round(parseFloat(NorgeData[4]) * 10) / 10,
            Math.round(parseFloat(NorgeData[5]) * 10) / 10
          ],            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: [UserCountry],
          data: [
            //toFixed(1) fungerer ikke med databasen
            Math.round(parseFloat(UserCountryData[0]) * 10) / 10,
            Math.round(parseFloat(UserCountryData[1]) * 10) / 10,
            Math.round(parseFloat(UserCountryData[2]) * 10) / 10,
            Math.round(parseFloat(UserCountryData[3]) * 10) / 10,
            Math.round(parseFloat(UserCountryData[4]) * 10) / 10,
            Math.round(parseFloat(UserCountryData[5]) * 10) / 10
          ],          
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ]
    };
  }
  
  const options = {plugins: {
   
    legend: {
      labels: {
        font: {
          size: 25 
        }
      }
    },
    tooltip: {   
      bodyFont: {
        size: 25 
      }
    }
  }
};  
    return (
        
      <div style={{ width: '150%', margin: '0 auto', textAlign: 'center' }}>
        <Navbar />
        <Line data ={data} options = {options}></Line>
      </div>
    );
  }

export default LineChart;