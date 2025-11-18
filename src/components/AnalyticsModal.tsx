import { useState, useMemo } from 'react';
import './AnalyticsModal.css';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
  asignado: string;
  avatar: string;
  fechaCreacion: string;
  fechaLimite?: string;
  etiquetas: string[];
}

interface Tareas {
  porHacer: Tarea[];
  enProgreso: Tarea[];
  revision: Tarea[];
  completado: Tarea[];
}

interface AnalyticsModalProps {
  onClose: () => void;
  tareas: Tareas;
  nombreProyecto: string;
}

export default function AnalyticsModal({ onClose, tareas, nombreProyecto }: AnalyticsModalProps) {
  const [vistaActual, setVistaActual] = useState<'general' | 'prioridad' | 'miembros' | 'tiempo'>('general');

  // Calcular estadísticas
  const totalTareas = Object.values(tareas).flat().length;
  const tareasCompletadas = tareas.completado.length;
  const tareasEnProgreso = tareas.enProgreso.length + tareas.revision.length;
  const tareasPendientes = tareas.porHacer.length;
  const porcentajeCompletado = totalTareas > 0 ? Math.round((tareasCompletadas / totalTareas) * 100) : 0;

  // Tareas por prioridad
  const todasLasTareas = Object.values(tareas).flat();
  const tareasAlta = todasLasTareas.filter(t => t.prioridad === 'Alta').length;
  const tareasMedia = todasLasTareas.filter(t => t.prioridad === 'Media').length;
  const tareasBaja = todasLasTareas.filter(t => t.prioridad === 'Baja').length;

  // Análisis de miembros del equipo
  const analisisMiembros = useMemo(() => {
    const miembrosMap = new Map<string, {
      nombre: string;
      avatar: string;
      total: number;
      completadas: number;
      enProgreso: number;
      pendientes: number;
      altaPrioridad: number;
      tasaCompletado: number;
    }>();

    todasLasTareas.forEach(tarea => {
      if (!miembrosMap.has(tarea.asignado)) {
        miembrosMap.set(tarea.asignado, {
          nombre: tarea.asignado,
          avatar: tarea.avatar,
          total: 0,
          completadas: 0,
          enProgreso: 0,
          pendientes: 0,
          altaPrioridad: 0,
          tasaCompletado: 0
        });
      }
      
      const miembro = miembrosMap.get(tarea.asignado)!;
      miembro.total++;
      
      if (tareas.completado.includes(tarea)) miembro.completadas++;
      else if (tareas.enProgreso.includes(tarea) || tareas.revision.includes(tarea)) miembro.enProgreso++;
      else if (tareas.porHacer.includes(tarea)) miembro.pendientes++;
      
      if (tarea.prioridad === 'Alta') miembro.altaPrioridad++;
    });

    // Calcular tasa de completado
    miembrosMap.forEach(miembro => {
      miembro.tasaCompletado = miembro.total > 0 
        ? Math.round((miembro.completadas / miembro.total) * 100) 
        : 0;
    });

    return Array.from(miembrosMap.values()).sort((a, b) => b.total - a.total);
  }, [tareas, todasLasTareas]);

  // Análisis de tiempo (tareas próximas a vencer)
  const analisisTiempo = useMemo(() => {
    const hoy = new Date();
    const tareasConFecha = todasLasTareas.filter(t => t.fechaLimite && !tareas.completado.includes(t));
    
    const vencidas = tareasConFecha.filter(t => {
      const fecha = new Date(t.fechaLimite!.split('/').reverse().join('-'));
      return fecha < hoy;
    });

    const proximas = tareasConFecha.filter(t => {
      const fecha = new Date(t.fechaLimite!.split('/').reverse().join('-'));
      const diasRestantes = Math.ceil((fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
      return diasRestantes >= 0 && diasRestantes <= 7;
    });

    return { vencidas, proximas };
  }, [tareas, todasLasTareas]);

  // Productividad por etapa
  const productividad = [
    { etapa: 'Por hacer', cantidad: tareas.porHacer.length, porcentaje: totalTareas > 0 ? (tareas.porHacer.length / totalTareas) * 100 : 0, color: '#EF4444' },
    { etapa: 'En progreso', cantidad: tareas.enProgreso.length, porcentaje: totalTareas > 0 ? (tareas.enProgreso.length / totalTareas) * 100 : 0, color: '#F59E0B' },
    { etapa: 'En revisión', cantidad: tareas.revision.length, porcentaje: totalTareas > 0 ? (tareas.revision.length / totalTareas) * 100 : 0, color: '#3B82F6' },
    { etapa: 'Completado', cantidad: tareas.completado.length, porcentaje: totalTareas > 0 ? (tareas.completado.length / totalTareas) * 100 : 0, color: '#10B981' }
  ];

  // Etiquetas más usadas
  const etiquetasPopulares = useMemo(() => {
    const etiquetasMap = new Map<string, number>();
    todasLasTareas.forEach(tarea => {
      tarea.etiquetas.forEach((etiqueta: string) => {
        etiquetasMap.set(etiqueta, (etiquetasMap.get(etiqueta) || 0) + 1);
      });
    });
    return Array.from(etiquetasMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [todasLasTareas]);

  return (
    <div className="analytics-overlay" onClick={onClose}>
      <div className="analytics-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="analytics-header">
          <div>
            <h2>Analytics del Proyecto</h2>
            <p className="analytics-subtitle">{nombreProyecto}</p>
          </div>
          <button className="btn-close-analytics" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="analytics-tabs">
          <button 
            className={`tab ${vistaActual === 'general' ? 'active' : ''}`}
            onClick={() => setVistaActual('general')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
            </svg>
            General
          </button>
          <button 
            className={`tab ${vistaActual === 'prioridad' ? 'active' : ''}`}
            onClick={() => setVistaActual('prioridad')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clipRule="evenodd" />
            </svg>
            Prioridad
          </button>
          <button 
            className={`tab ${vistaActual === 'miembros' ? 'active' : ''}`}
            onClick={() => setVistaActual('miembros')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
            </svg>
            Equipo
          </button>
          <button 
            className={`tab ${vistaActual === 'tiempo' ? 'active' : ''}`}
            onClick={() => setVistaActual('tiempo')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
            </svg>
            Tiempo
          </button>
        </div>

        {/* Contenido */}
        <div className="analytics-body">
          {/* Vista General */}
          {vistaActual === 'general' && (
            <div className="analytics-content">
              {/* KPIs Cards */}
              <div className="kpis-grid">
                <div className="kpi-card total">
                  <div className="kpi-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm3.97.97a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06zm4.28 4.28a.75.75 0 000 1.5h5.25a.75.75 0 000-1.5H10.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="kpi-info">
                    <p className="kpi-label">Total de Tareas</p>
                    <h3 className="kpi-value">{totalTareas}</h3>
                  </div>
                </div>

                <div className="kpi-card completadas">
                  <div className="kpi-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="kpi-info">
                    <p className="kpi-label">Completadas</p>
                    <h3 className="kpi-value">{tareasCompletadas}</h3>
                    <p className="kpi-percent">{porcentajeCompletado}%</p>
                  </div>
                </div>

                <div className="kpi-card progreso">
                  <div className="kpi-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="kpi-info">
                    <p className="kpi-label">En Progreso</p>
                    <h3 className="kpi-value">{tareasEnProgreso}</h3>
                  </div>
                </div>

                <div className="kpi-card pendientes">
                  <div className="kpi-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="kpi-info">
                    <p className="kpi-label">Pendientes</p>
                    <h3 className="kpi-value">{tareasPendientes}</h3>
                  </div>
                </div>
              </div>

              {/* Gráfico de Progreso Circular */}
              <div className="chart-container">
                <h3 className="chart-title">Progreso General del Proyecto</h3>
                <div className="circular-chart">
                  <svg viewBox="0 0 200 200" className="circular-progress">
                    <circle cx="100" cy="100" r="90" className="circle-bg" />
                    <circle 
                      cx="100" 
                      cy="100" 
                      r="90" 
                      className="circle-progress"
                      style={{
                        strokeDasharray: `${porcentajeCompletado * 5.65} 565`,
                        transform: 'rotate(-90deg)',
                        transformOrigin: '100px 100px'
                      }}
                    />
                    <text x="100" y="95" className="progress-text-value">{porcentajeCompletado}%</text>
                    <text x="100" y="115" className="progress-text-label">Completado</text>
                  </svg>
                  <div className="progress-legend">
                    <div className="legend-item">
                      <span className="legend-dot completado"></span>
                      <span>Completado: {tareasCompletadas}</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot pendiente"></span>
                      <span>Restante: {totalTareas - tareasCompletadas}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Vista por Prioridad */}
          {vistaActual === 'prioridad' && (
            <div className="analytics-content">
              <h3 className="chart-title">Distribución por Prioridad</h3>
              
              <div className="priority-stats-grid">
                <div className="priority-stat-card alta">
                  <div className="stat-header">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" clipRule="evenodd" />
                    </svg>
                    <span>Alta Prioridad</span>
                  </div>
                  <h2>{tareasAlta}</h2>
                  <p>{totalTareas > 0 ? Math.round((tareasAlta / totalTareas) * 100) : 0}% del total</p>
                </div>
                
                <div className="priority-stat-card media">
                  <div className="stat-header">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM8.47 9.22a.75.75 0 000 1.06l2.25 2.25a.75.75 0 001.06 0l2.25-2.25a.75.75 0 10-1.06-1.06L12 10.19l-.97-.97a.75.75 0 00-1.06 0zm0 4.5a.75.75 0 011.06 0l.97.97.97-.97a.75.75 0 111.06 1.06l-2.25 2.25a.75.75 0 01-1.06 0l-2.25-2.25a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                    <span>Media Prioridad</span>
                  </div>
                  <h2>{tareasMedia}</h2>
                  <p>{totalTareas > 0 ? Math.round((tareasMedia / totalTareas) * 100) : 0}% del total</p>
                </div>
                
                <div className="priority-stat-card baja">
                  <div className="stat-header">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" clipRule="evenodd" />
                    </svg>
                    <span>Baja Prioridad</span>
                  </div>
                  <h2>{tareasBaja}</h2>
                  <p>{totalTareas > 0 ? Math.round((tareasBaja / totalTareas) * 100) : 0}% del total</p>
                </div>
              </div>

              <div className="priority-chart">
                <div className="priority-bar-container">
                  <div className="priority-bar">
                    <div className="priority-label">
                      <span className="priority-dot alta"></span>
                      <span>Alta Prioridad</span>
                    </div>
                    <div className="bar-wrapper">
                      <div 
                        className="bar-fill alta"
                        style={{ width: `${totalTareas > 0 ? (tareasAlta / totalTareas) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <span className="priority-count">{tareasAlta}</span>
                  </div>

                  <div className="priority-bar">
                    <div className="priority-label">
                      <span className="priority-dot media"></span>
                      <span>Media Prioridad</span>
                    </div>
                    <div className="bar-wrapper">
                      <div 
                        className="bar-fill media"
                        style={{ width: `${totalTareas > 0 ? (tareasMedia / totalTareas) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <span className="priority-count">{tareasMedia}</span>
                  </div>

                  <div className="priority-bar">
                    <div className="priority-label">
                      <span className="priority-dot baja"></span>
                      <span>Baja Prioridad</span>
                    </div>
                    <div className="bar-wrapper">
                      <div 
                        className="bar-fill baja"
                        style={{ width: `${totalTareas > 0 ? (tareasBaja / totalTareas) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <span className="priority-count">{tareasBaja}</span>
                  </div>
                </div>
              </div>

              {/* Etiquetas más usadas */}
              {etiquetasPopulares.length > 0 && (
                <div className="tags-popular">
                  <h3 className="chart-title">Etiquetas Más Utilizadas</h3>
                  <div className="tags-grid">
                    {etiquetasPopulares.map(([etiqueta, cantidad], index) => (
                      <div key={index} className="tag-item">
                        <span className="tag-name">{etiqueta}</span>
                        <span className="tag-count">{cantidad}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Vista de Miembros del Equipo */}
          {vistaActual === 'miembros' && (
            <div className="analytics-content">
              <h3 className="chart-title">Desempeño del Equipo</h3>
              
              {analisisMiembros.length === 0 ? (
                <div className="empty-state">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                  <p>No hay miembros asignados</p>
                </div>
              ) : (
                <div className="team-members-grid">
                  {analisisMiembros.map((miembro, index) => (
                    <div key={index} className="member-card">
                      <div className="member-header">
                        <img src={miembro.avatar} alt={miembro.nombre} className="member-avatar" />
                        <div className="member-info">
                          <h4>{miembro.nombre}</h4>
                          <p className="member-total">{miembro.total} tareas asignadas</p>
                        </div>
                        <div className={`member-badge ${miembro.tasaCompletado >= 75 ? 'excelente' : miembro.tasaCompletado >= 50 ? 'bueno' : 'regular'}`}>
                          {miembro.tasaCompletado}%
                        </div>
                      </div>
                      
                      <div className="member-progress-bar">
                        <div className="progress-fill" style={{ width: `${miembro.tasaCompletado}%` }}></div>
                      </div>
                      
                      <div className="member-stats">
                        <div className="stat-item">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                          </svg>
                          <span>{miembro.completadas} completadas</span>
                        </div>
                        <div className="stat-item">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                          </svg>
                          <span>{miembro.enProgreso} en progreso</span>
                        </div>
                        <div className="stat-item">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
                          </svg>
                          <span>{miembro.pendientes} pendientes</span>
                        </div>
                        {miembro.altaPrioridad > 0 && (
                          <div className="stat-item alta-prioridad">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.59L7.3 9.24a.75.75 0 00-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75z" clipRule="evenodd" />
                            </svg>
                            <span>{miembro.altaPrioridad} alta prioridad</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Vista de Productividad/Tiempo */}
          {vistaActual === 'tiempo' && (
            <div className="analytics-content">
              <h3 className="chart-title">Flujo de Trabajo por Etapa</h3>
              <div className="workflow-chart">
                {productividad.map((item, index) => (
                  <div key={index} className="workflow-item">
                    <div className="workflow-header">
                      <span className="workflow-stage">{item.etapa}</span>
                      <span className="workflow-count">{item.cantidad} tareas</span>
                    </div>
                    <div className="workflow-bar-wrapper">
                      <div 
                        className={`workflow-bar stage-${index}`}
                        style={{ 
                          width: `${item.porcentaje}%`,
                          background: item.color
                        }}
                      >
                        <span className="workflow-percent">{Math.round(item.porcentaje)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Alertas de Tiempo */}
              <div className="time-alerts">
                <h3 className="chart-title">Alertas de Tiempo</h3>
                
                {analisisTiempo.vencidas.length > 0 && (
                  <div className="alert-box vencidas">
                    <div className="alert-header">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                      </svg>
                      <h4>Tareas Vencidas ({analisisTiempo.vencidas.length})</h4>
                    </div>
                    <div className="alert-tasks">
                      {analisisTiempo.vencidas.slice(0, 3).map((tarea, index) => (
                        <div key={index} className="alert-task">
                          <span className="task-title">{tarea.titulo}</span>
                          <span className={`task-priority ${tarea.prioridad.toLowerCase()}`}>
                            {tarea.prioridad}
                          </span>
                        </div>
                      ))}
                      {analisisTiempo.vencidas.length > 3 && (
                        <p className="more-tasks">Y {analisisTiempo.vencidas.length - 3} más...</p>
                      )}
                    </div>
                  </div>
                )}

                {analisisTiempo.proximas.length > 0 && (
                  <div className="alert-box proximas">
                    <div className="alert-header">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                      </svg>
                      <h4>Próximas a Vencer ({analisisTiempo.proximas.length})</h4>
                    </div>
                    <div className="alert-tasks">
                      {analisisTiempo.proximas.slice(0, 3).map((tarea, index) => (
                        <div key={index} className="alert-task">
                          <span className="task-title">{tarea.titulo}</span>
                          <span className="task-date">{tarea.fechaLimite}</span>
                        </div>
                      ))}
                      {analisisTiempo.proximas.length > 3 && (
                        <p className="more-tasks">Y {analisisTiempo.proximas.length - 3} más...</p>
                      )}
                    </div>
                  </div>
                )}

                {analisisTiempo.vencidas.length === 0 && analisisTiempo.proximas.length === 0 && (
                  <div className="alert-box success">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                    <h4>¡Todo bajo control!</h4>
                    <p>No hay tareas vencidas ni próximas a vencer</p>
                  </div>
                )}
              </div>

              <div className="productivity-insights">
                <div className="insight-card">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4>Velocidad del Equipo</h4>
                    <p>{tareasCompletadas} tareas completadas</p>
                  </div>
                </div>
                <div className="insight-card">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4>Eficiencia</h4>
                    <p>{porcentajeCompletado}% de avance total</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
