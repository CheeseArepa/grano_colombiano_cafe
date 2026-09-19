export function ListaEstadosAdmin({ estados = [], onEditar, onEliminar, cargando }) {
  const estadosSeguros = Array.isArray(estados) ? estados : [];

  if (cargando) return <p className="loading-text">Cargando lista de estados...</p>;

  if (estadosSeguros.length === 0) {
    return <div className="empty-admin-list"><p>No hay estados de orden registrados.</p></div>;
  }

  return (
    <div className="admin-table-container">
      <div className="table-header-info">
        <h3 className="table-title">📋 Estados de la Orden Registrados</h3>
        <span className="table-count">{estadosSeguros.length} estado(s)</span>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Color</th>
              <th>Estado</th>
              <th className="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estadosSeguros.map((e) => (
              <tr key={e.id}>
                <td className="td-id">#{e.id}</td>
                <td className="td-name"><span className="badge-tag">{e.nombre}</span></td>
                <td>{e.descripcion}</td>
                <td>{e.color}</td>
                <td>{e.estado ? 'Activo' : 'Inactivo'}</td>
                <td className="td-actions text-right">
                  <button className="btn-action-edit" onClick={() => onEditar(e)}>✏️ Editar</button>
                  <button className="btn-action-delete" onClick={() => onEliminar(e.id)}>🗑️ Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
