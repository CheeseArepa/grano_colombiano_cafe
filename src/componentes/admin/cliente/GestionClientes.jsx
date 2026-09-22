import { SeccionAdmin } from '../../comunes/SeccionAdmin';
import { TablaClientes } from './TablaClientes';

// Pantalla de solo lectura: los clientes se dan de alta desde el registro
// público. `FormularioCliente` queda disponible para cuando se reactive el
// alta manual desde el panel.
export function GestionClientes({ clientes = [], cargando }) {
  return (
    <SeccionAdmin
      titulo="🧑‍🤝‍🧑 Gestión de Clientes"
      descripcion="Consulta los clientes registrados en el sistema."
    >
      <TablaClientes clientes={clientes} cargando={cargando} />
    </SeccionAdmin>
  );
}
