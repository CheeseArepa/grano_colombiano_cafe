import { solicitarApi } from './api';

const API_URL = 'https://6aa6bb8dd7765db985078fad.mockapi.io/estado_orden';

export const obtenerEstados = () => {
  return solicitarApi(API_URL);
};

export const crearEstado = (estado) => {
  return solicitarApi(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(estado)
  });
};

export const actualizarEstado = (id, estado) => {
  return solicitarApi(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(estado)
  });
};

export const eliminarEstado = (id) => {
  return solicitarApi(`${API_URL}/${id}`, { method: 'DELETE' });
};
