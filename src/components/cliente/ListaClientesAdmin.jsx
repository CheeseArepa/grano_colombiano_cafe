export function ListaClientesAdmin({ clientes = [], cargando }) {
  if (cargando) return <p className="loading-text">Cargando lista de clientes...</p>;
  if (clientes.length === 0) return <div className="empty-admin-list"><p>No hay clientes registrados en el sistema.</p></div>;

  return <div className="admin-table-container">
    <div className="table-header-info">
      <h3 className="table-title">📋 Lista de Clientes Registrados</h3>
      <span className="table-count">{clientes.length} cliente(s)</span>
    </div>
    <div className="table-responsive"><table className="admin-table"><thead><tr><th>ID</th><th>Nombre</th><th>Teléfono</th><th>Correo</th></tr></thead><tbody>
      {clientes.map((cliente) => <tr key={cliente.id}><td className="td-id">#{cliente.id}</td><td className="td-name"><strong>{cliente.nombre} {cliente.apellido}</strong></td><td>{cliente.telefono}</td><td>{cliente.correo}</td></tr>)}
    </tbody></table></div>
  </div>;
}
