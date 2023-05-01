import { Outlet, Navigate } from 'react-router-dom'
import { auth } from "../config/firebase-config"
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, getDocs, getDoc, doc } from "firebase/firestore"; 
import { db } from "../config/firebase-config"


  
export const PrivateRoutes = () => {
    const user = auth.currentUser;
    return(
        user ? <Outlet/> : <Navigate to="/"/>
    )
}


export const AdminRoutes = () => {
    const user = auth.currentUser;
    return(
      
        auth && user?.uid === "PEBh74M2IeSVfpey2C4iIsXuifu2" ? <Outlet/> : <Navigate to="/"/>
    )
}

export const landDb = () => {
    const [land, setLand] = useState("");
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "Land"), (snapshot) =>
          setLand(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
        );
    
        return () => unsubscribe();
      }, []);
    
      return land 
}

export const getCollectionIds = async (collectionName) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const ids = [];
    querySnapshot.forEach((doc) => ids.push(doc.id));
    return ids;
  };

export async function getNorgeData()  {
    const land = "Norge"
    const docRef = doc(db, "Land", land)
    const docSnap = await getDoc(docRef)
    return docSnap.data();
  };

//Kalkulerer risiko score 
export function riskScoreCalc ( land, landListe )  {
  // Sorterer etter forskjellige varibaler
  const sortedListPct_sb = [...landListe].sort((a, b) => a.pct_sb - b.pct_sb);
  console.log(sortedListPct_sb)
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
  console.log(indexPct_sb + " " + indexPct_lbw + " " + indexPct_pet + " " + indexPct_gdm + " " + indexPct_cs + " " + indexPct_fa )

  return indexPct_sb*12 + indexPct_lbw*3 + indexPct_pet*4 + indexPct_gdm*2 + indexPct_cs*2 + indexPct_fa;
}

export const sum = (a, b) => {
  return a+b;
}
  
