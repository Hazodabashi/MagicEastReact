import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header({ carrito = [], vaciarCarrito = () => {} }) {
  const [cartOpen, setCartOpen] = useState(false);

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
              <Link to="/login">
                <i className="fa fa-user-o" /> Mi Cuenta
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div id="header">
        <div className="header-container">
          {/* LOGO */}
          <div className="header-logo">
            <Link to="/" className="logo-text">
              <span className="magic">Magic</span>
              <span className="west">East</span>
            </Link>
          </div>

          {/* SEARCH BAR */}
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

          {/* CARRITO */}
            <div
              className="cart-container"
              onMouseEnter={() => setCartOpen(true)}
              onMouseLeave={() => {
                // Espera 300ms antes de cerrar el carrito
                setTimeout(() => setCartOpen(false), 300);
              }}
            >
              <button className="cart-toggle" onClick={() => setCartOpen(!cartOpen)}>
                <i className="fa fa-shopping-cart" />{" "}
                <span>Carrito ({carrito.length})</span>
              </button>

              {/* Renderizamos el dropdown siempre, pero controlamos su visibilidad con CSS */}
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
