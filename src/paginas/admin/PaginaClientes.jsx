import { useRecursoApi } from '../../hooks/useRecursoApi';
import { obtenerClientes } from '../../servicios/clienteServicio';
import { GestionClientes } from '../../componentes/admin/cliente/GestionClientes';

// Igual que en el resto de páginas de administración, el recurso se pide
// aquí (no en `App`) para que solo se cargue cuando una sesión de
// administrador entra a esta sección.
export function PaginaClientes() {
  const clientes = useRecursoApi(obtenerClientes);

  return <GestionClientes clientes={clientes.datos} cargando={clientes.cargando} />;
}
