import { useState } from 'react';
import { FormularioUsuario } from './FormularioUsuario';
import { ListaUsuariosAdmin } from './ListaUsuariosAdmin';
import { crearUsuario, actualizarUsuario, eliminarUsuario, obtenerUsuarios } from '../../services/userService';

export function GestionUsuarios({ usuarios = [], onActualizarUsuarios, cargando }) {
  const [usuarioAEditar, setUsuarioAEditar] = useState(null);
  const [guardando, setGuardando] = useState(false);

  const handleGuardar = async (formData) => {
    setGuardando(true);
    if (usuarioAEditar) {
      if (usuarioAEditar.rol === 'admin' && formData.rol !== 'admin') {
        try {
          const usuariosActuales = await obtenerUsuarios();
          const administradores = usuariosActuales.filter((usuario) => usuario.rol === 'admin');
          if (administradores.length <= 1) {
            alert('No se puede cambiar el rol del último administrador.');
            setGuardando(false);
            return;
          }
        } catch (error) {
          console.error('Error al validar administradores:', error);
          alert('No fue posible validar los administradores.');
          setGuardando(false);
          return;
        }
      }
      actualizarUsuario(usuarioAEditar.id, formData)
        .then(() => {
          alert('Usuario actualizado con éxito');
          setUsuarioAEditar(null);
          onActualizarUsuarios();
        })
        .catch((err) => { console.error('Error al actualizar usuario:', err); alert('Error al actualizar el usuario'); })
        .finally(() => setGuardando(false));
    } else {
      crearUsuario(formData)
        .then(() => { alert('Usuario creado con éxito'); onActualizarUsuarios(); })
        .catch((err) => { console.error('Error al crear usuario:', err); alert('Error al registrar el usuario'); })
        .finally(() => setGuardando(false));
    }
  };

  const handleEditar = (u) => { setUsuarioAEditar(u); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleCancelarEditar = () => setUsuarioAEditar(null);

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        const usuariosActuales = await obtenerUsuarios();
        const administradores = usuariosActuales.filter((usuario) => usuario.rol === 'admin');
        const esAdministrador = administradores.some((usuario) => usuario.id === id);
        if (esAdministrador && administradores.length <= 1) {
          alert('No se puede eliminar el último administrador.');
          return;
        }
      } catch (error) {
        console.error('Error al validar administradores:', error);
        alert('No fue posible validar los administradores.');
        return;
      }
      eliminarUsuario(id)
        .then(() => {
          alert('Usuario eliminado con éxito');
          if (usuarioAEditar && usuarioAEditar.id === id) setUsuarioAEditar(null);
          onActualizarUsuarios();
        })
        .catch((err) => { console.error('Error al eliminar usuario:', err); alert('Error al eliminar el usuario'); });
    }
  };

  return (
    <section className="gestion-productos-section">
      <div className="gestion-header">
        <h2>👤 Gestión de Usuarios</h2>
        <p>Registra nuevos usuarios o edita/elimina las cuentas existentes.</p>
      </div>

      <FormularioUsuario usuarioAEditar={usuarioAEditar} onGuardar={handleGuardar} onCancelar={handleCancelarEditar} guardando={guardando} />
      <ListaUsuariosAdmin usuarios={usuarios} onEditar={handleEditar} onEliminar={handleEliminar} cargando={cargando} />
    </section>
  );
}
