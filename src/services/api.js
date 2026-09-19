export async function solicitarApi(url, opciones) {
  const respuesta = await fetch(url, opciones);
  if (!respuesta.ok) {
    throw new Error(`MockAPI respondió ${respuesta.status}`);
  }

  return respuesta.status === 204 ? null : respuesta.json();
}
