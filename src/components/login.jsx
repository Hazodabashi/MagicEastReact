import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import axios from "axios";
import bcrypt from "bcryptjs";

function Login() {
  const usuarioLogeado = JSON.parse(localStorage.getItem("usuario"));
  if (usuarioLogeado) {
    window.location.href = "/";
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerData, setRegisterData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    contraseña: "",
    repetir: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Ingresa tu correo");
      return;
    }

    if (!password) {
      setError("Ingresa tu contraseña");
      return;
    }

    try {
      const response = await axios.get("http://3.135.235.62:8080/api/usuarios");
      const usuarios = response.data;

      const usuario = usuarios.find((u) => u.email === email);

      if (!usuario) {
        setError("Email no registrado");
        return;
      }

      const valida = await bcrypt.compare(password, usuario.contrasena);

      if (!valida) {
        setError("Contraseña incorrecta");
        return;
      }

      const datosSesion = {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
      };

      localStorage.setItem("usuario", JSON.stringify(datosSesion));

      setSuccess("Inicio de sesión exitoso");
      window.location.href = "/";
    } catch (err) {
      setError("Error en el servidor");
    }
  };

  const handleRegister = async (e) => {
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

    try {
      await axios.post("http://3.135.235.62:8080/api/usuarios", {
        nombre: `${nombres} ${apellidos}`,
        email: correo,
        direccion: "Sin dirección",
        contrasena: contraseña,
      });

      setSuccess("Usuario registrado correctamente");

      setRegisterData({
        nombres: "",
        apellidos: "",
        correo: "",
        contraseña: "",
        repetir: "",
      });
    } catch (err) {
      setError("Error al registrar usuario");
    }
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="row justify-content-center">

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
