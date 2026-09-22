import { COLUMNA_ACCIONES } from '../../../constantes/tablas';
import { CeldaAcciones } from '../../comunes/CeldaAcciones';
import { ListaVacia } from '../../comunes/ListaVacia';
import { MensajeCarga } from '../../comunes/MensajeCarga';
import { TablaAdmin } from '../../comunes/TablaAdmin';

const COLUMNAS = ['ID', 'Nombre', 'Descripción', 'Color', 'Estado', COLUMNA_ACCIONES];

export function TablaEstadosOrden({ estados = [], onEditar, onEliminar, cargando }) {
  if (cargando) return <MensajeCarga texto="Cargando lista de estados..." />;
  if (estados.length === 0) return <ListaVacia texto="No hay estados de orden registrados." />;

  return (
    <TablaAdmin
      titulo="📋 Estados de la Orden Registrados"
      resumen={`${estados.length} estado(s)`}
      columnas={COLUMNAS}
    >
      {estados.map((estadoOrden) => (
        <tr key={estadoOrden.id}>
          <td className="td-id">#{estadoOrden.id}</td>
          <td className="td-name"><span className="badge-tag">{estadoOrden.nombre}</span></td>
          <td>{estadoOrden.descripcion}</td>
          <td>{estadoOrden.color}</td>
          <td>{estadoOrden.estado ? 'Activo' : 'Inactivo'}</td>
          <CeldaAcciones
            onEditar={() => onEditar(estadoOrden)}
            onEliminar={() => onEliminar(estadoOrden.id)}
          />
        </tr>
      ))}
    </TablaAdmin>
  );
}
