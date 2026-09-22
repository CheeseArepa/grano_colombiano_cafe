import { useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { ROLES } from '../../constantes/dominio';
import { RUTAS } from '../../constantes/rutas';
import { Encabezado } from './Encabezado';
import { PiePagina } from './PiePagina';

/** Estructura común a todas las vistas: encabezado, contenido y pie de página. */
export function LayoutPrincipal({ contexto }) {
  const navigate = useNavigate();
  const { categorias, informacion, sesion, setCategoriaActiva } = contexto;

  // Seleccionar una categoría desde el pie de página también debe llevar al
  // catálogo, que es la única vista donde el filtro tiene efecto.
  const seleccionarCategoria = useCallback((categoria) => {
    setCategoriaActiva(categoria);
    navigate(RUTAS.CATALOGO);
  }, [setCategoriaActiva, navigate]);

  return (
    <div className="app-layout">
      <Encabezado
        categorias={categorias.datos}
        categoriaActiva={contexto.categoriaActiva}
        onSeleccionarCategoria={seleccionarCategoria}
        conteoPedido={contexto.carrito.unidades}
        esAdministrador={sesion?.rol === ROLES.ADMIN}
        sesion={sesion}
        onAbrirAutenticacion={contexto.abrirAutenticacion}
        onCerrarSesion={contexto.cerrarSesion}
      />

      <main className="app-container">
        <Outlet context={contexto} />
      </main>

      <PiePagina
        categorias={categorias.datos}
        informacion={informacion.datos[0]}
        onSeleccionarCategoria={seleccionarCategoria}
      />
    </div>
  );
}
