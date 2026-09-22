import { mensajesDe } from '../../../constantes/mensajes';
import { useGestionRecurso } from '../../../hooks/useGestionRecurso';
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto
} from '../../../servicios/productoServicio';
import { SeccionAdmin } from '../../comunes/SeccionAdmin';
import { FormularioProducto } from './FormularioProducto';
import { TablaProductos } from './TablaProductos';

const SERVICIO = { crear: crearProducto, actualizar: actualizarProducto, eliminar: eliminarProducto };
const MENSAJES = mensajesDe({ singular: 'Producto' });

export function GestionProductos({ productos = [], categorias = [], onActualizarProductos, cargando }) {
  const gestion = useGestionRecurso({
    servicio: SERVICIO,
    alCambiar: onActualizarProductos,
    mensajes: MENSAJES
  });

  return (
    <SeccionAdmin
      titulo="🛠️ Gestión de Productos"
      descripcion="Registra nuevos productos o edita/elimina los productos existentes en el catálogo."
    >
      <FormularioProducto
        productoAEditar={gestion.registroAEditar}
        categorias={categorias}
        onGuardar={gestion.guardar}
        onCancelar={gestion.cancelarEdicion}
        guardando={gestion.guardando}
      />

      <TablaProductos
        productos={productos}
        onEditar={gestion.editar}
        onEliminar={gestion.eliminar}
        cargando={cargando}
      />
    </SeccionAdmin>
  );
}
