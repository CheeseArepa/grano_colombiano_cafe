import { CATEGORIA_INICIO } from '../../constantes/dominio';
import { filtrarCategoriasVisibles } from '../../utilidades/categorias';

/** Píldoras de filtrado por categoría que se muestran bajo el encabezado. */
export function MenuCategorias({ categorias = [], categoriaActiva, onSeleccionarCategoria }) {
  const clasePildora = (nombre) => `category-pill ${categoriaActiva === nombre ? 'active' : ''}`;

  return (
    <nav className="nav-categories">
      <button
        type="button"
        className={clasePildora(CATEGORIA_INICIO)}
        onClick={() => onSeleccionarCategoria(CATEGORIA_INICIO)}
      >
        {CATEGORIA_INICIO}
      </button>

      {filtrarCategoriasVisibles(categorias).map((categoria) => (
        <button
          key={categoria.id}
          type="button"
          className={clasePildora(categoria.nombre)}
          onClick={() => onSeleccionarCategoria(categoria.nombre)}
        >
          {categoria.nombre}
        </button>
      ))}
    </nav>
  );
}
