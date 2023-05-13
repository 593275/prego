import { Outlet, Navigate } from 'react-router-dom'
import React from "react";
import { auth } from "../config/firebase-config"

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