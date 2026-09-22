import { useMemo } from 'react';
import { CATEGORIA_INICIO } from '../constantes/dominio';
import { useContextoApp } from '../hooks/useContextoApp';
import { BannerPrincipal } from '../componentes/catalogo/BannerPrincipal';
import { TarjetaProducto } from '../componentes/catalogo/TarjetaProducto';
import { MensajeCarga } from '../componentes/comunes/MensajeCarga';

export function PaginaCatalogo() {
  const { categoriaActiva, productos, carrito } = useContextoApp();

  const productosVisibles = useMemo(() => (
    categoriaActiva === CATEGORIA_INICIO
      ? productos.datos
      : productos.datos.filter((producto) => producto.categoria === categoriaActiva)
  ), [productos.datos, categoriaActiva]);

  return (
    <>
      <BannerPrincipal />

      <section className="catalog-header">
        <div>
          <h2 className="catalog-title">
            {categoriaActiva === CATEGORIA_INICIO ? 'Todos los Productos' : categoriaActiva}
          </h2>
          <p className="catalog-count">{productosVisibles.length} producto(s) disponibles</p>
        </div>
      </section>

      <section className="product-grid">
        {productos.cargando
          ? <MensajeCarga texto="Cargando productos..." />
          : productosVisibles.map((producto) => (
            <TarjetaProducto key={producto.id} producto={producto} onAgregar={carrito.agregar} />
          ))}
      </section>
    </>
  );
}
