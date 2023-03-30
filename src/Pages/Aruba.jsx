import React, { useState } from "react";
import Navbar from "./Navbar";
import "../css/Aruba.css";
import myImage from "../Bilder/Flag_of_Aruba.svg.png"

const Aruba = () => {
  const [modalOpenRed, setModalOpenRed] = useState(false);
  const [modalOpenGreen, setModalOpenGreen] = useState(false);
  const [modalOpenOrange, setModalOpenOrange] = useState(false);

  const handleCircleClickRed = () => {
    setModalOpenRed(true);
  };

  const handleCircleClickGreen = () => {
    setModalOpenGreen(true);
  };

  const handleCircleClickOrange = () => {
    setModalOpenOrange(true);
  };

  const handleModalClose = () => {
    setModalOpenRed(false);
    setModalOpenGreen(false);
    setModalOpenOrange(false);
  };

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
<<<<<<< HEAD
        <div className="circle red" onClick={handleCircleClickRed}></div>
        <div className="circle green" onClick={handleCircleClickGreen}></div>
        <div className="circle orange" onClick={handleCircleClickOrange}></div>
      </div>
      {modalOpenRed && (
        <div className="modal-container" onClick={handleModalClose}>
          <div className="modal-box">
            <p>Info om rød sirkel</p>
            <button onClick={handleModalClose}>Lukk</button>
          </div>
        </div>
      )}
      {modalOpenGreen && (
        <div className="modal-container" onClick={handleModalClose}>
          <div className="modal-box">
            <p>Info om grønn sirkel</p>
            <button onClick={handleModalClose}>Lukk</button>
          </div>
        </div>
      )}
      {modalOpenOrange && (
        <div className="modal-container" onClick={handleModalClose}>
          <div className="modal-box">
            <p>Info om oransje sirkel</p>
            <button onClick={handleModalClose}>Lukk</button>
          </div>
        </div>
      )}
=======
        <div className="circle red"></div>
        <div className="circle green"></div>
        <div className="circle orange"></div>
      </div>
>>>>>>> d462a85e1d7e33450ea8f1c16f9cb9e5b7e7734a
      <img className="Bilde" src={myImage} alt="My Image" />
      <Navbar />
    </div>
  );
};

export default Aruba;
