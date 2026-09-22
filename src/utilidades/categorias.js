import { CATEGORIA_INICIO } from '../constantes/dominio';

const NOMBRE_INICIO = CATEGORIA_INICIO.toLowerCase();

/**
 * Descarta las categorías sin nombre y la categoría "Inicio" si llegara a
 * existir en la API: "Inicio" es un filtro de la interfaz y siempre se pinta
 * aparte, así que duplicarla confundiría al usuario.
 */
export const filtrarCategoriasVisibles = (categorias = []) => categorias.filter((categoria) => {
  const nombre = (categoria.nombre || '').trim().toLowerCase();
  return nombre !== '' && nombre !== NOMBRE_INICIO;
});
