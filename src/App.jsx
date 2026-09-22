import { useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { CATEGORIA_INICIO } from './constantes/dominio';
import { RUTAS, SECCION_ADMIN } from './constantes/rutas';
import { useCarrito } from './hooks/useCarrito';
import { useRecursoApi } from './hooks/useRecursoApi';
import { useSesion } from './hooks/useSesion';
import { obtenerCategorias } from './servicios/categoriaServicio';
import { obtenerInformacion } from './servicios/informacionServicio';
import { obtenerProductos } from './servicios/productoServicio';
import { ModalAutenticacion } from './componentes/autenticacion/ModalAutenticacion';
import { RutaAdmin } from './componentes/autenticacion/RutaAdmin';
import { LayoutPrincipal } from './componentes/layout/LayoutPrincipal';
import './App.css';
import { PaginaCategorias } from './paginas/admin/PaginaCategorias';
import { PaginaClientes } from './paginas/admin/PaginaClientes';
import { PaginaEstadosOrden } from './paginas/admin/PaginaEstadosOrden';
import { PaginaInformacion } from './paginas/admin/PaginaInformacion';
import { PaginaOrdenes } from './paginas/admin/PaginaOrdenes';
import { PaginaProductos } from './paginas/admin/PaginaProductos';
import { PaginaUsuarios } from './paginas/admin/PaginaUsuarios';
import { PaginaCatalogo } from './paginas/PaginaCatalogo';
import { PaginaMiPedido } from './paginas/PaginaMiPedido';
import { PaginaNoAutorizado } from './paginas/PaginaNoAutorizado';

// `productos`, `categorias` e `informacion` alimentan vistas públicas
// (catálogo, encabezado, pie de página) y por eso se cargan aquí, al montar
// la aplicación.
//
// `usuarios`, `clientes`, `ordenes` y `estadosOrden` NO se cargan aquí a
// propósito: son datos de administración (el de usuarios incluye la clave en
// texto plano de cada cuenta) y no deben pedirse a la API hasta que una
// sesión de administrador entra a la sección correspondiente. Cada una de
// esas páginas pide su propio recurso; `RutaAdmin` garantiza que solo se
// monten con una sesión de administrador activa.
function App() {
  const productos = useRecursoApi(obtenerProductos);
  const categorias = useRecursoApi(obtenerCategorias);
  const informacion = useRecursoApi(obtenerInformacion);

  const autenticacion = useSesion();

  const carrito = useCarrito();

  const [categoriaActiva, setCategoriaActiva] = useState(CATEGORIA_INICIO);

  // Memorizado para no invalidar el contexto (y volver a renderizar todas las
  // páginas) en cada render de `App`.
  const contexto = useMemo(() => ({
    categoriaActiva,
    setCategoriaActiva,
    carrito,
    sesion: autenticacion.sesion,
    abrirAutenticacion: autenticacion.abrirModal,
    cerrarSesion: autenticacion.cerrarSesion,
    productos,
    categorias,
    informacion
  }), [
    categoriaActiva,
    carrito,
    autenticacion.sesion,
    autenticacion.abrirModal,
    autenticacion.cerrarSesion,
    productos,
    categorias,
    informacion
  ]);

  return (
    <>
      <Routes>
        <Route element={<LayoutPrincipal contexto={contexto} />}>
          <Route index element={<Navigate replace to="catalogo" />} />
          <Route path="catalogo" element={<PaginaCatalogo />} />
          <Route path="mi-pedido" element={<PaginaMiPedido />} />

          <Route path="admin" element={<RutaAdmin />}>
            <Route index element={<Navigate replace to={SECCION_ADMIN.PRODUCTOS} />} />
            <Route path={SECCION_ADMIN.PRODUCTOS} element={<PaginaProductos />} />
            <Route path={SECCION_ADMIN.CATEGORIAS} element={<PaginaCategorias />} />
            <Route path={SECCION_ADMIN.USUARIOS} element={<PaginaUsuarios />} />
            <Route path={SECCION_ADMIN.CLIENTES} element={<PaginaClientes />} />
            <Route path={SECCION_ADMIN.ORDENES} element={<PaginaOrdenes />} />
            <Route path={SECCION_ADMIN.ESTADOS} element={<PaginaEstadosOrden />} />
            <Route path={SECCION_ADMIN.INFORMACION} element={<PaginaInformacion />} />
          </Route>

          <Route path="no-autorizado" element={<PaginaNoAutorizado />} />
          <Route path="*" element={<Navigate replace to={RUTAS.CATALOGO} />} />
        </Route>
      </Routes>

      {autenticacion.modoAutenticacion && (
        <ModalAutenticacion
          key={autenticacion.modoAutenticacion}
          modo={autenticacion.modoAutenticacion}
          procesando={autenticacion.procesando}
          onCerrar={autenticacion.cerrarModal}
          onIniciarSesion={autenticacion.iniciarSesion}
          onRegistrarse={autenticacion.registrarUsuario}
        />
      )}
    </>
  );
}

export default App;
