import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PrivateRoutes, AdminRoutes } from './Functions/function';
import Login from './Pages/LoginForm';
import Dashboard from './Pages/Dashboard';
import OmPreGO from "./Pages/OmPreGO";
import AndreFaktorer from "./Pages/AndreFaktorer";
import AdminDashboard from './Pages/adminDashboard';
import Land from './Pages/Land';
import Tester from './Pages/Graph';
import LineChart from "./Pages/LineChart";

  const App = () =>  {
    return (
      <div className="App">
          <Router>
            <Routes>

              <Route element={<PrivateRoutes />}>
                  <Route element={<Dashboard/>} path="/dashboard" exact/>
                  <Route element={<OmPreGO/>} path="/OmPreGo"/>
                  <Route element={<AndreFaktorer/>} path="/AndreFaktorer"/>
                  <Route element={<Land/>} path="/Land"/>
              </Route>

              <Route element = {<AdminRoutes />}>
                  <Route element={<AdminDashboard />} path="/adminDashboard"/>
              </Route>

              <Route element={<Login/>} path="/"/>
              <Route element={<LineChart/>} path="/LineChart"/>
      

            </Routes>
        </Router>
      </div>
    );
  }
  
  export default App;
  