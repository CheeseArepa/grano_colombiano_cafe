import { Navigate, Outlet, useLocation, useOutletContext } from 'react-router';
import { normalizarCorreo, ROL_BASICO } from '../../services/userService';

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

export function AccesoMiPedido() {
  const contexto = useOutletContext();
  const { sesion, clientes } = contexto;
  const location = useLocation();

  if (!sesion) return pedirInicioSesion(location);
  if (sesion.rol !== ROL_BASICO) return <Navigate replace to="/no-autorizado" />;

  const cliente = clientes.find((item) => (
    normalizarCorreo(item.correo) === normalizarCorreo(sesion.correo)
  ));

  if (!cliente) return <Navigate replace to="/no-autorizado" />;

  return <Outlet context={{ ...contexto, cliente }} />;
}
