import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PrivateRoutes, AdminRoutes } from './Functions/function';
import Login from './Pages/LoginForm';
import Dashboard from './Pages/Dashboard';
import OmPreGO from "./Pages/OmPreGO";
import AndreFaktorer from "./Pages/AndreFaktorer";
import Aruba from "./Pages/Aruba";
import AdminDashboard from './Pages/adminDashboard';
import Tester from './Pages/Land';
import Circles from './Pages/sirkerlTester';

  const App = () =>  {
    return (
      <div className="App">
          <Router>
            <Routes>

              <Route element={<PrivateRoutes />}>
                  <Route element={<Dashboard/>} path="/dashboard" exact/>
                  <Route element={<OmPreGO/>} path="/OmPreGo"/>
                  <Route element={<AndreFaktorer/>} path="/AndreFaktorer"/>
                  <Route element={<Aruba/>} path="/Aruba"/>
              </Route>

              <Route element = {<AdminRoutes />}>
                  <Route element={<AdminDashboard />} path="/adminDashboard"/>
              </Route>

              <Route element={<Login/>} path="/"/>
              <Route element={<Tester/>} path="/tester"/>
              <Route element={<Circles/>} path="/sirkel"/>

            </Routes>
        </Router>
      </div>
    );
  }
  
  export default App;
  