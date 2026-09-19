export function MenuInferior({ categorias = [], setCategoriaActiva }) {
    const listaCategorias = categorias.filter((cat) => {
        const nombreCat = (cat.nombre || "").trim().toLowerCase();
        return nombreCat !== "inicio" && nombreCat !== "";
    });

    return (
        <div className="footer-column">
            <h4 className="footer-heading">Categorías</h4>
            <ul className="footer-list">
                <li>
                    <button onClick={() => setCategoriaActiva("Inicio")}>
                        Inicio
                    </button>
                </li>
                {listaCategorias.map((cat) => {
                    const nombreCat = cat.nombre;
                    return (
                        <li key={cat.id}>
                            <button onClick={() => setCategoriaActiva(nombreCat)}>
                                {nombreCat}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
