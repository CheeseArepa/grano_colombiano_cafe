import { useEffect } from 'react';
import { useFormulario } from '../../../hooks/useFormulario';
import { AccionesFormulario } from '../../comunes/AccionesFormulario';
import { CampoAreaTexto } from '../../comunes/CampoAreaTexto';
import { CampoCasilla } from '../../comunes/CampoCasilla';
import { CampoSelect } from '../../comunes/CampoSelect';
import { CampoTexto } from '../../comunes/CampoTexto';
import { TarjetaFormulario } from '../../comunes/TarjetaFormulario';

const construirValores = (producto) => ({
  nombre: producto?.nombre || '',
  descripcion: producto?.descripcion || '',
  stock: producto?.stock ?? '',
  precio: producto?.precio ?? '',
  categoria: producto?.categoria || '',
  imagen: producto?.imagen || '',
  estado: producto ? Boolean(producto.estado) : true
});

export function FormularioProducto({ productoAEditar, categorias = [], onGuardar, onCancelar, guardando }) {
  const { valores, manejarCambio, asignarCampo, esEdicion } = useFormulario(construirValores, productoAEditar);
  const categoriaPorDefecto = categorias[0]?.nombre || '';

  // Las categorías llegan de forma asíncrona: cuando aparecen, se preselecciona
  // la primera sin pisar lo que el usuario ya haya elegido.
  useEffect(() => {
    if (!valores.categoria && categoriaPorDefecto) asignarCampo('categoria', categoriaPorDefecto);
  }, [valores.categoria, categoriaPorDefecto, asignarCampo]);

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    if (!valores.nombre.trim() || valores.stock === '' || valores.precio === '' || !valores.categoria) {
      alert('Por favor completa nombre, stock, precio y categoría.');
      return;
    }

    onGuardar({
      nombre: valores.nombre.trim(),
      descripcion: valores.descripcion.trim(),
      imagen: valores.imagen.trim(),
      stock: Number(valores.stock),
      precio: Number(valores.precio),
      categoria: valores.categoria,
      estado: Boolean(valores.estado)
    });
  };

  return (
    <TarjetaFormulario
      titulo={esEdicion ? '✏️ Editar Producto' : '➕ Registrar Nuevo Producto'}
      subtitulo={esEdicion
        ? 'Modifica los datos del producto seleccionado'
        : 'Ingresa los datos para agregar un producto al catálogo'}
      onSubmit={manejarEnvio}
    >
      <div className="form-grid">
        <CampoTexto
          nombre="nombre"
          etiqueta="Nombre del Producto"
          requerido
          placeholder="Ej. Café molido Sierra Nevada 500g"
          value={valores.nombre}
          onChange={manejarCambio}
        />
        <CampoTexto
          nombre="precio"
          etiqueta="Precio ($)"
          requerido
          type="number"
          min="0"
          step="0.01"
          value={valores.precio}
          onChange={manejarCambio}
        />
        <CampoTexto
          nombre="stock"
          etiqueta="Stock"
          requerido
          type="number"
          min="0"
          step="1"
          value={valores.stock}
          onChange={manejarCambio}
        />
        <CampoSelect
          nombre="categoria"
          etiqueta="Categoría"
          value={valores.categoria}
          onChange={manejarCambio}
        >
          {categorias.length > 0
            ? categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.nombre}>{categoria.nombre}</option>
            ))
            : <option value="">No hay categorías disponibles</option>}
        </CampoSelect>
        <CampoCasilla
          nombre="estado"
          etiqueta="Activo"
          checked={valores.estado}
          onChange={manejarCambio}
        />
      </div>

      <CampoTexto
        nombre="imagen"
        etiqueta="URL de la Imagen"
        type="url"
        placeholder="https://ejemplo.com/imagen.jpg"
        value={valores.imagen}
        onChange={manejarCambio}
      />

      <CampoAreaTexto
        nombre="descripcion"
        etiqueta="Descripción"
        rows="3"
        placeholder="Detalles sobre el origen, el tueste o las notas de cata del café..."
        value={valores.descripcion}
        onChange={manejarCambio}
      />

      <AccionesFormulario
        esEdicion={esEdicion}
        guardando={guardando}
        etiquetaGuardar="Guardar Producto"
        etiquetaActualizar="Actualizar Producto"
        onCancelar={onCancelar}
      />
    </TarjetaFormulario>
  );
}
