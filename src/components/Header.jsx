import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header({ carrito = [], vaciarCarrito = () => {} }) {
  const [cartOpen, setCartOpen] = useState(false);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const logout = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/login";
  };

  const toggleCart = () => setCartOpen(!cartOpen);

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <header>
      <div id="top-header">
        <div className="topHeader">
          <ul className="header-links">
            <li>
              <a href="#">
                <i className="fa fa-phone" /> +56 9 0303 4567
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-envelope-o" /> contacto@magiceast.cl
              </a>
            </li>
            <li>
              <a
                href="https://www.google.com/maps/place/Magicsur+Chile/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-map-marker" /> Seminario 505, Providencia,
                Santiago de Chile
              </a>
            </li>
          </ul>

          <ul
            className="header-links"
            style={{ paddingRight: 20, listStyle: "none" }}
          >
            <li>
              {usuario ? (
                <>
                  <span>
                    <i className="fa fa-user-o" /> Hola, {usuario.nombre}
                  </span>
                  <button
                    onClick={logout}
                    style={{
                      background: "transparent",
                      color: "white",
                      border: "none",
                      marginLeft: "10px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <Link to="/login">
                  <i className="fa fa-user-o" /> Iniciar Sesión
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div id="header">
        <div className="header-container">
          <div className="header-logo">
            <Link to="/" className="logo-text">
              <span className="magic">Magic</span>
              <span className="west">East</span>
            </Link>
          </div>

          <div className="header-search">
            <form>
              <select className="input-select">
                <option value={0}>Todas</option>
                <option value={1}>Magic</option>
                <option value={2}>Gundam</option>
              </select>
              <input className="input" placeholder="Búsqueda en catálogo" />
              <button type="submit" className="search-btn">
                Buscar
              </button>
            </form>
          </div>

          <div
            className="cart-container"
            onMouseEnter={() => setCartOpen(true)}
            onMouseLeave={() => {
              setTimeout(() => setCartOpen(false), 300);
            }}
          >
            <button className="cart-toggle" onClick={toggleCart}>
              <i className="fa fa-shopping-cart" />{" "}
              <span>Carrito ({carrito.length})</span>
            </button>

            <div className={`cart-dropdown ${cartOpen ? "open" : ""}`}>
              {carrito.length === 0 ? (
                <p>Tu carrito está vacío</p>
              ) : (
                <>
                  <ul>
                    {carrito.map((item) => (
                      <li key={item.id} className="cart-item">
                        <img
                          src={item.imagen || "/src/assets/productos/placeholder.jpg"}
                          alt={item.nombre}
                        />
                        <div>
                          <p>{item.nombre}</p>
                          <p>
                            {item.cantidad} x ${item.precio.toLocaleString("es-CL")}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="cart-total">
                    <strong>Total:</strong> ${total.toLocaleString("es-CL")}
                  </div>
                  <button className="cart-checkout" onClick={vaciarCarrito}>
                    Realizar Compra
                  </button>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
