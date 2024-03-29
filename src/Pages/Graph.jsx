import React from "react";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import "../css/Graph.css"
import { getNorgeData, getLandData } from '../Utils/function';

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

//Code for the main chart 
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

//Code for the main chart 
function Tester() {

  const [items, setItems] = useState([])
  const [items2, setItems2] = useState([])
  const [landGbd, setlandGBD] = useState("")
  let data = "";
  
//Fetching data from database to be used for the graph
  useEffect(() => {
  const henteData = async () => {
    const userInput = localStorage.getItem("userInput")
    const userLand = await getLandData(userInput)
    setItems2(userLand);

    if (userLand.N < 1000) {
      setlandGBD(userLand.gbd);
    } else {
      setlandGBD(userLand.ctry);
    }
    

    const getNorge =  await getNorgeData()
    setItems(getNorge)
  }
  
  henteData()

    
  }, []);


  
  //Dispalying the data in form of a graph
  if(typeof landGbd !== 'undefined') {
    
   data = {
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
        label: [landGbd],
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
}
  

const options = {plugins: {
   
  legend: {
    labels: {
      font: {
        size: 25 // Adjust the font size as per your requirement
      }
    }
  },
  tooltip: {   
    bodyFont: {
      size: 25 // Adjust the font size as per your requirement
    }
  }
}
}; 

  return (

   
    <div className="App">      
      <div className="graf" >
        <h1>PreGO Graf</h1>
        <Bar data={data} options={options} />

      </div>
    </div>
  );
}

export default Tester;
