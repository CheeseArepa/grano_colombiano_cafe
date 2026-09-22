/**
 * Casilla de verificación. `useFormulario.manejarCambio` ya distingue los
 * `checkbox` y toma `checked` en lugar de `value`, así que no necesita un
 * `onChange` propio como ocurría antes en cada formulario.
 */
export function CampoCasilla({ nombre, etiqueta, ...props }) {
  return (
    <label className="form-group">
      <span className="form-label">{etiqueta}</span>
      <input type="checkbox" name={nombre} {...props} />
    </label>
  );
}
