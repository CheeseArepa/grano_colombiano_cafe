import { Link } from 'react-router';

export function UnauthorizedPage() {
  return <section className="gestion-productos-section"><h2>Acceso no autorizado</h2><p>No tienes permisos para acceder a esta sección.</p><Link className="btn-save" to="/catalogo">Volver al Catalogo</Link></section>;
}
