import React, { useState } from "react";
import Papa from "papaparse";
import { db } from "../config/firebase-config"
import { setDoc, updateDoc, doc, getDoc } from "firebase/firestore"; 
import { landDb } from "../Functions/function"

 function App() {
  const [data, setData] = React.useState(null);
  const [error, setError] = useState('');
  const dbLand = landDb();
  console.log(dbLand);

  const handleFileUpload =  async (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      encoding: "ISO-8859-1",
      complete: async (results) => {
        const items = results.data.map((item) => {
          return {
            ctry: item.ctry,
            N: parseInt(item.N),
            n_sb: parseInt(item.n_sb),
            pct_sb: parseFloat(item.pct_sb.replace(",", ".")),
            n_lbw: parseInt(item.n_lbw),
            pct_lbw: parseFloat(item.pct_lbw.replace(",", ".")),
            n_pet: parseInt(item.n_pet),
            pct_pet: parseFloat(item.pct_pet.replace(",", ".")),
            n_gdm: parseInt(item.n_gdm),
            pct_gdm: parseFloat(item.pct_gdm.replace(",", ".")),
            n_cs: parseInt(item.n_cs),
            pct_cs: parseFloat(item.pct_cs.replace(",", ".")),
            n_fa: parseInt(item.n_fa),
            pct_fa: parseFloat(item.pct_fa.replace(",", ".")),
            gbd: item.gbd,
          };
        });

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
      header: true,
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
