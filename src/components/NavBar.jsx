import { useState } from "react";
import "./NavBar.css"; 
import { Link } from 'react-router-dom';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav id="navigation">
      <div className="nav-container">        

        {/* Botón hamburguesa en móviles */}
        <div className={`nav-toggle ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Menú */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li className="active"><Link to ="/">Inicio</Link></li>
          <li><a href="#">Ofertas</a></li>
          <li><a href="#">Categorias</a></li>
          <li><Link to="/catalogo">Mazos</Link></li>
          <li><a href="#">Sobres</a></li>
          <li><a href="#">Accesorios</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
