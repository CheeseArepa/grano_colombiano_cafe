import { MenuInferior } from "./MenuInferior";
import { CoffeeBeanIcon } from "./icons/CoffeeBeanIcon";

export function Footer({ categorias = [], setCategoriaActiva, informacion }) {

    return (
        <>
        <footer className="app-footer">
        <div className="footer-inner">
          <div className="footer-brand-section">
            <div className="footer-brand">
              <span className="brand-logo"><CoffeeBeanIcon size={20} /></span>
              <span className="brand-name">Grano<span className="brand-highlight"> Colombiano</span></span>
            </div>
            <p className="footer-description">
              Grano 100% colombiano de origen único, tostado en lotes pequeños para llevar el sabor de la finca a tu taza.
            </p>
          </div>

          <div className="footer-links-group">
            <MenuInferior categorias={categorias} setCategoriaActiva={setCategoriaActiva}/>

            <div className="footer-column">
              <h4 className="footer-heading">Contacto & Horarios</h4>
              <p className="footer-info">📍 {informacion?.direccion || 'Dirección no disponible'}</p>
              <p className="footer-info">🕒 {informacion?.horario || 'Horario no disponible'}</p>
              <p className="footer-info">📞 {informacion?.telefono || 'Teléfono no disponible'}</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Grano Colombiano. Todos los derechos reservados.</p>
        </div>
      </footer>
        </>
    );
}


    
