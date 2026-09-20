import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { Menu } from './Menu';
import { CoffeeBeanIcon } from './icons/CoffeeBeanIcon';

const SECCIONES_ADMIN = [
  { id: 'productos', icon: '🫘', label: 'Productos' },
  { id: 'categorias', icon: '🗂️', label: 'Categorias' },
  { id: 'usuarios', icon: '👤', label: 'Usuarios' },
  { id: 'clientes', icon: '🧑‍🤝‍🧑', label: 'Clientes' },
  { id: 'ordenes', icon: '🧾', label: 'Ordenes' },
  { id: 'estados', icon: '🏷️', label: 'Estados de Orden' },
  { id: 'informacion', icon: 'ℹ️', label: 'Informacion' }
];

export function Header({ categorias, categoriaActiva, onSelectCategoria, cartCount, esAdministrador, sesion, onAbrirAuth, onCerrarSesion }) {
  const [menuAdminAbierto, setMenuAdminAbierto] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const enModoAdmin = location.pathname.startsWith('/admin');
  const seccionActiva = SECCIONES_ADMIN.find((seccion) => location.pathname === `/admin/${seccion.id}`);

  useEffect(() => {
    const cerrarAlHacerClickFuera = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setMenuAdminAbierto(false);
    };
    document.addEventListener('mousedown', cerrarAlHacerClickFuera);
    return () => document.removeEventListener('mousedown', cerrarAlHacerClickFuera);
  }, []);

  return <header className="header-navbar">
    <div className="header-top-row">
      <Link className="header-brand" to="/catalogo"><div className="brand-logo"><CoffeeBeanIcon size={22} /></div><span className="brand-name">Grano<span className="brand-highlight"> Colombiano</span></span></Link>
      {enModoAdmin && <div className="view-title-nav"><span className="view-badge">Administracion{seccionActiva ? ` - ${seccionActiva.label}` : ''}</span></div>}
      <div className="header-actions" style={{ gap: '12px' }}>
        <div className="view-nav">
          <NavLink className={({ isActive }) => `view-btn ${isActive ? 'active' : ''}`} to="/catalogo" end>☕ Catalogo</NavLink>
          {esAdministrador && <div className="admin-dropdown" ref={dropdownRef}>
            <button className={`view-btn ${enModoAdmin ? 'active' : ''}`} onClick={() => setMenuAdminAbierto((abierto) => !abierto)} aria-expanded={menuAdminAbierto}>⚙️ Administracion <span className="dropdown-caret">{menuAdminAbierto ? '▲' : '▼'}</span></button>
            {menuAdminAbierto && <div className="admin-dropdown-panel">{SECCIONES_ADMIN.map((seccion) => <NavLink key={seccion.id} className={({ isActive }) => `admin-dropdown-item ${isActive ? 'active' : ''}`} to={`/admin/${seccion.id}`} onClick={() => setMenuAdminAbierto(false)}><span className="admin-dropdown-icon">{seccion.icon}</span> {seccion.label}</NavLink>)}</div>}
          </div>}
        </div>
        <div className="auth-actions">{sesion ? <><span className="session-name">Hola, {sesion.nombre}</span><button className="auth-button" onClick={onCerrarSesion}>Cerrar sesion</button></> : <><button className="auth-button" onClick={() => onAbrirAuth('login')}>Iniciar sesion</button><button className="auth-button auth-button-primary" onClick={() => onAbrirAuth('registro')}>Registrarse</button></>}</div>
        <Link className="cart-button" to="/mi-pedido"><span className="cart-icon">🛍️</span><span className="cart-label">Mi Pedido</span>{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}</Link>
      </div>
    </div>
    {location.pathname === '/catalogo' && <div className="header-categories-row"><Menu categorias={categorias} onSelectCategoria={onSelectCategoria} categoriaActiva={categoriaActiva} /></div>}
  </header>;
}
