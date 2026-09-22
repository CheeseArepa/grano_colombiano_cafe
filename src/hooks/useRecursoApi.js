import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * Carga una colección de la API y expone su estado de forma uniforme.
 *
 * Sustituye el trío `datos / cargando / recargar` que antes se repetía como
 * tres `useState` sueltos por cada recurso en `App`.
 *
 * El objeto devuelto se memoriza para que el contexto de `App` mantenga su
 * identidad entre renders y no fuerce el re-render de todas las páginas.
 *
 * @param {() => Promise<unknown[]>} obtenerColeccion Función del servicio.
 *        Debe ser estable (definida a nivel de módulo).
 * @returns {{ datos: unknown[], cargando: boolean, recargar: () => Promise<void> }}
 */
export function useRecursoApi(obtenerColeccion) {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const recargar = useCallback(() => {
    setCargando(true);

    return obtenerColeccion()
      .then((respuesta) => setDatos(Array.isArray(respuesta) ? respuesta : []))
      .catch((error) => console.error('Error al cargar datos:', error))
      .finally(() => setCargando(false));
  }, [obtenerColeccion]);

  // Carga inicial. El aviso `set-state-in-effect` del linter no aplica aquí:
  // es una sincronización con un sistema externo (la API), que es justamente
  // el caso de uso legítimo de un efecto.
  useEffect(() => { recargar(); }, [recargar]);

  return useMemo(() => ({ datos, cargando, recargar }), [datos, cargando, recargar]);
}
