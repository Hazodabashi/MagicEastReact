import React, { useEffect, useState } from "react";
import "./CategoriaCss.css"

function Categorias() {
  const [imagenes, setImagenes] = useState([]);

 
  const titulos = ["Booster", "Mazos", "Accesorios"];

  useEffect(() => {
    fetch("/data/Categorias.json") // JSON solo con imágenes
      .then(res => res.json())
      .then(data => setImagenes(data.slice(0, 3))) // Tomamos solo las primeras 3 imágenes
      .catch(err => console.error("Error al cargar imágenes:", err));
  }, []);

  return (
    <div className="categorias-section">
      {imagenes.map((img, index) => (
        <div className="shop" key={index}>
          <div className="shop-img">
            <img src={img} alt={titulos[index]} />
          </div>
          <div className="shop-body">
            <h3>{titulos[index]}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Categorias;
