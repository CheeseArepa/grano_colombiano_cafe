export function Menu({ categorias = [], onSelectCategoria, categoriaActiva }) {
    // "Inicio" es un filtro propio de la interfaz (muestra todos los productos),
    // no depende de un registro en la base de datos.
    const categoriasReales = categorias.filter((cat) => {
        const nombreCat = (cat.nombre || "").trim().toLowerCase();
        return nombreCat !== "inicio" && nombreCat !== "";
    });

    return (
        <nav className="nav-categories">
            <button
                className={`category-pill ${categoriaActiva === "Inicio" ? "active" : ""}`}
                onClick={() => onSelectCategoria("Inicio")}
            >
                Inicio
            </button>

            {categoriasReales.map((cat) => {
                const nombreCat = cat.nombre;
                return (
                    <button
                        key={cat.id}
                        className={`category-pill ${categoriaActiva === nombreCat ? 'active' : ''}`}
                        onClick={() => onSelectCategoria(nombreCat)}
                    >
                        {nombreCat}
                    </button>
                );
            })}
        </nav>
    );
}
