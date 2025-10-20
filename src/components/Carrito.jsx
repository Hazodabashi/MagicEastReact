import React, { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';

function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CarritoContext);
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div>
      <h1>Carrito de compras</h1>

      {carrito.length === 0 ? (
        <p>El carrito se encuentra vacio.</p>
      ) : (
        <>
          <ul>
            {carrito.map((item) => (
              <li key={item.id} style={{ marginBottom: "1rem" }}>
                <strong>{item.nombre}</strong><br />
                Cantidad: {item.cantidad} <br />
                Precio unitario: ${item.precio.toLocaleString()} <br />
                Subtotal: ${ (item.precio * item.cantidad).toLocaleString() }
                <br />
                <button onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
              </li>
            ))}
          </ul>

          <h3>Total: ${total.toLocaleString()}</h3>
          <button onClick={vaciarCarrito}>Vaciar carrito</button>
        </>
      )}
    </div>
  );
}

export default Carrito;