/**
 * Campo de texto estándar. `nombre` se usa a la vez como `id` y como `name`,
 * que es lo que espera el `manejarCambio` genérico de `useFormulario`.
 */
export function CampoTexto({ nombre, etiqueta, requerido = false, ancho, ...props }) {
  return (
    <div className={`form-group${ancho === 'completo' ? ' form-group-full' : ''}`}>
      <label htmlFor={nombre} className="form-label">
        {etiqueta}{requerido && ' *'}
      </label>
      <input
        type="text"
        id={nombre}
        name={nombre}
        className="form-input"
        required={requerido}
        {...props}
      />
    </div>
  );
}
