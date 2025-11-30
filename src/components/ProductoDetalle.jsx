import { useState, useEffect } from "react";
import { obtenerProducto } from "../api/productosApi";
import "./ProductoDetalle.css";

const URL_IMAGEN_BASE = "http://3.135.235.62:8080/api/productos/imagenes/";
const PLACEHOLDER_IMG = "/images/placeholder.jpg"; // ajusta si usas otra ruta

function ProductoDetalle({ idProducto, agregarAlCarrito }) {
  const [producto, setProducto] = useState(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idProducto) return;

    const fetchProducto = async () => {
      try {
        setCargando(true);
        setError(null);

        const response = await obtenerProducto(idProducto);
        const data = response.data;

        setProducto(data);

        // Construimos la URL de la imagen
        if (data.imagen) {
          setImagenSeleccionada(`${URL_IMAGEN_BASE}${data.imagen}`);
        } else {
          setImagenSeleccionada(PLACEHOLDER_IMG);
        }

        setCantidad(1);
      } catch (err) {
        console.error("Error al obtener el producto:", err);
        setError("No se pudo cargar la información del producto.");
      } finally {
        setCargando(false);
      }
    };

    fetchProducto();
  }, [idProducto]);

  if (cargando) {
    return <div className="producto-detalle-cargando">Cargando producto...</div>;
  }

  if (error) {
    return <div className="producto-detalle-error">{error}</div>;
  }

  if (!producto) {
    return <div className="producto-detalle-error">Producto no encontrado.</div>;
  }

  const handleCantidad = (delta) => {
    setCantidad((prev) => {
      const nuevaCantidad = prev + delta;
      if (nuevaCantidad < 1) return 1;
      if (producto.stock != null && nuevaCantidad > producto.stock) {
        return producto.stock;
      }
      return nuevaCantidad;
    });
  };

  const handleAgregarCarrito = () => {
    if (producto && agregarAlCarrito) {
      agregarAlCarrito(producto, cantidad);
    }
  };

  // Como desde la API solo tienes una imagen, armamos el array para los thumbs
  const imagenes = producto.imagen
    ? [`${URL_IMAGEN_BASE}${producto.imagen}`]
    : [PLACEHOLDER_IMG];

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

        {/* En tu API el campo es "categorias" */}
        <p className="producto-categoria">
          {producto.categorias || "Categoría no especificada"}
        </p>

        <h3 className="producto-precio">
          {producto.precio != null
            ? `$${producto.precio.toLocaleString("es-CL")}`
            : "Sin precio"}
        </h3>

        {/* Solo mostramos descuento si tuvieras esos campos en el backend */}
        {producto.descuento && producto.precioAntiguo && (
          <p className="producto-descuento">
            Antes:{" "}
            <span className="tachado">
              ${producto.precioAntiguo.toLocaleString("es-CL")}
            </span>{" "}
            (-{producto.descuento}%)
          </p>
        )}

        <p className="producto-descripcion">
          {producto.descripcion || "Sin descripción disponible."}
        </p>

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
              disabled={producto.stock != null && cantidad >= producto.stock}
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
