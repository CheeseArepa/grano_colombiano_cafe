import { useFormulario } from '../../../hooks/useFormulario';
import { AccionesFormulario } from '../../comunes/AccionesFormulario';
import { CampoCasilla } from '../../comunes/CampoCasilla';
import { CampoTexto } from '../../comunes/CampoTexto';
import { TarjetaFormulario } from '../../comunes/TarjetaFormulario';

const construirValores = (estadoOrden) => ({
  nombre: estadoOrden?.nombre || '',
  descripcion: estadoOrden?.descripcion || '',
  color: estadoOrden?.color || '',
  estado: estadoOrden ? Boolean(estadoOrden.estado) : true
});

export function FormularioEstadoOrden({ estadoAEditar, onGuardar, onCancelar, guardando }) {
  const { valores, manejarCambio, esEdicion } = useFormulario(construirValores, estadoAEditar);

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    if (!valores.nombre.trim()) {
      alert('Por favor ingresa el nombre del estado.');
      return;
    }

    onGuardar(valores);
  };

  return (
    <TarjetaFormulario
      titulo={esEdicion ? '✏️ Editar Estado' : '➕ Registrar Nuevo Estado'}
      subtitulo="Define los estados posibles por los que pasa una orden (ej. Pendiente, En preparación, Entregado)."
      onSubmit={manejarEnvio}
    >
      <div className="form-grid">
        <CampoTexto
          nombre="nombre"
          etiqueta="Nombre del Estado"
          requerido
          placeholder="Ej. En preparación"
          value={valores.nombre}
          onChange={manejarCambio}
        />
        <CampoTexto
          nombre="color"
          etiqueta="Color"
          placeholder="#A9552E"
          value={valores.color}
          onChange={manejarCambio}
        />
        <CampoCasilla
          nombre="estado"
          etiqueta="Activo"
          checked={valores.estado}
          onChange={manejarCambio}
        />
        <CampoTexto
          nombre="descripcion"
          etiqueta="Descripción (Opcional)"
          placeholder="Breve descripción del estado"
          value={valores.descripcion}
          onChange={manejarCambio}
        />
      </div>

      <AccionesFormulario
        esEdicion={esEdicion}
        guardando={guardando}
        etiquetaGuardar="Guardar Estado"
        etiquetaActualizar="Actualizar Estado"
        onCancelar={onCancelar}
      />
    </TarjetaFormulario>
  );
}
