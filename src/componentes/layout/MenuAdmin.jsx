import { useCallback, useState } from 'react';
import { NavLink } from 'react-router';
import { SECCIONES_ADMIN, rutaAdmin } from '../../constantes/rutas';
import { useCerrarAlClicFuera } from '../../hooks/useCerrarAlClicFuera';

/** Desplegable con los accesos a las secciones del panel de administración. */
export function MenuAdmin({ enModoAdmin }) {
  const [abierto, setAbierto] = useState(false);
  const cerrar = useCallback(() => setAbierto(false), []);
  const referencia = useCerrarAlClicFuera(cerrar);

  return (
    <div className="admin-dropdown" ref={referencia}>
      <button
        type="button"
        className={`view-btn ${enModoAdmin ? 'active' : ''}`}
        onClick={() => setAbierto((estaAbierto) => !estaAbierto)}
        aria-expanded={abierto}
      >
        ⚙️ Administracion <span className="dropdown-caret">{abierto ? '▲' : '▼'}</span>
      </button>

      {abierto && (
        <div className="admin-dropdown-panel">
          {SECCIONES_ADMIN.map((seccion) => (
            <NavLink
              key={seccion.id}
              className={({ isActive }) => `admin-dropdown-item ${isActive ? 'active' : ''}`}
              to={rutaAdmin(seccion.id)}
              onClick={cerrar}
            >
              <span className="admin-dropdown-icon">{seccion.icono}</span> {seccion.etiqueta}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
