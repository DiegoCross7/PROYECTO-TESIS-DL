import { useState } from 'react';
import './EditarProyectoModal.css';

interface Miembro {
  id: number;
  nombre: string;
  avatar: string;
  rol: string;
}

interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  estado: 'En Progreso' | 'Completado' | 'Pausado' | 'Planificado';
  progreso: number;
  miembros: Miembro[];
  tareas: number;
  tareasCompletadas: number;
  categoria: string;
}

interface EditarProyectoModalProps {
  proyecto: Proyecto;
  onClose: () => void;
  onGuardar: (proyectoActualizado: Proyecto) => void;
}

export default function EditarProyectoModal({ proyecto, onClose, onGuardar }: EditarProyectoModalProps) {
  const [nombre, setNombre] = useState(proyecto.nombre);
  const [descripcion, setDescripcion] = useState(proyecto.descripcion);
  const [fechaInicio, setFechaInicio] = useState(proyecto.fechaInicio);
  const [fechaFin, setFechaFin] = useState(proyecto.fechaFin);
  const [categoria, setCategoria] = useState(proyecto.categoria);
  const [estado, setEstado] = useState(proyecto.estado);
  const [progreso, setProgreso] = useState(proyecto.progreso);
  const [linkDocumento, setLinkDocumento] = useState<string>('');

  /**
   * Función para convertir URLs a formato embebible sin login
   */
  const getEmbedUrl = (url: string): string => {
    if (!url) return url;
    
    // Google Slides: usar modo embed público
    if (url.includes('presentation/d/')) {
      const match = url.match(/\/presentation\/d\/([a-zA-Z0-9-_]+)/);
      if (match && match[1]) {
        return `https://docs.google.com/presentation/d/${match[1]}/embed?start=false&loop=false&delayms=3000`;
      }
    }
    
    // Google Docs: usar modo embed
    if (url.includes('docs.google.com/document')) {
      const match = url.match(/\/document\/d\/([a-zA-Z0-9-_]+)/);
      if (match && match[1]) {
        return `https://docs.google.com/document/d/${match[1]}/preview`;
      }
    }
    
    // Google Sheets: usar modo embed
    if (url.includes('sheets.google.com')) {
      const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      if (match && match[1]) {
        return `https://docs.google.com/spreadsheets/d/${match[1]}/preview`;
      }
    }
    
    // OneDrive: agregar parámetro embed
    if (url.includes('onedrive.live.com') || url.includes('sharepoint.com')) {
      return url.includes('?') ? `${url}&embed=1` : `${url}?embed=1`;
    }
    
    return url;
  };

  const handleGuardar = () => {
    const proyectoActualizado: Proyecto = {
      ...proyecto,
      nombre,
      descripcion,
      fechaInicio,
      fechaFin,
      categoria,
      estado,
      progreso
    };
    
    // Si hay un nuevo link, aquí se podría procesar
    if (linkDocumento) {
      console.log('Nuevo link de documento:', linkDocumento);
      // Aquí puedes agregar lógica para guardar el link
    }
    
    onGuardar(proyectoActualizado);
    onClose();
  };

  return (
    <div className="editar-proyecto-overlay" onClick={onClose}>
      <div className="editar-proyecto-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="editar-proyecto-header">
          <h2>Editar Proyecto</h2>
          <button className="btn-close-editar" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="editar-proyecto-body">
          <div className="form-group-editar">
            <label>Nombre del Proyecto</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre del proyecto"
            />
          </div>

          <div className="form-group-editar">
            <label>Categoría</label>
            <input
              type="text"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              placeholder="Categoría del proyecto"
            />
          </div>

          <div className="form-row-editar">
            <div className="form-group-editar">
              <label>Fecha de Inicio</label>
              <input
                type="text"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                placeholder="DD/MM/YYYY"
              />
            </div>

            <div className="form-group-editar">
              <label>Fecha de Finalización</label>
              <input
                type="text"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                placeholder="DD/MM/YYYY"
              />
            </div>
          </div>

          <div className="form-row-editar">
            <div className="form-group-editar">
              <label>Estado</label>
              <select value={estado} onChange={(e) => setEstado(e.target.value as 'En Progreso' | 'Completado' | 'Pausado' | 'Planificado')}>
                <option value="En Progreso">En Progreso</option>
                <option value="Completado">Completado</option>
                <option value="Pausado">Pausado</option>
                <option value="Planificado">Planificado</option>
              </select>
            </div>

            <div className="form-group-editar">
              <label>Progreso ({progreso}%)</label>
              <input
                type="range"
                min="0"
                max="100"
                value={progreso}
                onChange={(e) => setProgreso(Number(e.target.value))}
                className="progreso-slider"
              />
            </div>
          </div>

          <div className="form-group-editar">
            <label>Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción del proyecto"
              rows={4}
            />
          </div>

          {/* Link de Documento Compartido */}
          <div className="form-group-editar">
            <label>Link del Documento Compartido</label>
            <input
              type="url"
              value={linkDocumento}
              onChange={(e) => setLinkDocumento(e.target.value)}
              placeholder="Pega el link de Google Docs, Slides, Sheets, OneDrive, etc."
            />
            <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#EFF6FF', borderRadius: '8px', border: '1px solid #BFDBFE' }}>
              <p style={{ margin: '0', fontSize: '0.75rem', color: '#1E40AF' }}>
                💡 <strong>Tip:</strong> Asegúrate de que el documento esté compartido como <strong>"Cualquiera con el enlace"</strong> para que la vista previa funcione.
              </p>
            </div>
            {linkDocumento && (
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#10B981', fontWeight: '600' }}>
                ✅ Link agregado - Verás la vista previa abajo
              </p>
            )}
          </div>

          {/* Vista previa del documento */}
          {linkDocumento && (
            <div className="form-group-editar">
              <label>Vista Previa del Documento</label>
              <div style={{ 
                width: '100%', 
                height: '400px', 
                border: '2px solid #E5E7EB', 
                borderRadius: '12px', 
                overflow: 'hidden',
                marginTop: '0.5rem'
              }}>
                <iframe
                  src={getEmbedUrl(linkDocumento)}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  title="Vista previa del documento compartido"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="editar-proyecto-footer">
          <button className="btn-cancelar-editar" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-guardar-editar" onClick={handleGuardar}>
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
