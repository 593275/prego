import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PrivateRoutes } from './Functions/function';
import Login from './Pages/LoginForm';
import Dashboard from './Pages/Dashboard';
import OmPreGO from "./Pages/OmPreGO";
import AndreFaktorer from "./Pages/AndreFaktorer";
import Aruba from "./Pages/Aruba";
import CsvReader from './Pages/adminDashboard';

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
              <Route element={<Login/>} path="/"/>
              <Route element={<CsvReader/>} path="/admin"/>
            </Routes>
        </Router>
      </div>
    );
  }
  
  export default App;
  