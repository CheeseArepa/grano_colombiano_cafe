import { Link, NavLink, useLocation } from 'react-router';
import { RUTAS, SECCIONES_ADMIN, rutaAdmin } from '../../constantes/rutas';
import { MenuCategorias } from '../catalogo/MenuCategorias';
import { IconoGranoCafe } from '../iconos/IconoGranoCafe';
import { AccionesSesion } from './AccionesSesion';
import { MenuAdmin } from './MenuAdmin';

export function Encabezado({
  categorias,
  categoriaActiva,
  onSeleccionarCategoria,
  conteoPedido,
  esAdministrador,
  sesion,
  onAbrirAutenticacion,
  onCerrarSesion
}) {
  const { pathname } = useLocation();
  const enModoAdmin = pathname.startsWith(RUTAS.ADMIN);
  const seccionActiva = SECCIONES_ADMIN.find((seccion) => pathname === rutaAdmin(seccion.id));

  return (
    <header className="header-navbar">
      <div className="header-top-row">
        <Link className="header-brand" to={RUTAS.CATALOGO}>
          <div className="brand-logo"><IconoGranoCafe tamano={22} /></div>
          <span className="brand-name">Grano<span className="brand-highlight"> Colombiano</span></span>
        </Link>

        {enModoAdmin && (
          <div className="view-title-nav">
            <span className="view-badge">
              Administracion{seccionActiva ? ` - ${seccionActiva.etiqueta}` : ''}
            </span>
          </div>
        )}

        <div className="header-actions" style={{ gap: '12px' }}>
          <div className="view-nav">
            <NavLink
              className={({ isActive }) => `view-btn ${isActive ? 'active' : ''}`}
              to={RUTAS.CATALOGO}
              end
            >
              ☕ Catalogo
            </NavLink>
            {esAdministrador && <MenuAdmin enModoAdmin={enModoAdmin} />}
          </div>

          <AccionesSesion
            sesion={sesion}
            onAbrirAutenticacion={onAbrirAutenticacion}
            onCerrarSesion={onCerrarSesion}
          />

          <Link className="cart-button" to={RUTAS.MI_PEDIDO}>
            <span className="cart-icon">🛍️</span>
            <span className="cart-label">Mi Pedido</span>
            {conteoPedido > 0 && <span className="cart-badge">{conteoPedido}</span>}
          </Link>
        </div>
      </div>

      {pathname === RUTAS.CATALOGO && (
        <div className="header-categories-row">
          <MenuCategorias
            categorias={categorias}
            categoriaActiva={categoriaActiva}
            onSeleccionarCategoria={onSeleccionarCategoria}
          />
        </div>
      )}
    </header>
  );
}
