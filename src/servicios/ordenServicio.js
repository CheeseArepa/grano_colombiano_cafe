import { RECURSOS_API } from '../constantes/api';
import { crearServicioRecurso } from './api';

const ordenes = crearServicioRecurso(RECURSOS_API.orden);

export const obtenerOrdenes = ordenes.obtenerTodos;
export const crearOrden = ordenes.crear;
export const actualizarOrden = ordenes.actualizar;
export const eliminarOrden = ordenes.eliminar;
