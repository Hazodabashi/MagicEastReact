import api from "./api";


export const procesarCompra = (compra) => {
  return api.post("/checkout", compra);
};
