export function ListaOrdenesAdmin({ ordenes = [], cargando }) {
  const ordenesSeguras = Array.isArray(ordenes) ? ordenes : [];
  if (cargando) return <p className="loading-text">Cargando lista de órdenes...</p>;
  if (ordenesSeguras.length === 0) return <div className="empty-admin-list"><p>No hay órdenes registradas en el sistema.</p></div>;

  return <div className="admin-table-container">
    <div className="table-header-info">
      <h3 className="table-title">📋 Lista de Órdenes Registradas</h3>
      <span className="table-count">{ordenesSeguras.length} orden(es)</span>
    </div>
    <div className="table-responsive"><table className="admin-table"><thead><tr><th>ID</th><th>Cliente</th><th>Estado</th><th>Fecha</th><th>Total</th></tr></thead><tbody>
      {ordenesSeguras.map((orden) => <tr key={orden.id}><td className="td-id">#{orden.id}</td><td className="td-name"><strong>{orden.cliente}</strong></td><td><span className="badge-tag">{orden.estado_orden}</span></td><td>{orden.fecha}</td><td>${orden.total}</td></tr>)}
    </tbody></table></div>
  </div>;
}
