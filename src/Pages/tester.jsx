import React from 'react';
import Papa from 'papaparse';

function CsvReader() {
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      encoding: "utf-8",
      delimiter: ";",
      complete: (results) => {
        const items = results.data.slice(1)
  .filter((item) => item.length === 15) // filter out invalid items
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
  
  for(const item of items) {
    console.log(item.N)
  }
      },
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}

export default CsvReader;
