import React, { useState } from "react";
import Papa from "papaparse";
import { db } from "../config/firebase-config"
import { setDoc, updateDoc, doc, getDoc } from "firebase/firestore"; 
import { landDb } from "../Functions/function"

 function App() {
  const [data, setData] = React.useState(null);
  const [error, setError] = useState('');

  const handleFileUpload =  async (e) => {
    console.log(1)
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
            gbd: item[14],
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
              n_pet: item.n_pet,
              pct_pet: item.pct_pet,
              n_gdm: item.n_gdm,
              pct_gdm: item.pct_gdm,
              n_cs: item.n_cs,
              pct_cs: item.pct_cs,
              n_fa: item.n_fa,
              pct_fa: item.pct_fa,
              gbd: item.gbd
            })

            setError("Et eller flere land i filen ekstisterer allerede i databasen og vil bli oppdatert")
          } else {
            await setDoc(doc(db, "Land", item.ctry), {
              ctry: item.ctry,
              N: item.N,
              n_sb: item.n_sb,
              pct_sb: item.pct_sb,
              n_lbw: item.n_lbw,
              n_pet: item.n_pet,
              pct_pet: item.pct_pet,
              n_gdm: item.n_gdm,
              pct_gdm: item.pct_gdm,
              n_cs: item.n_cs,
              pct_cs: item.pct_cs,
              n_fa: item.n_fa,
              pct_fa: item.pct_fa,
              gbd: item.gbd
            });
            
          }
        
        }

      },
      
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
