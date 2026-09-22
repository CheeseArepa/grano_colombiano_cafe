import { MODO_AUTENTICACION } from '../../constantes/dominio';

/** Bloque de sesión del encabezado: saludo y cierre, o acceso y registro. */
export function AccionesSesion({ sesion, onAbrirAutenticacion, onCerrarSesion }) {
  if (sesion) {
    return (
      <div className="auth-actions">
        <span className="session-name">Hola, {sesion.nombre}</span>
        <button type="button" className="auth-button" onClick={onCerrarSesion}>Cerrar sesion</button>
      </div>
    );
  }

  return (
    <div className="auth-actions">
      <button
        type="button"
        className="auth-button"
        onClick={() => onAbrirAutenticacion(MODO_AUTENTICACION.INICIAR_SESION)}
      >
        Iniciar sesion
      </button>
      <button
        type="button"
        className="auth-button auth-button-primary"
        onClick={() => onAbrirAutenticacion(MODO_AUTENTICACION.REGISTRO)}
      >
        Registrarse
      </button>
    </div>
  );
}
