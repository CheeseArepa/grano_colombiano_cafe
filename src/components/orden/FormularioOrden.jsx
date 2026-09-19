import { useState, useEffect } from 'react';

export function FormularioOrden({ ordenAEditar, clientes = [], estados = [], onGuardar, onCancelar, guardando }) {
  const clientesSeguros = Array.isArray(clientes) ? clientes : [];
  const estadosSeguros = Array.isArray(estados) ? estados : [];
  const initialFormState = { cliente: '', fecha: '', metodo_pago: '', total: '', descuento: '', detalle: '[]', estado_orden: '' };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (ordenAEditar) {
      setFormData({
        cliente: ordenAEditar.cliente || '', fecha: ordenAEditar.fecha?.slice(0, 10) || '', metodo_pago: ordenAEditar.metodo_pago || '',
        total: ordenAEditar.total ?? '', descuento: ordenAEditar.descuento ?? '', detalle: JSON.stringify(ordenAEditar.detalle || []), estado_orden: ordenAEditar.estado_orden || ''
      });
    } else {
      setFormData(initialFormState);
    }
  }, [ordenAEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.cliente || !formData.estado_orden || !formData.fecha || !formData.metodo_pago || formData.total === '' || formData.descuento === '') {
      alert('Por favor selecciona el cliente y el estado de la orden.');
      return;
    }
    try {
      const detalle = JSON.parse(formData.detalle);
      if (!Array.isArray(detalle)) throw new Error('detalle no es un arreglo');
      onGuardar({ ...formData, total: Number(formData.total), descuento: Number(formData.descuento), detalle });
    } catch { alert('El detalle debe ser un arreglo JSON válido.'); }
  };

  const esEdicion = Boolean(ordenAEditar);

  return (
    <div className="card-form-container">
      <div className="form-header">
        <h3 className="form-title">{esEdicion ? '✏️ Editar Orden' : '➕ Registrar Nueva Orden'}</h3>
        <p className="form-subtitle">Registra o actualiza una orden de pedido.</p>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="cliente" className="form-label">Cliente *</label>
            <select id="cliente" name="cliente" className="form-input" value={formData.cliente} onChange={handleChange} required>
              <option value="">Selecciona un cliente</option>
              {clientesSeguros.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre} {c.apellido}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="estado_orden" className="form-label">Estado *</label>
            <select id="estado_orden" name="estado_orden" className="form-input" value={formData.estado_orden} onChange={handleChange} required>
              <option value="">Selecciona un estado</option>
              {estadosSeguros.map((e) => (
                <option key={e.id} value={e.id}>{e.nombre}</option>
              ))}
            </select>
          </div>
          <div className="form-group"><label htmlFor="metodo_pago" className="form-label">Método de pago *</label><input type="text" id="metodo_pago" name="metodo_pago" className="form-input" value={formData.metodo_pago} onChange={handleChange} required /></div>

          <div className="form-group">
            <label htmlFor="fecha" className="form-label">Fecha</label>
            <input type="date" id="fecha" name="fecha" className="form-input" value={formData.fecha} onChange={handleChange} />
          </div>
          <div className="form-group"><label htmlFor="descuento" className="form-label">Descuento ($) *</label><input type="number" id="descuento" name="descuento" min="0" step="0.01" className="form-input" value={formData.descuento} onChange={handleChange} required /></div>

          <div className="form-group">
            <label htmlFor="total" className="form-label">Total ($)</label>
            <input type="number" id="total" name="total" step="0.01" min="0" className="form-input" placeholder="0.00" value={formData.total} onChange={handleChange} />
          </div>

          <div className="form-group form-group-full">
            <label htmlFor="detalle" className="form-label">Detalle (arreglo JSON) *</label>
            <textarea id="detalle" name="detalle" className="form-input form-textarea" value={formData.detalle} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-save" disabled={guardando}>
            {guardando ? 'Guardando...' : esEdicion ? 'Actualizar Orden' : 'Guardar Orden'}
          </button>
          {esEdicion && (
            <button type="button" className="btn-cancel" onClick={onCancelar} disabled={guardando}>Cancelar Edición</button>
          )}
        </div>
      </form>
    </div>
  );
}
