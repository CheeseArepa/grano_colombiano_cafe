import { solicitarApi } from './api.js';

const API_URL = 'https://6aa6bb8dd7765db985078fad.mockapi.io/producto';

// Obtener todos los productos
export const obtenerProductos = () => {
  return solicitarApi(API_URL);
};

// Crear un nuevo producto
export const crearProducto = (producto) => {
  return solicitarApi(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(producto)
  });
};

// Actualizar un producto existente
export const actualizarProducto = (id, producto) => {
  return solicitarApi(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(producto)
  });
};

// Eliminar un producto por ID
export const eliminarProducto = (id) => {
  return solicitarApi(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
};
