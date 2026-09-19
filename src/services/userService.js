import { solicitarApi } from './api';
const API_URL = 'https://6aa6bb8dd7765db985078fad.mockapi.io/usuario';

// El rol se establece también en el servicio para que cualquier alta que no
// indique un rol explícito tenga los permisos mínimos.
export const ROL_BASICO = 'cliente';

export const normalizarCorreo = (correo = '') => correo.trim().toLocaleLowerCase();

export const usuarioEstaActivo = (usuario) => (
  usuario?.estado === true || usuario?.estado === 'true'
);

export const obtenerUsuarios = () => {
  return solicitarApi(API_URL);
};

export const crearUsuario = (usuario) => {
  const usuarioConRol = {
    ...usuario,
    correo: normalizarCorreo(usuario.correo),
    rol: usuario.rol || ROL_BASICO
  };

  return solicitarApi(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuarioConRol)
  });
};

export const actualizarUsuario = (id, usuario) => {
  return solicitarApi(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario)
  });
};

export const eliminarUsuario = (id) => {
  return solicitarApi(`${API_URL}/${id}`, { method: 'DELETE' });
};
