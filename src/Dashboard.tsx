import { useState } from 'react';
import './Dashboard.css';

// Componentes de Layout
import Header from './components/Layout/Header.tsx';
import Sidebar from './components/Layout/Sidebar.tsx';

// Componentes de características
import PerfilModal from './components/PerfilModal.tsx';
import SempiBot from './components/SempiBot.tsx';

// Páginas
import Inicio from './pages/Inicio.tsx';
import Usuarios from './pages/Usuarios.tsx';
import Proyectos from './pages/Proyectos.tsx';
import Configuraciones from './pages/Configuraciones.tsx';

interface DashboardProps {
  onCerrarSesion: () => void;
}

/**
 * Componente: Dashboard
 * 
 * Descripción: Panel de control principal del sistema - ARQUITECTURA REFACTORIZADA
 * 
 * Responsabilidades:
 * - Gestión del estado de navegación entre páginas
 * - Gestión del estado de modales (perfil, chatbot)
 * - Orquestación de componentes de layout y páginas
 * - Proveer datos de usuario a componentes hijos
 * 
 * Arquitectura:
 * - pages/ = Vistas completas de cada ruta (Inicio, Usuarios, Proyectos, Configuraciones)
 * - components/Layout/ = Componentes estructurales reutilizables (Header, Sidebar)
 * - components/ = Componentes de características (PerfilModal, SempiBot)
 * 
 * Beneficios:
 * - Separación de responsabilidades (Single Responsibility Principle)
 * - Código mantenible y escalable
 * - Componentes reutilizables y testeables
 * - Fácil agregar nuevas páginas sin modificar código existente
 */
export default function Dashboard({ onCerrarSesion }: DashboardProps) {
  // ============================================
  // ESTADOS DEL COMPONENTE
  // ============================================
  
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [mostrarChatbot, setMostrarChatbot] = useState(false);
  const [vistaActual, setVistaActual] = useState<'inicio' | 'usuarios' | 'proyectos' | 'configuraciones'>('inicio');

  // ============================================
  // DATOS FICTICIOS (TODO: Conectar con Backend)
  // ============================================
  
  // Datos del usuario (TODO: Obtener del backend)
  const usuario = {
    nombre: "Diego Gabriel",
    rol: "Desarrollador RPA",
    email: "diegogabrielcentenpfalcon7@gmail.com",
    telefono: "+51 946595031",
    estado: "Activo",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diego"
  };

  // ============================================
  // FUNCIONES DEL COMPONENTE
  // ============================================

  const togglePerfil = () => {
    setMostrarPerfil(!mostrarPerfil);
  };

  const toggleChatbot = () => {
    setMostrarChatbot(!mostrarChatbot);
  };

  const cerrarPerfil = () => {
    setMostrarPerfil(false);
  };

  // ============================================
  // RENDERIZADO DEL COMPONENTE
  // ============================================
  
  return (
    <div className="dashboard">
      {/* Header con logo y perfil de usuario */}
      <Header usuario={usuario} onProfileClick={togglePerfil} />

      {/* Sidebar con navegación */}
      <Sidebar vistaActual={vistaActual} onNavigate={setVistaActual} />

      {/* Contenido principal - renderizado condicional de páginas */}
      <main className="dashboard-main">
        {vistaActual === 'inicio' && <Inicio />}
        {vistaActual === 'usuarios' && <Usuarios />}
        {vistaActual === 'proyectos' && <Proyectos />}
        {vistaActual === 'configuraciones' && <Configuraciones />}
      </main>

      {/* Modal de perfil */}
      {mostrarPerfil && (
        <PerfilModal 
          usuario={usuario} 
          onClose={cerrarPerfil}
          onOpenChatbot={toggleChatbot}
          onCerrarSesion={onCerrarSesion}
        />
      )}

      {/* Chatbot - SempiBot */}
      {mostrarChatbot && (
        <SempiBot onClose={toggleChatbot} />
      )}

      {/* Botón flotante del chatbot */}
      {!mostrarChatbot && (
        <button className="btn-chatbot-float" onClick={toggleChatbot}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd" />
          </svg>
          <span className="chatbot-badge">SempiBot</span>
        </button>
      )}
    </div>
  );
}
