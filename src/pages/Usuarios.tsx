import { useState } from 'react';
import './Usuarios.css';
import EditarUsuarioModal from '../components/EditarUsuarioModal';
import AgregarUsuarioModal from '../components/AgregarUsuarioModal';
import { NotificacionesContainer } from '../components/Notificacion';
import { useNotificaciones } from '../hooks/useNotificaciones';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { USUARIOS_INICIALES } from '../data/datosIniciales';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  fechaCreacion: string;
  estado: 'Activo' | 'Inactivo';
  avatar: string;
  rol?: string;
}

/**
 * Componente: Usuarios
 * Descripción: Gestión completa de usuarios del sistema
 */
export default function Usuarios() {
  // ============================================
  // ESTADOS DEL COMPONENTE
  // ============================================
  
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [mostrarEditarModal, setMostrarEditarModal] = useState(false);
  const [mostrarAgregarModal, setMostrarAgregarModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [filtroEstado, setFiltroEstado] = useState<'Todos' | 'Activo' | 'Inactivo'>('Todos');
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState<Usuario | null>(null);
  
  // Sistema de notificaciones
  const { notificaciones, cerrarNotificacion, success } = useNotificaciones();
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const usuariosPorPagina = 8;

  // ============================================
  // PERSISTENCIA CON LOCALSTORAGE
  // ============================================
  
  // Lista de usuarios con persistencia automática
  const [usuarios, setUsuarios] = useLocalStorage<Usuario[]>('usuarios', USUARIOS_INICIALES);

  // ============================================
  // FUNCIONES DEL COMPONENTE
  // ============================================

  // Filtrar usuarios por búsqueda
  const usuariosFiltrados = usuarios.filter(usuario => {
    const cumpleBusqueda = usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.email.toLowerCase().includes(busqueda.toLowerCase());
    
    const cumpleEstado = filtroEstado === 'Todos' || usuario.estado === filtroEstado;
    
    return cumpleBusqueda && cumpleEstado;
  });

  // Calcular estadísticas
  const usuariosTotales = usuarios.length;
  const miembrosActivos = usuarios.filter(u => u.estado === 'Activo').length;
  const porcentajeCrecimiento = 16; // TODO: Calcular desde backend

  // Paginación
  const indexUltimoUsuario = paginaActual * usuariosPorPagina;
  const indexPrimerUsuario = indexUltimoUsuario - usuariosPorPagina;
  const usuariosActuales = usuariosFiltrados.slice(indexPrimerUsuario, indexUltimoUsuario);
  const totalPaginas = Math.ceil(usuariosFiltrados.length / usuariosPorPagina);

  // Cambiar estado del usuario
  const toggleEstado = (id: number) => {
    setUsuarios(usuarios.map(usuario => 
      usuario.id === id 
        ? { ...usuario, estado: usuario.estado === 'Activo' ? 'Inactivo' : 'Activo' as 'Activo' | 'Inactivo' }
        : usuario
    ));
    // TODO: Enviar al backend PUT /api/usuarios/:id/estado
  };

  // Abrir modal de edición
  const abrirModalEditar = (id: number) => {
    const usuario = usuarios.find(u => u.id === id);
    if (usuario) {
      setUsuarioSeleccionado(usuario);
      setMostrarEditarModal(true);
    }
  };

  // Guardar cambios de usuario editado
  const guardarUsuarioEditado = (usuarioEditado: Usuario) => {
    setUsuarios(usuarios.map(u => 
      u.id === usuarioEditado.id ? usuarioEditado : u
    ));
    // TODO: Enviar al backend PUT /api/usuarios/:id
    success(`Usuario "${usuarioEditado.nombre}" actualizado correctamente`);
  };

  // Abrir modal de agregar
  const abrirModalAgregar = () => {
    setMostrarAgregarModal(true);
  };

  // Agregar nuevo usuario
  const agregarNuevoUsuario = (nuevoUsuario: { nombre: string; correo: string; password: string; rol: string; avatar: string }) => {
    const usuario: Usuario = {
      id: usuarios.length + 1,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.correo,
      rol: nuevoUsuario.rol,
      fechaCreacion: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      estado: 'Activo',
      avatar: nuevoUsuario.avatar
    };
    
    setUsuarios([...usuarios, usuario]);
    // TODO: Enviar al backend POST /api/usuarios
    success(`Usuario "${nuevoUsuario.nombre}" agregado correctamente`);
  };

  // Eliminar usuario
  const abrirEliminarUsuario = (usuario: Usuario) => {
    setUsuarioAEliminar(usuario);
    setMostrarEliminar(true);
  };

  const cerrarEliminarUsuario = () => {
    setMostrarEliminar(false);
    setUsuarioAEliminar(null);
  };

  const confirmarEliminarUsuario = () => {
    if (usuarioAEliminar) {
      setUsuarios(usuarios.filter(usuario => usuario.id !== usuarioAEliminar.id));
      // TODO: Enviar al backend DELETE /api/usuarios/:id
      success(`Usuario "${usuarioAEliminar.nombre}" eliminado correctamente`);
      cerrarEliminarUsuario();
    }
  };

  // ============================================
  // RENDERIZADO DEL COMPONENTE
  // ============================================
  
  return (
    <div className="usuarios-container">
      {/* Header con título y buscador */}
      <div className="usuarios-header">
        <div className="header-izquierda">
          <h1 className="usuarios-titulo">Todos los Usuarios</h1>
          <button className="btn-agregar" onClick={abrirModalAgregar}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
            Agregar
          </button>
        </div>
        
        <div className="usuarios-buscador">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
          </svg>
          <input
            type="text"
            placeholder="Buscar usuario"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="input-buscar"
          />
        </div>

        <div className="usuarios-controles">
          <span className="texto-ordenar">Corto por: Más reciente</span>
          <div className="filtro-container">
            <button className="btn-filtrar" onClick={() => setMostrarFiltros(!mostrarFiltros)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
              </svg>
              Filtrar
            </button>
            {mostrarFiltros && (
              <div className="filtros-dropdown">
                <button
                  className={`filtro-opcion ${filtroEstado === 'Todos' ? 'activo' : ''}`}
                  onClick={() => {
                    setFiltroEstado('Todos');
                    setMostrarFiltros(false);
                  }}
                >
                  Todos
                </button>
                <button
                  className={`filtro-opcion ${filtroEstado === 'Activo' ? 'activo' : ''}`}
                  onClick={() => {
                    setFiltroEstado('Activo');
                    setMostrarFiltros(false);
                  }}
                >
                  Activos
                </button>
                <button
                  className={`filtro-opcion ${filtroEstado === 'Inactivo' ? 'activo' : ''}`}
                  onClick={() => {
                    setFiltroEstado('Inactivo');
                    setMostrarFiltros(false);
                  }}
                >
                  Inactivos
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="usuarios-estadisticas">
        <div className="estadistica-card">
          <div className="estadistica-icono usuarios-totales">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
            </svg>
          </div>
          <div className="estadistica-info">
            <p className="estadistica-label">Usuarios Totales</p>
            <h3 className="estadistica-valor">{usuariosTotales.toLocaleString()}</h3>
            <p className="estadistica-cambio positivo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
              </svg>
              {porcentajeCrecimiento}% esta semana
            </p>
          </div>
        </div>

        <div className="estadistica-card">
          <div className="estadistica-icono miembros">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="estadistica-info">
            <p className="estadistica-label">Miembros</p>
            <h3 className="estadistica-valor">{miembrosActivos.toLocaleString()}</h3>
            <p className="estadistica-cambio negativo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
              </svg>
              1% este mes
            </p>
          </div>
        </div>
      </div>

      {/* Tabla de usuarios */}
      <div className="usuarios-tabla-container">
        <table className="usuarios-tabla">
          <thead>
            <tr>
              <th>Nombre de usuario</th>
              <th>Rol</th>
              <th>Fecha Creación</th>
              <th>Correo</th>
              <th>Estatus</th>
              <th>Modificadores</th>
            </tr>
          </thead>
          <tbody>
            {usuariosActuales.map((usuario) => (
              <tr key={usuario.id}>
                <td>
                  <div className="usuario-info">
                    <img src={usuario.avatar} alt={usuario.nombre} className="usuario-avatar" />
                    <span>{usuario.nombre}</span>
                  </div>
                </td>
                <td>
                  <span className="usuario-rol">{usuario.rol || 'Sin asignar'}</span>
                </td>
                <td>{usuario.fechaCreacion}</td>
                <td>{usuario.email}</td>
                <td>
                  <span className={`badge-estado ${usuario.estado.toLowerCase()}`}>
                    {usuario.estado}
                  </span>
                </td>
                <td>
                  <div className="acciones-grupo">
                    {/* Botón cambiar estado */}
                    <button 
                      className="btn-accion estado"
                      onClick={() => toggleEstado(usuario.id)}
                      title={usuario.estado === 'Activo' ? 'Desactivar usuario' : 'Activar usuario'}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                      </svg>
                    </button>

                    {/* Botón editar */}
                    <button 
                      className="btn-accion editar"
                      onClick={() => abrirModalEditar(usuario.id)}
                      title="Editar usuario"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                      </svg>
                    </button>

                    {/* Botón eliminar */}
                    <button 
                      className="btn-accion eliminar"
                      onClick={() => abrirEliminarUsuario(usuario)}
                      title="Eliminar usuario"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer con paginación */}
      <div className="usuarios-footer">
        <p className="texto-resultados">
          Mostrando datos {indexPrimerUsuario + 1} a {Math.min(indexUltimoUsuario, usuariosFiltrados.length)} de {usuariosFiltrados.length} entradas
        </p>

        <div className="paginacion">
          <button 
            className="btn-paginacion"
            onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
            disabled={paginaActual === 1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
            </svg>
          </button>

          {[...Array(totalPaginas)].map((_, index) => {
            const numeroPagina = index + 1;
            // Mostrar solo algunas páginas para no saturar
            if (
              numeroPagina === 1 ||
              numeroPagina === totalPaginas ||
              (numeroPagina >= paginaActual - 1 && numeroPagina <= paginaActual + 1)
            ) {
              return (
                <button
                  key={numeroPagina}
                  className={`btn-numero ${paginaActual === numeroPagina ? 'activo' : ''}`}
                  onClick={() => setPaginaActual(numeroPagina)}
                >
                  {numeroPagina}
                </button>
              );
            } else if (
              numeroPagina === paginaActual - 2 ||
              numeroPagina === paginaActual + 2
            ) {
              return <span key={numeroPagina} className="paginacion-dots">...</span>;
            }
            return null;
          })}

          <button 
            className="btn-paginacion"
            onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas))}
            disabled={paginaActual === totalPaginas}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Modales */}
      {mostrarEditarModal && usuarioSeleccionado && (
        <EditarUsuarioModal
          usuario={usuarioSeleccionado}
          onClose={() => setMostrarEditarModal(false)}
          onSave={guardarUsuarioEditado}
        />
      )}

      {mostrarAgregarModal && (
        <AgregarUsuarioModal
          onClose={() => setMostrarAgregarModal(false)}
          onAdd={agregarNuevoUsuario}
        />
      )}

      {/* Modal de confirmación de eliminación */}
      {mostrarEliminar && usuarioAEliminar && (
        <div className="modal-overlay" onClick={cerrarEliminarUsuario}>
          <div className="modal-eliminar" onClick={(e) => e.stopPropagation()}>
            <div className="modal-eliminar-header">
              <div className="modal-eliminar-icono">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="modal-eliminar-titulo">¿Eliminar Usuario?</h2>
              <p className="modal-eliminar-descripcion">
                Esta acción no se puede deshacer. Se eliminará permanentemente el usuario:
              </p>
            </div>

            <div className="modal-eliminar-info">
              <div className="usuario-eliminar-detalle">
                <img src={usuarioAEliminar.avatar} alt={usuarioAEliminar.nombre} className="usuario-avatar-modal" />
                <div className="usuario-info-modal">
                  <h3>{usuarioAEliminar.nombre}</h3>
                  <p>{usuarioAEliminar.email}</p>
                  <span className={`badge-estado ${usuarioAEliminar.estado.toLowerCase()}`}>{usuarioAEliminar.estado}</span>
                </div>
              </div>
            </div>

            <div className="modal-eliminar-footer">
              <button className="btn-cancelar-eliminar" onClick={cerrarEliminarUsuario}>
                Cancelar
              </button>
              <button className="btn-confirmar-eliminar" onClick={confirmarEliminarUsuario}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                </svg>
                Eliminar Usuario
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contenedor de notificaciones */}
      <NotificacionesContainer 
        notificaciones={notificaciones} 
        onClose={cerrarNotificacion}
      />
    </div>
  );
}
