// Valores del dominio que viajan a la API o se persisten. Cambiarlos rompe la
// compatibilidad con los datos existentes, por eso viven centralizados.

export const ROLES = {
  ADMIN: 'admin',
  CLIENTE: 'cliente'
};

// Rol asignado a toda cuenta creada desde el registro público.
export const ROL_BASICO = ROLES.CLIENTE;

// Filtro propio de la interfaz (muestra todos los productos); no existe como
// registro en la base de datos.
export const CATEGORIA_INICIO = 'Inicio';

export const CLAVE_SESION = 'grano-colombiano-sesion';
export const CLAVE_CARRITO = 'grano-colombiano-carrito';

// Estado con el que nace toda orden creada desde el carrito.
export const ESTADO_ORDEN_PENDIENTE = 'pendiente';

// La colección `estado_orden` de MockAPI está vacía, así que la orden guarda
// el estado como texto. Si más adelante se cargan estados reales, aquí es
// donde habría que pasar a guardar su `id`.
export const METODO_PAGO_POR_DEFECTO = 'Contra entrega';

export const MODO_AUTENTICACION = {
  INICIAR_SESION: 'login',
  REGISTRO: 'registro'
};
