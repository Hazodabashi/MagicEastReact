import React from "react";
import { useNavigate } from "react-router-dom";
import productos from "../Data/Productos.json";
import "./Catalogo.css";

function Catalogo() {
  const navigate = useNavigate();

  const handleIrAlProducto = (id) => {
    navigate(`/productodetalle/${id}`);
  };

  const productosFiltrados = productos.filter(
    (p) => p.categoria === "Mazos Preconstruidos"
  );

  return (
    <section className="catalogo">
      <h2 className="catalogo-titulo">Catálogo de Productos</h2>
      <div className="catalogo-grid">
        {productosFiltrados.map((item) => (
          <div key={item.id} className="producto-card">
            <img src={item.imagen} alt={item.nombre} />
            <h3>{item.nombre}</h3>
            <p className="precio">${item.precio.toLocaleString("es-CL")}</p>
            <button
              className="btn-comprar"
              onClick={() => handleIrAlProducto(item.id)}
            >
              Ir al producto
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Catalogo;