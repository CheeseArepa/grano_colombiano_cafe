import { useFormulario } from '../../../hooks/useFormulario';
import { AccionesFormulario } from '../../comunes/AccionesFormulario';
import { CampoCasilla } from '../../comunes/CampoCasilla';
import { CampoTexto } from '../../comunes/CampoTexto';
import { TarjetaFormulario } from '../../comunes/TarjetaFormulario';

// Actualmente sin montar: `GestionClientes` es de solo lectura. Se conserva
// listo para reactivar el alta/edición manual de clientes desde el panel.

const construirValores = (cliente) => ({
  nombre: cliente?.nombre || '',
  apellido: cliente?.apellido || '',
  correo: cliente?.correo || '',
  telefono: cliente?.telefono || '',
  direccion: cliente?.direccion || '',
  estado: cliente ? Boolean(cliente.estado) : true
});

export function FormularioCliente({ clienteAEditar, onGuardar, onCancelar, guardando }) {
  const { valores, manejarCambio, esEdicion } = useFormulario(construirValores, clienteAEditar);

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    if (!valores.nombre.trim()) {
      alert('Por favor ingresa el nombre del cliente.');
      return;
    }

    onGuardar(valores);
  };

  return (
    <TarjetaFormulario
      titulo={esEdicion ? '✏️ Editar Cliente' : '➕ Registrar Nuevo Cliente'}
      subtitulo="Administra la información de tus clientes."
      onSubmit={manejarEnvio}
    >
      <div className="form-grid">
        <CampoTexto
          nombre="nombre"
          etiqueta="Nombre"
          requerido
          placeholder="Ej. María Gómez"
          value={valores.nombre}
          onChange={manejarCambio}
        />
        <CampoTexto
          nombre="apellido"
          etiqueta="Apellido"
          requerido
          value={valores.apellido}
          onChange={manejarCambio}
        />
        <CampoTexto
          nombre="telefono"
          etiqueta="Teléfono"
          placeholder="Ej. 300 000 0000"
          value={valores.telefono}
          onChange={manejarCambio}
        />
        <CampoTexto
          nombre="correo"
          etiqueta="Correo Electrónico"
          type="email"
          placeholder="correo@ejemplo.com"
          value={valores.correo}
          onChange={manejarCambio}
        />
        <CampoCasilla
          nombre="estado"
          etiqueta="Activo"
          checked={valores.estado}
          onChange={manejarCambio}
        />
        <CampoTexto
          nombre="direccion"
          etiqueta="Dirección"
          placeholder="Ej. Calle 10 # 5-20"
          value={valores.direccion}
          onChange={manejarCambio}
        />
      </div>

      <AccionesFormulario
        esEdicion={esEdicion}
        guardando={guardando}
        etiquetaGuardar="Guardar Cliente"
        etiquetaActualizar="Actualizar Cliente"
        onCancelar={onCancelar}
      />
    </TarjetaFormulario>
  );
}
