import { useEffect, useState } from 'react';

const formularioInicial = { nombre: '', correo: '', clave: '' };

export function AuthModal({ modo, onCerrar, onIniciarSesion, onRegistrarse, procesando }) {
  const [datosFormulario, setDatosFormulario] = useState(formularioInicial);
  const esRegistro = modo === 'registro';

  useEffect(() => {
    setDatosFormulario(formularioInicial);
  }, [modo]);

  const manejarCambio = (event) => {
    const { name, value } = event.target;
    setDatosFormulario((datosActuales) => ({ ...datosActuales, [name]: value }));
  };

  const manejarEnvio = (event) => {
    event.preventDefault();
    if (!datosFormulario.correo.trim() || !datosFormulario.clave.trim() || (esRegistro && !datosFormulario.nombre.trim())) return;

    if (esRegistro) onRegistrarse(datosFormulario);
    else onIniciarSesion(datosFormulario);
  };

  return (
    <div className="auth-modal-backdrop" role="presentation" onMouseDown={onCerrar}>
      <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <button type="button" className="auth-modal-close" onClick={onCerrar} aria-label="Cerrar">×</button>
        <h2 id="auth-modal-title">{esRegistro ? 'Registrarse' : 'Iniciar sesión'}</h2>
        <p>{esRegistro ? 'Crea una cuenta para continuar como usuario normal.' : 'Ingresa tus datos para acceder a tu cuenta.'}</p>
        <form className="auth-form" onSubmit={manejarEnvio}>
          {esRegistro && <label className="form-group"><span className="form-label">Nombre</span><input className="form-input" type="text" name="nombre" value={datosFormulario.nombre} onChange={manejarCambio} required /></label>}
          <label className="form-group"><span className="form-label">Correo</span><input className="form-input" type="email" name="correo" value={datosFormulario.correo} onChange={manejarCambio} required /></label>
          <label className="form-group"><span className="form-label">Clave</span><input className="form-input" type="password" name="clave" value={datosFormulario.clave} onChange={manejarCambio} required /></label>
          <button type="submit" className="btn-save" disabled={procesando}>{procesando ? 'Procesando...' : esRegistro ? 'Crear cuenta' : 'Iniciar sesión'}</button>
        </form>
      </section>
    </div>
  );
}
