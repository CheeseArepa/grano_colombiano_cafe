import { solicitarApi } from './api.js';

const API_URL = 'https://6aa6bb8dd7765db985078fad.mockapi.io/categoria';

// Obtener todas las categorías
export const obtenerCategorias = () => {
  return solicitarApi(API_URL);
};

// Crear una nueva categoría
export const crearCategoria = (categoria) => {
  return solicitarApi(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(categoria)
  });
};

// Actualizar una categoría existente
export const actualizarCategoria = (id, categoria) => {
  return solicitarApi(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(categoria)
  });
};

// Eliminar una categoría por ID
export const eliminarCategoria = (id) => {
  return solicitarApi(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
};
