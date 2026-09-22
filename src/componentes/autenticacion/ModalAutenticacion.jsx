import { useState } from 'react';
import { MODO_AUTENTICACION } from '../../constantes/dominio';

const VALORES_INICIALES = { nombre: '', correo: '', clave: '' };

export function ModalAutenticacion({ modo, onCerrar, onIniciarSesion, onRegistrarse, procesando }) {
  const [valores, setValores] = useState(VALORES_INICIALES);
  const esRegistro = modo === MODO_AUTENTICACION.REGISTRO;

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setValores((actuales) => ({ ...actuales, [name]: value }));
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    const faltaNombre = esRegistro && !valores.nombre.trim();
    if (!valores.correo.trim() || !valores.clave.trim() || faltaNombre) return;

    if (esRegistro) onRegistrarse(valores);
    else onIniciarSesion(valores);
  };

  return (
    <div className="auth-modal-backdrop" role="presentation" onMouseDown={onCerrar}>
      <section
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onMouseDown={(evento) => evento.stopPropagation()}
      >
        <button type="button" className="auth-modal-close" onClick={onCerrar} aria-label="Cerrar">×</button>

        <h2 id="auth-modal-title">{esRegistro ? 'Registrarse' : 'Iniciar sesión'}</h2>
        <p>
          {esRegistro
            ? 'Crea una cuenta para continuar como usuario normal.'
            : 'Ingresa tus datos para acceder a tu cuenta.'}
        </p>

        <form className="auth-form" onSubmit={manejarEnvio}>
          {esRegistro && (
            <label className="form-group">
              <span className="form-label">Nombre</span>
              <input className="form-input" type="text" name="nombre" value={valores.nombre} onChange={manejarCambio} required />
            </label>
          )}
          <label className="form-group">
            <span className="form-label">Correo</span>
            <input className="form-input" type="email" name="correo" value={valores.correo} onChange={manejarCambio} required />
          </label>
          <label className="form-group">
            <span className="form-label">Clave</span>
            <input className="form-input" type="password" name="clave" value={valores.clave} onChange={manejarCambio} required />
          </label>

          <button type="submit" className="btn-save" disabled={procesando}>
            {procesando ? 'Procesando...' : esRegistro ? 'Crear cuenta' : 'Iniciar sesión'}
          </button>
        </form>
      </section>
    </div>
  );
}
