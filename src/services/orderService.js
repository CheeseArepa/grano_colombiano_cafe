import { solicitarApi } from './api';
const API_URL = 'https://6aa6bb8dd7765db985078fad.mockapi.io/orden';

export const obtenerOrdenes = () => {
  return solicitarApi(API_URL);
};

export const crearOrden = (orden) => {
  return solicitarApi(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orden)
  });
};

export const actualizarOrden = (id, orden) => {
  return solicitarApi(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orden)
  });
};

export const eliminarOrden = (id) => {
  return solicitarApi(`${API_URL}/${id}`, { method: 'DELETE' });
};
