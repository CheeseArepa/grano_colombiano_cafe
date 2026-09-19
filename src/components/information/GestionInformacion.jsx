import { useEffect, useState } from 'react';
import { actualizarInformacion, crearInformacion, eliminarInformacion } from '../../services/informationService';

const formularioInicial = { nombre: '', telefono: '', direccion: '', horario: '' };

export function GestionInformacion({ informacion = [], onActualizarInformacion, cargando }) {
  const [registroAEditar, setRegistroAEditar] = useState(null);
  const [datosFormulario, setDatosFormulario] = useState(formularioInicial);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    setDatosFormulario(registroAEditar ? {
      nombre: registroAEditar.nombre || '', telefono: registroAEditar.telefono || '',
      direccion: registroAEditar.direccion || '', horario: registroAEditar.horario || ''
    } : formularioInicial);
  }, [registroAEditar]);

  const guardar = async (event) => {
    event.preventDefault();
    setGuardando(true);
    const informacionLimpia = Object.fromEntries(Object.entries(datosFormulario).map(([campo, valor]) => [campo, valor.trim()]));
    try {
      if (registroAEditar) await actualizarInformacion(registroAEditar.id, informacionLimpia);
      else await crearInformacion(informacionLimpia);
      setRegistroAEditar(null);
      onActualizarInformacion();
    } catch (error) {
      console.error('Error al guardar la información:', error);
      alert('No fue posible guardar la información.');
    } finally { setGuardando(false); }
  };

  const eliminar = async (id) => {
    if (!window.confirm('¿Eliminar este registro de información?')) return;
    try { await eliminarInformacion(id); if (registroAEditar?.id === id) setRegistroAEditar(null); onActualizarInformacion(); }
    catch (error) { console.error('Error al eliminar la información:', error); alert('No fue posible eliminar la información.'); }
  };

  return <section className="gestion-productos-section">
    <div className="gestion-header"><h2>Información del negocio</h2><p>Administra nombre, contacto, dirección y horario.</p></div>
    <div className="card-form-container"><form onSubmit={guardar} className="product-form"><div className="form-grid">
      {Object.entries({ nombre: 'Nombre', telefono: 'Teléfono', direccion: 'Dirección', horario: 'Horario' }).map(([campo, etiqueta]) => <div className="form-group" key={campo}><label htmlFor={campo} className="form-label">{etiqueta} *</label><input id={campo} name={campo} className="form-input" value={datosFormulario[campo]} onChange={(e) => setDatosFormulario((datosActuales) => ({ ...datosActuales, [campo]: e.target.value }))} required /></div>)}
    </div><div className="form-actions"><button className="btn-save" disabled={guardando}>{guardando ? 'Guardando...' : registroAEditar ? 'Actualizar información' : 'Guardar información'}</button>{registroAEditar && <button type="button" className="btn-cancel" onClick={() => setRegistroAEditar(null)}>Cancelar</button>}</div></form></div>
    {cargando ? <p className="loading-text">Cargando información...</p> : <div className="admin-table-container"><div className="table-responsive"><table className="admin-table"><thead><tr><th>Nombre</th><th>Teléfono</th><th>Dirección</th><th>Horario</th><th>Acciones</th></tr></thead><tbody>{informacion.map((registro) => <tr key={registro.id}><td>{registro.nombre}</td><td>{registro.telefono}</td><td>{registro.direccion}</td><td>{registro.horario}</td><td className="td-actions"><button className="btn-action-edit" onClick={() => setRegistroAEditar(registro)}>Editar</button><button className="btn-action-delete" onClick={() => eliminar(registro.id)}>Eliminar</button></td></tr>)}</tbody></table></div></div>}
  </section>;
}
