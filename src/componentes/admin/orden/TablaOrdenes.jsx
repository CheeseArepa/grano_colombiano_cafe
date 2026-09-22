import { ListaVacia } from '../../comunes/ListaVacia';
import { MensajeCarga } from '../../comunes/MensajeCarga';
import { TablaAdmin } from '../../comunes/TablaAdmin';

const COLUMNAS = ['ID', 'Cliente', 'Estado', 'Fecha', 'Total'];

export function TablaOrdenes({ ordenes = [], cargando }) {
  if (cargando) return <MensajeCarga texto="Cargando lista de órdenes..." />;
  if (ordenes.length === 0) return <ListaVacia texto="No hay órdenes registradas en el sistema." />;

  return (
    <TablaAdmin
      titulo="📋 Lista de Órdenes Registradas"
      resumen={`${ordenes.length} orden(es)`}
      columnas={COLUMNAS}
    >
      {ordenes.map((orden) => (
        <tr key={orden.id}>
          <td className="td-id">#{orden.id}</td>
          <td className="td-name"><strong>{orden.cliente}</strong></td>
          <td><span className="badge-tag">{orden.estado_orden}</span></td>
          <td>{orden.fecha}</td>
          <td>${orden.total}</td>
        </tr>
      ))}
    </TablaAdmin>
  );
}
