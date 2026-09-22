export function CampoAreaTexto({ nombre, etiqueta, requerido = false, ancho, ...props }) {
  return (
    <div className={`form-group${ancho === 'completo' ? ' form-group-full' : ''}`}>
      <label htmlFor={nombre} className="form-label">
        {etiqueta}{requerido && ' *'}
      </label>
      <textarea
        id={nombre}
        name={nombre}
        className="form-input form-textarea"
        required={requerido}
        {...props}
      />
    </div>
  );
}
