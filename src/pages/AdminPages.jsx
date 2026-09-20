import { useOutletContext } from 'react-router';
import { GestionProductos } from '../components/producto/GestionProductos';
import { GestionCategorias } from '../components/categoria/GestionCategorias';
import { GestionUsuarios } from '../components/usuario/GestionUsuarios';
import { GestionClientes } from '../components/cliente/GestionClientes';
import { GestionOrdenes } from '../components/orden/GestionOrdenes';
import { GestionEstados } from '../components/estado/GestionEstados';
import { GestionInformacion } from '../components/information/GestionInformacion';

export function ProductosAdminPage() { const c = useOutletContext(); return <GestionProductos productos={c.productos} categorias={c.categorias} onActualizarProductos={c.cargarProductos} cargando={c.cargando} />; }
export function CategoriasAdminPage() { const c = useOutletContext(); return <GestionCategorias categorias={c.categorias} onActualizarCategorias={c.cargarCategorias} cargando={c.cargandoCategorias} />; }
export function UsuariosAdminPage() { const c = useOutletContext(); return <GestionUsuarios usuarios={c.usuarios} onActualizarUsuarios={c.cargarUsuarios} cargando={c.cargandoUsuarios} />; }
export function ClientesAdminPage() { const c = useOutletContext(); return <GestionClientes clientes={c.clientes} onActualizarClientes={c.cargarClientes} cargando={c.cargandoClientes} />; }
export function OrdenesAdminPage() { const c = useOutletContext(); return <GestionOrdenes ordenes={c.ordenes} clientes={c.clientes} estados={c.estados} onActualizarOrdenes={c.cargarOrdenes} cargando={c.cargandoOrdenes} />; }
export function EstadosAdminPage() { const c = useOutletContext(); return <GestionEstados estados={c.estados} onActualizarEstados={c.cargarEstados} cargando={c.cargandoEstados} />; }
export function InformacionAdminPage() { const c = useOutletContext(); return <GestionInformacion informacion={c.informacion} onActualizarInformacion={c.cargarInformacion} cargando={c.cargandoInformacion} />; }
