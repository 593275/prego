import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PrivateRoutes } from './Functions/privateRoutes';
import Login from './Pages/LoginForm';
import Dashboard from './Pages/Dashboard';
import OmPreGO from "./Pages/OmPreGO";
import AndreFaktorer from "./Pages/AndreFaktorer";
import Aruba from "./Pages/Aruba";

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
            </Routes>
        </Router>
      </div>
    );
  }
  
  export default App;
  