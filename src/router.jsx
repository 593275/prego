import { createBrowserRouter } from "react-router-dom";
import Login from './Pages/LoginForm';
import Dashboard from './Pages/Dashboard';
import OmPreGO from "./Pages/OmPreGO";
import AndreFaktorer from "./Pages/AndreFaktorer";
import Aruba from "./Pages/Aruba";


export const router = createBrowserRouter([{path: "/", element: <Login/>}, 
                                           {path: "/dashboard", element: <Dashboard/>},
                                           {path: "/omprego", element: <OmPreGO/>},
                                           {path: "/andrefaktorer", element: <AndreFaktorer/>},
                                           {path: "/Aruba", element: <Aruba/>}])