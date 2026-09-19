import { useState, useEffect } from 'react';

export function FormularioUsuario({ usuarioAEditar, onGuardar, onCancelar, guardando }) {
  const initialFormState = { nombre: '', correo: '', clave: '', estado: true, rol: 'cliente' };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (usuarioAEditar) {
      setFormData({
        nombre: usuarioAEditar.nombre || '',
        correo: usuarioAEditar.correo || '', clave: usuarioAEditar.clave || '', estado: Boolean(usuarioAEditar.estado), rol: usuarioAEditar.rol || 'cliente'
      });
    } else {
      setFormData(initialFormState);
    }
  }, [usuarioAEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.correo.trim() || !formData.clave.trim()) {
      alert('Por favor completa el nombre, correo y clave.');
      return;
    }
    onGuardar({ nombre: formData.nombre.trim(), correo: formData.correo.trim(), clave: formData.clave, estado: Boolean(formData.estado), rol: formData.rol });
  };

  const esEdicion = Boolean(usuarioAEditar);

  return (
    <div className="card-form-container">
      <div className="form-header">
        <h3 className="form-title">{esEdicion ? '✏️ Editar Usuario' : '➕ Registrar Nuevo Usuario'}</h3>
        <p className="form-subtitle">Gestiona las cuentas de acceso al sistema.</p>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="nombre" className="form-label">Nombre Completo *</label>
            <input type="text" id="nombre" name="nombre" className="form-input" placeholder="Ej. Juan Pérez" value={formData.nombre} onChange={handleChange} required />
          </div>
          <div className="form-group"><label htmlFor="correo" className="form-label">Correo *</label><input type="email" id="correo" name="correo" className="form-input" value={formData.correo} onChange={handleChange} required /></div>

          <div className="form-group">
            <label htmlFor="clave" className="form-label">Clave *</label>
            <input type="password" id="clave" name="clave" className="form-input" value={formData.clave} onChange={handleChange} required />
          </div>
          <div className="form-group"><label htmlFor="rol" className="form-label">Rol *</label><select id="rol" name="rol" className="form-input" value={formData.rol} onChange={handleChange}><option value="cliente">Cliente</option><option value="admin">Administrador</option></select></div>
          <label className="form-group"><span className="form-label">Activo</span><input type="checkbox" name="estado" checked={formData.estado} onChange={(e) => setFormData((prev) => ({ ...prev, estado: e.target.checked }))} /></label>

        </div>

        <div className="form-actions">
          <button type="submit" className="btn-save" disabled={guardando}>
            {guardando ? 'Guardando...' : esEdicion ? 'Actualizar Usuario' : 'Guardar Usuario'}
          </button>
          {esEdicion && (
            <button type="button" className="btn-cancel" onClick={onCancelar} disabled={guardando}>Cancelar Edición</button>
          )}
        </div>
      </form>
    </div>
  );
}
