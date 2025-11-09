import './Inicio.css';

/**
 * Página: Inicio
 * 
 * Descripción: Vista principal del dashboard con estadísticas
 * Responsabilidad: Mostrar tarjetas de Tareas, Registro y Rendimiento
 */
export default function Inicio() {
  // Estadísticas de tareas (TODO: Obtener del backend via API GET /api/tareas/stats)
  const tareasStats = {
    completado: 32,
    enEspera: 25,
    enProgreso: 25,
    pendiente: 18
  };

  // Datos de registro de trabajo (TODO: Obtener del backend via API GET /api/registro-trabajo)
  const registroTrabajo = [
    { nombre: "Producto 1", valor: 30, color: "#3B82F6" },
    { nombre: "Producto 2", valor: 25, color: "#F59E0B" },
    { nombre: "Producto 3", valor: 25, color: "#EF4444" },
    { nombre: "Producto 4", valor: 20, color: "#10B981" }
  ];

  // Datos de rendimiento (TODO: Obtener del backend via API GET /api/rendimiento)
  const rendimientoData = {
    archivado: [
      { mes: "Oct 2021", valor: 4 },
      { mes: "Nov 2021", valor: 6 },
      { mes: "Dic 2021", valor: 5 },
      { mes: "Ene 2022", valor: 7 },
      { mes: "Feb 2022", valor: 8 },
      { mes: "Mar 2022", valor: 6 }
    ],
    objetivo: [
      { mes: "Oct 2021", valor: 6 },
      { mes: "Nov 2021", valor: 7 },
      { mes: "Dic 2021", valor: 8 },
      { mes: "Ene 2022", valor: 9 },
      { mes: "Feb 2022", valor: 10 },
      { mes: "Mar 2022", valor: 8 }
    ]
  };

  return (
    <div className="inicio-container">
      <div className="inicio-header">
        <h1 className="page-title">Inicio</h1>
        <button className="btn-grid-view">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="dashboard-grid">
        {/* SECCIÓN: TAREAS */}
        <section className="dashboard-card tareas-card">
          <div className="card-header">
            <h2 className="card-title">Tareas</h2>
            <button className="btn-semana">
              Esta Semana
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="tareas-chart">
            <svg viewBox="0 0 200 200" className="donut-chart">
              <circle
                cx="100" cy="100" r="80" fill="none" stroke="#14B8A6" strokeWidth="40"
                strokeDasharray={`${(tareasStats.completado / 100) * 502.4} 502.4`}
                transform="rotate(-90 100 100)"
              />
              <circle
                cx="100" cy="100" r="80" fill="none" stroke="#8B5CF6" strokeWidth="40"
                strokeDasharray={`${(tareasStats.enEspera / 100) * 502.4} 502.4`}
                strokeDashoffset={`-${(tareasStats.completado / 100) * 502.4}`}
                transform="rotate(-90 100 100)"
              />
              <circle
                cx="100" cy="100" r="80" fill="none" stroke="#3B82F6" strokeWidth="40"
                strokeDasharray={`${(tareasStats.enProgreso / 100) * 502.4} 502.4`}
                strokeDashoffset={`-${((tareasStats.completado + tareasStats.enEspera) / 100) * 502.4}`}
                transform="rotate(-90 100 100)"
              />
              <circle
                cx="100" cy="100" r="80" fill="none" stroke="#EF4444" strokeWidth="40"
                strokeDasharray={`${(tareasStats.pendiente / 100) * 502.4} 502.4`}
                strokeDashoffset={`-${((tareasStats.completado + tareasStats.enEspera + tareasStats.enProgreso) / 100) * 502.4}`}
                transform="rotate(-90 100 100)"
              />
            </svg>

            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#14B8A6' }}></span>
                <span className="legend-label">Completado</span>
                <span className="legend-value">{tareasStats.completado}%</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#8B5CF6' }}></span>
                <span className="legend-label">En espera</span>
                <span className="legend-value">{tareasStats.enEspera}%</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#3B82F6' }}></span>
                <span className="legend-label">En progreso</span>
                <span className="legend-value">{tareasStats.enProgreso}%</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#EF4444' }}></span>
                <span className="legend-label">Pendiente</span>
                <span className="legend-value">{tareasStats.pendiente}%</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN: REGISTRO DE TRABAJO */}
        <section className="dashboard-card registro-card">
          <div className="card-header">
            <h2 className="card-title">Registro de trabajo</h2>
            <button className="btn-semana">
              Esta Semana
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="registro-chart">
            <svg viewBox="0 0 200 200" className="donut-chart">
              {registroTrabajo.map((item, index) => {
                const offset = registroTrabajo.slice(0, index).reduce((acc, curr) => acc + curr.valor, 0);
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
              {registroTrabajo.map((item) => (
                <div key={item.nombre} className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                  <span className="legend-label">{item.nombre}</span>
                  <span className="legend-value">{item.valor}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN: RENDIMIENTO */}
        <section className="dashboard-card rendimiento-card">
          <div className="card-header">
            <h2 className="card-title">Rendimiento</h2>
            <button className="btn-semana">
              Esta Semana
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="rendimiento-chart">
            <div className="chart-header">
              <div className="chart-legend-horizontal">
                <div className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: '#EF4444' }}></span>
                  <span className="legend-label">Archivado</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: '#8B5CF6' }}></span>
                  <span className="legend-label">Objetivo</span>
                </div>
              </div>
              <div className="chart-stats">
                <div className="stat-item">
                  <span className="stat-label">7 Proyectos</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">5 Proyectos</span>
                </div>
              </div>
            </div>

            <svg viewBox="0 0 600 220" className="line-chart" preserveAspectRatio="xMidYMid meet">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <line key={i} x1="60" y1={20 + i * 16} x2="560" y2={20 + i * 16} stroke="#E5E7EB" strokeWidth="0.5" />
              ))}

              {[10, 8, 6, 4, 2, 0].map((val, i) => (
                <text key={val} x="45" y={20 + i * 32 + 4} textAnchor="end" fontSize="11" fill="#6B7280">{val}</text>
              ))}

              <polyline
                fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                points={rendimientoData.archivado.map((d, i) => `${80 + i * 80},${180 - d.valor * 16}`).join(' ')}
              />

              <polyline
                fill="none" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                points={rendimientoData.objetivo.map((d, i) => `${80 + i * 80},${180 - d.valor * 16}`).join(' ')}
              />

              {rendimientoData.archivado.map((d, i) => (
                <g key={i}>
                  <circle cx={80 + i * 80} cy={180 - d.valor * 16} r="6" fill="white" stroke="#EF4444" strokeWidth="2" />
                  <circle cx={80 + i * 80} cy={180 - d.valor * 16} r="3" fill="#EF4444" />
                </g>
              ))}

              {rendimientoData.objetivo.map((d, i) => (
                <g key={i}>
                  <circle cx={80 + i * 80} cy={180 - d.valor * 16} r="6" fill="white" stroke="#8B5CF6" strokeWidth="2" />
                  <circle cx={80 + i * 80} cy={180 - d.valor * 16} r="3" fill="#8B5CF6" />
                </g>
              ))}

              {rendimientoData.archivado.map((d, i) => (
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
