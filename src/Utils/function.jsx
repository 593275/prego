
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, getDocs, getDoc, doc, where, query } from "firebase/firestore"; 
import { db } from "../config/firebase-config"

//Henter alt data om Norge fra en database kolleksjon som heter Land
export async function getNorgeData()  {
    const land = "Norge"
    const docRef = doc(db, "Land", land)
    const docSnap = await getDoc(docRef)
    return docSnap.data();
};

//Blir brukt for brukt for å hente data som skal bli fremstilt som graf eller farge baller i prototypen
export async function getLandData(userInput)  {
    const dataArray = [];
    const land = userInput
    console.log(userInput)
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
        gbd: docSnap.data().gbd,
        N: docSnap.data().N,
        pct_sb: (totalN_sb / totalN)*100,
        pct_lbw: (totalN_lbw / totalN)*100,
        pct_pet: (totalN_pet / totalN)*100,
        pct_gdm: (totalN_gdm / totalN)*100,
        pct_cs: (totalN_cs / totalN)*100,
        pct_fa: (totalN_fa / totalN)*100
      }

      return dataGBD
  
    } else {
      return docSnap.data()
    }
  };
//Kalkulerer risiko score 
export function riskScoreCalc ( land, landListe )  {
  
  // Sorterer etter forskjellige varibaler
  const sortedListPct_sb = [...landListe].sort((a, b) => a.pct_sb - b.pct_sb);
  const sortedListPct_lbw = [...landListe].sort((a, b) => a.pct_lbw - b.pct_lbw);
  const sortedListPct_pet = [...landListe].sort((a, b) => a.pct_pet - b.pct_pet);
  const sortedListPct_gdm = [...landListe].sort((a, b) => a.pct_gdm - b.pct_gdm);
  const sortedListPct_cs = [...landListe].sort((a, b) => a.pct_cs - b.pct_cs);
  const sortedListPct_fa = [...landListe].sort((a, b) => b.pct_fa - a.pct_fa);
  
  // Index til valgt land etter de forskjellige varibalene 
  const indexPct_sb = sortedListPct_sb.findIndex((obj) => obj.ctry === land)+1;
  const indexPct_lbw = sortedListPct_lbw.findIndex((obj) => obj.ctry === land)+1;
  const indexPct_pet = sortedListPct_pet.findIndex((obj) => obj.ctry === land)+1;
  const indexPct_gdm = sortedListPct_gdm.findIndex((obj) => obj.ctry === land)+1;
  const indexPct_cs = sortedListPct_cs.findIndex((obj) => obj.ctry === land)+1;
  const indexPct_fa = sortedListPct_fa.findIndex((obj) => obj.ctry === land)+1;
  

  return indexPct_sb*12 + indexPct_lbw*3 + indexPct_pet*4 + indexPct_gdm*2 + indexPct_cs*2 + indexPct_fa;
}

export function riskScoreRang(land, landListe) {
  
  let array = []
  for(let i = 0; i < landListe.length; i++) {
    let CalcLand = landListe[i].ctry
    let riskCalc = riskScoreCalc(CalcLand, landListe)
    let arrObj = {
      riskScore: riskCalc,
      land: CalcLand 
    }
    array.push(arrObj)
  }
  const sortedListScore = [...array].sort((a, b) => b.riskScore - a.riskScore);
  const getIndex = sortedListScore.findIndex(item => item.land === land);
  return getIndex+1
  
}

export const sum = (a, b) => {
  return a+b;
}
  
