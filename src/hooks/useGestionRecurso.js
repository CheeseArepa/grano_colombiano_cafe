import { useCallback, useState } from 'react';
import { mensajeParaUsuario } from '../utilidades/errores';

/**
 * Orquesta el ciclo alta / edición / eliminación común a todas las pantallas
 * de administración: qué registro se está editando, si hay un guardado en
 * curso, y los avisos de éxito o error.
 *
 * @param {object} opciones
 * @param {{ crear: Function, actualizar: Function, eliminar: Function }} opciones.servicio
 * @param {() => void} opciones.alCambiar Recarga la colección tras cada cambio.
 * @param {object} opciones.mensajes Textos de la entidad (ver `mensajesDe`).
 */
export function useGestionRecurso({ servicio, alCambiar, mensajes }) {
  const [registroAEditar, setRegistroAEditar] = useState(null);
  const [guardando, setGuardando] = useState(false);

  const editar = useCallback((registro) => {
    setRegistroAEditar(registro);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const cancelarEdicion = useCallback(() => setRegistroAEditar(null), []);

  const guardar = useCallback(async (datos) => {
    const esEdicion = Boolean(registroAEditar);
    setGuardando(true);

    try {
      if (esEdicion) {
        await servicio.actualizar(registroAEditar.id, datos);
        alert(mensajes.actualizado);
        setRegistroAEditar(null);
      } else {
        await servicio.crear(datos);
        alert(mensajes.creado);
      }
      alCambiar();
    } catch (error) {
      const accion = esEdicion ? 'actualizar' : 'crear';
      const respaldo = esEdicion ? mensajes.errorActualizar : mensajes.errorCrear;

      console.error(`Error al ${accion} ${mensajes.entidad}:`, error);
      alert(mensajeParaUsuario(error, respaldo));
    } finally {
      setGuardando(false);
    }
  }, [registroAEditar, servicio, alCambiar, mensajes]);

  const eliminar = useCallback(async (id) => {
    if (!window.confirm(mensajes.confirmarEliminacion)) return;

    try {
      await servicio.eliminar(id);
      alert(mensajes.eliminado);
      setRegistroAEditar((actual) => (actual?.id === id ? null : actual));
      alCambiar();
    } catch (error) {
      console.error(`Error al eliminar ${mensajes.entidad}:`, error);
      alert(mensajeParaUsuario(error, mensajes.errorEliminar));
    }
  }, [servicio, alCambiar, mensajes]);

  return { registroAEditar, guardando, guardar, editar, cancelarEdicion, eliminar };
}
