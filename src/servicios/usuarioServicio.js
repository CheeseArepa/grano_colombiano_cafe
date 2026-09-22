import { RECURSOS_API } from '../constantes/api';
import { ROLES, ROL_BASICO } from '../constantes/dominio';
import { ErrorDeNegocio } from '../utilidades/errores';
import { crearServicioRecurso } from './api';

const usuarios = crearServicioRecurso(RECURSOS_API.usuario);

/** Se lanza cuando una operación dejaría al sistema sin administradores. */
export class ErrorInvarianteAdministrador extends ErrorDeNegocio {}

export const normalizarCorreo = (correo = '') => correo.trim().toLocaleLowerCase();

export const usuarioEstaActivo = (usuario) => (
  usuario?.estado === true || usuario?.estado === 'true'
);

export const esAdministrador = (usuario) => usuario?.rol === ROLES.ADMIN;

const mismoId = (usuario, id) => String(usuario.id) === String(id);

// Devuelve la colección completa de usuarios. Solo debe usarse desde rutas ya
// protegidas para administradores: la respuesta incluye la clave en texto plano
// de todas las cuentas.
export const obtenerUsuarios = usuarios.obtenerTodos;

/**
 * Candidatos a un correo, pidiéndole el filtrado a la API en vez de descargar
 * la colección entera.
 *
 * El filtro de MockAPI es por coincidencia parcial, así que puede devolver
 * cuentas de más (`an@x.com` también trae `juan@x.com`). Nunca se usa como
 * criterio de decisión: solo acota cuántos registros viajan por la red, y la
 * comprobación exacta la hace siempre quien llama.
 */
const buscarPorCorreo = (correoNormalizado) => usuarios.buscar({ correo: correoNormalizado });

/**
 * Busca la cuenta activa que coincida con las credenciales.
 * Devuelve `null` si no hay coincidencia (credenciales inválidas o cuenta
 * inactiva); no distingue entre ambos casos para no filtrar qué correos existen.
 *
 * La clave se compara aquí y NO se manda como filtro a la API: el filtrado
 * parcial de MockAPI daría por buena cualquier clave que fuese prefijo de la
 * real (incluida la cadena vacía), lo que sería un salto de autenticación.
 */
export const autenticarUsuario = async ({ correo, clave }) => {
  const correoBuscado = normalizarCorreo(correo);
  const candidatos = await buscarPorCorreo(correoBuscado);

  return candidatos.find((usuario) => (
    normalizarCorreo(usuario.correo) === correoBuscado
    && usuario.clave === clave
    && usuarioEstaActivo(usuario)
  )) || null;
};

export const existeCorreoRegistrado = async (correo) => {
  const correoBuscado = normalizarCorreo(correo);
  const candidatos = await buscarPorCorreo(correoBuscado);

  // La igualdad exacta es imprescindible: sin ella, el filtro parcial haría
  // que un correo libre se reportase como ocupado por ser subcadena de otro.
  return candidatos.some((usuario) => normalizarCorreo(usuario.correo) === correoBuscado);
};

export const crearUsuario = (usuario) => usuarios.crear({
  ...usuario,
  correo: normalizarCorreo(usuario.correo),
  rol: usuario.rol || ROL_BASICO
});

/**
 * Impide que la operación sobre `id` deje al sistema sin ningún administrador.
 * `rolResultante` es el rol que tendría la cuenta después de la operación;
 * omitirlo significa que la cuenta va a desaparecer (eliminación).
 */
const validarUltimoAdministrador = async (id, rolResultante, mensaje) => {
  const listado = await obtenerUsuarios();
  const afectado = listado.find((usuario) => mismoId(usuario, id));
  const administradores = listado.filter(esAdministrador);
  const dejaDeSerAdmin = rolResultante !== ROLES.ADMIN;

  if (esAdministrador(afectado) && dejaDeSerAdmin && administradores.length <= 1) {
    throw new ErrorInvarianteAdministrador(mensaje);
  }
};

export const actualizarUsuario = async (id, usuario) => {
  await validarUltimoAdministrador(
    id,
    usuario.rol,
    'No se puede cambiar el rol del último administrador.'
  );

  return usuarios.actualizar(id, usuario);
};

export const eliminarUsuario = async (id) => {
  await validarUltimoAdministrador(
    id,
    null,
    'No se puede eliminar el último administrador.'
  );

  return usuarios.eliminar(id);
};
