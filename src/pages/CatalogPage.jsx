import { useOutletContext } from 'react-router';
import { Banner } from '../components/Banner';
import { Product } from '../components/Product';

export function CatalogPage() {
  const { categoriaActiva, productos, cargando, agregarAlPedido } = useOutletContext();
  const productosFiltrados = categoriaActiva === 'Inicio'
    ? productos
    : productos.filter((producto) => producto.categoria === categoriaActiva);

  return (
    <>
      <Banner />
      <section className="catalog-header">
        <div>
          <h2 className="catalog-title">{categoriaActiva === 'Inicio' ? 'Todos los Productos' : categoriaActiva}</h2>
          <p className="catalog-count">{productosFiltrados.length} producto(s) disponibles</p>
        </div>
      </section>
      <section className="product-grid">
        {cargando ? <p className="loading-text">Cargando productos...</p> : productosFiltrados.map((producto) => (
          <Product key={producto.id} indice={producto.id} {...producto} onAddToCart={agregarAlPedido} />
        ))}
      </section>
    </>
  );
}
