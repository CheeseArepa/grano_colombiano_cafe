import { useState } from 'react';
import { hayErrores, validarDatosCliente } from '../../utilidades/validaciones';

/**
 * Datos de entrega del pedido. Se valida al enviar y, a partir de ahí, en cada
 * cambio, para que el error de un campo desaparezca en cuanto se corrige.
 */
export function FormularioDatosCliente({ valoresIniciales, enviando, onConfirmar }) {
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});
  const [intentoEnvio, setIntentoEnvio] = useState(false);

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    const siguientes = { ...valores, [name]: value };

    setValores(siguientes);
    if (intentoEnvio) setErrores(validarDatosCliente(siguientes));
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    setIntentoEnvio(true);

    const encontrados = validarDatosCliente(valores);
    setErrores(encontrados);

    if (!hayErrores(encontrados)) onConfirmar(valores);
  };

  // `noValidate` desactiva los mensajes del navegador para usar los propios,
  // que son los que el diseño muestra junto a cada campo.
  return (
    <form className="carrito-formulario" onSubmit={manejarEnvio} noValidate>
      <div className="form-header">
        <h3 className="form-title">Datos de entrega</h3>
        <p className="form-subtitle">Necesitamos estos datos para llevarte el pedido.</p>
      </div>

      <div className="form-grid">
        <CampoConError nombre="nombre" etiqueta="Nombre completo" requerido error={errores.nombre}>
          <input
            type="text" id="nombre" name="nombre" className="form-input"
            placeholder="Ej. María Gómez" value={valores.nombre} onChange={manejarCambio}
            aria-invalid={Boolean(errores.nombre)}
          />
        </CampoConError>

        <CampoConError nombre="telefono" etiqueta="Teléfono" requerido error={errores.telefono}>
          <input
            type="tel" id="telefono" name="telefono" className="form-input"
            placeholder="Ej. 300 000 0000" value={valores.telefono} onChange={manejarCambio}
            aria-invalid={Boolean(errores.telefono)}
          />
        </CampoConError>

        <CampoConError nombre="correo" etiqueta="Correo electrónico" requerido error={errores.correo}>
          <input
            type="email" id="correo" name="correo" className="form-input"
            placeholder="correo@ejemplo.com" value={valores.correo} onChange={manejarCambio}
            aria-invalid={Boolean(errores.correo)}
          />
        </CampoConError>

        <CampoConError nombre="direccion" etiqueta="Dirección de entrega" requerido error={errores.direccion}>
          <input
            type="text" id="direccion" name="direccion" className="form-input"
            placeholder="Ej. Calle 10 # 5-20, Bogotá" value={valores.direccion} onChange={manejarCambio}
            aria-invalid={Boolean(errores.direccion)}
          />
        </CampoConError>
      </div>

      <CampoConError nombre="notas" etiqueta="Notas para la entrega (opcional)" error={errores.notas}>
        <textarea
          id="notas" name="notas" className="form-input form-textarea" rows="3"
          placeholder="Ej. Dejar en portería, torre 2."
          value={valores.notas} onChange={manejarCambio}
        />
      </CampoConError>

      <div className="form-actions">
        <button type="submit" className="btn-save" disabled={enviando}>
          {enviando ? 'Confirmando...' : 'Confirmar pedido'}
        </button>
      </div>
    </form>
  );
}

/** Envoltura de campo que muestra el mensaje de error debajo del control. */
function CampoConError({ nombre, etiqueta, requerido = false, error, children }) {
  return (
    <div className={`form-group${error ? ' form-group-con-error' : ''}`}>
      <label htmlFor={nombre} className="form-label">
        {etiqueta}{requerido && ' *'}
      </label>
      {children}
      {error && <p className="form-error" role="alert">{error}</p>}
    </div>
  );
}
