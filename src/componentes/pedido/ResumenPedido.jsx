import { formatearPesos } from '../../utilidades/formato';

/** Resumen del carrito: unidades, total y acción de vaciar. */
export function ResumenPedido({ unidades, total, onVaciar }) {
  return (
    <div className="carrito-resumen">
      <div className="carrito-resumen-filas">
        <div className="carrito-resumen-fila">
          <span>Productos</span>
          <span>{unidades} unidad(es)</span>
        </div>
        <div className="carrito-resumen-fila carrito-resumen-total">
          <span>Total</span>
          <span>{formatearPesos(total)}</span>
        </div>
      </div>

      <button type="button" className="btn-cancel" onClick={onVaciar}>
        Vaciar carrito
      </button>
    </div>
  );
}
