import { useState } from 'react';
import './NuevoProyectoModal.css';
import { useNotificaciones } from '../hooks/useNotificaciones';

interface TareaInicial {
  id: number;
  titulo: string;
  descripcion: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
  asignados: string[];
  diasRestantes: number;
}

interface NuevoProyecto {
  nombre: string;
  tipo: string;
  fechaInicio: string;
  fechaFinal: string;
  descripcion: string;
  prioridad: string;
  participantes: string[];
  linkDocumento?: string;
  tareasIniciales?: TareaInicial[];
}

interface NuevoProyectoModalProps {
  onClose: () => void;
  onCrear: (proyecto: NuevoProyecto) => void;
}

export default function NuevoProyectoModal({ onClose, onCrear }: NuevoProyectoModalProps) {
  const { warning } = useNotificaciones();
  
  const [paso, setPaso] = useState(1);
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFinal, setFechaFinal] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [linkDocumento, setLinkDocumento] = useState('');
  const [tareasIniciales, setTareasIniciales] = useState<TareaInicial[]>([]);
  
  // Estados para agregar nueva tarea
  const [mostrarFormTarea, setMostrarFormTarea] = useState(false);
  const [nuevaTareaTitulo, setNuevaTareaTitulo] = useState('');
  const [nuevaTareaDesc, setNuevaTareaDesc] = useState('');
  const [nuevaTareaPrioridad, setNuevaTareaPrioridad] = useState<'Alta' | 'Media' | 'Baja' | ''>('');
  const [nuevaTareaDias, setNuevaTareaDias] = useState(1);
  const [nuevaTareaParticipantes, setNuevaTareaParticipantes] = useState<string[]>([]);

  /**
   * Función para convertir URLs de Google Docs a formato embebible sin login
   */
  const getEmbedUrl = (url: string): string => {
    if (!url) return url;
    
    // Google Slides: usar modo embed público
    if (url.includes('presentation/d/')) {
      // Extraer el ID del documento
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

  const agregarTarea = () => {
    if (!nuevaTareaTitulo.trim() || !nuevaTareaDesc.trim() || !nuevaTareaPrioridad) {
      warning('Por favor completa todos los campos de la tarea');
      return;
    }

    const nuevaTarea: TareaInicial = {
      id: Date.now(),
      titulo: nuevaTareaTitulo,
      descripcion: nuevaTareaDesc,
      prioridad: nuevaTareaPrioridad,
      asignados: nuevaTareaParticipantes,
      diasRestantes: nuevaTareaDias
    };

    setTareasIniciales([...tareasIniciales, nuevaTarea]);
    
    // Limpiar formulario
    setNuevaTareaTitulo('');
    setNuevaTareaDesc('');
    setNuevaTareaPrioridad('');
    setNuevaTareaDias(1);
    setNuevaTareaParticipantes([]);
    setMostrarFormTarea(false);
  };

  const eliminarTarea = (id: number) => {
    setTareasIniciales(tareasIniciales.filter(t => t.id !== id));
  };

  const toggleParticipanteTarea = (avatar: string) => {
    if (nuevaTareaParticipantes.includes(avatar)) {
      setNuevaTareaParticipantes(nuevaTareaParticipantes.filter(p => p !== avatar));
    } else {
      setNuevaTareaParticipantes([...nuevaTareaParticipantes, avatar]);
    }
  };

  const handleSiguiente = () => {
    if (paso < 2) {
      setPaso(paso + 1);
    } else {
      // Crear el proyecto
      const nuevoProyecto = {
        nombre,
        tipo,
        fechaInicio,
        fechaFinal,
        descripcion,
        prioridad: 'Media',
        participantes: [],
        linkDocumento: linkDocumento || undefined,
        tareasIniciales
      };
      onCrear(nuevoProyecto);
    }
  };

  return (
    <div className="nuevo-proyecto-overlay" onClick={onClose}>
      <div className="nuevo-proyecto-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="nuevo-proyecto-header">
          <h2 className="nuevo-proyecto-titulo">Proyectos / Crear Proyectos</h2>
        </div>

        {/* Body */}
        <div className="nuevo-proyecto-body">
          {paso === 1 && (
            <>
              {/* Nombre */}
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre del proyecto"
                  className="form-input"
                />
              </div>

              {/* Tipo */}
              <div className="form-group">
                <label>Tipo</label>
                <input
                  type="text"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  placeholder="Tipo de proyecto"
                  className="form-input"
                />
              </div>

              {/* Fechas */}
              <div className="form-row">
                <div className="form-group">
                  <label>Fecha Inicio</label>
                  <input
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Fecha Final</label>
                  <input
                    type="date"
                    value={fechaFinal}
                    onChange={(e) => setFechaFinal(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Descripción */}
              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Descripción del proyecto"
                  className="form-textarea"
                  rows={4}
                />
              </div>

              {/* Link de Documento Compartido */}
              <div className="form-group">
                <label>Link del Documento Compartido</label>
                <input
                  type="url"
                  value={linkDocumento}
                  onChange={(e) => setLinkDocumento(e.target.value)}
                  placeholder="Pega el link de Google Docs, Slides, Sheets, OneDrive, etc."
                  className="form-input"
                />
                <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#EFF6FF', borderRadius: '8px', border: '1px solid #BFDBFE' }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#1E40AF', fontWeight: '600' }}>
                    💡 <strong>Importante:</strong> Para que la vista previa funcione:
                  </p>
                  <ol style={{ margin: '0', paddingLeft: '1.25rem', fontSize: '0.75rem', color: '#1E3A8A', lineHeight: '1.6' }}>
                    <li>Abre tu documento en Google (Docs/Slides/Sheets)</li>
                    <li>Haz clic en <strong>"Compartir"</strong></li>
                    <li>Cambia a <strong>"Cualquiera con el enlace"</strong></li>
                    <li>Copia el link y pégalo aquí</li>
                  </ol>
                </div>
                {linkDocumento && (
                  <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#10B981', fontWeight: '600' }}>
                    ✅ Link agregado - Verás la vista previa en el siguiente paso
                  </p>
                )}
              </div>
            </>
          )}

          {paso === 2 && (
            <div className="paso2-container">
              {/* Lado izquierdo: Vista previa */}
              <div className="preview-section">
                <h3 className="preview-titulo">Vista Previa del Documento</h3>
                {linkDocumento ? (
                  <iframe
                    src={getEmbedUrl(linkDocumento)}
                    className="preview-iframe"
                    title="Vista previa del documento compartido"
                  />
                ) : (
                  <div className="preview-vacio">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>
                    <p>No hay documento para previsualizar</p>
                    <p style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>Agrega un link en el paso anterior</p>
                  </div>
                )}
              </div>

              {/* Lado derecho: Columna Por Hacer */}
              <div className="tareas-section">
                <div className="tareas-header">
                  <div className="tareas-header-info">
                    <span className="column-dot por-hacer"></span>
                    <h3>Por Hacer</h3>
                    <span className="task-count">{tareasIniciales.length}</span>
                  </div>
                  <button 
                    className="btn-add-task-mini"
                    onClick={() => setMostrarFormTarea(true)}
                  >
                    +
                  </button>
                </div>

                {/* Lista de tareas */}
                <div className="tareas-lista">
                  {tareasIniciales.map((tarea) => (
                    <div key={tarea.id} className="tarea-card-mini">
                      <div className="tarea-header-mini">
                        <span className={`tarea-prioridad-mini ${tarea.prioridad.toLowerCase()}`}>
                          {tarea.prioridad}
                        </span>
                        <button 
                          className="btn-eliminar-tarea-mini"
                          onClick={() => eliminarTarea(tarea.id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      <h4 className="tarea-titulo-mini">{tarea.titulo}</h4>
                      <p className="tarea-desc-mini">{tarea.descripcion}</p>
                      <div className="tarea-footer-mini">
                        <div className="tarea-avatars-mini">
                          {tarea.asignados.slice(0, 3).map((avatar, idx) => (
                            <img key={idx} src={avatar} alt="" />
                          ))}
                          {tarea.asignados.length > 3 && (
                            <span className="avatar-mas-mini">+{tarea.asignados.length - 3}</span>
                          )}
                        </div>
                        <span className="tarea-dias-mini">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                          </svg>
                          {tarea.diasRestantes}d
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Formulario para agregar tarea */}
                {mostrarFormTarea && (
                  <div className="form-tarea-overlay" onClick={() => setMostrarFormTarea(false)}>
                    <div className="form-tarea-content" onClick={(e) => e.stopPropagation()}>
                      <h3>Agregar Tarea</h3>
                      
                      <div className="form-group-mini">
                        <label>Título <span className="required">*</span></label>
                        <input
                          type="text"
                          value={nuevaTareaTitulo}
                          onChange={(e) => setNuevaTareaTitulo(e.target.value)}
                          placeholder="Título de la tarea"
                          className="form-input"
                        />
                      </div>

                      <div className="form-group-mini">
                        <label>Descripción <span className="required">*</span></label>
                        <textarea
                          value={nuevaTareaDesc}
                          onChange={(e) => setNuevaTareaDesc(e.target.value)}
                          placeholder="Describe la tarea"
                          className="form-textarea"
                          rows={3}
                        />
                      </div>

                      <div className="form-group-mini">
                        <label>Prioridad <span className="required">*</span></label>
                        <div className="prioridad-buttons">
                          {(['Alta', 'Media', 'Baja'] as const).map((p) => (
                            <button
                              key={p}
                              type="button"
                              className={`btn-prioridad ${nuevaTareaPrioridad === p ? 'activo' : ''} ${p.toLowerCase()}`}
                              onClick={() => setNuevaTareaPrioridad(p)}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="form-group-mini">
                        <label>Días estimados</label>
                        <input
                          type="number"
                          min="1"
                          value={nuevaTareaDias}
                          onChange={(e) => setNuevaTareaDias(Number(e.target.value))}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group-mini">
                        <label>Asignar participantes (avatares disponibles)</label>
                        <div className="participantes-grid-mini">
                          {['https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
                            'https://api.dicebear.com/7.x/avataaars/svg?seed=Floyd',
                            'https://api.dicebear.com/7.x/avataaars/svg?seed=Ronald',
                            'https://api.dicebear.com/7.x/avataaars/svg?seed=Marvin',
                            'https://api.dicebear.com/7.x/avataaars/svg?seed=Jerome',
                            'https://api.dicebear.com/7.x/avataaars/svg?seed=Kathryn',
                            'https://api.dicebear.com/7.x/avataaars/svg?seed=Jacob',
                            'https://api.dicebear.com/7.x/avataaars/svg?seed=Kristin'
                          ].map((avatar) => (
                            <div
                              key={avatar}
                              className={`participante-item-mini ${nuevaTareaParticipantes.includes(avatar) ? 'seleccionado' : ''}`}
                              onClick={() => toggleParticipanteTarea(avatar)}
                            >
                              <img src={avatar} alt="Participante" />
                              {nuevaTareaParticipantes.includes(avatar) && (
                                <div className="check-icon">✓</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="form-tarea-footer">
                        <button 
                          className="btn-cancelar"
                          onClick={() => setMostrarFormTarea(false)}
                        >
                          Cancelar
                        </button>
                        <button 
                          className="btn-agregar-tarea"
                          onClick={agregarTarea}
                        >
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="nuevo-proyecto-footer">
          <button className="btn-siguiente" onClick={handleSiguiente}>
            {paso === 1 ? 'Siguiente' : 'Crear Proyecto'}
          </button>
          <button className="btn-eliminar" onClick={onClose}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
