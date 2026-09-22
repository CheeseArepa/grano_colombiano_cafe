import { CANTIDAD_MINIMA, subtotalLinea } from '../../utilidades/carrito';
import { formatearPesos } from '../../utilidades/formato';
import { IconoGranoCafe } from '../iconos/IconoGranoCafe';

/** Una línea del carrito: imagen, nombre, precio unitario, controles y subtotal. */
export function LineaCarrito({ linea, onAumentar, onDisminuir, onEliminar }) {
  const enMinimo = linea.cantidad <= CANTIDAD_MINIMA;

  return (
    <article className="carrito-linea">
      <div className="carrito-linea-imagen">
        {linea.imagen
          ? <img src={linea.imagen} alt={linea.nombre} loading="lazy" />
          : <div className="carrito-linea-sin-imagen"><IconoGranoCafe tamano={28} relleno="#A9552E" trazo="#F5E9D3" /></div>}
      </div>

      <div className="carrito-linea-datos">
        <h3 className="carrito-linea-nombre">{linea.nombre}</h3>
        <p className="carrito-linea-precio">{formatearPesos(linea.precio)} c/u</p>
      </div>

      <div className="carrito-cantidad" role="group" aria-label={`Cantidad de ${linea.nombre}`}>
        <button
          type="button"
          className="carrito-cantidad-btn"
          onClick={() => onDisminuir(linea.id)}
          disabled={enMinimo}
          aria-label={`Disminuir cantidad de ${linea.nombre}`}
        >
          −
        </button>
        <span className="carrito-cantidad-valor" aria-live="polite">{linea.cantidad}</span>
        <button
          type="button"
          className="carrito-cantidad-btn"
          onClick={() => onAumentar(linea.id)}
          aria-label={`Aumentar cantidad de ${linea.nombre}`}
        >
          +
        </button>
      </div>

      <p className="carrito-linea-subtotal">{formatearPesos(subtotalLinea(linea))}</p>

      <button
        type="button"
        className="btn-action-delete"
        onClick={() => onEliminar(linea.id)}
        aria-label={`Eliminar ${linea.nombre} del pedido`}
      >
        🗑️
      </button>
    </article>
  );
}
