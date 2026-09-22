export function EncabezadoFormulario({ titulo, subtitulo }) {
  return (
    <div className="form-header">
      <h3 className="form-title">{titulo}</h3>
      <p className="form-subtitle">{subtitulo}</p>
    </div>
  );
}
