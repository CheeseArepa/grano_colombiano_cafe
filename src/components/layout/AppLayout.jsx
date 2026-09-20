import { Outlet, useNavigate } from 'react-router';
import { Header } from '../Header';
import { Footer } from '../Footer';

export function AppLayout({ contexto }) {
  const navigate = useNavigate();

  const seleccionarCategoria = (categoria) => {
    contexto.setCategoriaActiva(categoria);
    navigate('/catalogo');
  };

  return (
    <div className="app-layout">
      <Header
        categorias={contexto.categorias}
        categoriaActiva={contexto.categoriaActiva}
        onSelectCategoria={seleccionarCategoria}
        cartCount={contexto.cartCount}
        esAdministrador={contexto.sesion?.rol === 'admin'}
        sesion={contexto.sesion}
        onAbrirAuth={contexto.abrirAuth}
        onCerrarSesion={contexto.cerrarSesion}
      />
      <main className="app-container"><Outlet context={contexto} /></main>
      <Footer
        categorias={contexto.categorias}
        informacion={contexto.informacion[0]}
        setCategoriaActiva={seleccionarCategoria}
      />
    </div>
  );
}
