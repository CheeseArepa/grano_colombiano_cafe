import { useEffect, useState } from 'react';
import { actualizarInformacion, crearInformacion } from '../../services/informationService';

const formularioInicial = { nombre: '', telefono: '', direccion: '', horario: '' };

const obtenerDatosFormulario = (registro) => ({
  nombre: registro?.nombre || '',
  telefono: registro?.telefono || '',
  direccion: registro?.direccion || '',
  horario: registro?.horario || ''
});

export function GestionInformacion({ informacion = [], onActualizarInformacion, cargando }) {
  const registro = informacion[0] || null;
  const [editando, setEditando] = useState(false);
  const [datosFormulario, setDatosFormulario] = useState(formularioInicial);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (registro) {
      setDatosFormulario(obtenerDatosFormulario(registro));
      setEditando(false);
    } else if (!cargando) {
      setDatosFormulario(formularioInicial);
      setEditando(true);
    }
  }, [registro, cargando]);

  const guardar = async (event) => {
    event.preventDefault();
    setGuardando(true);
    const informacionLimpia = Object.fromEntries(Object.entries(datosFormulario).map(([campo, valor]) => [campo, valor.trim()]));

    try {
      if (registro) await actualizarInformacion(registro.id, informacionLimpia);
      else await crearInformacion(informacionLimpia);
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
    setDatosFormulario(obtenerDatosFormulario(registro));
    setEditando(false);
  };

  const cambiarCampo = (event) => {
    const { name, value } = event.target;
    setDatosFormulario((datosActuales) => ({ ...datosActuales, [name]: value }));
  };

  return <section className="gestion-productos-section">
    <div className="gestion-header"><h2>Información del negocio</h2><p>Administra nombre, contacto, dirección y horario.</p></div>
    {cargando ? <p className="loading-text">Cargando información...</p> : editando || !registro ? <div className="card-form-container"><form onSubmit={guardar} className="product-form"><div className="form-grid">
      {Object.entries({ nombre: 'Nombre', telefono: 'Teléfono', direccion: 'Dirección', horario: 'Horario' }).map(([campo, etiqueta]) => <div className="form-group" key={campo}><label htmlFor={campo} className="form-label">{etiqueta} *</label><input id={campo} name={campo} className="form-input" value={datosFormulario[campo]} onChange={cambiarCampo} required /></div>)}
    </div><div className="form-actions"><button className="btn-save" disabled={guardando}>{guardando ? 'Guardando...' : 'Aceptar'}</button>{registro && <button type="button" className="btn-cancel" onClick={cancelar} disabled={guardando}>Cancelar</button>}</div></form></div> : <div className="card-form-container"><div className="form-grid">
      {Object.entries({ nombre: 'Nombre', telefono: 'Teléfono', direccion: 'Dirección', horario: 'Horario' }).map(([campo, etiqueta]) => <div className="form-group" key={campo}><span className="form-label">{etiqueta}</span><input className="form-input" value={datosFormulario[campo]} readOnly /></div>)}
    </div><div className="form-actions"><button type="button" className="btn-action-edit" onClick={() => setEditando(true)}>Editar</button></div></div>}
  </section>;
}
