import { mensajesDe } from '../../../constantes/mensajes';
import { useGestionRecurso } from '../../../hooks/useGestionRecurso';
import {
  actualizarCategoria,
  crearCategoria,
  eliminarCategoria
} from '../../../servicios/categoriaServicio';
import { SeccionAdmin } from '../../comunes/SeccionAdmin';
import { FormularioCategoria } from './FormularioCategoria';
import { TablaCategorias } from './TablaCategorias';

const SERVICIO = { crear: crearCategoria, actualizar: actualizarCategoria, eliminar: eliminarCategoria };
const MENSAJES = mensajesDe({ singular: 'Categoría', femenino: true });

export function GestionCategorias({ categorias = [], onActualizarCategorias, cargando }) {
  const gestion = useGestionRecurso({
    servicio: SERVICIO,
    alCambiar: onActualizarCategorias,
    mensajes: MENSAJES
  });

  return (
    <SeccionAdmin
      titulo="🗂️ Gestión de Categorías"
      descripcion="Registra nuevas categorías o edita/elimina las categorías existentes del catálogo."
    >
      <FormularioCategoria
        categoriaAEditar={gestion.registroAEditar}
        onGuardar={gestion.guardar}
        onCancelar={gestion.cancelarEdicion}
        guardando={gestion.guardando}
      />

      <TablaCategorias
        categorias={categorias}
        onEditar={gestion.editar}
        onEliminar={gestion.eliminar}
        cargando={cargando}
      />
    </SeccionAdmin>
  );
}
