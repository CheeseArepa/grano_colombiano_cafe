import { useState, useEffect } from 'react';
import './App.css';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { Banner } from './components/Banner';
import { Product } from './components/Product';
import { Footer } from './components/Footer';
import { GestionProductos } from './components/producto/GestionProductos';
import { GestionCategorias } from './components/categoria/GestionCategorias';
import { GestionUsuarios } from './components/usuario/GestionUsuarios';
import { GestionClientes } from './components/cliente/GestionClientes';
import { GestionOrdenes } from './components/orden/GestionOrdenes';
import { GestionEstados } from './components/estado/GestionEstados';
import { GestionInformacion } from './components/information/GestionInformacion';
import { obtenerProductos } from './services/productService';
import { obtenerCategorias } from './services/categoryService';
import { crearUsuario, normalizarCorreo, obtenerUsuarios, ROL_BASICO, usuarioEstaActivo } from './services/userService';
import { obtenerClientes } from './services/clientService';
import { obtenerOrdenes } from './services/orderService';
import { obtenerEstados } from './services/orderStatusService';
import { obtenerInformacion } from './services/informationService';

const CLAVE_SESION = 'grano-colombiano-sesion';

const obtenerSesionGuardada = () => {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_SESION)) || null;
  } catch {
    return null;
  }
};

function App() {
  const [categoriaActiva, setCategoriaActiva] = useState("Inicio");
  const [cartCount, setCartCount] = useState(0);
  const [vista, setVista] = useState("catalogo");
  const [sesion, setSesion] = useState(obtenerSesionGuardada);
  const [modalAuth, setModalAuth] = useState(null);
  const [procesandoAuth, setProcesandoAuth] = useState(false);
  // vista: "catalogo" | "admin" (productos) | "categorias" | "usuarios" | "clientes" | "ordenes" | "estados"

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [estados, setEstados] = useState([]);
  const [informacion, setInformacion] = useState([]);
  const [cargandoInformacion, setCargandoInformacion] = useState(true);

  const [cargando, setCargando] = useState(true);
  const [cargandoCategorias, setCargandoCategorias] = useState(true);
  const [cargandoUsuarios, setCargandoUsuarios] = useState(true);
  const [cargandoClientes, setCargandoClientes] = useState(true);
  const [cargandoOrdenes, setCargandoOrdenes] = useState(true);
  const [cargandoEstados, setCargandoEstados] = useState(true);

  const cargarProductos = () => {
    setCargando(true);
    obtenerProductos()
      .then((data) => { setProductos(Array.isArray(data) ? data : []); setCargando(false); })
      .catch((error) => { console.error('Error al obtener los productos:', error); setCargando(false); });
  };

  const cargarCategorias = () => {
    setCargandoCategorias(true);
    obtenerCategorias()
      .then((data) => { setCategorias(Array.isArray(data) ? data : []); setCargandoCategorias(false); })
      .catch((error) => { console.error('Error al obtener las categorías:', error); setCargandoCategorias(false); });
  };

  const cargarUsuarios = () => {
    setCargandoUsuarios(true);
    obtenerUsuarios()
      .then((data) => { setUsuarios(Array.isArray(data) ? data : []); setCargandoUsuarios(false); })
      .catch((error) => { console.error('Error al obtener los usuarios:', error); setCargandoUsuarios(false); });
  };

  const cargarClientes = () => {
    setCargandoClientes(true);
    obtenerClientes()
      .then((data) => { setClientes(Array.isArray(data) ? data : []); setCargandoClientes(false); })
      .catch((error) => { console.error('Error al obtener los clientes:', error); setCargandoClientes(false); });
  };

  const cargarOrdenes = () => {
    setCargandoOrdenes(true);
    obtenerOrdenes()
      .then((data) => { setOrdenes(Array.isArray(data) ? data : []); setCargandoOrdenes(false); })
      .catch((error) => { console.error('Error al obtener las órdenes:', error); setCargandoOrdenes(false); });
  };

  const cargarEstados = () => {
    setCargandoEstados(true);
    obtenerEstados()
      .then((data) => { setEstados(Array.isArray(data) ? data : []); setCargandoEstados(false); })
      .catch((error) => { console.error('Error al obtener los estados:', error); setCargandoEstados(false); });
  };
  const cargarInformacion = () => {
    setCargandoInformacion(true);
    obtenerInformacion().then((data) => setInformacion(Array.isArray(data) ? data : [])).catch((error) => console.error('Error al obtener la información:', error)).finally(() => setCargandoInformacion(false));
  };

  useEffect(() => {
    cargarProductos();
    cargarCategorias();
    cargarUsuarios();
    cargarClientes();
    cargarOrdenes();
    cargarEstados();
    cargarInformacion();
  }, []);

  const productosFiltrados = categoriaActiva === "Inicio"
    ? productos
    : productos.filter((producto) => producto.categoria === categoriaActiva);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const esAdministrador = sesion?.rol === 'admin';

  const guardarSesion = (usuario) => {
    const sesionNueva = { nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol };
    localStorage.setItem(CLAVE_SESION, JSON.stringify(sesionNueva));
    setSesion(sesionNueva);
    setModalAuth(null);
  };

  const iniciarSesion = async ({ correo, clave }) => {
    const correoNormalizado = normalizarCorreo(correo);
    setProcesandoAuth(true);
    try {
      const usuariosActuales = await obtenerUsuarios();
      const usuario = usuariosActuales.find((item) => (
        normalizarCorreo(item.correo) === correoNormalizado && item.clave === clave && usuarioEstaActivo(item)
      ));
      if (!usuario) {
        alert('Correo o contraseña incorrectos.');
        return;
      }
      guardarSesion(usuario);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('No fue posible iniciar sesión. Intenta nuevamente.');
    } finally {
      setProcesandoAuth(false);
    }
  };

  const registrarUsuario = async ({ nombre, correo, clave }) => {
    const correoNormalizado = normalizarCorreo(correo);
    setProcesandoAuth(true);
    try {
      const usuariosActuales = await obtenerUsuarios();
      const correoYaRegistrado = usuariosActuales.some((usuario) => normalizarCorreo(usuario.correo) === correoNormalizado);
      if (correoYaRegistrado) {
        alert('Ya existe una cuenta registrada con este correo.');
        return;
      }

      const usuario = await crearUsuario({
        nombre: nombre.trim(),
        correo: correoNormalizado,
        clave,
        estado: true,
        rol: ROL_BASICO
      });
      cargarUsuarios();
      guardarSesion(usuario);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('No fue posible crear la cuenta. Intenta nuevamente.');
    } finally {
      setProcesandoAuth(false);
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem(CLAVE_SESION);
    setSesion(null);
    setVista('catalogo');
  };

  const cambiarVista = (nuevaVista) => {
    const esVistaAdmin = nuevaVista !== 'catalogo';
    setVista(esVistaAdmin && !esAdministrador ? 'catalogo' : nuevaVista);
  };

  const renderVistaAdmin = () => {
    switch (vista) {
      case "admin":
        return (
          <GestionProductos
            productos={productos}
            categorias={categorias}
            onActualizarProductos={cargarProductos}
            cargando={cargando}
          />
        );
      case "categorias":
        return (
          <GestionCategorias
            categorias={categorias}
            onActualizarCategorias={cargarCategorias}
            cargando={cargandoCategorias}
          />
        );
      case "usuarios":
        return (
          <GestionUsuarios
            usuarios={usuarios}
            onActualizarUsuarios={cargarUsuarios}
            cargando={cargandoUsuarios}
          />
        );
      case "clientes":
        return (
          <GestionClientes
            clientes={clientes}
            onActualizarClientes={cargarClientes}
            cargando={cargandoClientes}
          />
        );
      case "ordenes":
        return (
          <GestionOrdenes
            ordenes={ordenes}
            clientes={clientes}
            estados={estados}
            onActualizarOrdenes={cargarOrdenes}
            cargando={cargandoOrdenes}
          />
        );
      case "estados":
        return (
          <GestionEstados
            estados={estados}
            onActualizarEstados={cargarEstados}
            cargando={cargandoEstados}
          />
        );
      case "informacion":
        return <GestionInformacion informacion={informacion} onActualizarInformacion={cargarInformacion} cargando={cargandoInformacion} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-layout">
      <Header
        categorias={categorias}
        categoriaActiva={categoriaActiva}
        onSelectCategoria={setCategoriaActiva}
        cartCount={cartCount}
        vista={vista}
        onCambiarVista={cambiarVista}
        esAdministrador={esAdministrador}
        sesion={sesion}
        onAbrirAuth={setModalAuth}
        onCerrarSesion={cerrarSesion}
      />

      <main className="app-container">
        {vista === "catalogo" ? (
          <>
            {/* Banner Section */}
            <Banner />

            {/* Section Header */}
            <section className="catalog-header">
              <div>
                <h2 className="catalog-title">
                  {categoriaActiva === "Inicio" ? "Todos los Productos" : categoriaActiva}
                </h2>
                <p className="catalog-count">{productosFiltrados.length} producto(s) disponibles</p>
              </div>
            </section>

            {/* Product Grid */}
            <section className="product-grid">
              {cargando ? (
                <p className="loading-text">Cargando productos...</p>
              ) : (
                productosFiltrados.map((producto) => (
                  <Product
                    key={producto.id}
                    indice={producto.id}
                    nombre={producto.nombre}
                    descripcion={producto.descripcion}
                    precio={producto.precio}
                    imagen={producto.imagen}
                    onAddToCart={handleAddToCart}
                  />
                ))
              )}
            </section>
          </>
        ) : esAdministrador ? (
          renderVistaAdmin()
        ) : (
          null
        )}
      </main>

      {/* Footer integrado directamente en App.jsx */}
      <Footer
        categorias={categorias}
        informacion={informacion[0]}
        setCategoriaActiva={(cat) => {
          setCategoriaActiva(cat);
          setVista("catalogo");
        }}
      />
      {modalAuth && (
        <AuthModal
          modo={modalAuth}
          onCerrar={() => setModalAuth(null)}
          onIniciarSesion={iniciarSesion}
          onRegistrarse={registrarUsuario}
          procesando={procesandoAuth}
        />
      )}
    </div>
  );
}

export default App;
