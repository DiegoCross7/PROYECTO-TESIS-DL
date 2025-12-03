import { useMemo } from 'react';
import './Inicio.css';

/**
 * Página: Inicio
 * 
 * Descripción: Vista principal del dashboard con estadísticas de todos los proyectos
 * Responsabilidad: Mostrar métricas agregadas y útiles de todos los proyectos
 */

interface Miembro {
  id: number;
  nombre: string;
  avatar: string;
  rol: string;
}

interface Proyecto {
  id: number;
  nombre: string;
  estado: 'En Progreso' | 'Completado' | 'Pausado' | 'Planificado';
  progreso: number;
  tareas: number;
  tareasCompletadas: number;
  miembros: Miembro[];
  categoria: string;
  fechaFin: string;
}

export default function Inicio() {
  // DATOS DE PROYECTOS (En producción vendrían del backend)
  const proyectos: Proyecto[] = [
    {
      id: 1,
      nombre: "BotFacturador",
      estado: "En Progreso",
      progreso: 65,
      categoria: "Facturación",
      tareas: 14,
      tareasCompletadas: 9,
      fechaFin: "05/06/2025",
      miembros: [
        { id: 1, nombre: "Jane Cooper", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane", rol: "Project Manager" },
        { id: 2, nombre: "Floyd Miles", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Floyd", rol: "Desarrollador RPA" },
        { id: 3, nombre: "Ronald Richards", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ronald", rol: "QA Tester" }
      ]
    },
    {
      id: 2,
      nombre: "BotRegistro360",
      estado: "En Progreso",
      progreso: 80,
      categoria: "Gestión de Datos",
      tareas: 12,
      tareasCompletadas: 10,
      fechaFin: "15/05/2025",
      miembros: [
        { id: 4, nombre: "Marvin McKinney", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marvin", rol: "Full Stack Developer" },
        { id: 5, nombre: "Jerome Bell", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jerome", rol: "Business Analyst" },
        { id: 6, nombre: "Kathryn Murphy", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kathryn", rol: "Scrum Master" }
      ]
    },
    {
      id: 3,
      nombre: "BotPagosExpress",
      estado: "Completado",
      progreso: 100,
      categoria: "Finanzas",
      tareas: 18,
      tareasCompletadas: 18,
      fechaFin: "30/04/2025",
      miembros: [
        { id: 7, nombre: "Jacob Jones", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jacob", rol: "DevOps Engineer" },
        { id: 8, nombre: "Kristin Watson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kristin", rol: "Frontend Developer" }
      ]
    },
    {
      id: 4,
      nombre: "BotAtencionHR",
      estado: "En Progreso",
      progreso: 45,
      categoria: "Recursos Humanos",
      tareas: 16,
      tareasCompletadas: 7,
      fechaFin: "20/06/2025",
      miembros: [
        { id: 9, nombre: "Cameron Williamson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Cameron", rol: "HR Specialist" },
        { id: 10, nombre: "Esther Howard", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Esther", rol: "UX Designer" }
      ]
    },
    {
      id: 5,
      nombre: "BotInventario",
      estado: "Pausado",
      progreso: 30,
      categoria: "Logística",
      tareas: 20,
      tareasCompletadas: 6,
      fechaFin: "15/07/2025",
      miembros: [
        { id: 11, nombre: "Jenny Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jenny", rol: "Backend Developer" }
      ]
    }
  ];

  // CÁLCULOS DE MÉTRICAS REALES
  const estadisticas = useMemo(() => {
    const totalTareas = proyectos.reduce((sum, p) => sum + p.tareas, 0);
    const totalCompletadas = proyectos.reduce((sum, p) => sum + p.tareasCompletadas, 0);
    const totalEnProgreso = proyectos.filter(p => p.estado === 'En Progreso').reduce((sum, p) => sum + (p.tareas - p.tareasCompletadas), 0);
    
    // Tareas completadas
    const tareasCompletadas = totalCompletadas;
    const porcentajeCompletadas = totalTareas > 0 ? (totalCompletadas / totalTareas) * 100 : 0;

    // Tareas en progreso
    const tareasEnProgreso = totalEnProgreso;
    const porcentajeEnProgreso = totalTareas > 0 ? (tareasEnProgreso / totalTareas) * 100 : 0;

    // Tareas pendientes (no iniciadas)
    const tareasPendientes = totalTareas - totalCompletadas - totalEnProgreso;
    const porcentajePendientes = totalTareas > 0 ? (tareasPendientes / totalTareas) * 100 : 0;

    // Tareas pausadas (de proyectos pausados)
    const tareasPausadas = proyectos.filter(p => p.estado === 'Pausado').reduce((sum, p) => sum + (p.tareas - p.tareasCompletadas), 0);
    const porcentajePausadas = totalTareas > 0 ? (tareasPausadas / totalTareas) * 100 : 0;

    return {
      completado: Math.round(porcentajeCompletadas),
      enProgreso: Math.round(porcentajeEnProgreso),
      pendiente: Math.round(porcentajePendientes),
      pausado: Math.round(porcentajePausadas)
    };
  }, [proyectos]);

  // DISTRIBUCIÓN POR ESTADO DE PROYECTO
  const distribucionEstados = useMemo(() => {
    const enProgreso = proyectos.filter(p => p.estado === 'En Progreso').length;
    const completados = proyectos.filter(p => p.estado === 'Completado').length;
    const pausados = proyectos.filter(p => p.estado === 'Pausado').length;
    const planificados = proyectos.filter(p => p.estado === 'Planificado').length;
    
    const total = proyectos.length;

    return [
      { nombre: "En Progreso", cantidad: enProgreso, valor: total > 0 ? (enProgreso / total) * 100 : 0, color: "#3B82F6" },
      { nombre: "Completados", cantidad: completados, valor: total > 0 ? (completados / total) * 100 : 0, color: "#10B981" },
      { nombre: "Pausados", cantidad: pausados, valor: total > 0 ? (pausados / total) * 100 : 0, color: "#F59E0B" },
      { nombre: "Planificados", cantidad: planificados, valor: total > 0 ? (planificados / total) * 100 : 0, color: "#8B5CF6" }
    ];
  }, [proyectos]);

  // PROGRESO PROMEDIO POR MES (últimos 6 meses)
  const progresoMensual = useMemo(() => {
    // Simulación de progreso histórico basado en los proyectos actuales
    const meses = ["Oct 2024", "Nov 2024", "Dic 2024", "Ene 2025", "Feb 2025", "Mar 2025"];
    
    return {
      completado: [
        { mes: meses[0], valor: 12 },
        { mes: meses[1], valor: 18 },
        { mes: meses[2], valor: 24 },
        { mes: meses[3], valor: 32 },
        { mes: meses[4], valor: 42 },
        { mes: meses[5], valor: proyectos.reduce((sum, p) => sum + p.tareasCompletadas, 0) }
      ],
      objetivo: [
        { mes: meses[0], valor: 15 },
        { mes: meses[1], valor: 25 },
        { mes: meses[2], valor: 35 },
        { mes: meses[3], valor: 45 },
        { mes: meses[4], valor: 55 },
        { mes: meses[5], valor: proyectos.reduce((sum, p) => sum + p.tareas, 0) }
      ]
    };
  }, [proyectos]);

  return (
    <div className="inicio-container">
      <div className="inicio-header">
        <div>
          <h1 className="page-title">Dashboard General</h1>
          <p className="page-subtitle">{proyectos.length} proyectos activos · {proyectos.reduce((sum, p) => sum + p.miembros.length, 0)} miembros totales</p>
        </div>
        <button className="btn-grid-view">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="dashboard-grid">
        {/* SECCIÓN: TAREAS GENERALES */}
        <section className="dashboard-card tareas-card">
          <div className="card-header">
            <h2 className="card-title">Estado de Tareas</h2>
            <div className="header-badge">
              {proyectos.reduce((sum, p) => sum + p.tareas, 0)} tareas totales
            </div>
          </div>

          <div className="tareas-chart">
            <svg viewBox="0 0 200 200" className="donut-chart">
              <circle
                cx="100" cy="100" r="80" fill="none" stroke="#10B981" strokeWidth="40"
                strokeDasharray={`${(estadisticas.completado / 100) * 502.4} 502.4`}
                transform="rotate(-90 100 100)"
              />
              <circle
                cx="100" cy="100" r="80" fill="none" stroke="#3B82F6" strokeWidth="40"
                strokeDasharray={`${(estadisticas.enProgreso / 100) * 502.4} 502.4`}
                strokeDashoffset={`-${(estadisticas.completado / 100) * 502.4}`}
                transform="rotate(-90 100 100)"
              />
              <circle
                cx="100" cy="100" r="80" fill="none" stroke="#F59E0B" strokeWidth="40"
                strokeDasharray={`${(estadisticas.pausado / 100) * 502.4} 502.4`}
                strokeDashoffset={`-${((estadisticas.completado + estadisticas.enProgreso) / 100) * 502.4}`}
                transform="rotate(-90 100 100)"
              />
              <circle
                cx="100" cy="100" r="80" fill="none" stroke="#EF4444" strokeWidth="40"
                strokeDasharray={`${(estadisticas.pendiente / 100) * 502.4} 502.4`}
                strokeDashoffset={`-${((estadisticas.completado + estadisticas.enProgreso + estadisticas.pausado) / 100) * 502.4}`}
                transform="rotate(-90 100 100)"
              />
            </svg>

            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#10B981' }}></span>
                <span className="legend-label">Completadas</span>
                <span className="legend-value">{estadisticas.completado}%</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#3B82F6' }}></span>
                <span className="legend-label">En progreso</span>
                <span className="legend-value">{estadisticas.enProgreso}%</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#F59E0B' }}></span>
                <span className="legend-label">Pausadas</span>
                <span className="legend-value">{estadisticas.pausado}%</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#EF4444' }}></span>
                <span className="legend-label">Pendientes</span>
                <span className="legend-value">{estadisticas.pendiente}%</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN: ESTADOS DE PROYECTOS */}
        <section className="dashboard-card registro-card">
          <div className="card-header">
            <h2 className="card-title">Estados de Proyectos</h2>
            <div className="header-badge">
              {proyectos.length} proyectos
            </div>
          </div>

          <div className="registro-chart">
            <svg viewBox="0 0 200 200" className="donut-chart">
              {distribucionEstados.filter(item => item.cantidad > 0).map((item, index, arr) => {
                const offset = arr.slice(0, index).reduce((acc, curr) => acc + curr.valor, 0);
                return (
                  <circle
                    key={item.nombre}
                    cx="100" cy="100" r="80" fill="none"
                    stroke={item.color} strokeWidth="40"
                    strokeDasharray={`${(item.valor / 100) * 502.4} 502.4`}
                    strokeDashoffset={`-${(offset / 100) * 502.4}`}
                    transform="rotate(-90 100 100)"
                  />
                );
              })}
            </svg>

            <div className="chart-legend">
              {distribucionEstados.map((item) => (
                <div key={item.nombre} className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                  <span className="legend-label">{item.nombre}</span>
                  <span className="legend-value">{item.cantidad}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN: DISTRIBUCIÓN DE EQUIPO */}
        <section className="dashboard-card equipo-card">
          <div className="card-header">
            <h2 className="card-title">Distribución de Equipo</h2>
            <div className="header-badge">
              {proyectos.reduce((sum, p) => sum + p.miembros.length, 0)} miembros
            </div>
          </div>

          <div className="equipo-content">
            <div className="equipo-bars">
              {proyectos.slice(0, 5).map(proyecto => {
                const maxMiembros = Math.max(...proyectos.map(p => p.miembros.length));
                const porcentaje = (proyecto.miembros.length / maxMiembros) * 100;
                
                return (
                  <div key={proyecto.id} className="equipo-bar-item">
                    <div className="equipo-bar-label">
                      <span className="equipo-proyecto-nombre">{proyecto.nombre}</span>
                      <span className="equipo-miembros-count">{proyecto.miembros.length}</span>
                    </div>
                    <div className="equipo-bar-container">
                      <div 
                        className="equipo-bar-fill"
                        style={{ 
                          width: `${porcentaje}%`,
                          background: proyecto.estado === 'En Progreso' ? '#3B82F6' :
                                     proyecto.estado === 'Completado' ? '#10B981' :
                                     proyecto.estado === 'Pausado' ? '#F59E0B' : '#9333EA'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECCIÓN: PROGRESO TEMPORAL */}
        <section className="dashboard-card rendimiento-card">
          <div className="card-header">
            <h2 className="card-title">Progreso Temporal</h2>
            <div className="header-badge">
              Últimos 6 meses
            </div>
          </div>

          <div className="rendimiento-chart">
            <div className="chart-header">
              <div className="chart-legend-horizontal">
                <div className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: '#10B981' }}></span>
                  <span className="legend-label">Completado</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: '#8B5CF6' }}></span>
                  <span className="legend-label">Objetivo</span>
                </div>
              </div>
              <div className="chart-stats">
                <div className="stat-item">
                  <span className="stat-label">{proyectos.reduce((sum, p) => sum + p.tareasCompletadas, 0)} Tareas</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">{proyectos.reduce((sum, p) => sum + p.tareas, 0)} Tareas</span>
                </div>
              </div>
            </div>

            <svg viewBox="0 0 600 220" className="line-chart" preserveAspectRatio="xMidYMid meet">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <line key={i} x1="60" y1={20 + i * 16} x2="560" y2={20 + i * 16} stroke="#E5E7EB" strokeWidth="0.5" />
              ))}

              {[60, 50, 40, 30, 20, 10, 0].map((val, i) => (
                <text key={val} x="45" y={20 + i * 27 + 4} textAnchor="end" fontSize="11" fill="#6B7280">{val}</text>
              ))}

              <polyline
                fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                points={progresoMensual.completado.map((d, i) => `${80 + i * 80},${180 - (d.valor / 60) * 160}`).join(' ')}
              />

              <polyline
                fill="none" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                points={progresoMensual.objetivo.map((d, i) => `${80 + i * 80},${180 - (d.valor / 60) * 160}`).join(' ')}
              />

              {progresoMensual.completado.map((d, i) => (
                <g key={i}>
                  <circle cx={80 + i * 80} cy={180 - (d.valor / 60) * 160} r="6" fill="white" stroke="#10B981" strokeWidth="2" />
                  <circle cx={80 + i * 80} cy={180 - (d.valor / 60) * 160} r="3" fill="#10B981" />
                </g>
              ))}

              {progresoMensual.objetivo.map((d, i) => (
                <g key={i}>
                  <circle cx={80 + i * 80} cy={180 - (d.valor / 60) * 160} r="6" fill="white" stroke="#8B5CF6" strokeWidth="2" />
                  <circle cx={80 + i * 80} cy={180 - (d.valor / 60) * 160} r="3" fill="#8B5CF6" />
                </g>
              ))}

              {progresoMensual.completado.map((d, i) => (
                <text key={i} x={80 + i * 80} y="205" textAnchor="middle" fontSize="11" fill="#6B7280" fontWeight="500">
                  {d.mes}
                </text>
              ))}
            </svg>
          </div>
        </section>
      </div>
    </div>
  );
}
