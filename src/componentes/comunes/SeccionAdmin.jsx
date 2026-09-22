/** Encabezado y contenedor estándar de cada pantalla del panel de administración. */
export function SeccionAdmin({ titulo, descripcion, children }) {
  return (
    <section className="admin-section">
      <div className="gestion-header">
        <h2>{titulo}</h2>
        <p>{descripcion}</p>
      </div>
      {children}
    </section>
  );
}
