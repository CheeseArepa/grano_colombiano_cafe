import { useCallback, useEffect, useMemo, useState } from 'react';
import { CLAVE_CARRITO } from '../constantes/dominio';
import {
  agregarLinea,
  calcularTotal,
  cambiarCantidad,
  contarUnidades,
  normalizarLineas,
  quitarLinea
} from '../utilidades/carrito';

/**
 * Lee el carrito persistido. Tolera que no exista, que el JSON esté dañado o
 * que el contenido no tenga la forma esperada: en todos esos casos se empieza
 * con un carrito vacío en vez de romper la aplicación.
 */
const leerCarritoGuardado = () => {
  try {
    return normalizarLineas(JSON.parse(localStorage.getItem(CLAVE_CARRITO)));
  } catch {
    return [];
  }
};

const guardarCarrito = (lineas) => {
  try {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(lineas));
  } catch (error) {
    // Cuota llena o modo privado: el carrito sigue funcionando en memoria.
    console.error('No fue posible guardar el carrito:', error);
  }
};

/**
 * Estado global del carrito. Se expone a través del contexto de `App`, igual
 * que el resto del estado compartido del proyecto.
 */
export function useCarrito() {
  const [lineas, setLineas] = useState(leerCarritoGuardado);

  // Sincroniza con `localStorage` en cada cambio (requisito de persistencia).
  useEffect(() => { guardarCarrito(lineas); }, [lineas]);

  const agregar = useCallback((producto, cantidad) => {
    setLineas((actuales) => agregarLinea(actuales, producto, cantidad));
  }, []);

  const aumentar = useCallback((id) => {
    setLineas((actuales) => cambiarCantidad(actuales, id, 1));
  }, []);

  const disminuir = useCallback((id) => {
    setLineas((actuales) => cambiarCantidad(actuales, id, -1));
  }, []);

  const eliminar = useCallback((id) => {
    setLineas((actuales) => quitarLinea(actuales, id));
  }, []);

  const vaciar = useCallback(() => setLineas([]), []);

  const unidades = useMemo(() => contarUnidades(lineas), [lineas]);
  const total = useMemo(() => calcularTotal(lineas), [lineas]);

  // Memorizado para no invalidar el contexto de `App` en cada render.
  return useMemo(() => ({
    lineas,
    unidades,
    total,
    estaVacio: lineas.length === 0,
    agregar,
    aumentar,
    disminuir,
    eliminar,
    vaciar
  }), [lineas, unidades, total, agregar, aumentar, disminuir, eliminar, vaciar]);
}
