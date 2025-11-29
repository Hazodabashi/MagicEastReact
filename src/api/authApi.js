import api from "./api";

// Login (autenticación)
export const login = (email, contrasena) => {
  return api.post("/auth/login", {
    email: email,
    contrasena: contrasena
  });
};
