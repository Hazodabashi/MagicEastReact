import React from "react";
import Carrusel from "./Carrusel";

function TresCarruseles() {
  return (
    <div className="tres-carruseles">
      <Carrusel archivoJSON="CarruselMagic.json" titulo="Magic: The Gathering" />
      <Carrusel archivoJSON="CarruselGundam.json" titulo="Gundam" />
      <Carrusel archivoJSON="CarruselAccesorios.json" titulo="Accesorios" />
    </div>
  );
}

export default TresCarruseles;
