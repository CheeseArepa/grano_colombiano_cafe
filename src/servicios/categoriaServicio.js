import { RECURSOS_API } from '../constantes/api';
import { crearServicioRecurso } from './api';

const categorias = crearServicioRecurso(RECURSOS_API.categoria);

export const obtenerCategorias = categorias.obtenerTodos;
export const crearCategoria = categorias.crear;
export const actualizarCategoria = categorias.actualizar;
export const eliminarCategoria = categorias.eliminar;
