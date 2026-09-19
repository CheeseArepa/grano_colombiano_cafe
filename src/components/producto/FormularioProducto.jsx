import { useState, useEffect } from 'react';

export function FormularioProducto({ productoAEditar, categorias = [], onGuardar, onCancelar, guardando }) {
  const initialFormState = {
    nombre: '',
    descripcion: '',
    stock: '', precio: '', categoria: categorias[0]?.nombre || '',
    imagen: '',
    estado: true
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (productoAEditar) {
      setFormData({
        nombre: productoAEditar.nombre || '',
        descripcion: productoAEditar.descripcion || '',
        stock: productoAEditar.stock ?? '', precio: productoAEditar.precio ?? '', categoria: productoAEditar.categoria || categorias[0]?.nombre || '',
        imagen: productoAEditar.imagen || '',
        estado: Boolean(productoAEditar.estado)
      });
    } else {
      setFormData(initialFormState);
    }
  }, [productoAEditar, categorias]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim() || formData.stock === '' || formData.precio === '' || !formData.categoria) {
      alert('Por favor completa nombre, stock, precio y categoría.');
      return;
    }
    onGuardar(formData);
  };

  const esEdicion = Boolean(productoAEditar);

  return (
    <div className="card-form-container">
      <div className="form-header">
        <h3 className="form-title">
          {esEdicion ? '✏️ Editar Producto' : '➕ Registrar Nuevo Producto'}
        </h3>
        <p className="form-subtitle">
          {esEdicion ? 'Modifica los datos del producto seleccionado' : 'Ingresa los datos para agregar un producto al catálogo'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">
          {/* Nombre */}
          <div className="form-group">
            <label htmlFor="nombre" className="form-label">Nombre del Producto *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="form-input"
              placeholder="Ej. Hamburguesa Doble Queso"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          {/* Precio */}
          <div className="form-group">
            <label htmlFor="precio" className="form-label">Precio ($) *</label>
            <input
              type="number"
              id="precio"
              name="precio"
              className="form-input"
              min="0" step="0.01"
              value={formData.precio}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group"><label htmlFor="stock" className="form-label">Stock *</label><input type="number" id="stock" name="stock" min="0" step="1" className="form-input" value={formData.stock} onChange={handleChange} required /></div>

          {/* Categoría */}
          <div className="form-group">
            <label htmlFor="categoria" className="form-label">Categoría</label>
            <select
              id="categoria"
              name="categoria"
              className="form-input"
              value={formData.categoria}
              onChange={handleChange}
            >
              {categorias.length > 0 ? (
                categorias.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)
              ) : (
                <option value="">No hay categorías disponibles</option>
              )}
            </select>
          </div>

          <label className="form-group"><span className="form-label">Activo</span><input type="checkbox" name="estado" checked={formData.estado} onChange={(e) => setFormData((prev) => ({ ...prev, estado: e.target.checked }))} /></label>
        </div>

        {/* Imagen URL */}
        <div className="form-group">
          <label htmlFor="imagen" className="form-label">URL de la Imagen</label>
          <input
            type="url"
            id="imagen"
            name="imagen"
            className="form-input"
            placeholder="https://ejemplo.com/imagen.jpg"
            value={formData.imagen}
            onChange={handleChange}
          />
        </div>

        {/* Descripción */}
        <div className="form-group">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            className="form-input form-textarea"
            placeholder="Detalles sobre los ingredientes o características del producto..."
            rows="3"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </div>

        {/* Botones de Acción */}
        <div className="form-actions">
          <button type="submit" className="btn-save" disabled={guardando}>
            {guardando ? 'Guardando...' : esEdicion ? 'Actualizar Producto' : 'Guardar Producto'}
          </button>
          
          {esEdicion && (
            <button type="button" className="btn-cancel" onClick={onCancelar} disabled={guardando}>
              Cancelar Edición
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
