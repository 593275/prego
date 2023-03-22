import React from "react";
import Navbar from "./Navbar";
import "../css/Aruba.css";

const Aruba = () => {
  return (
    <div>
      <h2 className="Land">Aruba</h2>
      <h3 className="Inntektsgruppe">Inntektsgruppe:</h3>
      <p className="InntektsgruppeTekst">Høyinntekstsland</p>
      <h3 className="Region">Region:</h3>
      <p className="RegionTekst">Latin America & Caribbean</p>
      <Navbar />
    </div>
  );
};

export default Aruba;