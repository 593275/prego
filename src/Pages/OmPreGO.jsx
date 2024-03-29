import React from "react";
import Navbar from "./Navbar";
import "../css/omPreGo.css"

//About PreGO! page where some information about the owner will be displayed and toturial on how to use the application
const OmPreGO = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="main-content">
        <div className="intro-section">
          <h1>Om PreGO!</h1>
          <div style={{ maxWidth: "50vw", margin: "0 auto" }}>
            <p>PreGO! er en nettside som lar deg finne ut mer om migrasjonsstatistikk i Norge.</p>
          </div>
        </div>
        <div className="video-section">
          <h2>Instruksjonsvideo</h2>
          <iframe className="video"
            
            src="https://www.youtube.com/embed/Ml5AJFxxfBU"
            title="Instruksjonsvideo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="contact-section">
          <h2>Kontaktinformasjon</h2>
          <p>Telefon: 12345678</p>
          <p>E-post: info@prego.no</p>
          <p>Adresse: Prego gate 1, 0123 Bergen</p>
        </div>
      </div>
    </div>
  );
};

export default OmPreGO;
