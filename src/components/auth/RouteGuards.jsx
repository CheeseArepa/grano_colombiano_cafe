import { Navigate, Outlet, useLocation, useOutletContext } from 'react-router';

const pedirInicioSesion = (location) => (
  <Navigate replace to="/catalogo" state={{ authMode: 'login', from: location.pathname }} />
);

export function AccesoAdmin() {
  const contexto = useOutletContext();
  const { sesion } = contexto;
  const location = useLocation();

  if (!sesion) return pedirInicioSesion(location);
  if (sesion.rol !== 'admin') return <Navigate replace to="/no-autorizado" />;

  return <Outlet context={contexto} />;
}
