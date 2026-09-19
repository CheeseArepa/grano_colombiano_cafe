import { useState } from 'react';
import { FormularioEstado } from './FormularioEstado';
import { ListaEstadosAdmin } from './ListaEstadosAdmin';
import { crearEstado, actualizarEstado, eliminarEstado } from '../../services/orderStatusService';

export function GestionEstados({ estados = [], onActualizarEstados, cargando }) {
  const [estadoAEditar, setEstadoAEditar] = useState(null);
  const [guardando, setGuardando] = useState(false);

  const handleGuardar = (formData) => {
    setGuardando(true);
    if (estadoAEditar) {
      actualizarEstado(estadoAEditar.id, formData)
        .then(() => {
          alert('Estado actualizado con éxito');
          setEstadoAEditar(null);
          onActualizarEstados();
        })
        .catch((err) => { console.error('Error al actualizar estado:', err); alert('Error al actualizar el estado'); })
        .finally(() => setGuardando(false));
    } else {
      crearEstado(formData)
        .then(() => { alert('Estado creado con éxito'); onActualizarEstados(); })
        .catch((err) => { console.error('Error al crear estado:', err); alert('Error al registrar el estado'); })
        .finally(() => setGuardando(false));
    }
  };

  const handleEditar = (e) => { setEstadoAEditar(e); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleCancelarEditar = () => setEstadoAEditar(null);

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este estado?')) {
      eliminarEstado(id)
        .then(() => {
          alert('Estado eliminado con éxito');
          if (estadoAEditar && estadoAEditar.id === id) setEstadoAEditar(null);
          onActualizarEstados();
        })
        .catch((err) => { console.error('Error al eliminar estado:', err); alert('Error al eliminar el estado'); });
    }
  };

  return (
    <section className="gestion-productos-section">
      <div className="gestion-header">
        <h2>🏷️ Gestión de Estados de la Orden</h2>
        <p>Define y administra los estados posibles del ciclo de vida de una orden.</p>
      </div>

      <FormularioEstado estadoAEditar={estadoAEditar} onGuardar={handleGuardar} onCancelar={handleCancelarEditar} guardando={guardando} />
      <ListaEstadosAdmin estados={estados} onEditar={handleEditar} onEliminar={handleEliminar} cargando={cargando} />
    </section>
  );
}
