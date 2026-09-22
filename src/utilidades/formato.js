/** Aplica `trim()` a todos los valores de texto de un objeto plano. */
export const recortarTextos = (valores) => Object.fromEntries(
  Object.entries(valores).map(([campo, valor]) => [
    campo,
    typeof valor === 'string' ? valor.trim() : valor
  ])
);

const FORMATO_PESOS = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

/**
 * Formatea un valor como pesos colombianos: `25000` → `$25.000`.
 * `Intl` intercala un espacio duro entre el símbolo y la cifra; se retira para
 * que quede como se muestra en el resto de la interfaz.
 */
export const formatearPesos = (valor) => FORMATO_PESOS
  .format(Number(valor) || 0)
  .replace(/ /g, '');

/** Fecha legible en español: `21 de septiembre de 2026, 14:35`. */
export const formatearFecha = (valor) => new Intl.DateTimeFormat('es-CO', {
  dateStyle: 'long',
  timeStyle: 'short'
}).format(new Date(valor));
