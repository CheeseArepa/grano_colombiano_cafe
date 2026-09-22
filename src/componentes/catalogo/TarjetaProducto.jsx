import { IconoGranoCafe } from '../iconos/IconoGranoCafe';

export function TarjetaProducto({ producto, onAgregar }) {
  const { nombre, descripcion, precio, imagen } = producto;

  return (
    <article className="product-card">
      <div className="product-image-container">
        {imagen ? (
          <img src={imagen} alt={nombre} className="product-image" loading="lazy" />
        ) : (
          <div className="product-image-placeholder">
            <IconoGranoCafe tamano={40} relleno="#A9552E" trazo="#F5E9D3" />
          </div>
        )}
      </div>

      <div className="product-content">
        <h3 className="product-title">{nombre}</h3>
        <p className="product-description">{descripcion}</p>

        <div className="product-footer">
          <div className="price-wrapper">
            <span className="price-label">Precio</span>
            <span className="product-price">{` ${precio}`}</span>
          </div>
          <button type="button" className="btn-add-order" onClick={() => onAgregar?.(producto)}>
            <span className="btn-plus">+</span> Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
