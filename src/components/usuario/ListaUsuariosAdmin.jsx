export function ListaUsuariosAdmin({ usuarios = [], onEditar, onEliminar, cargando }) {
  if (cargando) return <p className="loading-text">Cargando lista de usuarios...</p>;

  if (usuarios.length === 0) {
    return <div className="empty-admin-list"><p>No hay usuarios registrados en el sistema.</p></div>;
  }

  return (
    <div className="admin-table-container">
      <div className="table-header-info">
        <h3 className="table-title">📋 Lista de Usuarios Registrados</h3>
        <span className="table-count">{usuarios.length} usuario(s)</span>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th className="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td className="td-id">#{u.id}</td>
                <td className="td-name"><strong>{u.nombre}</strong></td>
                <td>{u.correo}</td>
                <td>{u.rol}</td>
                <td><span className="badge-tag">{u.estado ? 'Activo' : 'Inactivo'}</span></td>
                <td className="td-actions text-right">
                  <button className="btn-action-edit" onClick={() => onEditar(u)}>✏️ Editar</button>
                  <button className="btn-action-delete" onClick={() => onEliminar(u.id)}>🗑️ Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
