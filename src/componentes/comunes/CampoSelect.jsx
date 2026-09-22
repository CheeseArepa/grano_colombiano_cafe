export function CampoSelect({ nombre, etiqueta, requerido = false, children, ...props }) {
  return (
    <div className="form-group">
      <label htmlFor={nombre} className="form-label">
        {etiqueta}{requerido && ' *'}
      </label>
      <select
        id={nombre}
        name={nombre}
        className="form-input"
        required={requerido}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
