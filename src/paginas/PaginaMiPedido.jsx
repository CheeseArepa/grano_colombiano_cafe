import { useState } from 'react';
import { useContextoApp } from '../hooks/useContextoApp';
import { crearOrden } from '../servicios/ordenServicio';
import { construirOrden } from '../utilidades/orden';
import { CarritoVacio } from '../componentes/pedido/CarritoVacio';
import { ConfirmacionPedido } from '../componentes/pedido/ConfirmacionPedido';
import { FormularioDatosCliente } from '../componentes/pedido/FormularioDatosCliente';
import { LineaCarrito } from '../componentes/pedido/LineaCarrito';
import { ResumenPedido } from '../componentes/pedido/ResumenPedido';

const DATOS_VACIOS = { nombre: '', telefono: '', correo: '', direccion: '', notas: '' };

export function PaginaMiPedido() {
  const { sesion, carrito } = useContextoApp();
  const [ordenConfirmada, setOrdenConfirmada] = useState(null);
  const [enviando, setEnviando] = useState(false);

  // Si hay sesión se prellenan nombre y correo; el pedido no exige iniciar sesión.
  const valoresIniciales = {
    ...DATOS_VACIOS,
    nombre: sesion?.nombre || '',
    correo: sesion?.correo || ''
  };

  const confirmar = async (datosCliente) => {
    setEnviando(true);

    try {
      const orden = construirOrden(carrito.lineas, datosCliente);
      const creada = await crearOrden(orden);

      // Se conserva el número generado localmente por si la API no lo devuelve.
      setOrdenConfirmada({ ...orden, ...creada });
      carrito.vaciar();
    } catch (error) {
      console.error('Error al crear la orden:', error);
      alert('No fue posible confirmar el pedido. Intenta nuevamente.');
    } finally {
      setEnviando(false);
    }
  };

  if (ordenConfirmada) {
    return (
      <section className="admin-section">
        <div className="gestion-header">
          <h2>Mi Pedido</h2>
          <p>Gracias por tu compra.</p>
        </div>
        <ConfirmacionPedido orden={ordenConfirmada} />
      </section>
    );
  }

  return (
    <section className="admin-section">
      <div className="gestion-header">
        <h2>Mi Pedido</h2>
        <p>{sesion ? `Pedido de ${sesion.nombre}.` : 'Revisa los productos que has agregado.'}</p>
      </div>

      {carrito.estaVacio ? <CarritoVacio /> : (
        <>
          <div className="carrito-lista">
            {carrito.lineas.map((linea) => (
              <LineaCarrito
                key={linea.id}
                linea={linea}
                onAumentar={carrito.aumentar}
                onDisminuir={carrito.disminuir}
                onEliminar={carrito.eliminar}
              />
            ))}
          </div>

          <ResumenPedido
            unidades={carrito.unidades}
            total={carrito.total}
            onVaciar={carrito.vaciar}
          />

          <div className="card-form-container">
            <FormularioDatosCliente
              valoresIniciales={valoresIniciales}
              enviando={enviando}
              onConfirmar={confirmar}
            />
          </div>
        </>
      )}
    </section>
  );
}
