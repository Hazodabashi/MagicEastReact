import React, { useEffect, useRef, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Chart, registerables } from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BOcss.css";
import { Link } from "react-router-dom";

// Import directo del JSON
import productosData from "../Data/Productos.json";

function StockBackOffice() {
  const stockChartRef = useRef(null);
  const [productos, setProductos] = useState([]);

  // Registrar Chart.js
  useEffect(() => {
    try {
      Chart.register(...registerables);
    } catch {}
  }, []);

  // Cargar productos desde el JSON importado
  useEffect(() => {
    setProductos(productosData);
  }, []);

  // Gráfico dinámico según los productos cargados
  useEffect(() => {
    if (productos.length === 0) return;
    const ctx = stockChartRef.current?.getContext?.("2d");
    if (!ctx) return;

    const categorias = [...new Set(productos.map((p) => p.categoria))];
    const stockPorCategoria = categorias.map(
      (cat) =>
        productos
          .filter((p) => p.categoria === cat)
          .reduce((acc, p) => acc + p.stock, 0)
    );

    const stockChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: categorias,
        datasets: [
          {
            label: "Unidades en Stock",
            data: stockPorCategoria,
            backgroundColor: "rgba(59,130,246,0.6)",
            borderColor: "rgba(59,130,246,1)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        plugins: { legend: { labels: { color: "#fff" } } },
        scales: {
          x: {
            ticks: { color: "#ccc" },
            grid: { color: "rgba(255,255,255,0.1)" },
          },
          y: {
            ticks: { color: "#ccc" },
            grid: { color: "rgba(255,255,255,0.1)" },
          },
        },
      },
    });

    return () => stockChart.destroy();
  }, [productos]);

  const totalProductos = productos.length;
  const disponibles = productos.filter((p) => p.estado === "Disponible").length;
  const bajoStock = productos.filter((p) => p.estado === "Bajo Stock").length;
  const agotados = productos.filter((p) => p.estado === "Agotado").length;

  return (
    <div className="dashboard-container">
      {/* === SIDEBAR === */}
      <div className="sidebar bg-secondary pe-4 pb-3">
        <nav className="navbar navbar-dark">
          <a href="#" className="navbar-brand mx-4 mb-3">
<Link to="/" className="text-primary text-decoration-none">
  <h3 className="text-primary m-0">
    <i className="fa fa-box me-2"></i>MagicEast
  </h3>
</Link>

          </a>

          <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative">
              <img
                className="profile-pic rounded-circle"
                src="/images/nico.png"
                alt="perfil"
              />
              <div className="online-status"></div>
            </div>
            <div className="ms-3">
              <h6 className="mb-0">Nicolás Núñez</h6>
              <span>Admin</span>
            </div>
          </div>

          <div className="navbar-nav w-100">
            <Link to="/BackOF" className="nav-item nav-link">
              <i className="fa fa-tachometer-alt me-2"></i>Resumen
            </Link>
            <Link to="/stock" className="nav-item nav-link active">
              <i className="fa fa-cubes me-2"></i>Stock Productos
            </Link>
          </div>
        </nav>
      </div>

      {/* === CONTENIDO === */}
      <div className="content bg-dark text-light w-100">
        {/* === NAVBAR === */}
        <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
          <a href="#" className="sidebar-toggler flex-shrink-0">
            <i className="fa fa-bars"></i>
          </a>
          <form className="d-none d-md-flex ms-4">
            <input
              className="form-control bg-dark border-0 text-light"
              type="search"
              placeholder="Buscar producto..."
            />
          </form>

          <div className="navbar-nav align-items-center ms-auto d-flex flex-row">
            <Dropdown className="nav-item me-3">
              <Dropdown.Toggle
                variant="secondary"
                className="nav-link d-flex align-items-center text-light border-0"
              >
                <i className="fa fa-bell me-lg-2"></i>
                <span className="d-none d-lg-inline-flex">Alertas</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-secondary text-light border-0">
                {bajoStock > 0 && (
                  <Dropdown.Item href="#" className="text-light">
                    <h6 className="fw-normal mb-0">
                      {bajoStock} producto(s) con bajo stock
                    </h6>
                    <small>Hace 10 min</small>
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </nav>

        {/* === TARJETAS === */}
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-6 col-xl-3">
              <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-cubes fa-3x text-primary"></i>
                <div className="ms-3">
                  <p className="mb-2">Productos Totales</p>
                  <h6 className="mb-0">{totalProductos}</h6>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-check-circle fa-3x text-success"></i>
                <div className="ms-3">
                  <p className="mb-2">Disponibles</p>
                  <h6 className="mb-0">{disponibles}</h6>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-exclamation-triangle fa-3x text-warning"></i>
                <div className="ms-3">
                  <p className="mb-2">Bajo Stock</p>
                  <h6 className="mb-0">{bajoStock}</h6>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-times-circle fa-3x text-danger"></i>
                <div className="ms-3">
                  <p className="mb-2">Agotados</p>
                  <h6 className="mb-0">{agotados}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === GRÁFICO DE STOCK === */}
        <div className="container-fluid pt-4 px-4">
          <div className="bg-secondary text-center rounded p-4">
            <h6>Distribución de Stock por Categoría</h6>
            <canvas ref={stockChartRef}></canvas>
          </div>
        </div>

        {/* === TABLA DE STOCK === */}
        <div className="container-fluid pt-4 px-4">
          <div className="pagos-section text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h5 className="text-white mb-0">Inventario de Productos</h5>
              <a href="#" className="text-primary text-decoration-none">
                Actualizar stock
              </a>
            </div>

            <div className="table-responsive">
              <table className="table align-middle table-hover table-bordered mb-0 pagos-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((p, i) => (
                    <tr key={i}>
                      <td>{p.id}</td>
                      <td>{p.nombre}</td>
                      <td>{p.categoria}</td>
                      <td>${p.precio.toLocaleString("es-CL")}</td>
                      <td>{p.stock}</td>
                      <td>
                        <span
                          className={`badge ${
                            p.estado === "Disponible"
                              ? "bg-success"
                              : p.estado === "Bajo Stock"
                              ? "bg-warning text-dark"
                              : "bg-danger"
                          }`}
                        >
                          {p.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* === FOOTER === */}
        <div className="container-fluid pt-4 px-4">
          <div className="bg-secondary rounded-top p-4 text-center">
            © MagicEast | Designed by{" "}
            <a href="https://htmlcodex.com">HTML Codex</a> | Distributed by{" "}
            <a href="https://themewagon.com">ThemeWagon</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockBackOffice;
