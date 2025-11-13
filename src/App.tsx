import { useState } from 'react'
import Dashboard from './Dashboard'
import PaginaInicio from './PaginaInicio'

/**
 * Componente principal de la aplicación
 * 
 * Flujo:
 * 1. Inicia mostrando el Login (PaginaInicio)
 * 2. Al hacer login exitoso → muestra el Dashboard
 * 3. Al cerrar sesión → vuelve al Login
 */
function App() {
  // Estado para controlar si el usuario está logueado
  const [estaLogueado, setEstaLogueado] = useState(false);

  /**
   * Función: manejarLogin
   * Se ejecuta cuando el usuario hace login exitoso
   */
  const manejarLogin = () => {
    setEstaLogueado(true);
  };

  /**
   * Función: manejarCerrarSesion
   * Se ejecuta cuando el usuario cierra sesión
   */
  const manejarCerrarSesion = () => {
    setEstaLogueado(false);
  };

  return (
    <>
      {/* Si NO está logueado → mostrar Login */}
      {!estaLogueado && <PaginaInicio onLogin={manejarLogin} />}
      
      {/* Si está logueado → mostrar Dashboard */}
      {estaLogueado && <Dashboard onCerrarSesion={manejarCerrarSesion} />}
    </>
  )
}

export default App
