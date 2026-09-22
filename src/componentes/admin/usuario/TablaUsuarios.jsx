import { COLUMNA_ACCIONES } from '../../../constantes/tablas';
import { CeldaAcciones } from '../../comunes/CeldaAcciones';
import { ListaVacia } from '../../comunes/ListaVacia';
import { MensajeCarga } from '../../comunes/MensajeCarga';
import { TablaAdmin } from '../../comunes/TablaAdmin';

const COLUMNAS = ['ID', 'Nombre', 'Correo', 'Rol', 'Estado', COLUMNA_ACCIONES];

export function TablaUsuarios({ usuarios = [], onEditar, onEliminar, cargando }) {
  if (cargando) return <MensajeCarga texto="Cargando lista de usuarios..." />;
  if (usuarios.length === 0) return <ListaVacia texto="No hay usuarios registrados en el sistema." />;

  return (
    <TablaAdmin
      titulo="📋 Lista de Usuarios Registrados"
      resumen={`${usuarios.length} usuario(s)`}
      columnas={COLUMNAS}
    >
      {usuarios.map((usuario) => (
        <tr key={usuario.id}>
          <td className="td-id">#{usuario.id}</td>
          <td className="td-name"><strong>{usuario.nombre}</strong></td>
          <td>{usuario.correo}</td>
          <td>{usuario.rol}</td>
          <td><span className="badge-tag">{usuario.estado ? 'Activo' : 'Inactivo'}</span></td>
          <CeldaAcciones
            onEditar={() => onEditar(usuario)}
            onEliminar={() => onEliminar(usuario.id)}
          />
        </tr>
      ))}
    </TablaAdmin>
  );
}
