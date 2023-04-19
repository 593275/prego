import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../css/Aruba.css";
import myImage from "../Bilder/Flag_of_Aruba.svg.png"
import { collection, query, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase-config" 

const Aruba = () => {
  const [items, setItems] = useState([])
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    Inntektsgruppe: "",
    gbd: "",
    beskrivelse: "",
  });

  const getLand = async () => {
    const land = "Norge"
    const docRef = doc(db, "Land", land)
    const docSnap = await getDoc(docRef)
    setItems(docSnap.data());
  };
  
  useEffect(() => {
    getLand();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedData({
      Inntektsgruppe: items.Inntektsgruppe,
      gbd: items.gbd,
      beskrivelse: items.beskrivelse,
    });
  };

  const handleSaveClick = async () => {
    const docRef = doc(db, "Land", "Norge");
    await updateDoc(docRef, editedData);
    getLand();
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedData({
      Inntektsgruppe: items.Inntektsgruppe,
      gbd: items.gbd,
      beskrivelse: items.beskrivelse,
     
    });
  };

  return (
    <div>
      <h2 className="Land">{items.ctry}</h2>
      <h3 className="Inntektsgruppe">Inntektsgruppe:</h3>
      {isEditing ? (
        <input id="InntektsgruppeEdit"
          type="text"
          value={editedData.Inntektsgruppe}
          onChange={(e) =>
            setEditedData({ ...editedData, Inntektsgruppe: e.target.value })
          }
        />
      ) : (
        <p className="InntektsgruppeTekst">{items.Inntektsgruppe}</p>
      )}
      <h3 className="Region">Region:</h3>
      {isEditing ? (
        <input id="RegionTekstEdit"
          type="text"
          value={editedData.gbd}
          onChange={(e) =>
            setEditedData({ ...editedData, gbd: e.target.value })
          }
        />
      ) : (
        <p className="RegionTekst">{items.gbd}</p>
      )}
      <h3 className="Beskrivelse">Beskrivelse: </h3>
      {isEditing ? (
         <textarea id ="BeskrivelseEdit" 
         value={editedData.beskrivelse}
         onChange={(e) =>
           setEditedData({ ...editedData, beskrivelse: e.target.value })
         }
       />
      ) : (
        <p className="BeskrivelseTekst">{items.beskrivelse}</p>
      )}
      {isEditing ? (
        <>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
     
      <Navbar />
    </div>
  );
};

export default Aruba;
