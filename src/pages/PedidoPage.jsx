import { useOutletContext } from 'react-router';

export function PedidoPage() {
  const { sesion, cartCount, abrirAuth } = useOutletContext();

  return (
    <section className="gestion-productos-section">
      <div className="gestion-header">
        <h2>Mi Pedido</h2>
        <p>{sesion ? `Pedido de ${sesion.nombre}.` : 'Revisa los productos que has agregado.'}</p>
      </div>
      <p className="loading-text">Tienes {cartCount} producto(s) agregado(s). La creación de órdenes estará disponible próximamente.</p>
      <div className="form-actions">
        {sesion ? <button type="button" className="btn-save" disabled>Agregar pedido</button> : <button type="button" className="btn-save" onClick={() => abrirAuth('login')}>Iniciar sesión</button>}
      </div>
    </section>
  );
}
