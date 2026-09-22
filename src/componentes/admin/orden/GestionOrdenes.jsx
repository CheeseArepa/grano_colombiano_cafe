import { SeccionAdmin } from '../../comunes/SeccionAdmin';
import { TablaOrdenes } from './TablaOrdenes';

// Pantalla de solo lectura: las órdenes se generan desde el pedido del cliente.
// `FormularioOrden` queda disponible para cuando se reactive el alta manual.
export function GestionOrdenes({ ordenes = [], cargando }) {
  return (
    <SeccionAdmin
      titulo="🧾 Gestión de Órdenes"
      descripcion="Consulta las órdenes registradas en el sistema."
    >
      <TablaOrdenes ordenes={ordenes} cargando={cargando} />
    </SeccionAdmin>
  );
}
