import { Link } from 'react-router';
import { RUTAS } from '../../constantes/rutas';

/** Estado vacío del pedido. */
export function CarritoVacio() {
  return (
    <div className="carrito-vacio">
      <span className="carrito-vacio-icono" aria-hidden="true">🛍️</span>
      <h3>Tu pedido está vacío</h3>
      <p>Aún no has agregado productos. Explora el catálogo y encuentra tu café favorito.</p>
      <Link className="btn-save" to={RUTAS.CATALOGO}>Ir al Catálogo</Link>
    </div>
  );
}
