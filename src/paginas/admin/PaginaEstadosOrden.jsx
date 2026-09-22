import { useRecursoApi } from '../../hooks/useRecursoApi';
import { obtenerEstadosOrden } from '../../servicios/estadoOrdenServicio';
import { GestionEstadosOrden } from '../../componentes/admin/estadoOrden/GestionEstadosOrden';

// Igual que en el resto de páginas de administración, el recurso se pide
// aquí (no en `App`) para que solo se cargue cuando una sesión de
// administrador entra a esta sección.
export function PaginaEstadosOrden() {
  const estadosOrden = useRecursoApi(obtenerEstadosOrden);

  return (
    <GestionEstadosOrden
      estados={estadosOrden.datos}
      cargando={estadosOrden.cargando}
      onActualizarEstados={estadosOrden.recargar}
    />
  );
}
