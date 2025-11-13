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
}

interface DetalleProyectoModalProps {
  proyecto: Proyecto;
  onClose: () => void;
}

/**
 * Componente: DetalleProyectoModal
 * Descripción: Modal con información detallada del proyecto RPA
 */
export default function DetalleProyectoModal({ proyecto, onClose }: DetalleProyectoModalProps) {
  
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
          <button className="btn-editar-proyecto">
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
