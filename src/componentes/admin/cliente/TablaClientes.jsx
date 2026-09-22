import { ListaVacia } from '../../comunes/ListaVacia';
import { MensajeCarga } from '../../comunes/MensajeCarga';
import { TablaAdmin } from '../../comunes/TablaAdmin';

const COLUMNAS = ['ID', 'Nombre', 'Teléfono', 'Correo'];

export function TablaClientes({ clientes = [], cargando }) {
  if (cargando) return <MensajeCarga texto="Cargando lista de clientes..." />;
  if (clientes.length === 0) return <ListaVacia texto="No hay clientes registrados en el sistema." />;

  return (
    <TablaAdmin
      titulo="📋 Lista de Clientes Registrados"
      resumen={`${clientes.length} cliente(s)`}
      columnas={COLUMNAS}
    >
      {clientes.map((cliente) => (
        <tr key={cliente.id}>
          <td className="td-id">#{cliente.id}</td>
          <td className="td-name"><strong>{cliente.nombre} {cliente.apellido}</strong></td>
          <td>{cliente.telefono}</td>
          <td>{cliente.correo}</td>
        </tr>
      ))}
    </TablaAdmin>
  );
}
