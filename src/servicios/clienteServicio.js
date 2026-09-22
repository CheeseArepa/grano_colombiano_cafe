import { RECURSOS_API } from '../constantes/api';
import { crearServicioRecurso } from './api';

const clientes = crearServicioRecurso(RECURSOS_API.cliente);

export const obtenerClientes = clientes.obtenerTodos;
export const crearCliente = clientes.crear;
export const actualizarCliente = clientes.actualizar;
export const eliminarCliente = clientes.eliminar;
