import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

function Login() {
  // === ESTADOS DE LOGIN ===
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // === ESTADOS DE REGISTRO ===
  const [registerData, setRegisterData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    contraseña: "",
    repetir: "",
  });

  // === MENSAJES GLOBALES ===
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // === REGEX ===
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;

  // === FUNCIÓN LOGIN ===
  const handleLogin = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!emailRegex.test(email)) {
      setError("Correo electrónico no válido");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "La contraseña debe tener 8 caracteres, una mayúscula, una minúscula, un número y un símbolo especial"
      );
      return;
    }

    // Cuenta de administrador
    if (email === "magiceast@admin.cl" && password === "Admin123_") {
      setSuccess("Inicio de sesión exitoso");
      setError("");
      window.location.href = "/BackOF";
      return;
    }

    setError("Cuenta o contraseña incorrectas");
  };

  // === FUNCIÓN REGISTRO ===
  const handleRegister = (e) => {
    e.preventDefault();

    const { nombres, apellidos, correo, contraseña, repetir } = registerData;

    setError("");
    setSuccess("");

    if (!nombres || !apellidos || !correo || !contraseña || !repetir) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (!emailRegex.test(correo)) {
      setError("Correo electrónico no válido");
      return;
    }

    if (!passwordRegex.test(contraseña)) {
      setError(
        "La contraseña debe tener 8 caracteres, una mayúscula, una minúscula, un número y un símbolo especial"
      );
      return;
    }

    if (contraseña !== repetir) {
      setError("Las contraseñas no coinciden");
      return;
    }


    setSuccess(" Usuario registrado correctamente");
    setError("");

    // Limpiar campos
    setRegisterData({
      nombres: "",
      apellidos: "",
      correo: "",
      contraseña: "",
      repetir: "",
    });
  };

  // === FUNCIÓN CAMBIOS REGISTRO ===
  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="row justify-content-center">
          {/* === INICIO DE SESIÓN === */}
          <div className="col-md-5 form-box">
            <h3 className="form-title">Iniciar Sesión</h3>
            <form onSubmit={handleLogin}>
              <div className="form-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-login w-100">
                Iniciar sesión
              </button>
            </form>
          </div>

          {/* === REGISTRO DE USUARIO === */}
          <div className="col-md-5 form-box">
            <h3 className="form-title">Registrar Usuario</h3>
            <form onSubmit={handleRegister}>
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="nombres"
                  placeholder="Nombres"
                  value={registerData.nombres}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="apellidos"
                  placeholder="Apellidos"
                  value={registerData.apellidos}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="email"
                  name="correo"
                  placeholder="Correo"
                  value={registerData.correo}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="password"
                  name="contraseña"
                  placeholder="Contraseña"
                  value={registerData.contraseña}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="password"
                  name="repetir"
                  placeholder="Repetir Contraseña"
                  value={registerData.repetir}
                  onChange={handleRegisterChange}
                />
              </div>
              <button type="submit" className="btn-login w-100">
                Crear cuenta
              </button>
            </form>
          </div>

          {/* === MENSAJES === */}
          <div className="col-12 text-center mt-3">
            {error && <p className="text-danger fw-bold">{error}</p>}
            {success && <p className="text-success fw-bold">{success}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
