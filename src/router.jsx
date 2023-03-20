import { createBrowserRouter } from "react-router-dom";
import Login from './LoginForm';
import Dashboard from './Dashboard';


export const router = createBrowserRouter([{path: "/", element: <Login/>}, 
                                           {path: "/dashboard", element: <Dashboard/>}])