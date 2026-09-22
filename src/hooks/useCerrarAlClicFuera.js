import { useEffect, useRef } from 'react';

/**
 * Devuelve una `ref` que invoca `alCerrar` cuando se hace clic fuera del
 * elemento referenciado. `alCerrar` debe ser estable (`useCallback`).
 */
export function useCerrarAlClicFuera(alCerrar) {
  const referencia = useRef(null);

  useEffect(() => {
    const manejarClic = (evento) => {
      if (referencia.current && !referencia.current.contains(evento.target)) {
        alCerrar();
      }
    };

    document.addEventListener('mousedown', manejarClic);
    return () => document.removeEventListener('mousedown', manejarClic);
  }, [alCerrar]);

  return referencia;
}
