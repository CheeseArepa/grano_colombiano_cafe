import { COLUMNA_ACCIONES } from '../../../constantes/tablas';
import { CeldaAcciones } from '../../comunes/CeldaAcciones';
import { ListaVacia } from '../../comunes/ListaVacia';
import { MensajeCarga } from '../../comunes/MensajeCarga';
import { TablaAdmin } from '../../comunes/TablaAdmin';

const COLUMNAS = ['ID', 'Nombre', 'Descripción', 'Estado', COLUMNA_ACCIONES];

export function TablaCategorias({ categorias = [], onEditar, onEliminar, cargando }) {
  if (cargando) return <MensajeCarga texto="Cargando lista de categorías..." />;
  if (categorias.length === 0) return <ListaVacia texto="No hay categorías registradas en el sistema." />;

  return (
    <TablaAdmin
      titulo="📋 Lista de Categorías Registradas"
      resumen={`${categorias.length} categoría(s)`}
      columnas={COLUMNAS}
    >
      {categorias.map((categoria) => (
        <tr key={categoria.id}>
          <td className="td-id">#{categoria.id}</td>
          <td className="td-name"><strong>{categoria.nombre}</strong></td>
          <td>{categoria.descripcion}</td>
          <td>{categoria.estado ? 'Activo' : 'Inactivo'}</td>
          <CeldaAcciones
            onEditar={() => onEditar(categoria)}
            onEliminar={() => onEliminar(categoria.id)}
          />
        </tr>
      ))}
    </TablaAdmin>
  );
}
