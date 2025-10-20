import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import NewsLetter from "./components/NewsLetter.jsx";
import Home from "./pages/Home.jsx";
import LoginPag from "./pages/LoginPag.jsx";
import ProductoPag from "./pages/ProductoPag.jsx";
import AboutPag from "./pages/AboutPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import CatalogoPage from "./pages/CatalogoPage.jsx";
import ProductoDetallePage from "./pages/ProductoDetallePage.jsx";
import Tutorial from "./components/Tutorial.jsx";

import BackOF from "./pages/BackOF.jsx";
import Stock from "./pages/Stock.jsx";

function App() {
  const location = useLocation();


  const [carrito, setCarrito] = useState([]);


  const agregarAlCarrito = (producto, cantidad) => {
    setCarrito((prev) => {
      const existente = prev.find((p) => p.id === producto.id);
      if (existente) {
        return prev.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: Math.min(p.cantidad + cantidad, producto.stock) }
            : p
        );
      } else {
        return [...prev, { ...producto, cantidad }];
      }
    });
  };


  const vaciarCarrito = () => setCarrito([]);


  const esBackOffice = ["/backof", "/stock"].some((ruta) =>
    location.pathname.toLowerCase().startsWith(ruta)
  );

  return (
    <>
      <ScrollToTop />

      {/*  Solo mostramos Header si NO estamos en BackOffice */}
      {!esBackOffice && (
        <Header carrito={carrito} vaciarCarrito={vaciarCarrito} />
      )}

      <Routes>
        {/*  Rutas del Front */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPag />} />
        <Route path="/producto" element={<ProductoPag />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/catalogo" element={<CatalogoPage />} />
        <Route path="/about" element={<AboutPag />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route
          path="/productodetalle/:id"
          element={<ProductoDetallePage agregarAlCarrito={agregarAlCarrito} />}
        />

        {/*  Rutas del BackOffice */}
        <Route path="/BackOF" element={<BackOF />} />
        <Route path="/Stock" element={<Stock />} />
      </Routes>

      {/*  Footer y NewsLetter solo visibles en el Front */}
      {!esBackOffice && (
        <>
          <NewsLetter />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
