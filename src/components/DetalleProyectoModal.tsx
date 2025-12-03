import './DetalleProyectoModal.css';

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
  linkDocumento?: string;
}

interface DetalleProyectoModalProps {
  proyecto: Proyecto;
  onClose: () => void;
  onEditar: () => void;
}

/**
 * Componente: DetalleProyectoModal
 * Descripción: Modal con información detallada del proyecto RPA
 */
export default function DetalleProyectoModal({ proyecto, onClose, onEditar }: DetalleProyectoModalProps) {
  
  /**
   * Función para convertir URLs de Google Docs a formato embebible
   * Extrae el ID del documento y crea URLs optimizadas para embed sin login
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
    
    // Google Docs: usar modo preview con ID
    if (url.includes('docs.google.com/document')) {
      const match = url.match(/\/document\/d\/([a-zA-Z0-9-_]+)/);
      if (match && match[1]) {
        return `https://docs.google.com/document/d/${match[1]}/preview`;
      }
    }
    
    // Google Sheets: usar modo preview con ID
    if (url.includes('sheets.google.com')) {
      const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      if (match && match[1]) {
        return `https://docs.google.com/spreadsheets/d/${match[1]}/preview`;
      }
    }
    
    // OneDrive: agregar parámetro embed=1
    if (url.includes('onedrive.live.com') || url.includes('sharepoint.com')) {
      return url.includes('?') ? `${url}&embed=1` : `${url}?embed=1`;
    }
    
    return url;
  };
  
  return (
    <div className="detalle-modal-overlay" onClick={onClose}>
      <div className="detalle-modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Header del modal */}
        <div className="detalle-modal-header">
          <div className="detalle-header-info">
            <h2 className="detalle-titulo">{proyecto.nombre}</h2>
          </div>
          <button className="btn-close-detalle" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Contenido del modal */}
        <div className="detalle-modal-body">
          
          {/* Información principal */}
          <div className="detalle-seccion">
            <h3 className="seccion-titulo">Información del Proyecto</h3>
            
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Estado</span>
                <span className={`proyecto-estado ${proyecto.estado.toLowerCase().replace(' ', '-')}`}>
                  {proyecto.estado}
                </span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Progreso</span>
                <div className="progreso-detalle">
                  <div className="progreso-barra-detalle">
                    <div 
                      className="progreso-fill-detalle" 
                      style={{ width: `${proyecto.progreso}%` }}
                    ></div>
                  </div>
                  <span className="progreso-texto-detalle">{proyecto.progreso}%</span>
                </div>
              </div>

              <div className="info-item">
                <span className="info-label">Fecha de Inicio</span>
                <div className="info-fecha">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                  </svg>
                  <span>{proyecto.fechaInicio}</span>
                </div>
              </div>

              <div className="info-item">
                <span className="info-label">Fecha de Finalización</span>
                <div className="info-fecha">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                  </svg>
                  <span>{proyecto.fechaFin}</span>
                </div>
              </div>

              <div className="info-item full-width">
                <span className="info-label">Tareas</span>
                <div className="tareas-info">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm3.97.97a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06zm4.28 4.28a.75.75 0 000 1.5h5.25a.75.75 0 000-1.5H10.5z" clipRule="evenodd" />
                  </svg>
                  <span><strong>{proyecto.tareasCompletadas}</strong> de <strong>{proyecto.tareas}</strong> tareas completadas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="detalle-seccion">
            <h3 className="seccion-titulo">Descripción</h3>
            <p className="detalle-descripcion">{proyecto.descripcion}</p>
          </div>

          {/* Documento del Proyecto */}
          {proyecto.linkDocumento && (
            <div className="detalle-seccion">
              <h3 className="seccion-titulo">Documento del Proyecto</h3>
              <div className="documento-link-container">
                <div className="link-info">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z" clipRule="evenodd" />
                  </svg>
                  <div className="link-detalles">
                    <h4 className="link-titulo">Documento Compartido</h4>
                    <a href={proyecto.linkDocumento} target="_blank" rel="noopener noreferrer" className="link-url">
                      {proyecto.linkDocumento}
                    </a>
                  </div>
                  <a 
                    href={proyecto.linkDocumento} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-abrir-link"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM2.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM18.75 7.5a.75.75 0 00-1.5 0v2.25H15a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H21a.75.75 0 000-1.5h-2.25V7.5z" />
                    </svg>
                    Abrir en nueva pestaña
                  </a>
                </div>
                
                <div className="documento-iframe-preview">
                  <iframe
                    src={getEmbedUrl(proyecto.linkDocumento)}
                    title="Vista previa del documento compartido"
                    className="documento-iframe"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Equipo del proyecto */}
          <div className="detalle-seccion">
            <h3 className="seccion-titulo">Equipo del Proyecto ({proyecto.miembros.length} miembros)</h3>
            <div className="equipo-grid">
              {proyecto.miembros.map((miembro) => (
                <div key={miembro.id} className="miembro-card">
                  <img src={miembro.avatar} alt={miembro.nombre} className="miembro-card-avatar" />
                  <div className="miembro-card-info">
                    <h4 className="miembro-card-nombre">{miembro.nombre}</h4>
                    <p className="miembro-card-rol">{miembro.rol}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer del modal */}
        <div className="detalle-modal-footer">
          <button className="btn-editar-proyecto" onClick={onEditar}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
            </svg>
            Editar Proyecto
          </button>
          <button className="btn-cerrar-modal" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
