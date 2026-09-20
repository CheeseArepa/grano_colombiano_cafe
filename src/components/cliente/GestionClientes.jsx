import { ListaClientesAdmin } from './ListaClientesAdmin';

export function GestionClientes({ clientes = [], cargando }) {
  return (
    <section className="gestion-productos-section">
      <div className="gestion-header">
        <h2>🧑‍🤝‍🧑 Gestión de Clientes</h2>
        <p>Consulta los clientes registrados en el sistema.</p>
      </div>
      <ListaClientesAdmin clientes={clientes} cargando={cargando} />
    </section>
  );
}
