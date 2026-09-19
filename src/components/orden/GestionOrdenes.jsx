import { useState } from 'react';
import { FormularioOrden } from './FormularioOrden';
import { ListaOrdenesAdmin } from './ListaOrdenesAdmin';
import { crearOrden, actualizarOrden, eliminarOrden } from '../../services/orderService';

export function GestionOrdenes({ ordenes = [], clientes = [], estados = [], onActualizarOrdenes, cargando }) {
  const [ordenAEditar, setOrdenAEditar] = useState(null);
  const [guardando, setGuardando] = useState(false);

  const handleGuardar = (formData) => {
    setGuardando(true);
    if (ordenAEditar) {
      actualizarOrden(ordenAEditar.id, formData)
        .then(() => {
          alert('Orden actualizada con éxito');
          setOrdenAEditar(null);
          onActualizarOrdenes();
        })
        .catch((err) => { console.error('Error al actualizar orden:', err); alert('Error al actualizar la orden'); })
        .finally(() => setGuardando(false));
    } else {
      crearOrden(formData)
        .then(() => { alert('Orden creada con éxito'); onActualizarOrdenes(); })
        .catch((err) => { console.error('Error al crear orden:', err); alert('Error al registrar la orden'); })
        .finally(() => setGuardando(false));
    }
  };

  const handleEditar = (o) => { setOrdenAEditar(o); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleCancelarEditar = () => setOrdenAEditar(null);

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta orden?')) {
      eliminarOrden(id)
        .then(() => {
          alert('Orden eliminada con éxito');
          if (ordenAEditar && ordenAEditar.id === id) setOrdenAEditar(null);
          onActualizarOrdenes();
        })
        .catch((err) => { console.error('Error al eliminar orden:', err); alert('Error al eliminar la orden'); });
    }
  };

  return (
    <section className="gestion-productos-section">
      <div className="gestion-header">
        <h2>🧾 Gestión de Órdenes</h2>
        <p>Registra nuevas órdenes o edita/elimina las existentes.</p>
      </div>

      <FormularioOrden ordenAEditar={ordenAEditar} clientes={clientes} estados={estados} onGuardar={handleGuardar} onCancelar={handleCancelarEditar} guardando={guardando} />
      <ListaOrdenesAdmin ordenes={ordenes} onEditar={handleEditar} onEliminar={handleEliminar} cargando={cargando} />
    </section>
  );
}
