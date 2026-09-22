import { COLUMNA_ACCIONES } from '../../../constantes/tablas';
import { CeldaAcciones } from '../../comunes/CeldaAcciones';
import { ListaVacia } from '../../comunes/ListaVacia';
import { MensajeCarga } from '../../comunes/MensajeCarga';
import { TablaAdmin } from '../../comunes/TablaAdmin';

const COLUMNAS = ['ID', 'Imagen', 'Nombre', 'Categoría', 'Precio', 'Stock', 'Estado', COLUMNA_ACCIONES];

export function TablaProductos({ productos = [], onEditar, onEliminar, cargando }) {
  if (cargando) return <MensajeCarga texto="Cargando lista de productos..." />;
  if (productos.length === 0) return <ListaVacia texto="No hay productos registrados en el sistema." />;

  return (
    <TablaAdmin
      titulo="📋 Lista de Productos Registrados"
      resumen={`${productos.length} producto(s)`}
      columnas={COLUMNAS}
    >
      {productos.map((producto) => (
        <tr key={producto.id}>
          <td className="td-id">#{producto.id}</td>
          <td className="td-img">
            {producto.imagen
              ? <img src={producto.imagen} alt={producto.nombre} className="table-thumb" />
              : <span className="table-thumb-placeholder">☕</span>}
          </td>
          <td className="td-name">
            <strong>{producto.nombre}</strong>
            <p className="td-desc">{producto.descripcion}</p>
          </td>
          <td><span className="badge-category">{producto.categoria || 'Sin categoría'}</span></td>
          <td className="td-price">$ {producto.precio}</td>
          <td>{producto.stock}</td>
          <td>{producto.estado ? 'Activo' : 'Inactivo'}</td>
          <CeldaAcciones
            onEditar={() => onEditar(producto)}
            onEliminar={() => onEliminar(producto.id)}
          />
        </tr>
      ))}
    </TablaAdmin>
  );
}
