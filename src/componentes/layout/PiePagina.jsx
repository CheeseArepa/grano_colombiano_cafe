import { IconoGranoCafe } from '../iconos/IconoGranoCafe';
import { ListaCategoriasPie } from './ListaCategoriasPie';

const DATOS_CONTACTO = [
  { icono: '📍', campo: 'direccion', respaldo: 'Dirección no disponible' },
  { icono: '🕒', campo: 'horario', respaldo: 'Horario no disponible' },
  { icono: '📞', campo: 'telefono', respaldo: 'Teléfono no disponible' }
];

export function PiePagina({ categorias = [], informacion, onSeleccionarCategoria }) {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div className="footer-brand-section">
          <div className="footer-brand">
            <span className="brand-logo"><IconoGranoCafe tamano={20} /></span>
            <span className="brand-name">Grano<span className="brand-highlight"> Colombiano</span></span>
          </div>
          <p className="footer-description">
            Grano 100% colombiano de origen único, tostado en lotes pequeños para llevar
            el sabor de la finca a tu taza.
          </p>
        </div>

        <div className="footer-links-group">
          <ListaCategoriasPie
            categorias={categorias}
            onSeleccionarCategoria={onSeleccionarCategoria}
          />

          <div className="footer-column">
            <h4 className="footer-heading">Contacto & Horarios</h4>
            {DATOS_CONTACTO.map(({ icono, campo, respaldo }) => (
              <p className="footer-info" key={campo}>
                {icono} {informacion?.[campo] || respaldo}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Grano Colombiano. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
