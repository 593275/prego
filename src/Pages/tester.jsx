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
    
    gbd: '',
 
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
    
      gbd: items.gbd,
    
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
      
      gbd: items.gbd,
     
    });
  };

  return (
    <div>
      <h2 className="Land">{items.ctry}</h2>
      <h3 className="Inntektsgruppe">Inntektsgruppe:</h3>
      {isEditing ? (
        <input
          type="text"
          value={editedData.inntekt}
          onChange={(e) =>
            setEditedData({ ...editedData, inntekt: e.target.value })
          }
        />
      ) : (
        <p className="InntektsgruppeTekst">{items.inntekt}</p>
      )}
      <h3 className="Region">Region:</h3>
      {isEditing ? (
        <input
          type="text"
          value={editedData.gbd}
          onChange={(e) =>
            setEditedData({ ...editedData, gbd: e.target.value })
          }
        />
      ) : (
        <p className="RegionTekst">{items.gbd}</p>
      )}
      <h3 className="Beskrivelse">Beskrivelse</h3>
      {isEditing ? (
        <textarea
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
      <img className="Bilde" src={myImage} alt="My Image" />
      <Navbar />
    </div>
  );
};

export default Aruba;
