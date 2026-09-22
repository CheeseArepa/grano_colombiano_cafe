import { mensajesDe } from '../../../constantes/mensajes';
import { useGestionRecurso } from '../../../hooks/useGestionRecurso';
import {
  actualizarEstadoOrden,
  crearEstadoOrden,
  eliminarEstadoOrden
} from '../../../servicios/estadoOrdenServicio';
import { SeccionAdmin } from '../../comunes/SeccionAdmin';
import { FormularioEstadoOrden } from './FormularioEstadoOrden';
import { TablaEstadosOrden } from './TablaEstadosOrden';

const SERVICIO = {
  crear: crearEstadoOrden,
  actualizar: actualizarEstadoOrden,
  eliminar: eliminarEstadoOrden
};
const MENSAJES = mensajesDe({ singular: 'Estado' });

export function GestionEstadosOrden({ estados = [], onActualizarEstados, cargando }) {
  const gestion = useGestionRecurso({
    servicio: SERVICIO,
    alCambiar: onActualizarEstados,
    mensajes: MENSAJES
  });

  return (
    <SeccionAdmin
      titulo="🏷️ Gestión de Estados de la Orden"
      descripcion="Define y administra los estados posibles del ciclo de vida de una orden."
    >
      <FormularioEstadoOrden
        estadoAEditar={gestion.registroAEditar}
        onGuardar={gestion.guardar}
        onCancelar={gestion.cancelarEdicion}
        guardando={gestion.guardando}
      />

      <TablaEstadosOrden
        estados={estados}
        onEditar={gestion.editar}
        onEliminar={gestion.eliminar}
        cargando={cargando}
      />
    </SeccionAdmin>
  );
}
