import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TresCarrusel.css";


function NextArrow(props) {
  const { onClick } = props;
  return (
    <div className="custom-arrow next-arrow" onClick={onClick}>
      ⮞
    </div>
  );
}


function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="custom-arrow prev-arrow" onClick={onClick}>
      ⮜
    </div>
  );
}

function Carrusel({ archivoJSON, titulo }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch(`/data/${archivoJSON}`)
      .then(res => res.json())
      .then(setProductos)
      .catch(err => console.error(err));
  }, [archivoJSON]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <div className="slider-container">
      <h2 className="carrusel-titulo">{titulo}</h2>
      <Slider {...settings}>
        {productos.map(p => (
          <div className="product" key={p.id}>
            <img src={p.imagen} alt={p.nombre} />
            <div className="product-body">
              <p>{p.categoria}</p>
              <h3>{p.nombre}</h3>
              <h4>${p.precio.toLocaleString("es-CL")}</h4>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carrusel;
