import { useState } from 'react';
import './VistaProyecto.css';
import NuevaTareaModal from './NuevaTareaModal';

interface TareaInicial {
  id: number;
  titulo: string;
  descripcion: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
  asignados: string[];
  diasRestantes: number;
  estado?: 'porHacer' | 'enProgreso' | 'hecho';
}

interface VistaProyectoProps {
  nombreProyecto: string;
  linkDocumento?: string;
  tareasIniciales?: TareaInicial[];
  onContinuar: (tareas: TareaInicial[]) => void;
  onClose: () => void;
}

/**
 * Componente: VistaProyecto
 * 
 * Descripción: Vista previa del proyecto con documento embebido y tareas por hacer
 * Esta es la vista intermedia antes de acceder al Tablero Kanban
 */
export default function VistaProyecto({ 
  nombreProyecto, 
  linkDocumento, 
  tareasIniciales = [],
  onContinuar,
  onClose 
}: VistaProyectoProps) {
  // Filtrar solo las tareas "Por Hacer" para mostrar en esta vista
  const tareasPorHacer = tareasIniciales.filter(t => !t.estado || t.estado === 'porHacer');
  const [tareas, setTareas] = useState<TareaInicial[]>(tareasPorHacer);
  const [mostrarNuevaTarea, setMostrarNuevaTarea] = useState(false);

  /**
   * Función para convertir URLs a formato embebible sin login
   */
  const getEmbedUrl = (url: string): string => {
    if (!url) return '';
    
    // Google Slides: usar modo embed público
    if (url.includes('presentation/d/')) {
      const match = url.match(/\/presentation\/d\/([a-zA-Z0-9-_]+)/);
      if (match && match[1]) {
        return `https://docs.google.com/presentation/d/${match[1]}/embed?start=false&loop=false&delayms=3000`;
      }
    }
    
    // Google Docs: usar modo preview
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

  const agregarTarea = (nuevaTarea: {
    titulo: string;
    descripcion: string;
    prioridad: 'Alta' | 'Media' | 'Baja';
    participantes: string[];
    diasRestantes: number;
  }) => {
    const tarea: TareaInicial = {
      id: Date.now(),
      titulo: nuevaTarea.titulo,
      descripcion: nuevaTarea.descripcion,
      prioridad: nuevaTarea.prioridad,
      asignados: nuevaTarea.participantes,
      diasRestantes: nuevaTarea.diasRestantes,
      estado: 'porHacer'
    };

    setTareas([...tareas, tarea]);
    setMostrarNuevaTarea(false);
  };

  const eliminarTarea = (id: number) => {
    setTareas(tareas.filter(t => t.id !== id));
  };

  const handleContinuar = () => {
    // Combinar las tareas actualizadas de "Por Hacer" con las demás tareas del proyecto
    const tareasEnProgreso = tareasIniciales.filter(t => t.estado === 'enProgreso');
    const tareasHechas = tareasIniciales.filter(t => t.estado === 'hecho');
    const todasLasTareas = [...tareas, ...tareasEnProgreso, ...tareasHechas];
    onContinuar(todasLasTareas);
  };

  return (
    <div className="vista-proyecto-container">
      {/* Header */}
      <div className="vista-proyecto-header">
        <div className="header-info">
          <h1 className="proyecto-nombre-vista">{nombreProyecto}</h1>
          <p className="proyecto-subtitulo">Vista previa del documento y planificación de tareas</p>
        </div>
        <button className="btn-cerrar-vista" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Contenido Principal */}
      <div className="vista-proyecto-contenido">
        {/* Columna Izquierda - Documento */}
        <div className="columna-documento">
          <div className="documento-header">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clipRule="evenodd" />
              <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
            </svg>
            <h2>Documento del Proyecto</h2>
          </div>
          
          {linkDocumento ? (
            <div className="documento-embed-container">
              <iframe
                src={getEmbedUrl(linkDocumento)}
                className="documento-iframe"
                title="Vista previa del documento"
              />
            </div>
          ) : (
            <div className="sin-documento">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6.905 9.97a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72V18a.75.75 0 001.5 0v-4.19l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" clipRule="evenodd" />
                <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
              </svg>
              <p>No hay documento adjunto</p>
              <span>Agrega un enlace al documento del proyecto para verlo aquí</span>
            </div>
          )}
        </div>

        {/* Columna Derecha - Tareas Por Hacer */}
        <div className="columna-tareas">
          <div className="tareas-header">
            <div className="tareas-titulo-container">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
              <h2>Tareas Por Hacer</h2>
              <span className="tareas-count">{tareas.length}</span>
            </div>
            <button className="btn-agregar-tarea-icono" onClick={() => setMostrarNuevaTarea(true)} title="Agregar Tarea">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="tareas-lista">
            {tareas.length === 0 ? (
              <div className="sin-tareas">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5.625 3.75a2.625 2.625 0 100 5.25h12.75a2.625 2.625 0 000-5.25H5.625zM3.75 11.25a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zM3 15.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zM3.75 18.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z" />
                </svg>
                <p>No hay tareas planificadas</p>
                <span>Agrega tareas para organizar el trabajo del proyecto</span>
              </div>
            ) : (
              tareas.map((tarea) => (
                <div key={tarea.id} className="tarea-item-vista">
                  <div className="tarea-contenido">
                    <div className="tarea-titulo-prioridad">
                      <h3>{tarea.titulo}</h3>
                      <span className={`prioridad-badge-vista ${tarea.prioridad.toLowerCase()}`}>
                        {tarea.prioridad}
                      </span>
                    </div>
                    <p className="tarea-descripcion-vista">{tarea.descripcion}</p>
                    
                    <div className="tarea-meta">
                      <div className="tarea-asignados">
                        {tarea.asignados.slice(0, 3).map((avatar, idx) => (
                          <img key={idx} src={avatar} alt="Avatar" className="avatar-mini" />
                        ))}
                        {tarea.asignados.length > 3 && (
                          <span className="avatar-mas">+{tarea.asignados.length - 3}</span>
                        )}
                      </div>
                      <div className="tarea-dias">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                        </svg>
                        {tarea.diasRestantes} días
                      </div>
                    </div>
                  </div>
                  
                  <button className="btn-eliminar-tarea-vista" onClick={() => eliminarTarea(tarea.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer con botón Continuar */}
      <div className="vista-proyecto-footer">
        <button className="btn-continuar-kanban" onClick={handleContinuar}>
          <span>Ir al Tablero Kanban</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Modal Nueva Tarea */}
      {mostrarNuevaTarea && (
        <NuevaTareaModal
          onClose={() => setMostrarNuevaTarea(false)}
          onCrear={agregarTarea}
        />
      )}
    </div>
  );
}
