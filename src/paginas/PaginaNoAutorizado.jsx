import { Link } from 'react-router';
import { RUTAS } from '../constantes/rutas';

export function PaginaNoAutorizado() {
  return (
    <section className="admin-section">
      <h2>Acceso no autorizado</h2>
      <p>No tienes permisos para acceder a esta sección.</p>
      <Link className="btn-save" to={RUTAS.CATALOGO}>Volver al Catalogo</Link>
    </section>
  );
}
