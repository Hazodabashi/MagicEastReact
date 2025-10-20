import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import "./Carrusel.css";

function AgregadosRecientemente() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("/data/Productos.json")
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error al cargar productos:", err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 3 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ]
  };

  return (
    <div className="slider-container2">
      <Slider {...settings}>
        {productos.map((p, index) => (
          <div className="product" key={p.id}>
            <div className="product-img">
              <img src={p.imagen} alt={p.nombre} height={245} />
              <div className="product-label">
                <span className="sale">-{p.descuento}%</span>
                <span className="new">Nuevo</span>
              </div>
            </div>

            <div className="product-body">
              <p className="product-category">{p.categoria}</p>
              <h3 className="product-name">
                <a href="#">{p.nombre}</a>
              </h3>
              <h4 className="product-price">
                ${p.precio.toLocaleString("es-CL")}{" "}
                <del className="product-old-price">
                  ${p.precioAntiguo.toLocaleString("es-CL")}
                </del>
              </h4>               
            </div>

            <div className="add-to-cart">
              <button className="add-to-cart-btn">
                <i className="fa fa-shopping-cart" /> Añadir al carro
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default AgregadosRecientemente;
