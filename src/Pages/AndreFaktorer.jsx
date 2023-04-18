import React, { useState } from "react";
import Navbar from "./Navbar";

const AndreFaktorer = () => {
  const [responses, setResponses] = useState([]);

  const questions = [
    { question: "Spørsmål 1", description: "Årsåk til innvandring: Dette  spørsmålet kartlegger hvorfor personen har immigrert til det aktuelle landet. Det kan inkludere faktorer som arbeidsmuligheter, utdanning, familieforhold, politiske eller humanitære årsaker osv." },
    { question: "Spørsmål 2", description: "Tid i landet: Dette spørsmålet kartlegger hvor lenge personen har vært i det aktuelle landet, og om de er nyankomne immigranter eller har bodd der i lengre tid." },
    { question: "Spørsmål 3", description: "Opplevde språkbarrierer: Dette spørsmålet kartlegger om personen har erfart utfordringer med språket i det aktuelle landet, som for eksempel kommunikasjon med helsepersonell, tilgang til helseinformasjon eller forståelse av helsevesenet." },
    { question: "Spørsmål 4", description: "Sosioøkonomiske forhold: Dette spørsmålet kartlegger personens økonomiske og sosiale status, inkludert faktorer som inntekt, utdanning, arbeidsstatus, og boforhold. Disse faktorene kan påvirke tilgangen til helsetjenester og helsestatus." },
    { question: "Spørsmål 5", description: "Helsekompetanse: Dette spørsmålet kartlegger personens kunnskap og forståelse av helse og helsevesenet, inkludert forståelse av sykdommer, behandlingsalternativer, og helserelaterte beslutninger." },
    { question: "Spørsmål 6", description: "Tillit: Dette spørsmålet kartlegger personens tillit til helsevesenet i det aktuelle landet, inkludert tillit til helsepersonell, helseinstitusjoner og helsetjenester. Dette kan påvirke hvorvidt personen søker helsetjenester og følger anbefalt behandling." },
    { question: "Spørsmål 7", description: "Utfordrende å ta opp en god anamnese: Dette spørsmålet kartlegger om helsepersonell har erfart utfordringer med å innhente en grundig sykehistorie (anamnese) fra pasienten, som kan påvirke diagnostisering og behandlingsbeslutninger." },
    { question: "Spørsmål 8", description: "Genetiske faktorer: Dette spørsmålet kartlegger om det er noen genetiske faktorer eller familiehistorie av sykdommer eller tilstander som kan påvirke personens helsestatus." },
    { question: "Spørsmål 9", description: "Sykdommer eller tilstander uvanlige i Norge: Dette spørsmålet kartlegger om personen har noen sykdommer eller tilstander som er uvanlige eller ikke så vanlige i det aktuelle landet sammenlignet med Norge. Dette kan inkludere regionsspesifikke sykdommer, klimarelaterte lidelser eller andre helseutfordringer som kan påvirke personens helsetilstand." },
    { question: "Spørsmål 10", description: "Utsatt for vold: Dette spørsmålet kartlegger om personen har vært utsatt for vold eller traumer, enten før de immigrerte til det aktuelle landet eller etter ankomst. Dette kan inkludere fysisk vold, psykisk vold, overgrep eller andre traumatiske hendelser som kan påvirke personens fysiske og psykiske helse." },
    { question: "Spørsmål 11", description: "Papirløs? Dette spørsmålet kartlegger om personen er papirløs, det vil si uten gyldige immigrasjonsdokumenter eller oppholdstillatelse i det aktuelle landet. Dette kan påvirke personens tilgang til helsetjenester og helsehjelp, samt deres generelle helsestatus og livskvalitet." },
    { question: "Spørsmål 12", description: "Mistanke om suboptimal oppfølging av det offentlige? Dette spørsmålet kartlegger om personen har mistanke om at de ikke får tilstrekkelig oppfølging eller omsorg fra det offentlige helsevesenet i det aktuelle landet. Dette kan inkludere opplevelse av diskriminering, fordommer eller manglende tilgang til helsetjenester på grunn av ulike årsaker." }
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
        <div style={{ textAlign: "center" }}>
          <h1 style={{ display: "inline-block" }}>Migrasjonsrelaterte faktorer</h1>
          <Navbar />
          <h2>Evaluering</h2>
          <p>Velg mellom rød, gul og grønn sirkel for hver av følgende spørsmål:</p>
          {questions.map((question, index) => (
            <div key={index}>
              <h3>{question.question}</h3>
              <p>{question.description}</p>
              <div>
                <button
                  onClick={() => handleResponse(index, 0)}
                  className={`circle ${responses[index] === 0 ? "active red" : ""}`}
                ></button>
                <button
                  onClick={() => handleResponse(index, 1)}
                  className={`circle ${responses[index] === 1 ? "active yellow" : ""}`}
                ></button>
                <button
                  onClick={() => handleResponse(index, 2)}
                  className={`circle ${responses[index] === 2 ? "active green" : ""}`}
                ></button>
              </div>
            </div>
          ))}
          <h2>Sluttresultat</h2>
          {responses.length === questions.length ? (
            <>
              <p>Gjennomsnittlig valgt farge: {averageColor()}</p>
              <div
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