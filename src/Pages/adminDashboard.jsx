import React, { useState } from "react";
import Papa from "papaparse";
import { db } from "../config/firebase-config"
import { setDoc, updateDoc, doc, getDoc } from "firebase/firestore"; 
import SearchBar from "./Dashboard";

 function App() {
  const [error1, setError1] = useState('');
  const handleFileUploadGenerell =  async (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      encoding: "utf-8",
      delimiter: ";",
      complete: async (results) => {
        const items = results.data.slice(1)
        .filter((item) => item.length === 15) 
        .map((item) => {
          return {
            ctry: item[0],
            N: parseInt(item[1]),
            n_sb: parseInt(item[2]),
            pct_sb: parseFloat(item[3].replace(",", ".")),
            n_lbw: parseInt(item[4]),
            pct_lbw: parseFloat(item[5].replace(",", ".")),
            n_pet: parseInt(item[6]),
            pct_pet: parseFloat(item[7].replace(",", ".")),
            n_gdm: parseInt(item[8]),
            pct_gdm: parseFloat(item[9].replace(",", ".")),
            n_cs: parseInt(item[10]),
            pct_cs: parseFloat(item[11].replace(",", ".")),
            n_fa: parseInt(item[12]),
            pct_fa: parseFloat(item[13].replace(",", ".")),
            gbd: item[14]
          };
        });
        for (const item of items) {
          console.log(item)
        }
        for (const item of items) {
          const docRef = doc(db, "Land", item.ctry)
          const docSnap = await getDoc(docRef)
          if(docSnap.exists()) {
            console.log("1")
            await updateDoc(docRef, {
              ctry: item.ctry,
              N: item.N,
              n_sb: item.n_sb,
              pct_sb: item.pct_sb,
              n_lbw: item.n_lbw,
              pct_lbw: item.pct_lbw,
              n_pet: item.n_pet,
              pct_pet: item.pct_pet,
              n_gdm: item.n_gdm,
              pct_gdm: item.pct_gdm,
              n_cs: item.n_cs,
              pct_cs: item.pct_cs,
              n_fa: item.n_fa,
              pct_fa: item.pct_fa,
              gbd: item.gbd,
            })

            setError1("Et eller flere land i filen ekstisterer allerede i databasen og vil bli oppdatert")
          } else {
            await setDoc(doc(db, "Land", item.ctry), {
              ctry: item.ctry,
              N: item.N,
              n_sb: item.n_sb,
              pct_sb: item.pct_sb,
              n_lbw: item.n_lbw,
              pct_lbw: item.pct_lbw,
              n_pet: item.n_pet,
              pct_pet: item.pct_pet,
              n_gdm: item.n_gdm,
              pct_gdm: item.pct_gdm,
              n_cs: item.n_cs,
              pct_cs: item.pct_cs,
              n_fa: item.n_fa,
              pct_fa: item.pct_fa,
              gbd: item.gbd,
            });
            
          }
        
        }

      },
      
    });

  };

  const handleFileUploadPerAar =  async (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      encoding: "utf-8",
      delimiter: ";",
      complete: async (results) => {
        const items = results.data.slice(1)
        .filter((item) => item.length === 15) 
        .map((item) => {
          return {
            ctry: item[0],
            year: item[1],
            N: parseInt(item[2]),
            n_sb: parseInt(item[3]),
            pct_sb: parseFloat(item[4].replace(",", ".")),
            n_lbw: parseInt(item[5]),
            pct_lbw: parseFloat(item[6].replace(",", ".")),
            n_pet: parseInt(item[7]),
            pct_pet: parseFloat(item[8].replace(",", ".")),
            n_gdm: parseInt(item[9]),
            pct_gdm: parseFloat(item[10].replace(",", ".")),
            n_cs: parseInt(item[11]),
            pct_cs: parseFloat(item[12].replace(",", ".")),
            n_fa: parseInt(item[13]),
            pct_fa: parseFloat(item[14].replace(",", ".")),
          };
        });
  
        for (const item of items) {
          console.log(item)
        }
        for (const item of items) {
          console.log("Land"+item.year)
          const docRef = doc(db, "Land"+item.year, item.ctry+item.year)
          const docSnap = await getDoc(docRef)
          if(docSnap.exists()) {
       
            await updateDoc(docRef, {
              ctry: item.ctry,
              N: item.N,
              n_sb: item.n_sb,
              pct_sb: item.pct_sb,
              n_lbw: item.n_lbw,
              pct_lbw: item.pct_lbw,
              n_pet: item.n_pet,
              pct_pet: item.pct_pet,
              n_gdm: item.n_gdm,
              pct_gdm: item.pct_gdm,
              n_cs: item.n_cs,
              pct_cs: item.pct_cs,
              n_fa: item.n_fa,
              pct_fa: item.pct_fa,
              
            })

            setError1("Et eller flere land i filen ekstisterer allerede i databasen og vil bli oppdatert")
          } else {
            await setDoc(doc(db, "Land"+item.year, item.ctry+item.year), {
              ctry: item.ctry,
              N: item.N,
              n_sb: item.n_sb,
              pct_sb: item.pct_sb,
              n_lbw: item.n_lbw,
              pct_lbw: item.pct_lbw,
              n_pet: item.n_pet,
              pct_pet: item.pct_pet,
              n_gdm: item.n_gdm,
              pct_gdm: item.pct_gdm,
              n_cs: item.n_cs,
              pct_cs: item.pct_cs,
              n_fa: item.n_fa,
              pct_fa: item.pct_fa,
              
            });
            
          }
        
        }

      },
      
    });

  };

  return (
    <div>
      <SearchBar/> <br/>
      <p3>Legg inn en CSV fil for sammenlagt år</p3><br/>
      <input type="file" onChange={handleFileUploadGenerell} /><br/>
      <p3>Legg inn en CSV fil for 2001-2021</p3><br/>
      <input type="file" onChange={handleFileUploadPerAar} />
      {error1 && <p>{error1}</p>}
    </div>
  );
}

export default App;
