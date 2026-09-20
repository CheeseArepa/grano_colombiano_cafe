import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router';
import './App.css';
import { AuthModal } from './components/AuthModal';
import { AccesoAdmin } from './components/auth/RouteGuards';
import { AppLayout } from './components/layout/AppLayout';
import { CatalogPage } from './pages/CatalogPage';
import { PedidoPage } from './pages/PedidoPage';
import { UnauthorizedPage } from './pages/UnauthorizedPage';
import { CategoriasAdminPage, ClientesAdminPage, EstadosAdminPage, InformacionAdminPage, OrdenesAdminPage, ProductosAdminPage, UsuariosAdminPage } from './pages/AdminPages';
import { obtenerProductos } from './services/productService';
import { obtenerCategorias } from './services/categoryService';
import { crearUsuario, normalizarCorreo, obtenerUsuarios, ROL_BASICO, usuarioEstaActivo } from './services/userService';
import { obtenerClientes } from './services/clientService';
import { obtenerOrdenes } from './services/orderService';
import { obtenerEstados } from './services/orderStatusService';
import { obtenerInformacion } from './services/informationService';

const CLAVE_SESION = 'grano-colombiano-sesion';

const obtenerSesionGuardada = () => {
  try { return JSON.parse(localStorage.getItem(CLAVE_SESION)) || null; } catch { return null; }
};

const cargarRecurso = (obtener, asignar, cargar) => {
  cargar(true);
  return obtener()
    .then((data) => asignar(Array.isArray(data) ? data : []))
    .catch((error) => console.error('Error al cargar datos:', error))
    .finally(() => cargar(false));
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [categoriaActiva, setCategoriaActiva] = useState('Inicio');
  const [cartCount, setCartCount] = useState(0);
  const [sesion, setSesion] = useState(obtenerSesionGuardada);
  const [modalAuth, setModalAuth] = useState(null);
  const [procesandoAuth, setProcesandoAuth] = useState(false);
  const [productos, setProductos] = useState([]); const [cargando, setCargando] = useState(true);
  const [categorias, setCategorias] = useState([]); const [cargandoCategorias, setCargandoCategorias] = useState(true);
  const [usuarios, setUsuarios] = useState([]); const [cargandoUsuarios, setCargandoUsuarios] = useState(true);
  const [clientes, setClientes] = useState([]); const [cargandoClientes, setCargandoClientes] = useState(true);
  const [ordenes, setOrdenes] = useState([]); const [cargandoOrdenes, setCargandoOrdenes] = useState(true);
  const [estados, setEstados] = useState([]); const [cargandoEstados, setCargandoEstados] = useState(true);
  const [informacion, setInformacion] = useState([]); const [cargandoInformacion, setCargandoInformacion] = useState(true);

  const cargarProductos = () => cargarRecurso(obtenerProductos, setProductos, setCargando);
  const cargarCategorias = () => cargarRecurso(obtenerCategorias, setCategorias, setCargandoCategorias);
  const cargarUsuarios = () => cargarRecurso(obtenerUsuarios, setUsuarios, setCargandoUsuarios);
  const cargarClientes = () => cargarRecurso(obtenerClientes, setClientes, setCargandoClientes);
  const cargarOrdenes = () => cargarRecurso(obtenerOrdenes, setOrdenes, setCargandoOrdenes);
  const cargarEstados = () => cargarRecurso(obtenerEstados, setEstados, setCargandoEstados);
  const cargarInformacion = () => cargarRecurso(obtenerInformacion, setInformacion, setCargandoInformacion);

  useEffect(() => {
    cargarProductos(); cargarCategorias(); cargarUsuarios(); cargarClientes(); cargarOrdenes(); cargarEstados(); cargarInformacion();
  }, []);

  useEffect(() => {
    if (location.state?.authMode) setModalAuth(location.state.authMode);
  }, [location.state]);

  const guardarSesion = (usuario) => {
    const sesionNueva = { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol };
    localStorage.setItem(CLAVE_SESION, JSON.stringify(sesionNueva));
    setSesion(sesionNueva);
    setModalAuth(null);
    navigate(location.state?.from || location.pathname || '/catalogo', { replace: true });
  };

  const iniciarSesion = async ({ correo, clave }) => {
    setProcesandoAuth(true);
    try {
      const usuario = (await obtenerUsuarios()).find((item) => normalizarCorreo(item.correo) === normalizarCorreo(correo) && item.clave === clave && usuarioEstaActivo(item));
      if (!usuario) { alert('Correo o contraseña incorrectos.'); return; }
      guardarSesion(usuario);
    } catch (error) { console.error('Error al iniciar sesión:', error); alert('No fue posible iniciar sesión. Intenta nuevamente.'); } finally { setProcesandoAuth(false); }
  };

  const registrarUsuario = async ({ nombre, correo, clave }) => {
    setProcesandoAuth(true);
    try {
      const correoNormalizado = normalizarCorreo(correo);
      const usuariosActuales = await obtenerUsuarios();
      if (usuariosActuales.some((usuario) => normalizarCorreo(usuario.correo) === correoNormalizado)) { alert('Ya existe una cuenta registrada con este correo.'); return; }
      const usuario = await crearUsuario({ nombre: nombre.trim(), correo: correoNormalizado, clave, estado: true, rol: ROL_BASICO });
      cargarUsuarios();
      guardarSesion(usuario);
    } catch (error) { console.error('Error al registrar usuario:', error); alert('No fue posible crear la cuenta. Intenta nuevamente.'); } finally { setProcesandoAuth(false); }
  };

  const cerrarSesion = () => { localStorage.removeItem(CLAVE_SESION); setSesion(null); navigate('/catalogo'); };
  const cerrarModalAuth = () => { setModalAuth(null); if (location.state?.authMode) navigate('/catalogo', { replace: true }); };
  const contexto = { categoriaActiva, setCategoriaActiva, cartCount, agregarAlPedido: () => setCartCount((actual) => actual + 1), sesion, abrirAuth: setModalAuth, cerrarSesion, productos, categorias, usuarios, clientes, ordenes, estados, informacion, cargando, cargandoCategorias, cargandoUsuarios, cargandoClientes, cargandoOrdenes, cargandoEstados, cargandoInformacion, cargarProductos, cargarCategorias, cargarUsuarios, cargarClientes, cargarOrdenes, cargarEstados, cargarInformacion };

  return <>
    <Routes>
      <Route element={<AppLayout contexto={contexto} />}>
        <Route index element={<Navigate replace to="catalogo" />} />
        <Route path="catalogo" element={<CatalogPage />} />
        <Route path="mi-pedido" element={<PedidoPage />} />
        <Route path="admin" element={<AccesoAdmin />}>
          <Route index element={<Navigate replace to="productos" />} />
          <Route path="productos" element={<ProductosAdminPage />} />
          <Route path="categorias" element={<CategoriasAdminPage />} />
          <Route path="usuarios" element={<UsuariosAdminPage />} />
          <Route path="clientes" element={<ClientesAdminPage />} />
          <Route path="ordenes" element={<OrdenesAdminPage />} />
          <Route path="estados" element={<EstadosAdminPage />} />
          <Route path="informacion" element={<InformacionAdminPage />} />
        </Route>
        <Route path="no-autorizado" element={<UnauthorizedPage />} />
        <Route path="*" element={<Navigate replace to="/catalogo" />} />
      </Route>
    </Routes>
    {modalAuth && <AuthModal modo={modalAuth} onCerrar={cerrarModalAuth} onIniciarSesion={iniciarSesion} onRegistrarse={registrarUsuario} procesando={procesandoAuth} />}
  </>;
}

export default App;
