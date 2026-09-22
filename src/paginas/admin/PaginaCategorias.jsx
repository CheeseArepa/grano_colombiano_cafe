import { useContextoApp } from '../../hooks/useContextoApp';
import { GestionCategorias } from '../../componentes/admin/categoria/GestionCategorias';

export function PaginaCategorias() {
  const { categorias } = useContextoApp();

  return (
    <GestionCategorias
      categorias={categorias.datos}
      cargando={categorias.cargando}
      onActualizarCategorias={categorias.recargar}
    />
  );
}
