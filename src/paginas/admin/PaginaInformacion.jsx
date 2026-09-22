import { useContextoApp } from '../../hooks/useContextoApp';
import { GestionInformacion } from '../../componentes/admin/informacion/GestionInformacion';

export function PaginaInformacion() {
  const { informacion } = useContextoApp();

  return (
    <GestionInformacion
      informacion={informacion.datos}
      cargando={informacion.cargando}
      onActualizarInformacion={informacion.recargar}
    />
  );
}
