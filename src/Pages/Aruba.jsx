import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../css/Aruba.css";
import myImage from "../Bilder/Flag_of_Aruba.svg.png"
import { collection, query, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase-config" 

const Aruba = () => {
  const [modalOpenRed, setModalOpenRed] = useState(false);
  const [modalOpenGreen, setModalOpenGreen] = useState(false);
  const [modalOpenOrange, setModalOpenOrange] = useState(false);
  const [items, setItems] = useState([])
  
  

  useEffect(() => {
    const getLand = async () => {
      const land = localStorage.getItem("userInput")
      const docRef = doc(db, "Land", land)
      const docSnap= await getDoc(docRef)
      setItems(docSnap.data());
      console.log(docSnap.data())
    };

    getLand();
  }, []);

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

  const log = () => {
    console.log(localStorage.getItem("userInput"))
  }

  return (
    <div>
      <h2 className="Land">{items.ctry}</h2>
      <h3 className="Inntektsgruppe">Inntektsgruppe:</h3>
      <p className="InntektsgruppeTekst">Høyinntekstsland</p>
      <h3 className="Region">Region:</h3>
      <p className="RegionTekst">{items.gbd}</p>
      <h3 className="Beskrivelse">Beskrivelse</h3>
      <p className="BeskrivelseTekst">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <div className="circles-container">
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
      <img className="Bilde" src={myImage} alt="My Image" />
      <Navbar />
    </div>
  );
};

export default Aruba;
