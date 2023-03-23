import React from "react";
import Navbar from "./Navbar";
import "../css/Aruba.css";
import myImage from "../Bilder/Flag_of_Aruba.svg.png"

const Aruba = () => {
  return (
    <div>
      <h2 className="Land">Aruba</h2>
      <h3 className="Inntektsgruppe">Inntektsgruppe:</h3>
      <p className="InntektsgruppeTekst">Høyinntekstsland</p>
      <h3 className="Region">Region:</h3>
      <p className="RegionTekst">Latin America & Caribbean</p>
      <h3 className="Beskrivelse">Beskrivelse</h3>
      <p className="BeskrivelseTekst">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <div className="circles-container">
      <div className="circle red"></div>
      <div className="circle green"></div>
      <div className="circle orange"></div>
    </div>
      <img className="Bilde" src={myImage} alt="My Image" />
      <Navbar />
      
    </div>
    
  );
};


export default Aruba;

