import './Header.css';

interface HeaderProps {
  usuario: {
    nombre: string;
    rol: string;
    avatar: string;
  };
  onProfileClick: () => void;
}

/**
 * Componente: Header
 * 
 * Descripción: Barra superior del dashboard
 * Responsabilidad: Mostrar logo y perfil de usuario
 */
export default function Header({ usuario, onProfileClick }: HeaderProps) {
  return (
    <header className="dashboard-header">
      <div className="header-logo">
        <img 
          src="https://www.figma.com/api/mcp/asset/a75824df-6f8d-4b1b-bca3-d50365f0b304" 
          alt="SEMPITERNO Logo" 
          className="logo-sempiterno"
        />
      </div>

      <div className="header-user" onClick={onProfileClick}>
        <div className="user-info">
          <span className="user-name">{usuario.nombre}</span>
          <span className="user-rol">{usuario.rol}</span>
        </div>
        <div className="user-avatar">
          <img src={usuario.avatar} alt={usuario.nombre} />
        </div>
      </div>
    </header>
  );
}
