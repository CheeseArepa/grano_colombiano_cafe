import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { CLAVE_SESION, ROL_BASICO } from '../constantes/dominio';
import { RUTAS } from '../constantes/rutas';
import {
  autenticarUsuario,
  crearUsuario,
  existeCorreoRegistrado,
  normalizarCorreo
} from '../servicios/usuarioServicio';

const leerSesionGuardada = () => {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_SESION)) || null;
  } catch {
    return null;
  }
};

// Solo se persisten los datos de identificación; nunca la clave.
const datosDeSesion = ({ id, nombre, correo, rol }) => ({ id, nombre, correo, rol });

/** Concentra la sesión del usuario y el modal de acceso/registro. */
export function useSesion() {
  const location = useLocation();
  const navigate = useNavigate();

  const [sesion, setSesion] = useState(leerSesionGuardada);
  const [modoAutenticacion, setModoAutenticacion] = useState(null);
  const [procesando, setProcesando] = useState(false);

  // `RutaAdmin` redirige al catálogo pidiendo autenticación cuando se intenta
  // entrar al panel sin sesión; ese estado abre el modal automáticamente.
  useEffect(() => {
    if (location.state?.modoAutenticacion) setModoAutenticacion(location.state.modoAutenticacion);
  }, [location.state]);

  const iniciarSesionCon = useCallback((usuario) => {
    const nuevaSesion = datosDeSesion(usuario);

    localStorage.setItem(CLAVE_SESION, JSON.stringify(nuevaSesion));
    setSesion(nuevaSesion);
    setModoAutenticacion(null);
    navigate(location.state?.origen || location.pathname || RUTAS.CATALOGO, { replace: true });
  }, [navigate, location.state, location.pathname]);

  const iniciarSesion = useCallback(async ({ correo, clave }) => {
    setProcesando(true);

    try {
      const usuario = await autenticarUsuario({ correo, clave });

      if (!usuario) {
        alert('Correo o contraseña incorrectos.');
        return;
      }

      iniciarSesionCon(usuario);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('No fue posible iniciar sesión. Intenta nuevamente.');
    } finally {
      setProcesando(false);
    }
  }, [iniciarSesionCon]);

  const registrarUsuario = useCallback(async ({ nombre, correo, clave }) => {
    setProcesando(true);

    try {
      if (await existeCorreoRegistrado(correo)) {
        alert('Ya existe una cuenta registrada con este correo.');
        return;
      }

      const usuario = await crearUsuario({
        nombre: nombre.trim(),
        correo: normalizarCorreo(correo),
        clave,
        estado: true,
        rol: ROL_BASICO
      });

      iniciarSesionCon(usuario);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('No fue posible crear la cuenta. Intenta nuevamente.');
    } finally {
      setProcesando(false);
    }
  }, [iniciarSesionCon]);

  const cerrarSesion = useCallback(() => {
    localStorage.removeItem(CLAVE_SESION);
    setSesion(null);
    navigate(RUTAS.CATALOGO);
  }, [navigate]);

  const cerrarModal = useCallback(() => {
    setModoAutenticacion(null);
    // Limpia el estado de navegación para que el modal no reaparezca al volver.
    if (location.state?.modoAutenticacion) navigate(RUTAS.CATALOGO, { replace: true });
  }, [location.state, navigate]);

  return {
    sesion,
    modoAutenticacion,
    procesando,
    abrirModal: setModoAutenticacion,
    cerrarModal,
    iniciarSesion,
    registrarUsuario,
    cerrarSesion
  };
}
