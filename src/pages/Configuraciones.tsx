import './VistaProximamente.css';

export default function Configuraciones() {
  return (
    <div className="vista-proximamente">
      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19.07 4.93l-4.24 4.24m0 5.66l4.24 4.24M4.93 4.93l4.24 4.24m0 5.66l-4.24 4.24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <h2>Próximamente</h2>
      <p>Esta sección estará disponible pronto</p>
    </div>
  );
}
