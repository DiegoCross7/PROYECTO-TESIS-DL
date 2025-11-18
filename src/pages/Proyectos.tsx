import { useState, useEffect } from 'react';
import './Proyectos.css';
import DetalleProyectoModal from '../components/DetalleProyectoModal';
import NuevoProyectoModal from '../components/NuevoProyectoModal';
import EditarProyectoModal from '../components/EditarProyectoModal';
import TableroKanban from '../components/TableroKanban';

interface TareaInicial {
  id: number;
  titulo: string;
  descripcion: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
  asignados: string[];
  diasRestantes: number;
}

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
  tareasIniciales?: TareaInicial[];
}

interface ProyectosProps {
  proyectoIdSeleccionado?: number | null;
  onLimpiarSeleccion?: () => void;
}

export default function Proyectos({ proyectoIdSeleccionado, onLimpiarSeleccion }: ProyectosProps = {}) {
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<Proyecto | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarNuevoProyecto, setMostrarNuevoProyecto] = useState(false);
  const [mostrarEditarProyecto, setMostrarEditarProyecto] = useState(false);
  const [mostrarKanban, setMostrarKanban] = useState(false);
  const [proyectos, setProyectos] = useState<Proyecto[]>([
    {
      id: 1,
      nombre: "BotFacturador",
      descripcion: "Automatiza todo el flujo de facturación electrónica: genera facturas desde sistemas internos (ERP o Excel), las valida con los formatos requeridos por la SUNAT y finalmente las envía al cliente con el archivo XML y PDF adjunto.",
      fechaInicio: "05/04/2025",
      fechaFin: "05/06/2025",
      estado: "En Progreso",
      progreso: 65,
      categoria: "Facturación",
      tareas: 14,
      tareasCompletadas: 9,
      miembros: [
        { id: 1, nombre: "Jane Cooper", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane", rol: "Project Manager" },
        { id: 2, nombre: "Floyd Miles", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Floyd", rol: "Desarrollador RPA" },
        { id: 3, nombre: "Ronald Richards", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ronald", rol: "QA Tester" }
      ]
    },
    {
      id: 2,
      nombre: "BotRegistro360",
      descripcion: "Extrae información de clientes desde hojas Excel o formularios web y los ingresa en un CRM o base de datos corporativa. El bot valida campos obligatorios, detecta duplicados y normaliza los formatos.",
      fechaInicio: "10/03/2025",
      fechaFin: "15/05/2025",
      estado: "En Progreso",
      progreso: 80,
      categoria: "Gestión de Datos",
      tareas: 12,
      tareasCompletadas: 10,
      miembros: [
        { id: 4, nombre: "Marvin McKinney", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marvin", rol: "Full Stack Developer" },
        { id: 5, nombre: "Jerome Bell", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jerome", rol: "Business Analyst" },
        { id: 6, nombre: "Kathryn Murphy", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kathryn", rol: "Scrum Master" }
      ]
    },
    {
      id: 3,
      nombre: "BotPagosExpress",
      descripcion: "Automatiza la conciliación de pagos: descarga comprobantes bancarios, los compara con facturas registradas y actualiza su estado en el sistema contable. Además, genera reportes automáticos de pagos pendientes.",
      fechaInicio: "01/02/2025",
      fechaFin: "30/04/2025",
      estado: "Completado",
      progreso: 100,
      categoria: "Finanzas",
      tareas: 18,
      tareasCompletadas: 18,
      miembros: [
        { id: 7, nombre: "Jacob Jones", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jacob", rol: "DevOps Engineer" },
        { id: 8, nombre: "Kristin Watson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kristin", rol: "Frontend Developer" }
      ]
    },
    {
      id: 4,
      nombre: "BotSunarpCheck",
      descripcion: "Accede automáticamente al portal de SUNARP para consultar títulos archivados, propiedades o vehículos registrados. Extrae los resultados, los guarda en Excel y genera un informe con la información obtenida.",
      fechaInicio: "15/05/2025",
      fechaFin: "20/07/2025",
      estado: "Planificado",
      progreso: 15,
      categoria: "Consultas Legales",
      tareas: 20,
      tareasCompletadas: 3,
      miembros: [
        { id: 9, nombre: "Courtney Henry", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Courtney", rol: "Backend Developer" },
        { id: 10, nombre: "Theresa Webb", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Theresa", rol: "QA Tester" }
      ]
    },
    {
      id: 5,
      nombre: "BotMailSorter",
      descripcion: "Monitorea de forma continua las bandejas de entrada corporativas, identificando correos electrónicos según palabras clave, asunto o remitente. Descarga automáticamente los archivos adjuntos y los clasifica.",
      fechaInicio: "20/04/2025",
      fechaFin: "25/06/2025",
      estado: "En Progreso",
      progreso: 45,
      categoria: "Automatización Email",
      tareas: 15,
      tareasCompletadas: 7,
      miembros: [
        { id: 1, nombre: "Jane Cooper", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane", rol: "Project Manager" },
        { id: 3, nombre: "Ronald Richards", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ronald", rol: "QA Tester" },
        { id: 5, nombre: "Jerome Bell", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jerome", rol: "Business Analyst" }
      ]
    },
    {
      id: 6,
      nombre: "BotRRHH",
      descripcion: "Automatiza múltiples procesos del área de Recursos Humanos, incluyendo el registro y validación de asistencia, cálculo de vacaciones, análisis de legajos y boletas de pago en el portal de empleados.",
      fechaInicio: "01/06/2025",
      fechaFin: "30/08/2025",
      estado: "Pausado",
      progreso: 30,
      categoria: "Recursos Humanos",
      tareas: 22,
      tareasCompletadas: 7,
      miembros: [
        { id: 2, nombre: "Floyd Miles", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Floyd", rol: "Desarrollador RPA" },
        { id: 4, nombre: "Marvin McKinney", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marvin", rol: "Full Stack Developer" },
        { id: 6, nombre: "Kathryn Murphy", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kathryn", rol: "Scrum Master" },
        { id: 8, nombre: "Kristin Watson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kristin", rol: "Frontend Developer" }
      ]
    }
  ]);

  // Efecto para abrir automáticamente el Kanban cuando se selecciona un proyecto desde Configuraciones
  useEffect(() => {
    if (proyectoIdSeleccionado) {
      const proyecto = proyectos.find(p => p.id === proyectoIdSeleccionado);
      if (proyecto) {
        abrirKanban(proyecto);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proyectoIdSeleccionado]);

  const abrirDetalleProyecto = (proyecto: Proyecto) => {
    setProyectoSeleccionado(proyecto);
    setMostrarModal(true);
  };

  const abrirKanban = (proyecto: Proyecto) => {
    setProyectoSeleccionado(proyecto);
    setMostrarKanban(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setProyectoSeleccionado(null);
  };

  const cerrarKanban = () => {
    setMostrarKanban(false);
    setProyectoSeleccionado(null);
    // Limpiar la selección del Dashboard
    if (onLimpiarSeleccion) {
      onLimpiarSeleccion();
    }
  };

  const abrirNuevoProyecto = () => {
    setMostrarNuevoProyecto(true);
  };

  const cerrarNuevoProyecto = () => {
    setMostrarNuevoProyecto(false);
  };

  const abrirEditarProyecto = () => {
    setMostrarEditarProyecto(true);
  };

  const cerrarEditarProyecto = () => {
    setMostrarEditarProyecto(false);
  };

  const guardarProyecto = (proyectoEditado: Proyecto) => {
    setProyectos(prevProyectos => 
      prevProyectos.map(p => 
        p.id === proyectoEditado.id ? proyectoEditado : p
      )
    );
    cerrarEditarProyecto();
    setMostrarModal(false);
  };

  const crearProyecto = (nuevoProyecto: {
    nombre: string;
    tipo: string;
    fechaInicio: string;
    fechaFinal: string;
    descripcion: string;
    prioridad: string;
    participantes: string[];
    archivo?: File;
    tareasIniciales?: TareaInicial[];
  }) => {
    console.log('Nuevo proyecto:', nuevoProyecto);
    console.log('Tareas iniciales:', nuevoProyecto.tareasIniciales);
    
    // Crear nuevo proyecto con tareas iniciales
    const proyecto: Proyecto = {
      id: Date.now(),
      nombre: nuevoProyecto.nombre,
      descripcion: nuevoProyecto.descripcion,
      fechaInicio: nuevoProyecto.fechaInicio,
      fechaFin: nuevoProyecto.fechaFinal,
      estado: 'En Progreso',
      progreso: 0,
      miembros: [],
      tareas: nuevoProyecto.tareasIniciales?.length || 0,
      tareasCompletadas: 0,
      categoria: nuevoProyecto.tipo,
      tareasIniciales: nuevoProyecto.tareasIniciales
    };
    
    // Abrir directamente el Kanban con el nuevo proyecto
    setProyectoSeleccionado(proyecto);
    setMostrarKanban(true);
    cerrarNuevoProyecto();
  };

  return (
    <>
      {!mostrarKanban ? (
        <div className="proyectos-container">
          {/* Header */}
          <div className="proyectos-header">
            <h1 className="proyectos-titulo">Proyectos RPA</h1>
            <button className="btn-nuevo-proyecto" onClick={abrirNuevoProyecto}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
              </svg>
              Nuevo Proyecto
            </button>
          </div>

          {/* Estadísticas */}
          <div className="proyectos-estadisticas">
        <div className="stat-card">
          <div className="stat-icono total">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
              <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z" />
              <path d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z" />
            </svg>
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Proyectos</p>
            <h3 className="stat-valor">{proyectos.length}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icono activos">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="stat-info">
            <p className="stat-label">En Progreso</p>
            <h3 className="stat-valor">{proyectos.filter(p => p.estado === 'En Progreso').length}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icono completados">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="stat-info">
            <p className="stat-label">Completados</p>
            <h3 className="stat-valor">{proyectos.filter(p => p.estado === 'Completado').length}</h3>
          </div>
        </div>
      </div>

      {/* Grid de proyectos */}
      <div className="proyectos-grid">
        {proyectos.map((proyecto) => (
          <div 
            key={proyecto.id} 
            className="proyecto-card"
            onClick={() => abrirKanban(proyecto)}
          >
            {/* Nombre del proyecto con badge de estado */}
            <div className="proyecto-header-row">
              <h3 className="proyecto-nombre">{proyecto.nombre}</h3>
              <span className={`proyecto-estado ${proyecto.estado.toLowerCase().replace(' ', '-')}`}>
                {proyecto.estado}
              </span>
            </div>
            
            {/* Descripción */}
            <p className="proyecto-descripcion">{proyecto.descripcion}</p>

            {/* Barra de progreso */}
            <div className="proyecto-progreso-container">
              <div className="progreso-info">
                <span className="progreso-label">Progreso</span>
                <span className="progreso-porcentaje">{proyecto.progreso}%</span>
              </div>
              <div className="progreso-barra">
                <div 
                  className="progreso-fill" 
                  style={{ width: `${proyecto.progreso}%` }}
                ></div>
              </div>
            </div>

            {/* Fechas */}
            <div className="proyecto-fechas">
              <div className="fecha-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                  <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                </svg>
                <div className="fecha-texto">
                  <span className="fecha-label">Inicio</span>
                  <span className="fecha-valor">{proyecto.fechaInicio}</span>
                </div>
              </div>
              <div className="fecha-separador"></div>
              <div className="fecha-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                </svg>
                <div className="fecha-texto">
                  <span className="fecha-label">Fin</span>
                  <span className="fecha-valor">{proyecto.fechaFin}</span>
                </div>
              </div>
            </div>

            {/* Tareas */}
            <div className="proyecto-tareas">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm3.97.97a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06zm4.28 4.28a.75.75 0 000 1.5h5.25a.75.75 0 000-1.5H10.5z" clipRule="evenodd" />
              </svg>
              <span>{proyecto.tareasCompletadas} de {proyecto.tareas} tareas completadas</span>
            </div>

            {/* Separador */}
            <div className="proyecto-separador"></div>

            {/* Miembros del equipo */}
            <div className="proyecto-footer">
              <div className="proyecto-miembros">
                <div className="miembros-avatars">
                  {proyecto.miembros.slice(0, 3).map((miembro, index) => (
                    <img 
                      key={miembro.id}
                      src={miembro.avatar} 
                      alt={miembro.nombre}
                      className="miembro-avatar"
                      style={{ zIndex: 10 - index }}
                      title={miembro.nombre}
                    />
                  ))}
                  {proyecto.miembros.length > 3 && (
                    <div className="miembro-mas" title={`+${proyecto.miembros.length - 3} más`}>
                      +{proyecto.miembros.length - 3}
                    </div>
                  )}
                </div>
                <span className="miembros-texto">{proyecto.miembros.length} miembros</span>
              </div>
              
              <button className="btn-ver-mas" onClick={(e) => {
                e.stopPropagation();
                abrirDetalleProyecto(proyecto);
              }}>
                Ver detalles
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

          {/* Modal de detalle */}
          {mostrarModal && proyectoSeleccionado && (
            <DetalleProyectoModal 
              proyecto={proyectoSeleccionado} 
              onClose={cerrarModal}
              onEditar={abrirEditarProyecto}
            />
          )}

          {/* Modal editar proyecto */}
          {mostrarEditarProyecto && proyectoSeleccionado && (
            <EditarProyectoModal
              proyecto={proyectoSeleccionado}
              onClose={cerrarEditarProyecto}
              onGuardar={guardarProyecto}
            />
          )}

          {/* Modal nuevo proyecto */}
          {mostrarNuevoProyecto && (
            <NuevoProyectoModal
              onClose={cerrarNuevoProyecto}
              onCrear={crearProyecto}
            />
          )}
        </div>
      ) : (
        proyectoSeleccionado && (
          <TableroKanban
            nombreProyecto={proyectoSeleccionado.nombre}
            tareasIniciales={proyectoSeleccionado.tareasIniciales}
            onClose={cerrarKanban}
          />
        )
      )}
    </>
  );
}
