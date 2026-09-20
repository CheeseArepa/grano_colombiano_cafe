import { useOutletContext } from 'react-router';

export function PedidoPage() {
  const { cliente, cartCount } = useOutletContext();

  return (
    <section className="gestion-productos-section">
      <div className="gestion-header">
        <h2>Mi Pedido</h2>
        <p>Pedido de {cliente.nombre} {cliente.apellido || ''}.</p>
      </div>
      <p className="loading-text">Tienes {cartCount} producto(s) agregado(s). La creación de órdenes permanece en la gestión administrativa existente.</p>
    </section>
  );
}
