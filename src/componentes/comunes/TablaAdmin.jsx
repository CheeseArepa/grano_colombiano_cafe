const normalizarColumna = (columna) => (
  typeof columna === 'string' ? { etiqueta: columna } : columna
);

/**
 * Tabla de administración: cabecera con título y conteo, y el `<tbody>` que
 * reciba por `children`.
 *
 * @param {Array<string|{etiqueta: string, clase?: string}>} columnas
 */
export function TablaAdmin({ titulo, resumen, columnas, children }) {
  return (
    <div className="admin-table-container">
      <div className="table-header-info">
        <h3 className="table-title">{titulo}</h3>
        <span className="table-count">{resumen}</span>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              {columnas.map(normalizarColumna).map(({ etiqueta, clase }) => (
                <th key={etiqueta} className={clase}>{etiqueta}</th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}
