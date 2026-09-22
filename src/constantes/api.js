// Punto único de configuración de la API. Si cambia el proyecto de MockAPI,
// solo se toca esta constante.
export const URL_BASE_API = 'https://6aa6bb8dd7765db985078fad.mockapi.io';

// Nombre del recurso (segmento de la URL) tal como lo expone MockAPI.
//
// IMPORTANTE: todos los recursos están en español excepto `informacion`, que en
// MockAPI se publica como "information". No es posible renombrarlo desde el
// código porque el endpoint no es editable; por eso la clave se mantiene en
// español y solo el valor conserva el nombre real del endpoint.
export const RECURSOS_API = {
  producto: 'producto',
  categoria: 'categoria',
  cliente: 'cliente',
  orden: 'orden',
  estadoOrden: 'estado_orden',
  usuario: 'usuario',
  informacion: 'information'
};
