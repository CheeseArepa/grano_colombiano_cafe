import { useState, useEffect } from 'react';

export function FormularioEstado({ estadoAEditar, onGuardar, onCancelar, guardando }) {
  const initialFormState = { nombre: '', descripcion: '', color: '', estado: true };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (estadoAEditar) {
      setFormData({
        nombre: estadoAEditar.nombre || '',
        descripcion: estadoAEditar.descripcion || '', color: estadoAEditar.color || '', estado: Boolean(estadoAEditar.estado)
      });
    } else {
      setFormData(initialFormState);
    }
  }, [estadoAEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      alert('Por favor ingresa el nombre del estado.');
      return;
    }
    onGuardar(formData);
  };

  const esEdicion = Boolean(estadoAEditar);

  return (
    <div className="card-form-container">
      <div className="form-header">
        <h3 className="form-title">{esEdicion ? '✏️ Editar Estado' : '➕ Registrar Nuevo Estado'}</h3>
        <p className="form-subtitle">Define los estados posibles por los que pasa una orden (ej. Pendiente, En preparación, Entregado).</p>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="nombre" className="form-label">Nombre del Estado *</label>
            <input type="text" id="nombre" name="nombre" className="form-input" placeholder="Ej. En preparación" value={formData.nombre} onChange={handleChange} required />
          </div>
          <div className="form-group"><label htmlFor="color" className="form-label">Color</label><input type="text" id="color" name="color" className="form-input" placeholder="#A9552E" value={formData.color} onChange={handleChange} /></div>
          <label className="form-group"><span className="form-label">Activo</span><input type="checkbox" name="estado" checked={formData.estado} onChange={(e) => setFormData((prev) => ({ ...prev, estado: e.target.checked }))} /></label>

          <div className="form-group">
            <label htmlFor="descripcion" className="form-label">Descripción (Opcional)</label>
            <input type="text" id="descripcion" name="descripcion" className="form-input" placeholder="Breve descripción del estado" value={formData.descripcion} onChange={handleChange} />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-save" disabled={guardando}>
            {guardando ? 'Guardando...' : esEdicion ? 'Actualizar Estado' : 'Guardar Estado'}
          </button>
          {esEdicion && (
            <button type="button" className="btn-cancel" onClick={onCancelar} disabled={guardando}>Cancelar Edición</button>
          )}
        </div>
      </form>
    </div>
  );
}
