export function ListaOrdenesAdmin({ ordenes = [], onEditar, onEliminar, cargando }) {
  const ordenesSeguras = Array.isArray(ordenes) ? ordenes : [];

  if (cargando) return <p className="loading-text">Cargando lista de órdenes...</p>;

  if (ordenesSeguras.length === 0) {
    return <div className="empty-admin-list"><p>No hay órdenes registradas en el sistema.</p></div>;
  }

  return (
    <div className="admin-table-container">
      <div className="table-header-info">
        <h3 className="table-title">📋 Lista de Órdenes Registradas</h3>
        <span className="table-count">{ordenesSeguras.length} orden(es)</span>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Total</th>
              <th className="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ordenesSeguras.map((o) => (
              <tr key={o.id}>
                <td className="td-id">#{o.id}</td>
                <td className="td-name"><strong>{o.cliente}</strong></td>
                <td><span className="badge-tag">{o.estado_orden}</span></td>
                <td>{o.fecha}</td>
                <td>${o.total}</td>
                <td className="td-actions text-right">
                  <button className="btn-action-edit" onClick={() => onEditar(o)}>✏️ Editar</button>
                  <button className="btn-action-delete" onClick={() => onEliminar(o.id)}>🗑️ Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
