import { Link } from 'react-router';
import { RUTAS } from '../../constantes/rutas';
import { formatearFecha, formatearPesos } from '../../utilidades/formato';

/** Pantalla de confirmación con el número de orden y el resumen de lo pedido. */
export function ConfirmacionPedido({ orden }) {
  return (
    <div className="pedido-confirmado">
      <span className="pedido-confirmado-icono" aria-hidden="true">✅</span>
      <h3>¡Pedido confirmado!</h3>
      <p className="pedido-confirmado-numero">
        Número de orden: <strong>{orden.numero}</strong>
      </p>
      <p className="pedido-confirmado-fecha">{formatearFecha(orden.fecha)}</p>

      <div className="pedido-confirmado-bloque">
        <h4>Resumen</h4>
        <ul className="pedido-confirmado-lista">
          {orden.detalle.map((linea) => (
            <li key={linea.id}>
              <span>{linea.cantidad} × {linea.nombre}</span>
              <span>{formatearPesos(linea.subtotal)}</span>
            </li>
          ))}
        </ul>
        <p className="pedido-confirmado-total">
          <span>Total</span>
          <span>{formatearPesos(orden.total)}</span>
        </p>
      </div>

      <div className="pedido-confirmado-bloque">
        <h4>Entrega</h4>
        <p>{orden.datos_cliente.nombre} · {orden.datos_cliente.telefono}</p>
        <p>{orden.datos_cliente.direccion}</p>
        <p>{orden.datos_cliente.correo}</p>
        {orden.datos_cliente.notas && <p className="pedido-confirmado-notas">“{orden.datos_cliente.notas}”</p>}
      </div>

      <p className="pedido-confirmado-estado">
        Estado: <span className="badge-tag">{orden.estado_orden}</span>
      </p>

      <Link className="btn-save" to={RUTAS.CATALOGO}>Seguir comprando</Link>
    </div>
  );
}
