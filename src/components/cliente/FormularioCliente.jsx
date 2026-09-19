import { useState, useEffect } from 'react';

export function FormularioCliente({ clienteAEditar, onGuardar, onCancelar, guardando }) {
  const initialFormState = { nombre: '', apellido: '', correo: '', telefono: '', direccion: '', estado: true };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (clienteAEditar) {
      setFormData({
        nombre: clienteAEditar.nombre || '',
        apellido: clienteAEditar.apellido || '', correo: clienteAEditar.correo || '', telefono: clienteAEditar.telefono || '', direccion: clienteAEditar.direccion || '', estado: Boolean(clienteAEditar.estado)
      });
    } else {
      setFormData(initialFormState);
    }
  }, [clienteAEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      alert('Por favor ingresa el nombre del cliente.');
      return;
    }
    onGuardar(formData);
  };

  const esEdicion = Boolean(clienteAEditar);

  return (
    <div className="card-form-container">
      <div className="form-header">
        <h3 className="form-title">{esEdicion ? '✏️ Editar Cliente' : '➕ Registrar Nuevo Cliente'}</h3>
        <p className="form-subtitle">Administra la información de tus clientes.</p>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="nombre" className="form-label">Nombre *</label>
            <input type="text" id="nombre" name="nombre" className="form-input" placeholder="Ej. María Gómez" value={formData.nombre} onChange={handleChange} required />
          </div>
          <div className="form-group"><label htmlFor="apellido" className="form-label">Apellido *</label><input type="text" id="apellido" name="apellido" className="form-input" value={formData.apellido} onChange={handleChange} required /></div>

          <div className="form-group">
            <label htmlFor="telefono" className="form-label">Teléfono</label>
            <input type="text" id="telefono" name="telefono" className="form-input" placeholder="Ej. 300 000 0000" value={formData.telefono} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="correo" className="form-label">Correo Electrónico</label>
            <input type="email" id="correo" name="correo" className="form-input" placeholder="correo@ejemplo.com" value={formData.correo} onChange={handleChange} />
          </div>
          <label className="form-group"><span className="form-label">Activo</span><input type="checkbox" name="estado" checked={formData.estado} onChange={(e) => setFormData((prev) => ({ ...prev, estado: e.target.checked }))} /></label>

          <div className="form-group">
            <label htmlFor="direccion" className="form-label">Dirección</label>
            <input type="text" id="direccion" name="direccion" className="form-input" placeholder="Ej. Calle 10 # 5-20" value={formData.direccion} onChange={handleChange} />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-save" disabled={guardando}>
            {guardando ? 'Guardando...' : esEdicion ? 'Actualizar Cliente' : 'Guardar Cliente'}
          </button>
          {esEdicion && (
            <button type="button" className="btn-cancel" onClick={onCancelar} disabled={guardando}>Cancelar Edición</button>
          )}
        </div>
      </form>
    </div>
  );
}
