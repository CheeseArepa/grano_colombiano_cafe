import { URL_BASE_API } from '../constantes/api';

const CABECERAS_JSON = { 'Content-Type': 'application/json' };
const SIN_CONTENIDO = 204;
const NO_ENCONTRADO = 404;

/** Envoltura de `fetch` que valida la respuesta y devuelve el JSON ya parseado. */
export async function solicitarApi(url, opciones) {
  const respuesta = await fetch(url, opciones);

  if (!respuesta.ok) {
    throw new Error(`MockAPI respondió ${respuesta.status}`);
  }

  return respuesta.status === SIN_CONTENIDO ? null : respuesta.json();
}

/**
 * Consulta una colección aplicando filtros como parámetros de la URL.
 *
 * Dos particularidades de MockAPI que se normalizan aquí:
 *
 * 1. Responde 404 cuando ningún registro coincide con el filtro. En una
 *    búsqueda eso no es un error, así que se traduce a una lista vacía.
 * 2. El filtrado es por coincidencia PARCIAL y sin distinguir mayúsculas
 *    (`?correo=an@x.com` también devuelve `juan@x.com`). Por eso quien llame
 *    debe volver a comprobar la igualdad exacta sobre el resultado: este
 *    filtro sirve para no traerse la colección entera, nunca como criterio
 *    de decisión por sí solo.
 */
export async function buscarEnApi(url) {
  const respuesta = await fetch(url);

  if (respuesta.status === NO_ENCONTRADO) return [];

  if (!respuesta.ok) {
    throw new Error(`MockAPI respondió ${respuesta.status}`);
  }

  const datos = await respuesta.json();

  return Array.isArray(datos) ? datos : [];
}

const enviarJson = (url, method, datos) => solicitarApi(url, {
  method,
  headers: CABECERAS_JSON,
  body: JSON.stringify(datos)
});

/**
 * Fabrica las operaciones CRUD de un recurso REST de MockAPI.
 * Cada servicio de dominio reexporta estas funciones con nombres propios
 * (`obtenerProductos`, `crearProducto`, ...) para que el resto del código
 * siga leyéndose en términos del negocio y no de HTTP.
 */
export function crearServicioRecurso(recurso) {
  const urlColeccion = `${URL_BASE_API}/${recurso}`;
  const urlElemento = (id) => `${urlColeccion}/${id}`;

  return {
    obtenerTodos: () => solicitarApi(urlColeccion),
    obtenerPorId: (id) => solicitarApi(urlElemento(id)),
    buscar: (filtros) => buscarEnApi(`${urlColeccion}?${new URLSearchParams(filtros)}`),
    crear: (datos) => enviarJson(urlColeccion, 'POST', datos),
    actualizar: (id, datos) => enviarJson(urlElemento(id), 'PUT', datos),
    eliminar: (id) => solicitarApi(urlElemento(id), { method: 'DELETE' })
  };
}
