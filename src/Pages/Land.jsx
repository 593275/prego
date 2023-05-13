import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../css/Land.css";
import { collection, query, doc, getDoc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config" 
import Circles from "./sirkerlTester";
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Tester from "./Graph";
import { riskScoreCalc, riskScoreRang } from "../Utils/function";



const Land = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const [items, setItems] = useState([])
  const [items2, setItems2] = useState([])
  const [isEditing, setIsEditing] = useState(false);
  const [msg, setMsg] = useState(" ");
  const [editedData, setEditedData] = useState({
    Inntektsgruppe: items.Inntektsgruppe || "",
    gbd: items.gbd || "",
  });
  const land = localStorage.getItem("userInput")
  
  useEffect(() => {
    const getLand = async () => {
      const docRef = doc(db, "Land", land)
      const docSnap = await getDoc(docRef)
      setItems(docSnap.data());
      
  
      if(docSnap.data().N < 1000) {
        setMsg("NB! Bruker GBD data pga lite data fra landet")
      }

      const data = await getDocs(collection(db, "Land"));
      setItems2(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
     
    };
  
    getLand();
  }, []);

function riskMsg  ()  {
  if(items.N >= 1000) {
    const riskScore = riskScoreCalc(land, items2)
    const rang = riskScoreRang(land, items2)
    const length = items2.length
    return riskScore +" rangert som " + rang +" av " +length+" i Norge"
  } else {
    return"Ikke nok data"
  }
}
  
  const handleEditClick = () => {
    if (user && user.uid === "PEBh74M2IeSVfpey2C4iIsXuifu2") {
      setIsEditing(true);
      setEditedData({
        Inntektsgruppe: items.Inntektsgruppe,
        gbd: items.gbd,
      });
    }
  };
  

  // Updates the data for a specific country in Firebase and fetches the updated data
  const handleSaveClick = async () => {
    const docRef = doc(db, "Land", localStorage.getItem("userInput"));
    await updateDoc(docRef, editedData);
   
    setIsEditing(false);
  };

  // Cancels the editing mode and resets the editedData state
  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedData({
      Inntektsgruppe: items.Inntektsgruppe,
      gbd: items.gbd,
      beskrivelse: items.beskrivelse,
    });
  };

  const handleDeleteClick = async () => {
    const confirmed = window.confirm("Er du sikker på at du vil slette dette elementet?");
    if (confirmed) {
      await deleteDoc(doc(db, "Land", localStorage.getItem("userInput")))
      localStorage.removeItem("userInput")
      if(user.uid === "PEBh74M2IeSVfpey2C4iIsXuifu2") {
        navigate("/admindashboard")
      } else {
        navigate("/dashboard")
      }
    }
  }

  return (
    <div>
      <h1 className="Land">{items.ctry}</h1> <p id ="msg">{msg}</p>
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
      <h3 className="risikoScore">Risiko score: </h3>
      
        <p className="risikoScoreTekst">{riskMsg()}</p>
      
      {user && user.uid === 'PEBh74M2IeSVfpey2C4iIsXuifu2' ? (
        isEditing ? (
          <>
            <button onClick={handleSaveClick} className="saveButton">Save</button>
            <button onClick={handleCancelClick} className="cancelButton">Cancel </button>
          </>
  ) : (
         <>
            <button onClick={handleEditClick} className="EditButton">Endere</button>
            <button onClick={handleDeleteClick} className="DeleteButton">Slett</button>
        </>
  )
) : null}
      <Tester />
      <Circles/>
      <Navbar />
    </div>
  );
};

export default Land;
