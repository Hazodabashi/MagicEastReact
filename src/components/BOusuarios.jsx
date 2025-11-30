import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BOcss.css";
import { Link } from "react-router-dom";
import axios from "axios";

function BOusuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarUsuarios = async () => {
    try {
      const response = await axios.get("http://3.135.235.62:8080/api/usuarios");

      const ordenPrioridad = { ADMIN: 1, VENDEDOR: 2, USER: 3 };

      const ordenados = response.data.sort(
        (a, b) => ordenPrioridad[a.rol] - ordenPrioridad[b.rol]
      );

      setUsuarios(ordenados);
      setCargando(false);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
  };

  const cambiarRol = async (id, rolNuevo) => {
    try {
      await axios.put(`http://3.135.235.62:8080/api/usuarios/${id}/rol`, {
        rol: rolNuevo,
      });

      setUsuarios((prev) =>
        prev
          .map((u) => (u.id === id ? { ...u, rol: rolNuevo } : u))
          .sort((a, b) => {
            const orden = { ADMIN: 1, VENDEDOR: 2, USER: 3 };
            return orden[a.rol] - orden[b.rol];
          })
      );
    } catch (err) {
      console.error("Error cambiando rol:", err);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="sidebar bg-secondary pe-4 pb-3">
        <nav className="navbar navbar-dark">
          <Link
            to="/"
            className="navbar-brand mx-4 mb-3 text-primary text-decoration-none"
          >
            <h3 className="text-primary m-0">
              <i className="fa fa-box me-2"></i>MagicEast
            </h3>
          </Link>

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
              <h6 className="mb-0">Administrador</h6>
              <span>BackOffice</span>
            </div>
          </div>

          <div className="navbar-nav w-100">

            <Link
              to="/BackOF"
              className="nav-item nav-link d-flex align-items-center"
            >
              <div className="sidebar-icon-wrapper">
                <i className="fa fa-book"></i>
              </div>
              <span className="ms-2">Resumen</span>
            </Link>

            <Link
              to="/Stock"
              className="nav-item nav-link d-flex align-items-center"
            >
              <div className="sidebar-icon-wrapper">
                <i className="fa fa-cubes"></i>
              </div>
              <span className="ms-2">Stock</span>
            </Link>

            <Link
              to="/BOusuarios"
              className="nav-item nav-link d-flex align-items-center active"
            >
              <div className="sidebar-icon-wrapper">
                <i className="fa fa-users"></i>
              </div>
              <span className="ms-2">Usuarios</span>
            </Link>
          </div>
        </nav>
      </div>

      <div className="content bg-dark text-light w-100">
        <div className="container-fluid pt-4 px-4">
          <div className="pagos-section text-center rounded p-4">
            <h4 className="text-white mb-4">Usuarios Registrados</h4>

            {cargando ? (
              <p>Cargando usuarios...</p>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle table-hover table-bordered mb-0 pagos-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Dirección</th>
                      <th>Rol</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((u) => (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.nombre}</td>
                        <td>{u.email}</td>
                        <td>{u.direccion}</td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="secondary"
                              className="w-100 text-light"
                            >
                              <span
                                className={`badge px-3 py-2 ${
                                  u.rol === "ADMIN"
                                    ? "bg-warning text-dark"
                                    : u.rol === "VENDEDOR"
                                    ? "bg-success"
                                    : "bg-secondary"
                                }`}
                              >
                                {u.rol}
                              </span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="bg-secondary">
                              {["ADMIN", "VENDEDOR", "USER"].map((rol) => (
                                <Dropdown.Item
                                  key={rol}
                                  className="text-light"
                                  onClick={() => cambiarRol(u.id, rol)}
                                >
                                  {rol}
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="container-fluid pt-4 px-4">
          <div className="bg-secondary rounded-top p-4 text-center">
            © MagicEast | BackOffice
          </div>
        </div>
      </div>
    </div>
  );
}

export default BOusuarios;
