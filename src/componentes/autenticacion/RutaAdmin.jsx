import { Navigate, Outlet, useLocation, useOutletContext } from 'react-router';
import { MODO_AUTENTICACION, ROLES } from '../../constantes/dominio';
import { RUTAS } from '../../constantes/rutas';

/**
 * Protege las rutas del panel: sin sesión pide iniciarla (recordando el destino
 * para volver tras el acceso) y con sesión no administradora deriva a la
 * pantalla de acceso denegado.
 */
export function RutaAdmin() {
  const contexto = useOutletContext();
  const location = useLocation();

  if (!contexto.sesion) {
    return (
      <Navigate
        replace
        to={RUTAS.CATALOGO}
        state={{ modoAutenticacion: MODO_AUTENTICACION.INICIAR_SESION, origen: location.pathname }}
      />
    );
  }

  if (contexto.sesion.rol !== ROLES.ADMIN) {
    return <Navigate replace to={RUTAS.NO_AUTORIZADO} />;
  }

  return <Outlet context={contexto} />;
}
