import React, { useState } from "react";
import Navbar from "./Navbar";
import "../css/Andrefaktorer.css";


const AndreFaktorer = () => {
  const [responses, setResponses] = useState([]);

  const questions = [
    { question: "Spørsmål 1", description: "Årsåk til innvandring" },
    { question: "Spørsmål 2", description: "Tid i landet" },
    { question: "Spørsmål 3", description: "Opplevde språkbarrierer" },
    { question: "Spørsmål 4", description: "Sosioøkonomiske forhold" },
    { question: "Spørsmål 5", description: "Helsekompetanse" },
    { question: "Spørsmål 6", description: "Tillit" },
    { question: "Spørsmål 7", description: "Utfordrende å ta opp en god anamnese" },
    { question: "Spørsmål 8", description: "Genetiske faktorer" },
    { question: "Spørsmål 9", description: "Sykdommer eller tilstander uvanlige i Norge" },
    { question: "Spørsmål 10", description: "Utsatt for vold" },
    { question: "Spørsmål 11", description: "Papirløs?" },
    { question: "Spørsmål 12", description: "Mistanke om suboptimal oppfølging av det offentlige?" }
    ];

    const handleResponse = (index, response) => {
        const newResponses = [...responses];
        newResponses[index] = response;
        setResponses(newResponses);
      };
    
      const averageColor = () => {
        const total = responses.reduce((acc, curr) => acc + curr, 0);
        const average = Math.round(total / responses.length);
        switch (average) {
          case 0:
            return "Rød";
          case 1:
            return "Gul";
          case 2:
            return "Grønn";
          default:
            return "gray";
        }
      };
    
      return (
        <div id ="tekststyle">
          <h1 style={{ display: "inline-block" }}>Migrasjonsrelaterte faktorer</h1>
          <Navbar />
          <h2>Evaluering</h2>
          <p>Velg mellom rød, gul og grønn sirkel for hver av følgende spørsmål:</p>
          {questions.map((question, index) => (
            <div id="tekst" key={index}>

              <h3>{question.question}</h3>

              <h4 id="description">{question.description}</h4>

              <div>
              <button
  onClick={() => handleResponse(index, 0)}
  className={`circle red ${responses[index] === 0 ? "active" : ""}`}
></button>
<button
  onClick={() => handleResponse(index, 1)}
  className={`circle yellow ${responses[index] === 1 ? "active" : ""}`}
></button>
<button
  onClick={() => handleResponse(index, 2)}
  className={`circle green ${responses[index] === 2 ? "active" : ""}`}
></button>
              </div>
            </div>
          ))}
          <h2>Sluttresultat</h2>
          {responses.length === questions.length ? (
            <>
              <p>Gjennomsnittlig valgt farge: {averageColor()}</p>
              <div id="average"
                className={`circle ${averageColor()}`}
                style={{
                  backgroundColor:
                    averageColor() === "Rød"
                      ? "red"
                      : averageColor() === "Gul"
                      ? "#FADA5E"
                      : averageColor() === "Grønn"
                      ? "green"
                      : "gray",
                }}
              ></div>
            </>
          ) : (
            <p>Fullfør evalueringen for å se sluttresultatet.</p>
          )}
        </div>
      );
    };
    
    export default AndreFaktorer;