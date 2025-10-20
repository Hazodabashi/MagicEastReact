import React from 'react';
import ProductoDetalle from '../components/ProductoDetalle.jsx';
import { useParams } from 'react-router-dom';

function ProductoDetallePage({ agregarAlCarrito }) {
  const { id } = useParams();
  const idProducto = parseInt(id, 10);

  return (
    <ProductoDetalle idProducto={idProducto} agregarAlCarrito={agregarAlCarrito} />
  );
}

export default ProductoDetallePage;
