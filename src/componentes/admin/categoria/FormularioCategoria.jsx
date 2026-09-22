import { useFormulario } from '../../../hooks/useFormulario';
import { AccionesFormulario } from '../../comunes/AccionesFormulario';
import { CampoCasilla } from '../../comunes/CampoCasilla';
import { CampoTexto } from '../../comunes/CampoTexto';
import { TarjetaFormulario } from '../../comunes/TarjetaFormulario';

const construirValores = (categoria) => ({
  nombre: categoria?.nombre || '',
  descripcion: categoria?.descripcion || '',
  estado: categoria ? Boolean(categoria.estado) : true
});

export function FormularioCategoria({ categoriaAEditar, onGuardar, onCancelar, guardando }) {
  const { valores, manejarCambio, esEdicion } = useFormulario(construirValores, categoriaAEditar);

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    if (!valores.nombre.trim()) {
      alert('Por favor ingresa el nombre de la categoría.');
      return;
    }

    onGuardar(valores);
  };

  return (
    <TarjetaFormulario
      titulo={esEdicion ? '✏️ Editar Categoría' : '➕ Registrar Nueva Categoría'}
      subtitulo={esEdicion
        ? 'Modifica los datos de la categoría seleccionada'
        : 'Ingresa los datos para agregar una categoría al catálogo'}
      onSubmit={manejarEnvio}
    >
      <div className="form-grid">
        <CampoTexto
          nombre="nombre"
          etiqueta="Nombre de la Categoría"
          requerido
          placeholder="Ej. Café molido"
          value={valores.nombre}
          onChange={manejarCambio}
        />
        <CampoTexto
          nombre="descripcion"
          etiqueta="Descripción"
          value={valores.descripcion}
          onChange={manejarCambio}
        />
        <CampoCasilla
          nombre="estado"
          etiqueta="Activo"
          checked={valores.estado}
          onChange={manejarCambio}
        />
      </div>

      <AccionesFormulario
        esEdicion={esEdicion}
        guardando={guardando}
        etiquetaGuardar="Guardar Categoría"
        etiquetaActualizar="Actualizar Categoría"
        onCancelar={onCancelar}
      />
    </TarjetaFormulario>
  );
}
