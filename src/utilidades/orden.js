import { ESTADO_ORDEN_PENDIENTE, METODO_PAGO_POR_DEFECTO } from '../constantes/dominio';
import { calcularTotal, subtotalLinea } from './carrito';
import { recortarTextos } from './formato';

/**
 * Número de orden legible: `GC-20260921-4821`.
 * MockAPI asigna además su propio `id`; este número es el que ve el cliente.
 */
export const generarNumeroOrden = (fecha = new Date()) => {
  const dia = [
    fecha.getFullYear(),
    String(fecha.getMonth() + 1).padStart(2, '0'),
    String(fecha.getDate()).padStart(2, '0')
  ].join('');
  const aleatorio = String(Math.floor(Math.random() * 10000)).padStart(4, '0');

  return `GC-${dia}-${aleatorio}`;
};

/**
 * Arma la orden que se envía a MockAPI.
 *
 * Los campos `cliente`, `fecha`, `metodo_pago`, `total`, `descuento`,
 * `detalle` y `estado_orden` son los que ya espera el panel de administración
 * (ver `componentes/admin/orden/`), así que la orden creada aquí se lista
 * correctamente allí. `numero` y `datos_cliente` se añaden para el carrito.
 */
export const construirOrden = (lineas, datosCliente, fecha = new Date()) => {
  const cliente = recortarTextos(datosCliente);

  return {
    numero: generarNumeroOrden(fecha),
    fecha: fecha.toISOString(),
    // El panel de administración muestra `cliente` como texto en su tabla.
    cliente: cliente.nombre,
    datos_cliente: cliente,
    detalle: lineas.map((linea) => ({
      id: linea.id,
      nombre: linea.nombre,
      precio: linea.precio,
      cantidad: linea.cantidad,
      subtotal: subtotalLinea(linea)
    })),
    total: calcularTotal(lineas),
    descuento: 0,
    metodo_pago: METODO_PAGO_POR_DEFECTO,
    estado_orden: ESTADO_ORDEN_PENDIENTE
  };
};
