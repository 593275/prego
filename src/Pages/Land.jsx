import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../css/Land.css";
import myImage from "../Bilder/Flag_of_Aruba.svg.png"
import { collection, query, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase-config" 
import Circles from "./sirkerlTester";
import { getAuth } from "firebase/auth";
import Tester from "./Graph";

const Aruba = () => {
  const [items, setItems] = useState([])
  const [isEditing, setIsEditing] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const [editedData, setEditedData] = useState({
    Inntektsgruppe: items.Inntektsgruppe || "",
    gbd: items.gbd || "",
    beskrivelse: items.beskrivelse || "",
  });
  

  const getLand = async () => {
    const land = localStorage.getItem("userInput")
    const docRef = doc(db, "Land", land)
    const docSnap = await getDoc(docRef)
    setItems(docSnap.data());
  };
  
  useEffect(() => {
    getLand();
  }, []);

  const handleEditClick = () => {
    if (user && user.uid === "PEBh74M2IeSVfpey2C4iIsXuifu2") {
      setIsEditing(true);
      setEditedData({
        Inntektsgruppe: items.Inntektsgruppe,
        gbd: items.gbd,
        beskrivelse: items.beskrivelse,
      });
    }
  };
  

  const handleSaveClick = async () => {
    const docRef = doc(db, "Land", localStorage.getItem("userInput"));
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
      <h3 className="GBD">GBD:</h3>
      {isEditing ? (
        <input id="RegionTekstEdit"
          type="text"
          value={editedData.gbd}
          onChange={(e) =>
            setEditedData({ ...editedData, gbd: e.target.value })
          }
        />
      ) : (
        <p className="LandGbdTekst">{items.gbd}</p>
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
      {user && user.uid === 'PEBh74M2IeSVfpey2C4iIsXuifu2' ? (
        isEditing ? (
          <>
            <button onClick={handleSaveClick} className="saveButton">Save</button>
            <button onClick={handleCancelClick} className="cancelButton">Cancel </button>
          </>
  ) : (
    <button onClick={handleEditClick} className="EditButton">Edit</button>
  )
) : null}

      <Circles/>
      <Navbar />
      <p></p>
      <p></p>
      <p></p>
      <p></p>

      <Tester />
    </div>
  );
};

export default Aruba;
