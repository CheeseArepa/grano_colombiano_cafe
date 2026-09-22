import { useRecursoApi } from '../../hooks/useRecursoApi';
import { obtenerOrdenes } from '../../servicios/ordenServicio';
import { GestionOrdenes } from '../../componentes/admin/orden/GestionOrdenes';

// Igual que en el resto de páginas de administración, el recurso se pide
// aquí (no en `App`) para que solo se cargue cuando una sesión de
// administrador entra a esta sección.
export function PaginaOrdenes() {
  const ordenes = useRecursoApi(obtenerOrdenes);

  return <GestionOrdenes ordenes={ordenes.datos} cargando={ordenes.cargando} />;
}
