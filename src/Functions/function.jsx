import { Outlet, Navigate } from 'react-router-dom'
import { auth } from "../config/firebase-config"
import React, { useEffect, useState } from "react";
import { collection, onSnapshot} from "firebase/firestore"; 
import { db } from "../config/firebase-config"

export const PrivateRoutes = () => {
    const user = auth.currentUser;
    return(
        user ? <Outlet/> : <Navigate to="/"/>
    )
}


export const adminRoutes = () => {
    const user = auth.currentUser;
    return(
        auth && user.uid === "PEBh74M2IeSVfpey2C4iIsXuifu2" ? <Outlet/> : <Navigate to="/"/>
    )
}

export const landDb = () => {
    const [users, setUsers] = useState("");
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "Land"), (snapshot) =>
          setUsers(snapshot.docs.map((doc) => ({ ...doc.data()})))
        );
    
        return () => unsubscribe();
      }, []);
    
      return users;
}

