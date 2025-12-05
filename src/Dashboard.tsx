import { useState } from 'react';
import Spline from '@splinetool/react-spline';
import './Dashboard.css';
import { useLocalStorage } from './hooks/useLocalStorage';
import { USUARIO_PRINCIPAL } from './data/datosIniciales';

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
  const [proyectoSeleccionadoId, setProyectoSeleccionadoId] = useState<number | null>(null);

  // ============================================
  // PERSISTENCIA CON LOCALSTORAGE
  // ============================================
  
  // Estado del usuario principal con persistencia automática
  const [usuario, setUsuario] = useLocalStorage('usuarioPrincipal', USUARIO_PRINCIPAL);

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

  const actualizarUsuario = (datosActualizados: Partial<typeof usuario>) => {
    setUsuario(prev => ({ ...prev, ...datosActualizados }));
  };

  const abrirKanbanProyecto = (proyectoId: number) => {
    if (proyectoId === 0) {
      // Si es 0, limpiar la selección
      setProyectoSeleccionadoId(null);
    } else {
      setProyectoSeleccionadoId(proyectoId);
    }
    setVistaActual('proyectos');
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
        {vistaActual === 'proyectos' && (
          <Proyectos 
            proyectoIdSeleccionado={proyectoSeleccionadoId}
            onLimpiarSeleccion={() => setProyectoSeleccionadoId(null)}
          />
        )}
        {vistaActual === 'configuraciones' && (
          <Configuraciones 
            usuario={usuario}
            onNavigate={setVistaActual}
            onAbrirKanban={abrirKanbanProyecto}
            onActualizarUsuario={actualizarUsuario}
          />
        )}
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

      {/* Botón flotante del chatbot con modelo 3D */}
      {!mostrarChatbot && (
        <div className="btn-chatbot-float" onClick={toggleChatbot}>
          <div>
            <Spline
              scene="https://prod.spline.design/k0d4T3ahZzlAb5kZ/scene.splinecode"
              style={{ width: '100%', height: '100%', cursor: 'pointer' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
