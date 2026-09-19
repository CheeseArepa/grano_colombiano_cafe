export function ListaClientesAdmin({ clientes = [], onEditar, onEliminar, cargando }) {
  if (cargando) return <p className="loading-text">Cargando lista de clientes...</p>;

  if (clientes.length === 0) {
    return <div className="empty-admin-list"><p>No hay clientes registrados en el sistema.</p></div>;
  }

  return (
    <div className="admin-table-container">
      <div className="table-header-info">
        <h3 className="table-title">📋 Lista de Clientes Registrados</h3>
        <span className="table-count">{clientes.length} cliente(s)</span>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th className="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id}>
                <td className="td-id">#{c.id}</td>
                <td className="td-name"><strong>{c.nombre} {c.apellido}</strong></td>
                <td>{c.telefono}</td>
                <td>{c.correo}</td>
                <td className="td-actions text-right">
                  <button className="btn-action-edit" onClick={() => onEditar(c)}>✏️ Editar</button>
                  <button className="btn-action-delete" onClick={() => onEliminar(c.id)}>🗑️ Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
