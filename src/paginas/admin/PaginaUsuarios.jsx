import { useRecursoApi } from '../../hooks/useRecursoApi';
import { obtenerUsuarios } from '../../servicios/usuarioServicio';
import { GestionUsuarios } from '../../componentes/admin/usuario/GestionUsuarios';

// El recurso se pide aquí y no en `App` porque incluye la clave en texto
// plano de cada cuenta: solo debe llegar a la red cuando una sesión de
// administrador entra a esta sección (`RutaAdmin` ya lo garantiza al proteger
// la ruta), nunca al cargar el catálogo público.
export function PaginaUsuarios() {
  const usuarios = useRecursoApi(obtenerUsuarios);

  return (
    <GestionUsuarios
      usuarios={usuarios.datos}
      cargando={usuarios.cargando}
      onActualizarUsuarios={usuarios.recargar}
    />
  );
}
