/**
 * Lógica pura del carrito: sin React y sin acceso a la red, para poder
 * razonarla y probarla de forma aislada.
 *
 * Una línea del carrito guarda solo lo que la vista del pedido necesita
 * (`id`, `nombre`, `precio`, `imagen`, `cantidad`). No se almacena el producto
 * completo porque el carrito se persiste y quedaría desactualizado.
 */

export const CANTIDAD_MINIMA = 1;

const mismoProducto = (linea, id) => String(linea.id) === String(id);

/** Convierte un producto del catálogo en una línea del carrito. */
export const crearLinea = (producto, cantidad = CANTIDAD_MINIMA) => ({
  id: producto.id,
  nombre: producto.nombre,
  precio: Number(producto.precio) || 0,
  imagen: producto.imagen || '',
  cantidad: Math.max(CANTIDAD_MINIMA, Math.trunc(cantidad) || CANTIDAD_MINIMA)
});

/**
 * Descarta cualquier entrada que no sea una línea de carrito utilizable.
 * Se aplica al leer de `localStorage`, donde el contenido puede estar dañado,
 * ser de una versión anterior o haber sido editado a mano.
 */
export const normalizarLineas = (valor) => {
  if (!Array.isArray(valor)) return [];

  return valor
    .filter((linea) => (
      linea
      && typeof linea === 'object'
      && linea.id !== undefined
      && linea.id !== null
      && Number.isFinite(Number(linea.precio))
      && Number(linea.cantidad) >= CANTIDAD_MINIMA
    ))
    .map((linea) => ({
      id: linea.id,
      nombre: String(linea.nombre ?? ''),
      precio: Number(linea.precio),
      imagen: typeof linea.imagen === 'string' ? linea.imagen : '',
      cantidad: Math.trunc(Number(linea.cantidad))
    }));
};

/** Agrega un producto; si ya está en el carrito suma la cantidad en vez de duplicar la línea. */
export const agregarLinea = (lineas, producto, cantidad = CANTIDAD_MINIMA) => {
  const yaEsta = lineas.some((linea) => mismoProducto(linea, producto.id));

  if (!yaEsta) return [...lineas, crearLinea(producto, cantidad)];

  return lineas.map((linea) => (
    mismoProducto(linea, producto.id)
      ? { ...linea, cantidad: linea.cantidad + Math.max(CANTIDAD_MINIMA, Math.trunc(cantidad) || CANTIDAD_MINIMA) }
      : linea
  ));
};

/** Suma `paso` a la cantidad de una línea, sin bajar nunca de `CANTIDAD_MINIMA`. */
export const cambiarCantidad = (lineas, id, paso) => lineas.map((linea) => (
  mismoProducto(linea, id)
    ? { ...linea, cantidad: Math.max(CANTIDAD_MINIMA, linea.cantidad + paso) }
    : linea
));

export const quitarLinea = (lineas, id) => lineas.filter((linea) => !mismoProducto(linea, id));

export const subtotalLinea = (linea) => linea.precio * linea.cantidad;

/** Unidades totales en el carrito: es lo que muestra el contador de la barra. */
export const contarUnidades = (lineas) => lineas.reduce((suma, linea) => suma + linea.cantidad, 0);

export const calcularTotal = (lineas) => lineas.reduce((suma, linea) => suma + subtotalLinea(linea), 0);
