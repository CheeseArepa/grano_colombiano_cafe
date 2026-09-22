import { RECURSOS_API } from '../constantes/api';
import { crearServicioRecurso } from './api';

// El endpoint remoto se llama "information" (ver RECURSOS_API); de la capa de
// servicios hacia arriba el recurso se nombra siempre en español.
const informacion = crearServicioRecurso(RECURSOS_API.informacion);

export const obtenerInformacion = informacion.obtenerTodos;
export const crearInformacion = informacion.crear;
export const actualizarInformacion = informacion.actualizar;
export const eliminarInformacion = informacion.eliminar;
