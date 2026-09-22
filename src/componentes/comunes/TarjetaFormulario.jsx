import { EncabezadoFormulario } from './EncabezadoFormulario';

/** Tarjeta que envuelve un formulario de administración: encabezado + `<form>`. */
export function TarjetaFormulario({ titulo, subtitulo, onSubmit, children }) {
  return (
    <div className="card-form-container">
      <EncabezadoFormulario titulo={titulo} subtitulo={subtitulo} />
      <form onSubmit={onSubmit} className="product-form">{children}</form>
    </div>
  );
}
