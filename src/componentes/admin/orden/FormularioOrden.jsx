import { useFormulario } from '../../../hooks/useFormulario';
import { AccionesFormulario } from '../../comunes/AccionesFormulario';
import { CampoAreaTexto } from '../../comunes/CampoAreaTexto';
import { CampoSelect } from '../../comunes/CampoSelect';
import { CampoTexto } from '../../comunes/CampoTexto';
import { TarjetaFormulario } from '../../comunes/TarjetaFormulario';

// Actualmente sin montar: `GestionOrdenes` es de solo lectura. Se conserva
// listo para reactivar el alta/edición manual de órdenes desde el panel.

const construirValores = (orden) => ({
  cliente: orden?.cliente || '',
  fecha: orden?.fecha?.slice(0, 10) || '',
  metodo_pago: orden?.metodo_pago || '',
  total: orden?.total ?? '',
  descuento: orden?.descuento ?? '',
  detalle: JSON.stringify(orden?.detalle || []),
  estado_orden: orden?.estado_orden || ''
});

export function FormularioOrden({ ordenAEditar, clientes = [], estados = [], onGuardar, onCancelar, guardando }) {
  const { valores, manejarCambio, esEdicion } = useFormulario(construirValores, ordenAEditar);

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    const faltanCampos = !valores.cliente || !valores.estado_orden || !valores.fecha
      || !valores.metodo_pago || valores.total === '' || valores.descuento === '';

    if (faltanCampos) {
      alert('Por favor selecciona el cliente y el estado de la orden.');
      return;
    }

    try {
      const detalle = JSON.parse(valores.detalle);
      if (!Array.isArray(detalle)) throw new Error('detalle no es un arreglo');

      onGuardar({
        ...valores,
        total: Number(valores.total),
        descuento: Number(valores.descuento),
        detalle
      });
    } catch {
      alert('El detalle debe ser un arreglo JSON válido.');
    }
  };

  return (
    <TarjetaFormulario
      titulo={esEdicion ? '✏️ Editar Orden' : '➕ Registrar Nueva Orden'}
      subtitulo="Registra o actualiza una orden de pedido."
      onSubmit={manejarEnvio}
    >
      <div className="form-grid">
        <CampoSelect
          nombre="cliente"
          etiqueta="Cliente"
          requerido
          value={valores.cliente}
          onChange={manejarCambio}
        >
          <option value="">Selecciona un cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>{cliente.nombre} {cliente.apellido}</option>
          ))}
        </CampoSelect>

        <CampoSelect
          nombre="estado_orden"
          etiqueta="Estado"
          requerido
          value={valores.estado_orden}
          onChange={manejarCambio}
        >
          <option value="">Selecciona un estado</option>
          {estados.map((estadoOrden) => (
            <option key={estadoOrden.id} value={estadoOrden.id}>{estadoOrden.nombre}</option>
          ))}
        </CampoSelect>

        <CampoTexto
          nombre="metodo_pago"
          etiqueta="Método de pago"
          requerido
          value={valores.metodo_pago}
          onChange={manejarCambio}
        />
        <CampoTexto
          nombre="fecha"
          etiqueta="Fecha"
          type="date"
          value={valores.fecha}
          onChange={manejarCambio}
        />
        <CampoTexto
          nombre="descuento"
          etiqueta="Descuento ($)"
          requerido
          type="number"
          min="0"
          step="0.01"
          value={valores.descuento}
          onChange={manejarCambio}
        />
        <CampoTexto
          nombre="total"
          etiqueta="Total ($)"
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={valores.total}
          onChange={manejarCambio}
        />
        <CampoAreaTexto
          nombre="detalle"
          etiqueta="Detalle (arreglo JSON)"
          requerido
          ancho="completo"
          value={valores.detalle}
          onChange={manejarCambio}
        />
      </div>

      <AccionesFormulario
        esEdicion={esEdicion}
        guardando={guardando}
        etiquetaGuardar="Guardar Orden"
        etiquetaActualizar="Actualizar Orden"
        onCancelar={onCancelar}
      />
    </TarjetaFormulario>
  );
}
