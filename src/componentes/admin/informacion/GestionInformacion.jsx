import { useState } from 'react';
import { actualizarInformacion, crearInformacion } from '../../../servicios/informacionServicio';
import { recortarTextos } from '../../../utilidades/formato';
import { AccionesFormulario } from '../../comunes/AccionesFormulario';
import { CampoTexto } from '../../comunes/CampoTexto';
import { MensajeCarga } from '../../comunes/MensajeCarga';
import { SeccionAdmin } from '../../comunes/SeccionAdmin';

const CAMPOS = [
  { nombre: 'nombre', etiqueta: 'Nombre' },
  { nombre: 'telefono', etiqueta: 'Teléfono' },
  { nombre: 'direccion', etiqueta: 'Dirección' },
  { nombre: 'horario', etiqueta: 'Horario' }
];

const VALORES_INICIALES = Object.fromEntries(CAMPOS.map(({ nombre }) => [nombre, '']));

const construirValores = (registro) => Object.fromEntries(
  CAMPOS.map(({ nombre }) => [nombre, registro?.[nombre] || ''])
);

/**
 * La información del negocio es un registro único (el primero de la colección),
 * por eso no usa el patrón lista + formulario del resto de módulos: alterna
 * entre una ficha de solo lectura y su edición.
 */
export function GestionInformacion({ informacion = [], onActualizarInformacion, cargando }) {
  const registro = informacion[0] || null;
  const [valores, setValores] = useState(VALORES_INICIALES);
  const [editando, setEditando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [registroSincronizado, setRegistroSincronizado] = useState(registro);

  // Cada vez que llega un registro nuevo de la API se refleja en la ficha y se
  // sale del modo edición. Se ajusta durante el render (patrón recomendado por
  // React) en lugar de con un efecto, que provocaría un render extra.
  // Cuando no hay registro, la condición `!registro` de más abajo ya muestra el
  // formulario de alta, así que no hace falta forzar `editando`.
  if (registro !== registroSincronizado) {
    setRegistroSincronizado(registro);
    setValores(construirValores(registro));
    setEditando(false);
  }

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setValores((actuales) => ({ ...actuales, [name]: value }));
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    setGuardando(true);

    try {
      const datos = recortarTextos(valores);

      if (registro) await actualizarInformacion(registro.id, datos);
      else await crearInformacion(datos);

      await onActualizarInformacion();
      setEditando(false);
    } catch (error) {
      console.error('Error al guardar la información:', error);
      alert('No fue posible guardar la información.');
    } finally {
      setGuardando(false);
    }
  };

  const cancelar = () => {
    setValores(construirValores(registro));
    setEditando(false);
  };

  return (
    <SeccionAdmin
      titulo="Información del negocio"
      descripcion="Administra nombre, contacto, dirección y horario."
    >
      {cargando && <MensajeCarga texto="Cargando información..." />}

      {!cargando && (editando || !registro) && (
        <div className="card-form-container">
          <form onSubmit={manejarEnvio} className="product-form">
            <div className="form-grid">
              {CAMPOS.map(({ nombre, etiqueta }) => (
                <CampoTexto
                  key={nombre}
                  nombre={nombre}
                  etiqueta={etiqueta}
                  requerido
                  value={valores[nombre]}
                  onChange={manejarCambio}
                />
              ))}
            </div>

            <AccionesFormulario
              esEdicion={Boolean(registro)}
              guardando={guardando}
              etiquetaGuardar="Aceptar"
              etiquetaActualizar="Aceptar"
              etiquetaCancelar="Cancelar"
              onCancelar={cancelar}
            />
          </form>
        </div>
      )}

      {!cargando && !editando && registro && (
        <div className="card-form-container">
          <div className="form-grid">
            {CAMPOS.map(({ nombre, etiqueta }) => (
              <div className="form-group" key={nombre}>
                <span className="form-label">{etiqueta}</span>
                <input className="form-input" value={valores[nombre]} readOnly />
              </div>
            ))}
          </div>
          <div className="form-actions">
            <button type="button" className="btn-action-edit" onClick={() => setEditando(true)}>
              Editar
            </button>
          </div>
        </div>
      )}
    </SeccionAdmin>
  );
}
