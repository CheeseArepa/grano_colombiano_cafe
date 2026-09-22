import { useOutletContext } from 'react-router';

/**
 * Acceso tipado al contexto que `App` entrega a través del `Outlet`.
 * Centralizarlo evita que cada página importe `useOutletContext` y facilita
 * migrar a un `Context` propio más adelante sin tocar las páginas.
 */
export const useContextoApp = () => useOutletContext();
