import { RECURSOS_API } from '../constantes/api';
import { crearServicioRecurso } from './api';

const estadosOrden = crearServicioRecurso(RECURSOS_API.estadoOrden);

export const obtenerEstadosOrden = estadosOrden.obtenerTodos;
export const crearEstadoOrden = estadosOrden.crear;
export const actualizarEstadoOrden = estadosOrden.actualizar;
export const eliminarEstadoOrden = estadosOrden.eliminar;
