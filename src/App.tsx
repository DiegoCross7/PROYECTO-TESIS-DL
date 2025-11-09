// Importamos el componente del Dashboard
import Dashboard from './Dashboard'
// import PaginaInicio from './PaginaInicio' // Login page (comentado por ahora)

/**
 * Componente principal de la aplicación
 * Aquí se renderiza el Dashboard principal
 * 
 * TODO: Implementar sistema de rutas
 * - Si no hay sesión activa → mostrar PaginaInicio (Login)
 * - Si hay sesión activa → mostrar Dashboard
 */
function App() {
  return (
    <>
      <Dashboard />
    </>
  )
}

export default App
