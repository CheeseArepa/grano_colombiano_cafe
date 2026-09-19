import { useState, useEffect, useRef } from "react";
import { Menu } from "./Menu";
import { CoffeeBeanIcon } from "./icons/CoffeeBeanIcon";

const SECCIONES_ADMIN = [
    { id: "admin", icon: "🫘", label: "Productos" },
    { id: "categorias", icon: "🗂️", label: "Categorías" },
    { id: "usuarios", icon: "👤", label: "Usuarios" },
    { id: "clientes", icon: "🧑‍🤝‍🧑", label: "Clientes" },
    { id: "ordenes", icon: "🧾", label: "Órdenes" },
    { id: "estados", icon: "🏷️", label: "Estados de Orden" },
    { id: "informacion", icon: "ℹ️", label: "Información" },
];

export function Header({ categorias, categoriaActiva, onSelectCategoria, cartCount, vista, onCambiarVista, esAdministrador, sesion, onAbrirAuth, onCerrarSesion }) {
    const [menuAdminAbierto, setMenuAdminAbierto] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickFuera(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setMenuAdminAbierto(false);
            }
        }
        document.addEventListener("mousedown", handleClickFuera);
        return () => document.removeEventListener("mousedown", handleClickFuera);
    }, []);

    const seccionActiva = SECCIONES_ADMIN.find((s) => s.id === vista);
    const enModoAdmin = vista !== "catalogo";

    const irASeccion = (id) => {
        onCambiarVista && onCambiarVista(id);
        setMenuAdminAbierto(false);
    };

    return (
        <header className="header-navbar">
            <div className="header-top-row">
                {/* Brand / Logo */}
                <div className="header-brand" onClick={() => onCambiarVista && onCambiarVista("catalogo")}>
                    <div className="brand-logo"><CoffeeBeanIcon size={22} /></div>
                    <span className="brand-name">Grano<span className="brand-highlight"> Colombiano</span></span>
                </div>

                {enModoAdmin && (
                    <div className="view-title-nav">
                        <span className="view-badge">Modo Administración{seccionActiva ? ` · ${seccionActiva.label}` : ""}</span>
                    </div>
                )}

                {/* Actions */}
                <div className="header-actions" style={{ gap: '12px' }}>
                    <div className="view-nav">
                        <button
                            className={`view-btn ${vista === "catalogo" ? "active" : ""}`}
                            onClick={() => onCambiarVista && onCambiarVista("catalogo")}
                        >
                            ☕ Catálogo
                        </button>

                        {esAdministrador && <div className="admin-dropdown" ref={dropdownRef}>
                            <button
                                className={`view-btn ${enModoAdmin ? "active" : ""}`}
                                onClick={() => setMenuAdminAbierto((v) => !v)}
                                aria-expanded={menuAdminAbierto}
                            >
                                ⚙️ Administración <span className="dropdown-caret">{menuAdminAbierto ? "▲" : "▼"}</span>
                            </button>

                            {menuAdminAbierto && (
                                <div className="admin-dropdown-panel">
                                    {SECCIONES_ADMIN.map((s) => (
                                        <button
                                            key={s.id}
                                            className={`admin-dropdown-item ${vista === s.id ? "active" : ""}`}
                                            onClick={() => irASeccion(s.id)}
                                        >
                                            <span className="admin-dropdown-icon">{s.icon}</span> {s.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>}
                    </div>

                    <div className="auth-actions">
                        {sesion ? (
                            <>
                                <span className="session-name">Hola, {sesion.nombre}</span>
                                <button className="auth-button" onClick={onCerrarSesion}>Cerrar sesión</button>
                            </>
                        ) : (
                            <>
                                <button className="auth-button" onClick={() => onAbrirAuth('login')}>Iniciar sesión</button>
                                <button className="auth-button auth-button-primary" onClick={() => onAbrirAuth('registro')}>Registrarse</button>
                            </>
                        )}
                    </div>

                    {vista === "catalogo" && (
                        <button className="cart-button">
                            <span className="cart-icon">🛍️</span>
                            <span className="cart-label">Mi Pedido</span>
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </button>
                    )}
                </div>
            </div>

            {/* Categories Navigation — fila propia con todo el ancho disponible */}
            {vista === "catalogo" && (
                <div className="header-categories-row">
                    <Menu categorias={categorias} onSelectCategoria={onSelectCategoria} categoriaActiva={categoriaActiva} />
                </div>
            )}
        </header>
    );
}
