import React, { useRef, useState, useEffect } from 'react';
import { collection, query, doc, getDoc, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config" 
import "../css/sirkel.css"
import LineChart from './LineChart';
import { getLandData, getNorgeData } from '../Utils/function';

function Circles() {
  const canvasRef = useRef(null);
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [landData, setLandData] = useState(null);
  const [norgeData, setNorgeData] = useState(null);
  const tester = 1;
  const labels = ['Stillbirth', 'Low birthweight', 'Preeclampsia', 'Gestational diabetes', 'Cesarean section', 'Folic acid'];
  const variables = ['pct_sb', 'pct_lbw', 'pct_pet', 'pct_gdm', 'pct_cs', 'pct_fa']
  const dataArray = [];

  const showModal = (circleIndex) => {
    setSelectedCircle(circleIndex);
    console.log(circleIndex)
  };

  const hideModal = () => {
    setSelectedCircle(null);
  };

  useEffect(() => {
   
    const userLand = getLandData(localStorage.getItem("userInput"))
    userLand.then(result => {
      setLandData(result)
    })

    const Norge = getNorgeData()
    Norge.then(result => {
      setNorgeData(result)
    })
    
    getNorgeData();
   
  }, []);

  useEffect(() => {
    if (landData && norgeData) {
      // Draw circles on canvas once the canvas element is mounted and land data is available
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      drawCircles(ctx);

      // Remove event listener from canvas once the component unmounts
      return () => {
        canvas.removeEventListener('click', () => {});
      };
    }
  }, [landData, norgeData]);

  const drawCircle = (ctx, x, y, radius, color, label, number, index) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  
    // Create an invisible button with the same shape as the circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fill();
  
    ctx.font = '16px Arial';
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.fillText(label, x, y + radius + 20);
  
    ctx.font = '15px Arial';
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.fillText(String(number), x, y + radius + 35);
  
    // Add event listener to the button
    canvasRef.current.addEventListener('click', (e) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const dist = Math.sqrt((clickX - x) ** 2 + (clickY - y) ** 2);
  
      if (dist <= radius) {
        showModal(index);
      }
    });
  };
  

  const drawCircles = (ctx) => {
    const radius = 20;
    const padding = 115;
    const numbers = [landData?.pct_sb, landData?.pct_lbw, landData?.pct_pet, landData?.pct_gdm, landData?.pct_cs, landData?.pct_fa];
    const norgeNumbers = [norgeData?.pct_sb, norgeData?.pct_lbw, norgeData?.pct_pet, norgeData?.pct_gdm, norgeData?.pct_cs, norgeData?.pct_fa];
    const roundedNumbersNorge = norgeNumbers.map(num => parseFloat(num?.toFixed(2)));
    const roundedNumbers = numbers.map(num => parseFloat(num?.toFixed(2)));
    
  
   
    const possibleColors = [
      {  color: '#008000' },    // green
      {  color: '#FFFF00' },   // yellow
      {  color: '#FF0000' }   // red
    ];
  
    const colors = roundedNumbers.map((num, i) => {
      if(i === 0) {

        if (num <= roundedNumbersNorge[i]*0.5) {
          return "#008000";
        } else if (num > roundedNumbersNorge[i]*0.5 && roundedNumbersNorge[i]*1.5 > num) {
          return "#ffff00";
        } else if(roundedNumbersNorge[i]*1.5 <= num) {
          return "#FF0000";
        } else {
          return "#745194";
        }

      } else if(i === 1) {

        if (num <= roundedNumbersNorge[i]*0.5) {
          return "#008000";
        } else if (num > roundedNumbersNorge[i]*0.5 && roundedNumbersNorge[i]*1.5 > num) {
          return "#ffff00";
        } else if(roundedNumbersNorge[i]*1.5 <= num) {
          return "#FF0000";
        } else {
          return "#745194";
        }
        
      } else if(i === 2) {

        if (num <= roundedNumbersNorge[i]*0.5) {
          return "#008000";
        } else if (num > roundedNumbersNorge[i]*0.5 && roundedNumbersNorge[i]*1.5 > num) {
          return "#ffff00";
        } else if(roundedNumbersNorge[i]*1.5 <= num) {
          return "#FF0000";
        } else {
          return "#745194";
        }
      } else if(i === 3) {

        if (num <= roundedNumbersNorge[i]*0.5) {
          return "#008000";
        } else if (num > roundedNumbersNorge[i]*0.5 && roundedNumbersNorge[i]*1.5 > num) {
          return "#ffff00";
        } else if(roundedNumbersNorge[i]*1.5 <= num) {
          return "#FF0000";
        } else {
          return "#745194";
        }

      } else if(i === 4) {

        if (num <= roundedNumbersNorge[i]*0.5) {
          return "#008000";
        } else if (num > roundedNumbersNorge[i]*0.5 && roundedNumbersNorge[i]*1.5 > num) {
          return "#ffff00";
        } else if(roundedNumbersNorge[i]*1.5 <= num) {
          return "#FF0000";
        } else {
          return "#745194";
        }

      } else if(i === 5) {

        if (num <= roundedNumbersNorge[i]*0.5) {
          return "#FF0000";
        } else if (num > roundedNumbersNorge[i]*0.5 && roundedNumbersNorge[i]*1.5 > num) {
          return "#ffff00";
        } else if(roundedNumbersNorge[i]*1.5 <= num) {
          return "#008000";
          
        } else {
          return "#745194";
        }

      } else {
        return "#000000"
      }
      
    });
  
    // Check if any of the numbers are undefined
    if (numbers.some(num => num === undefined) && norgeNumbers.some(num => num === undefined)) {
      return;
    }
  
    const totalWidth = (radius * 2 + padding) * 6 - padding;
    const startX = (ctx.canvas.width - totalWidth) / 2;
    const startY = radius + padding;

    const formattedNumbers = roundedNumbers.map(num => `${num.toFixed(2)}%`);
  
    for (let i = 0; i < 6; i++) {
      const x = startX + (i * (radius * 2 + padding));
      const y = startY;
  
      drawCircle(ctx, x, y, radius, colors[i], labels[i], formattedNumbers[i], i);
    }
  };
  
  
  

  useEffect(() => {
    // Draw circles on canvas once the canvas element is mounted
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawCircles(ctx);

    // Remove event listener from canvas once the component unmounts
    return () => {
      canvas.removeEventListener('click', () => {});
    };
  }, [landData]);

  return (
    <>
      <canvas id="canvas" ref={canvasRef} width={"1100vw"} height={"200vh"} />
      {selectedCircle !== null && (
        <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={hideModal}>&times;</span>
          <h2>{labels[selectedCircle]}</h2>
          <p3>Fakta om {labels[selectedCircle]}?</p3>
          <LineChart label = {variables[selectedCircle]} />
        </div>
      </div>
      )}
    </>
  );
}

export default Circles;
