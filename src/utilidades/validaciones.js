/** Validación de los datos de entrega. Devuelve un objeto campo → mensaje. */

const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Teléfonos colombianos: 7 dígitos (fijo) a 10 (celular). Se ignoran espacios,
// guiones, paréntesis y el prefijo +57 al contar.
const MIN_DIGITOS_TELEFONO = 7;
const MAX_DIGITOS_TELEFONO = 10;

const soloDigitos = (valor) => valor.replace(/\D/g, '').replace(/^57(?=\d{10}$)/, '');

export const validarDatosCliente = (datos) => {
  const errores = {};
  const nombre = datos.nombre.trim();
  const telefono = datos.telefono.trim();
  const correo = datos.correo.trim();
  const direccion = datos.direccion.trim();

  if (!nombre) errores.nombre = 'Ingresa tu nombre completo.';
  else if (nombre.length < 3) errores.nombre = 'El nombre debe tener al menos 3 caracteres.';

  if (!telefono) {
    errores.telefono = 'Ingresa un teléfono de contacto.';
  } else {
    const digitos = soloDigitos(telefono);
    if (digitos.length < MIN_DIGITOS_TELEFONO || digitos.length > MAX_DIGITOS_TELEFONO) {
      errores.telefono = `El teléfono debe tener entre ${MIN_DIGITOS_TELEFONO} y ${MAX_DIGITOS_TELEFONO} dígitos.`;
    }
  }

  if (!correo) errores.correo = 'Ingresa tu correo electrónico.';
  else if (!CORREO_VALIDO.test(correo)) errores.correo = 'Ingresa un correo válido, por ejemplo nombre@dominio.com.';

  if (!direccion) errores.direccion = 'Ingresa la dirección de entrega.';
  else if (direccion.length < 5) errores.direccion = 'La dirección debe ser más específica.';

  return errores;
};

export const hayErrores = (errores) => Object.keys(errores).length > 0;
