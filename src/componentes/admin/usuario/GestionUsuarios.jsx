import { mensajesDe } from '../../../constantes/mensajes';
import { useGestionRecurso } from '../../../hooks/useGestionRecurso';
import {
  actualizarUsuario,
  crearUsuario,
  eliminarUsuario
} from '../../../servicios/usuarioServicio';
import { SeccionAdmin } from '../../comunes/SeccionAdmin';
import { FormularioUsuario } from './FormularioUsuario';
import { TablaUsuarios } from './TablaUsuarios';

// La regla de "siempre debe quedar un administrador" vive en el servicio, que
// lanza `ErrorInvarianteAdministrador`; `useGestionRecurso` muestra su mensaje
// tal cual porque está redactado para el usuario final.
const SERVICIO = { crear: crearUsuario, actualizar: actualizarUsuario, eliminar: eliminarUsuario };
const MENSAJES = mensajesDe({ singular: 'Usuario' });

export function GestionUsuarios({ usuarios = [], onActualizarUsuarios, cargando }) {
  const gestion = useGestionRecurso({
    servicio: SERVICIO,
    alCambiar: onActualizarUsuarios,
    mensajes: MENSAJES
  });

  return (
    <SeccionAdmin
      titulo="👤 Gestión de Usuarios"
      descripcion="Registra nuevos usuarios o edita/elimina las cuentas existentes."
    >
      <FormularioUsuario
        usuarioAEditar={gestion.registroAEditar}
        onGuardar={gestion.guardar}
        onCancelar={gestion.cancelarEdicion}
        guardando={gestion.guardando}
      />

      <TablaUsuarios
        usuarios={usuarios}
        onEditar={gestion.editar}
        onEliminar={gestion.eliminar}
        cargando={cargando}
      />
    </SeccionAdmin>
  );
}
