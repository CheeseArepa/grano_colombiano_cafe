/**
 * Error de regla de negocio: su mensaje está redactado para el usuario final,
 * así que la capa de UI puede mostrarlo tal cual en vez de un texto genérico.
 */
export class ErrorDeNegocio extends Error {
  esMensajeVisible = true;
}

/** Devuelve el mensaje del error si es apto para el usuario, o el de respaldo. */
export const mensajeParaUsuario = (error, mensajeRespaldo) => (
  error?.esMensajeVisible ? error.message : mensajeRespaldo
);
