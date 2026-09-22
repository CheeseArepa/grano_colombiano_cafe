/**
 * Genera los avisos de un módulo de administración con la concordancia de
 * género correcta. Antes cada pantalla repetía las siete cadenas a mano, lo que
 * producía mezclas como "Categoría creado con éxito" al copiar y pegar.
 *
 * @param {object} entidad
 * @param {string} entidad.singular   Nombre en singular, capitalizado: "Producto".
 * @param {string} [entidad.nombre]   Nombre en minúscula para los textos de error.
 * @param {boolean} [entidad.femenino] `true` para entidades femeninas ("categoría").
 */
export const mensajesDe = ({ singular, nombre = singular.toLowerCase(), femenino = false }) => {
  const participio = femenino ? 'a' : 'o';
  const articulo = femenino ? 'la' : 'el';
  const demostrativo = femenino ? 'esta' : 'este';

  return {
    entidad: nombre,
    creado: `${singular} cread${participio} con éxito`,
    actualizado: `${singular} actualizad${participio} con éxito`,
    eliminado: `${singular} eliminad${participio} con éxito`,
    errorCrear: `Error al registrar ${articulo} ${nombre}`,
    errorActualizar: `Error al actualizar ${articulo} ${nombre}`,
    errorEliminar: `Error al eliminar ${articulo} ${nombre}`,
    confirmarEliminacion: `¿Estás seguro de que deseas eliminar ${demostrativo} ${nombre}?`
  };
};
