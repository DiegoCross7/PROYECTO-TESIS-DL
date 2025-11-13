import { useState } from 'react';
import './TableroKanban.css';
import NuevaTareaModal from './NuevaTareaModal';
import VerTareaModal from './VerTareaModal';
import EditarTareaModal from './EditarTareaModal';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
  asignados: string[];
  diasRestantes: number;
}

interface TableroKanbanProps {
  nombreProyecto: string;
  tareasIniciales?: Tarea[];
  onClose: () => void;
}

export default function TableroKanban({ nombreProyecto, tareasIniciales = [], onClose }: TableroKanbanProps) {
  const [mostrarModalTarea, setMostrarModalTarea] = useState(false);
  const [mostrarModalVer, setMostrarModalVer] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState<Tarea | null>(null);
  const [columnaSeleccionada, setColumnaSeleccionada] = useState<'porHacer' | 'enProgreso' | 'hecho'>('porHacer');
  const [menuAbierto, setMenuAbierto] = useState<number | null>(null);
  
  const [tareas, setTareas] = useState<{
    porHacer: Tarea[];
    enProgreso: Tarea[];
    hecho: Tarea[];
  }>({
    porHacer: tareasIniciales.length > 0 ? tareasIniciales : [
      {
        id: 1,
        titulo: 'Generación automática de facturas',
        descripcion: 'Lee ventas desde Excel o ERP y genera las facturas electrónicas en XML y PDF según los estándares de la SUNAT.',
        prioridad: 'Baja' as const,
        asignados: ['https://api.dicebear.com/7.x/avataaars/svg?seed=Jane', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Floyd', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ronald'],
        diasRestantes: 12
      },
      {
        id: 2,
        titulo: 'Envío y validación con la SUNAT',
        descripcion: 'Conecta con los servicios web de la SUNAT para validar/registrar la factura y envía el archivo XML al portal correspondiente.',
        prioridad: 'Baja' as const,
        asignados: ['https://api.dicebear.com/7.x/avataaars/svg?seed=Marvin', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jerome'],
        diasRestantes: 9
      }
    ],
    enProgreso: tareasIniciales.length > 0 ? [] : [
      {
        id: 3,
        titulo: 'Integración con ERP / extracción de datos',
        descripcion: 'Desarrolla conectores que transforman los datos de ventas a la estructura que necesita el bot (absoluto, sin procesar).',
        prioridad: 'Baja' as const,
        asignados: ['https://api.dicebear.com/7.x/avataaars/svg?seed=Kathryn', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jacob'],
        diasRestantes: 9
      },
      {
        id: 4,
        titulo: 'Plantilla PDF y conversión de XML a PDF',
        descripcion: 'Diseña la plantilla visual de la factura y automatiza la generación del PDF a partir de XML o datos.',
        prioridad: 'Baja' as const,
        asignados: ['https://api.dicebear.com/7.x/avataaars/svg?seed=Kristin', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Courtney'],
        diasRestantes: 9
      }
    ],
    hecho: tareasIniciales.length > 0 ? [] : [
      {
        id: 5,
        titulo: 'Firma electrónica y cifrado de XML',
        descripcion: 'Implementa el proceso con que firman digitalmente el XML, aseguran la integridad y lo rellena con el certificado requerido por SUNAT.',
        prioridad: 'Baja' as const,
        asignados: ['https://api.dicebear.com/7.x/avataaars/svg?seed=Theresa', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'],
        diasRestantes: 9
      }
    ]
  });

  const [draggedTask, setDraggedTask] = useState<{ task: Tarea; fromColumn: string } | null>(null);

  const handleDragStart = (task: Tarea, fromColumn: string) => {
    setDraggedTask({ task, fromColumn });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (toColumn: string) => {
    if (!draggedTask) return;

    const { task, fromColumn } = draggedTask;
    
    if (fromColumn === toColumn) {
      setDraggedTask(null);
      return;
    }

    setTareas(prev => {
      const newTareas = { ...prev };
      
      // Remover de la columna original
      newTareas[fromColumn as keyof typeof newTareas] = newTareas[fromColumn as keyof typeof newTareas].filter(t => t.id !== task.id);
      
      // Agregar a la nueva columna
      newTareas[toColumn as keyof typeof newTareas] = [...newTareas[toColumn as keyof typeof newTareas], task];
      
      return newTareas;
    });

    setDraggedTask(null);
  };

  const abrirModalTarea = (columna: 'porHacer' | 'enProgreso' | 'hecho') => {
    setColumnaSeleccionada(columna);
    setMostrarModalTarea(true);
  };

  const crearTarea = (nuevaTarea: { titulo: string; descripcion: string; prioridad: 'Alta' | 'Media' | 'Baja'; participantes: string[]; diasRestantes: number }) => {
    const tarea: Tarea = {
      id: Date.now(),
      titulo: nuevaTarea.titulo,
      descripcion: nuevaTarea.descripcion,
      prioridad: nuevaTarea.prioridad,
      asignados: nuevaTarea.participantes,
      diasRestantes: nuevaTarea.diasRestantes
    };

    setTareas(prev => ({
      ...prev,
      [columnaSeleccionada]: [...prev[columnaSeleccionada], tarea]
    }));

    setMostrarModalTarea(false);
  };

  const verTarea = (tarea: Tarea) => {
    setTareaSeleccionada(tarea);
    setMostrarModalVer(true);
    setMenuAbierto(null);
  };

  const editarTarea = (tarea: Tarea) => {
    setTareaSeleccionada(tarea);
    setMostrarModalEditar(true);
    setMenuAbierto(null);
  };

  const guardarEdicion = (tareaEditada: Tarea) => {
    setTareas(prev => {
      const nuevasTareas = { ...prev };
      
      // Buscar en qué columna está la tarea
      for (const columna of ['porHacer', 'enProgreso', 'hecho'] as const) {
        const index = nuevasTareas[columna].findIndex(t => t.id === tareaEditada.id);
        if (index !== -1) {
          nuevasTareas[columna][index] = tareaEditada;
          break;
        }
      }
      
      return nuevasTareas;
    });

    setMostrarModalEditar(false);
    setTareaSeleccionada(null);
  };

  const eliminarTarea = (tareaId: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      setTareas(prev => {
        const nuevasTareas = { ...prev };
        
        // Buscar en qué columna está la tarea y eliminarla
        for (const columna of ['porHacer', 'enProgreso', 'hecho'] as const) {
          nuevasTareas[columna] = nuevasTareas[columna].filter(t => t.id !== tareaId);
        }
        
        return nuevasTareas;
      });
      setMenuAbierto(null);
    }
  };

  const toggleMenu = (tareaId: number) => {
    setMenuAbierto(menuAbierto === tareaId ? null : tareaId);
  };

  return (
    <div className="kanban-container">
      {/* Proyecto nombre */}
      <div className="kanban-proyecto">
          <h1 className="kanban-proyecto-nombre">{nombreProyecto}</h1>
          <div className="kanban-filtros">
            <button className="btn-filtro">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 011.541 1.836v1.044a3 3 0 01-.879 2.121l-6.182 6.182a1.5 1.5 0 00-.439 1.061v2.927a3 3 0 01-1.658 2.684l-1.757.878A.75.75 0 019.75 21v-5.818a1.5 1.5 0 00-.44-1.06L3.13 7.938a3 3 0 01-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836z" clipRule="evenodd" />
              </svg>
              Filtrar
            </button>
            <button className="btn-hoy">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
              </svg>
              Hoy
            </button>
          </div>
          <button className="btn-invitar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM2.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM18.75 7.5a.75.75 0 00-1.5 0v2.25H15a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H21a.75.75 0 000-1.5h-2.25V7.5z" />
            </svg>
            Invitar
            <div className="invitar-avatars">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User1" alt="User" />
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User2" alt="User" />
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User3" alt="User" />
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User4" alt="User" />
              <span className="invitar-mas">+2</span>
            </div>
          </button>
          <button className="btn-analytics">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
            </svg>
            Analytics
          </button>
          <button className="btn-close-kanban" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Columnas Kanban */}
        <div className="kanban-columns">
          {/* Por hacer */}
          <div 
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop('porHacer')}
          >
            <div className="column-header por-hacer">
              <span className="column-dot"></span>
              Por hacer
              <span className="column-count">{tareas.porHacer.length}</span>
              <button className="btn-add-task" onClick={() => abrirModalTarea('porHacer')}>+</button>
            </div>
            <div className="column-tasks">
              {tareas.porHacer.map(tarea => (
                <div
                  key={tarea.id}
                  className="task-card"
                  draggable
                  onDragStart={() => handleDragStart(tarea, 'porHacer')}
                >
                  <div className="task-header">
                    <span className={`task-prioridad ${tarea.prioridad.toLowerCase()}`}>{tarea.prioridad}</span>
                    <div className="task-menu-container">
                      <button className="task-menu" onClick={() => toggleMenu(tarea.id)}>⋯</button>
                      {menuAbierto === tarea.id && (
                        <div className="task-menu-dropdown">
                          <button onClick={() => verTarea(tarea)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                              <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                            </svg>
                            Ver tarea
                          </button>
                          <button onClick={() => editarTarea(tarea)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                              <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                            </svg>
                            Editar
                          </button>
                          <button onClick={() => eliminarTarea(tarea.id)} className="delete-option">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                            </svg>
                            Eliminar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <h4 className="task-titulo">{tarea.titulo}</h4>
                  <p className="task-descripcion">{tarea.descripcion}</p>
                  <div className="task-footer">
                    <div className="task-avatars">
                      {tarea.asignados.map((avatar, idx) => (
                        <img key={idx} src={avatar} alt="Avatar" />
                      ))}
                    </div>
                    <div className="task-dias">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                      </svg>
                      {tarea.diasRestantes} días
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* En Progreso */}
          <div 
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop('enProgreso')}
          >
            <div className="column-header en-progreso">
              <span className="column-dot"></span>
              En Progreso
              <span className="column-count">{tareas.enProgreso.length}</span>
              <button className="btn-add-task" onClick={() => abrirModalTarea('enProgreso')}>+</button>
            </div>
            <div className="column-tasks">
              {tareas.enProgreso.map(tarea => (
                <div
                  key={tarea.id}
                  className="task-card"
                  draggable
                  onDragStart={() => handleDragStart(tarea, 'enProgreso')}
                >
                  <div className="task-header">
                    <span className={`task-prioridad ${tarea.prioridad.toLowerCase()}`}>{tarea.prioridad}</span>
                    <div className="task-menu-container">
                      <button className="task-menu" onClick={() => toggleMenu(tarea.id)}>⋯</button>
                      {menuAbierto === tarea.id && (
                        <div className="task-menu-dropdown">
                          <button onClick={() => verTarea(tarea)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                              <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                            </svg>
                            Ver tarea
                          </button>
                          <button onClick={() => editarTarea(tarea)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                              <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                            </svg>
                            Editar
                          </button>
                          <button onClick={() => eliminarTarea(tarea.id)} className="delete-option">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                            </svg>
                            Eliminar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <h4 className="task-titulo">{tarea.titulo}</h4>
                  <p className="task-descripcion">{tarea.descripcion}</p>
                  <div className="task-footer">
                    <div className="task-avatars">
                      {tarea.asignados.map((avatar, idx) => (
                        <img key={idx} src={avatar} alt="Avatar" />
                      ))}
                    </div>
                    <div className="task-dias">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                      </svg>
                      {tarea.diasRestantes} días
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hecho */}
          <div 
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop('hecho')}
          >
            <div className="column-header hecho">
              <span className="column-dot"></span>
              Hecho
              <span className="column-count">{tareas.hecho.length}</span>
              <button className="btn-add-task" onClick={() => abrirModalTarea('hecho')}>+</button>
            </div>
            <div className="column-tasks">
              {tareas.hecho.map(tarea => (
                <div
                  key={tarea.id}
                  className="task-card"
                  draggable
                  onDragStart={() => handleDragStart(tarea, 'hecho')}
                >
                  <div className="task-header">
                    <span className={`task-prioridad ${tarea.prioridad.toLowerCase()}`}>{tarea.prioridad}</span>
                    <div className="task-menu-container">
                      <button className="task-menu" onClick={() => toggleMenu(tarea.id)}>⋯</button>
                      {menuAbierto === tarea.id && (
                        <div className="task-menu-dropdown">
                          <button onClick={() => verTarea(tarea)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                              <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                            </svg>
                            Ver tarea
                          </button>
                          <button onClick={() => editarTarea(tarea)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                              <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                            </svg>
                            Editar
                          </button>
                          <button onClick={() => eliminarTarea(tarea.id)} className="delete-option">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                            </svg>
                            Eliminar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <h4 className="task-titulo">{tarea.titulo}</h4>
                  <p className="task-descripcion">{tarea.descripcion}</p>
                  <div className="task-footer">
                    <div className="task-avatars">
                      {tarea.asignados.map((avatar, idx) => (
                        <img key={idx} src={avatar} alt="Avatar" />
                      ))}
                    </div>
                    <div className="task-dias">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                      </svg>
                      {tarea.diasRestantes} días
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Nueva Tarea */}
        {mostrarModalTarea && (
          <NuevaTareaModal
            onClose={() => setMostrarModalTarea(false)}
            onCrear={crearTarea}
          />
        )}

        {/* Modal Ver Tarea */}
        {mostrarModalVer && tareaSeleccionada && (
          <VerTareaModal
            tarea={tareaSeleccionada}
            onClose={() => {
              setMostrarModalVer(false);
              setTareaSeleccionada(null);
            }}
          />
        )}

        {/* Modal Editar Tarea */}
        {mostrarModalEditar && tareaSeleccionada && (
          <EditarTareaModal
            tarea={tareaSeleccionada}
            onClose={() => {
              setMostrarModalEditar(false);
              setTareaSeleccionada(null);
            }}
            onGuardar={guardarEdicion}
          />
        )}
    </div>
  );
}
