import { useState, useEffect } from "react";
import productos from "../Data/Productos.json";
import "./ProductoDetalle.css";

function ProductoDetalle({ idProducto, agregarAlCarrito }) {
  const [producto, setProducto] = useState(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState("");
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const encontrado = productos.find((p) => p.id === idProducto);

    if (encontrado) {
      if (Array.isArray(encontrado.imagenes) && encontrado.imagenes.length > 0) {
        setImagenSeleccionada(encontrado.imagenes[0]);
      } else if (encontrado.imagen) {
        setImagenSeleccionada(encontrado.imagen);
      } else {
        setImagenSeleccionada("/src/assets/productos/placeholder.jpg");
      }

      setProducto(encontrado);
      setCantidad(1);
    }
  }, [idProducto]);

  if (!producto) {
    return <div className="producto-detalle-cargando">Cargando producto...</div>;
  }

  const handleCantidad = (delta) => {
    setCantidad((prev) => {
      const nuevaCantidad = prev + delta;
      if (nuevaCantidad < 1) return 1;
      if (nuevaCantidad > producto.stock) return producto.stock;
      return nuevaCantidad;
    });
  };

  const handleAgregarCarrito = () => {
  if (producto && agregarAlCarrito) {
    agregarAlCarrito(producto, cantidad);
  }
};

  const imagenes = Array.isArray(producto.imagenes)
    ? producto.imagenes
    : producto.imagen
    ? [producto.imagen]
    : ["/src/assets/productos/placeholder.jpg"];

  return (
    <div className="producto-detalle-container">
      <div className="producto-thumbs">
        {imagenes.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Miniatura ${index + 1}`}
            className={`thumb ${img === imagenSeleccionada ? "activa" : ""}`}
            onClick={() => setImagenSeleccionada(img)}
          />
        ))}
      </div>

      <div className="producto-imagen">
        <img src={imagenSeleccionada} alt={producto.nombre} />
      </div>

      <div className="producto-info">
        <h2 className="producto-nombre">{producto.nombre}</h2>
        <p className="producto-categoria">{producto.categoria}</p>

        <h3 className="producto-precio">
          ${producto.precio.toLocaleString("es-CL")}
        </h3>

        {producto.descuento > 0 && (
          <p className="producto-descuento">
            Antes:{" "}
            <span className="tachado">
              ${producto.precioAntiguo.toLocaleString("es-CL")}
            </span>{" "}
            (-{producto.descuento}%)
          </p>
        )}

        <p className="producto-descripcion">{producto.descripcion}</p>
        <p className="producto-stock">
          {producto.stock > 0
            ? `Stock disponible: ${producto.stock}`
            : "Agotado"}
        </p>

        <div className="producto-acciones">
          <div className="cantidad-selector">
            <button onClick={() => handleCantidad(-1)}>-</button>
            <input type="number" value={cantidad} readOnly />
            <button
              onClick={() => handleCantidad(1)}
              disabled={cantidad >= producto.stock}
            >
              +
            </button>
          </div>

          <button
            className="btn-carrito"
            onClick={handleAgregarCarrito}
            disabled={producto.stock === 0}
          >
            <i className="fa fa-shopping-cart" /> Añadir al carro
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalle;
