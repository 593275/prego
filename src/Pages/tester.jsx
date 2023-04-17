import React from 'react';
import Papa from 'papaparse';

function CsvReader() {
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      encoding: "ISO-8859-1",
      complete: (results) => {
        console.log(results.data);
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