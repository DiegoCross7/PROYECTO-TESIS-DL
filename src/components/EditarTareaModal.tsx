import { useState } from 'react';
import './EditarTareaModal.css';
import { useNotificaciones } from '../hooks/useNotificaciones';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
  asignados: string[];
  diasRestantes: number;
}

interface EditarTareaModalProps {
  tarea: Tarea;
  onClose: () => void;
  onGuardar: (tareaEditada: Tarea) => void;
}

export default function EditarTareaModal({ tarea, onClose, onGuardar }: EditarTareaModalProps) {
  const { warning } = useNotificaciones();
  
  const [titulo, setTitulo] = useState(tarea.titulo);
  const [descripcion, setDescripcion] = useState(tarea.descripcion);
  const [prioridad, setPrioridad] = useState<'Alta' | 'Media' | 'Baja'>(tarea.prioridad);
  const [diasRestantes, setDiasRestantes] = useState(tarea.diasRestantes);
  const [participantes, setParticipantes] = useState<string[]>(tarea.asignados);

  const participantesDisponibles = [
    { nombre: 'Jane Cooper', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
    { nombre: 'Floyd Miles', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Floyd' },
    { nombre: 'Ronald Richards', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ronald' },
    { nombre: 'Marvin McKinney', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marvin' },
    { nombre: 'Jerome Bell', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jerome' },
    { nombre: 'Kathryn Murphy', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kathryn' },
    { nombre: 'Jacob Jones', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jacob' },
    { nombre: 'Kristin Watson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kristin' }
  ];

  const toggleParticipante = (avatar: string) => {
    if (participantes.includes(avatar)) {
      setParticipantes(participantes.filter(p => p !== avatar));
    } else {
      setParticipantes([...participantes, avatar]);
    }
  };

  const handleGuardar = () => {
    if (!titulo.trim() || !descripcion.trim() || !prioridad) {
      warning('Por favor completa todos los campos obligatorios');
      return;
    }

    const tareaEditada: Tarea = {
      ...tarea,
      titulo,
      descripcion,
      prioridad,
      asignados: participantes,
      diasRestantes
    };

    onGuardar(tareaEditada);
  };

  return (
    <div className="editar-tarea-overlay" onClick={onClose}>
      <div className="editar-tarea-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="editar-tarea-header">
          <h2 className="editar-tarea-titulo">Editar Tarea</h2>
          <button className="btn-close-modal" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="editar-tarea-body">
          {/* Título */}
          <div className="form-group">
            <label>Título <span className="required">*</span></label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Nombre de la tarea"
              className="form-input"
            />
          </div>

          {/* Descripción */}
          <div className="form-group">
            <label>Descripción <span className="required">*</span></label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Describe la tarea..."
              className="form-textarea"
              rows={4}
            />
          </div>

          {/* Prioridad */}
          <div className="form-group">
            <label>Prioridad <span className="required">*</span></label>
            <div className="prioridad-buttons">
              <button
                type="button"
                className={`btn-prioridad ${prioridad === 'Alta' ? 'activo alta' : ''}`}
                onClick={() => setPrioridad('Alta')}
              >
                Alta
              </button>
              <button
                type="button"
                className={`btn-prioridad ${prioridad === 'Media' ? 'activo media' : ''}`}
                onClick={() => setPrioridad('Media')}
              >
                Media
              </button>
              <button
                type="button"
                className={`btn-prioridad ${prioridad === 'Baja' ? 'activo baja' : ''}`}
                onClick={() => setPrioridad('Baja')}
              >
                Baja
              </button>
            </div>
          </div>

          {/* Días restantes */}
          <div className="form-group">
            <label>Días estimados</label>
            <input
              type="number"
              value={diasRestantes}
              onChange={(e) => setDiasRestantes(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              className="form-input"
            />
          </div>

          {/* Participantes */}
          <div className="form-group">
            <label>Participantes</label>
            <div className="participantes-grid">
              {participantesDisponibles.map((p) => (
                <div
                  key={p.nombre}
                  className={`participante-item ${participantes.includes(p.avatar) ? 'seleccionado' : ''}`}
                  onClick={() => toggleParticipante(p.avatar)}
                >
                  <img src={p.avatar} alt={p.nombre} />
                  <span>{p.nombre}</span>
                  {participantes.includes(p.avatar) && (
                    <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="editar-tarea-footer">
          <button className="btn-cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-guardar-tarea" onClick={handleGuardar}>
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
