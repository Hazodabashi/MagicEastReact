import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const usuarioStored = localStorage.getItem('usuario');
  let usuario = null;

  if (usuarioStored) {
    try {
      usuario = JSON.parse(usuarioStored);
    } catch (e) {
      console.error("Error parsing user data", e);
    }
  }

  // 1. Check Authentication
  if (!token || !usuario) {
    return <Navigate to="/login" replace />;
  }

  // 2. Check Authorization (Roles)
  if (allowedRoles && !allowedRoles.includes(usuario.rol)) {
    // User is logged in but doesn't have the required role
    return <Navigate to="/" replace />;
  }

  // 3. Render the protected route
  return <Outlet />;
};

export default ProtectedRoute;
