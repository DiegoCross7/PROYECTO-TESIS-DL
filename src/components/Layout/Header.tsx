import './Header.css';
import logoSempiterno from '../../assets/images/img_logo_login_1_logo SEMPITERNO.png';

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
          src={logoSempiterno} 
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
