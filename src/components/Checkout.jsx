import React, { useContext, useState } from "react";
import { CarritoContext } from "./FuncionesCarrito";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const URL_IMAGEN_BASE = "http://3.135.235.62:8080/api/productos/imagenes/";

function Checkout() {
  const { carrito, vaciarCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [region, setRegion] = useState("");
  const [telefono, setTelefono] = useState("");

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const validarFormulario = () => {
    if (
      !direccion.trim() ||
      !ciudad.trim() ||
      !region.trim() ||
      !telefono.trim()
    ) {
      alert("Por favor completa todos los campos de envío.");
      return false;
    }

    const regexTelefono = /^\+569\d{8}$/;

    if (!regexTelefono.test(telefono.trim())) {
      alert("El teléfono debe tener el formato +569XXXXXXXX (8 dígitos).");
      return false;
    }

    return true;
  };

  const confirmarCompra = () => {
    if (!validarFormulario()) return;

    alert("Compra realizada con éxito");
    vaciarCarrito();
    navigate("/");
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Finalizar Compra</h2>

      {carrito.length === 0 ? (
        <p className="checkout-vacio">Tu carrito está vacío.</p>
      ) : (
        <div className="checkout-content">

          <div className="checkout-items">
            {carrito.map((item) => (
              <div className="checkout-item" key={item.id}>
                <img
                  src={
                    item.imagen
                      ? `${URL_IMAGEN_BASE}${item.imagen}`
                      : "/images/placeholder.jpg"
                  }
                  alt={item.nombre}
                />

                <div className="checkout-item-info">
                  <h4>{item.nombre}</h4>
                  <p>Cantidad: {item.cantidad}</p>
                  <p>Precio: ${item.precio.toLocaleString("es-CL")} c/u</p>
                  <p>
                    Subtotal: $
                    {(item.precio * item.cantidad).toLocaleString("es-CL")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-columna">

            <div className="checkout-envio">
              <h3>Dirección de Envío</h3>

              <label>Dirección *</label>
              <input
                type="text"
                placeholder="Ej: Avenida Siempre Viva 742"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />

              <label>Ciudad *</label>
              <input
                type="text"
                placeholder="Ej: Santiago"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
              />

              <label>Región *</label>
              <input
                type="text"
                placeholder="Ej: Metropolitana"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />

              <label>Teléfono *</label>
              <input
                type="text"
                placeholder="+56912345678"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>

            <div className="checkout-resumen">
              <h3>Resumen</h3>

              <p className="checkout-total">
                Total: <strong>${total.toLocaleString("es-CL")}</strong>
              </p>

              <button className="checkout-btn" onClick={confirmarCompra}>
                Confirmar compra
              </button>

              <button className="checkout-volver" onClick={() => navigate(-1)}>
                Volver
              </button>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}

export default Checkout;
