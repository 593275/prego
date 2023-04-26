import { Outlet, Navigate } from 'react-router-dom'
import { auth } from "../config/firebase-config"
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, getDocs, getDoc } from "firebase/firestore"; 
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

export const getNorgeData = async () => {
  const [NorgeData, setNorgeData] = useState("");
    const land = "Norge"
    const docRef = doc(db, "Land", land)
    const docSnap = await getDoc(docRef)
    setNorgeData(docSnap.data());
    return NorgeData;
  };

  
