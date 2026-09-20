import { ListaOrdenesAdmin } from './ListaOrdenesAdmin';

export function GestionOrdenes({ ordenes = [], cargando }) {
  return (
    <section className="gestion-productos-section">
      <div className="gestion-header">
        <h2>🧾 Gestión de Órdenes</h2>
        <p>Consulta las órdenes registradas en el sistema.</p>
      </div>
      <ListaOrdenesAdmin ordenes={ordenes} cargando={cargando} />
    </section>
  );
}
