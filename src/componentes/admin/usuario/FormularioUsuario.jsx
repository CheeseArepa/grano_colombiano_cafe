import { ROLES } from '../../../constantes/dominio';
import { useFormulario } from '../../../hooks/useFormulario';
import { AccionesFormulario } from '../../comunes/AccionesFormulario';
import { CampoCasilla } from '../../comunes/CampoCasilla';
import { CampoSelect } from '../../comunes/CampoSelect';
import { CampoTexto } from '../../comunes/CampoTexto';
import { TarjetaFormulario } from '../../comunes/TarjetaFormulario';

const construirValores = (usuario) => ({
  nombre: usuario?.nombre || '',
  correo: usuario?.correo || '',
  clave: usuario?.clave || '',
  rol: usuario?.rol || ROLES.CLIENTE,
  estado: usuario ? Boolean(usuario.estado) : true
});

export function FormularioUsuario({ usuarioAEditar, onGuardar, onCancelar, guardando }) {
  const { valores, manejarCambio, esEdicion } = useFormulario(construirValores, usuarioAEditar);

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    if (!valores.nombre.trim() || !valores.correo.trim() || !valores.clave.trim()) {
      alert('Por favor completa el nombre, correo y clave.');
      return;
    }

    onGuardar({
      nombre: valores.nombre.trim(),
      correo: valores.correo.trim(),
      clave: valores.clave,
      rol: valores.rol,
      estado: Boolean(valores.estado)
    });
  };

  return (
    <TarjetaFormulario
      titulo={esEdicion ? '✏️ Editar Usuario' : '➕ Registrar Nuevo Usuario'}
      subtitulo="Gestiona las cuentas de acceso al sistema."
      onSubmit={manejarEnvio}
    >
      <div className="form-grid">
        <CampoTexto
          nombre="nombre"
          etiqueta="Nombre Completo"
          requerido
          placeholder="Ej. Juan Pérez"
          value={valores.nombre}
          onChange={manejarCambio}
        />
        <CampoTexto
          nombre="correo"
          etiqueta="Correo"
          requerido
          type="email"
          value={valores.correo}
          onChange={manejarCambio}
        />
        <CampoTexto
          nombre="clave"
          etiqueta="Clave"
          requerido
          type="password"
          value={valores.clave}
          onChange={manejarCambio}
        />
        <CampoSelect
          nombre="rol"
          etiqueta="Rol"
          requerido
          value={valores.rol}
          onChange={manejarCambio}
        >
          <option value={ROLES.CLIENTE}>Cliente</option>
          <option value={ROLES.ADMIN}>Administrador</option>
        </CampoSelect>
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
        etiquetaGuardar="Guardar Usuario"
        etiquetaActualizar="Actualizar Usuario"
        onCancelar={onCancelar}
      />
    </TarjetaFormulario>
  );
}
