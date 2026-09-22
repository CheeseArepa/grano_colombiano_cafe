import { useContextoApp } from '../../hooks/useContextoApp';
import { GestionProductos } from '../../componentes/admin/producto/GestionProductos';

export function PaginaProductos() {
  const { productos, categorias } = useContextoApp();

  return (
    <GestionProductos
      productos={productos.datos}
      categorias={categorias.datos}
      cargando={productos.cargando}
      onActualizarProductos={productos.recargar}
    />
  );
}
