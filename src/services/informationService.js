import { solicitarApi } from './api.js';

const API_URL = 'https://6aa6bb8dd7765db985078fad.mockapi.io/information';

export const obtenerInformacion = () => solicitarApi(API_URL);
export const crearInformacion = (informacion) => solicitarApi(API_URL, {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(informacion)
});
export const actualizarInformacion = (id, informacion) => solicitarApi(`${API_URL}/${id}`, {
  method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(informacion)
});
export const eliminarInformacion = (id) => solicitarApi(`${API_URL}/${id}`, { method: 'DELETE' });
