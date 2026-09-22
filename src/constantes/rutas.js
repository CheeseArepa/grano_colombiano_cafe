export const RUTAS = {
  CATALOGO: '/catalogo',
  MI_PEDIDO: '/mi-pedido',
  NO_AUTORIZADO: '/no-autorizado',
  ADMIN: '/admin'
};

/**
 * Identificador de cada sección del panel. Es a la vez el segmento de la ruta
 * (`/admin/<id>`) y la clave de la entrada del menú, de modo que el enrutador
 * y la navegación no puedan desincronizarse.
 */
export const SECCION_ADMIN = {
  PRODUCTOS: 'productos',
  CATEGORIAS: 'categorias',
  USUARIOS: 'usuarios',
  CLIENTES: 'clientes',
  ORDENES: 'ordenes',
  ESTADOS: 'estados',
  INFORMACION: 'informacion'
};

/** Entradas del menú de administración, en el orden en que se muestran. */
export const SECCIONES_ADMIN = [
  { id: SECCION_ADMIN.PRODUCTOS, icono: '🫘', etiqueta: 'Productos' },
  { id: SECCION_ADMIN.CATEGORIAS, icono: '🗂️', etiqueta: 'Categorias' },
  { id: SECCION_ADMIN.USUARIOS, icono: '👤', etiqueta: 'Usuarios' },
  { id: SECCION_ADMIN.CLIENTES, icono: '🧑‍🤝‍🧑', etiqueta: 'Clientes' },
  { id: SECCION_ADMIN.ORDENES, icono: '🧾', etiqueta: 'Ordenes' },
  { id: SECCION_ADMIN.ESTADOS, icono: '🏷️', etiqueta: 'Estados de Orden' },
  { id: SECCION_ADMIN.INFORMACION, icono: 'ℹ️', etiqueta: 'Informacion' }
];

export const rutaAdmin = (idSeccion) => `${RUTAS.ADMIN}/${idSeccion}`;
