import { createBrowserRouter } from "react-router-dom";
import Login from './Pages/LoginForm';
import Dashboard from './Pages/Dashboard';


export const router = createBrowserRouter([{path: "/", element: <Login/>}, 
                                           {path: "/dashboard", element: <Dashboard/>}])