import './VerTareaModal.css';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
  asignados: string[];
  diasRestantes: number;
}

interface VerTareaModalProps {
  tarea: Tarea;
  onClose: () => void;
}

export default function VerTareaModal({ tarea, onClose }: VerTareaModalProps) {
  return (
    <div className="ver-tarea-overlay" onClick={onClose}>
      <div className="ver-tarea-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="ver-tarea-header">
          <h2 className="ver-tarea-titulo">Detalles de la Tarea</h2>
          <button className="btn-close-modal" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="ver-tarea-body">
          {/* Título */}
          <div className="detalle-group">
            <label>Título</label>
            <h3 className="detalle-titulo">{tarea.titulo}</h3>
          </div>

          {/* Descripción */}
          <div className="detalle-group">
            <label>Descripción</label>
            <p className="detalle-descripcion">{tarea.descripcion}</p>
          </div>

          {/* Prioridad */}
          <div className="detalle-group">
            <label>Prioridad</label>
            <span className={`prioridad-badge-ver ${tarea.prioridad.toLowerCase()}`}>
              {tarea.prioridad}
            </span>
          </div>

          {/* Días restantes */}
          <div className="detalle-group">
            <label>Tiempo estimado</label>
            <div className="detalle-dias">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
              </svg>
              <span>{tarea.diasRestantes} días</span>
            </div>
          </div>

          {/* Participantes */}
          <div className="detalle-group">
            <label>Participantes asignados</label>
            <div className="detalle-participantes">
              {tarea.asignados.map((avatar, idx) => (
                <img key={idx} src={avatar} alt="Participante" />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="ver-tarea-footer">
          <button className="btn-cerrar-ver" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
