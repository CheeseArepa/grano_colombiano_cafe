import { solicitarApi } from './api';
const API_URL = 'https://6aa6bb8dd7765db985078fad.mockapi.io/cliente';

export const obtenerClientes = () => {
  return solicitarApi(API_URL);
};

export const crearCliente = (cliente) => {
  return solicitarApi(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente)
  });
};

export const actualizarCliente = (id, cliente) => {
  return solicitarApi(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente)
  });
};

export const eliminarCliente = (id) => {
  return solicitarApi(`${API_URL}/${id}`, { method: 'DELETE' });
};
