import './PerfilModal.css';

interface Usuario {
  nombre: string;
  rol: string;
  email: string;
  telefono: string;
  estado: string;
  avatar: string;
}

interface PerfilModalProps {
  usuario: Usuario;
  onClose: () => void;
  onOpenChatbot: () => void;
  onCerrarSesion: () => void;
}

/**
 * Componente: PerfilModal
 * 
 * Descripción: Modal de perfil de usuario con información detallada
 * 
 * Características:
 * - Fondo opaco (overlay)
 * - Información del usuario
 * - Botón para abrir chatbot
 * - Botón de cerrar sesión
 */
export default function PerfilModal({ usuario, onClose, onOpenChatbot, onCerrarSesion }: PerfilModalProps) {
  
  const handleCerrarSesion = () => {
    // TODO: Implementar lógica de cierre de sesión con backend
    // Ejemplo: await fetch('/api/auth/logout', { method: 'POST' })
    onClose();
    onCerrarSesion();
  };

  const handleChatbot = () => {
    onClose();
    onOpenChatbot();
  };

  return (
    <div className="perfil-modal-overlay" onClick={onClose}>
      <div className="perfil-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Avatar del usuario */}
        <div className="perfil-avatar-container">
          <img src={usuario.avatar} alt={usuario.nombre} className="perfil-avatar-large" />
          <div className={`perfil-status ${usuario.estado.toLowerCase()}`}>
            <span className="status-dot"></span>
            {usuario.estado}
          </div>
        </div>

        {/* Información del usuario */}
        <div className="perfil-info">
          <h2 className="perfil-nombre">{usuario.nombre}</h2>
          <p className="perfil-rol">{usuario.rol}</p>
        </div>

        {/* Detalles de contacto */}
        <div className="perfil-detalles">
          <div className="detalle-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
            </svg>
            <div className="detalle-texto">
              <span className="detalle-label">Email</span>
              <span className="detalle-valor">{usuario.email}</span>
            </div>
          </div>
        </div>

        {/* Botón del Chatbot */}
        <button className="btn-chatbot-modal" onClick={handleChatbot}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd" />
          </svg>
          Abrir SempiBot
          <span className="chatbot-indicator">
            <span className="pulse-dot"></span>
            En línea
          </span>
        </button>

        {/* Botón de cerrar sesión */}
        <button className="btn-cerrar-sesion" onClick={handleCerrarSesion}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
