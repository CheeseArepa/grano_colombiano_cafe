/** Celda con los botones de editar y eliminar de una fila de administración. */
export function CeldaAcciones({ onEditar, onEliminar }) {
  return (
    <td className="td-actions text-right">
      <button type="button" className="btn-action-edit" onClick={onEditar}>✏️ Editar</button>
      <button type="button" className="btn-action-delete" onClick={onEliminar}>🗑️ Eliminar</button>
    </td>
  );
}
