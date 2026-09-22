import { CATEGORIA_INICIO } from '../../constantes/dominio';
import { filtrarCategoriasVisibles } from '../../utilidades/categorias';

/** Columna de categorías del pie de página. */
export function ListaCategoriasPie({ categorias = [], onSeleccionarCategoria }) {
  return (
    <div className="footer-column">
      <h4 className="footer-heading">Categorías</h4>
      <ul className="footer-list">
        <li>
          <button type="button" onClick={() => onSeleccionarCategoria(CATEGORIA_INICIO)}>
            {CATEGORIA_INICIO}
          </button>
        </li>
        {filtrarCategoriasVisibles(categorias).map((categoria) => (
          <li key={categoria.id}>
            <button type="button" onClick={() => onSeleccionarCategoria(categoria.nombre)}>
              {categoria.nombre}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
