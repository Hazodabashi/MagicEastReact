import api from "./api";

// Registrar usuario
export const registrarUsuario = (data) => {
  return api.post("/usuarios", data);
};

// Listar usuarios
export const listarUsuarios = () => {
  return api.get("/usuarios");
};

// Buscar usuario
export const obtenerUsuarioPorEmail = (email) => {
  return api.get(`/usuarios/${email}`);
};

// Eliminar usuario
export const eliminarUsuario = (id) => {
  return api.delete(`/usuarios/${id}`);
};
