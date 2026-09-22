/** Botones de guardar y cancelar comunes a todos los formularios de administración. */
export function AccionesFormulario({
  esEdicion,
  guardando,
  etiquetaGuardar,
  etiquetaActualizar,
  etiquetaCancelar = 'Cancelar Edición',
  onCancelar
}) {
  return (
    <div className="form-actions">
      <button type="submit" className="btn-save" disabled={guardando}>
        {guardando ? 'Guardando...' : esEdicion ? etiquetaActualizar : etiquetaGuardar}
      </button>

      {esEdicion && (
        <button type="button" className="btn-cancel" onClick={onCancelar} disabled={guardando}>
          {etiquetaCancelar}
        </button>
      )}
    </div>
  );
}
