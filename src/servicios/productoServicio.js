import { RECURSOS_API } from '../constantes/api';
import { crearServicioRecurso } from './api';

const productos = crearServicioRecurso(RECURSOS_API.producto);

export const obtenerProductos = productos.obtenerTodos;
export const crearProducto = productos.crear;
export const actualizarProducto = productos.actualizar;
export const eliminarProducto = productos.eliminar;
