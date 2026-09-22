import { useCallback, useState } from 'react';

const leerValorDelCampo = ({ type, value, checked }) => (
  type === 'checkbox' ? checked : value
);

/**
 * Estado compartido de los formularios de administración.
 *
 * Todos siguen el mismo patrón: valores vacíos al crear, valores del registro
 * al editar, un `onChange` genérico por `name` y reinicio al cambiar el
 * registro seleccionado.
 *
 * El reinicio se hace ajustando el estado durante el render (patrón
 * recomendado por React para derivar estado de una prop) y no con un efecto:
 * así el formulario nunca llega a pintarse un frame con los valores anteriores.
 *
 * @param {(registro?: object) => object} construirValores Mapea el registro a
 *        editar hacia los valores del formulario. Recibe `undefined`/`null`
 *        cuando se está creando y debe devolver el estado inicial vacío.
 * @param {object|null} registroAEditar Registro seleccionado, o `null`.
 */
export function useFormulario(construirValores, registroAEditar) {
  const [valores, setValores] = useState(construirValores);
  const [registroSincronizado, setRegistroSincronizado] = useState(registroAEditar);

  if (registroAEditar !== registroSincronizado) {
    setRegistroSincronizado(registroAEditar);
    setValores(construirValores(registroAEditar));
  }

  const manejarCambio = useCallback((evento) => {
    const { name } = evento.target;
    const valor = leerValorDelCampo(evento.target);

    setValores((actuales) => ({ ...actuales, [name]: valor }));
  }, []);

  const asignarCampo = useCallback((campo, valor) => {
    setValores((actuales) => ({ ...actuales, [campo]: valor }));
  }, []);

  return { valores, manejarCambio, asignarCampo, esEdicion: Boolean(registroAEditar) };
}
