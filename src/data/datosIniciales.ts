/**
 * Datos iniciales precargados para demostración
 * 
 * Este archivo contiene datos realistas para:
 * - Proyectos con tareas
 * - Usuarios del sistema
 * - Configuraciones
 */

export const PROYECTOS_INICIALES = [
  {
    id: 1,
    nombre: "Sistema RPA - Automatización de Procesos",
    descripcion: "Desarrollo de sistema de automatización robótica de procesos para optimizar flujos de trabajo empresariales",
    fechaInicio: "2024-01-15",
    fechaFin: "2024-12-20",
    estado: "En Progreso" as const,
    progreso: 75,
    categoria: "Desarrollo de Software",
    miembros: [
      { id: 1, nombre: "Ana García", avatar: "https://i.pravatar.cc/150?img=1", rol: "Project Manager" },
      { id: 2, nombre: "Carlos Ruiz", avatar: "https://i.pravatar.cc/150?img=3", rol: "Developer" },
      { id: 3, nombre: "María López", avatar: "https://i.pravatar.cc/150?img=5", rol: "QA Tester" }
    ],
    tareas: 12,
    tareasCompletadas: 9,
    linkDocumento: "https://docs.google.com/presentation/d/1BmQeHN8v6rYN_8ZxKX9sZ0xL-example/edit",
    tareasIniciales: [
      {
        id: 1,
        titulo: "Diseñar arquitectura del sistema",
        descripcion: "Crear diagrama de arquitectura y definir componentes principales",
        prioridad: "Alta" as const,
        asignados: ["Ana García", "Carlos Ruiz"],
        diasRestantes: 3,
        estado: "enProgreso" as const
      },
      {
        id: 2,
        titulo: "Implementar módulo de autenticación",
        descripcion: "Sistema de login con JWT y manejo de sesiones",
        prioridad: "Alta" as const,
        asignados: ["Carlos Ruiz"],
        diasRestantes: 5,
        estado: "porHacer" as const
      },
      {
        id: 3,
        titulo: "Realizar pruebas de integración",
        descripcion: "Suite completa de tests para validar funcionalidad",
        prioridad: "Media" as const,
        asignados: ["María López"],
        diasRestantes: 7,
        estado: "porHacer" as const
      }
    ]
  },
  {
    id: 2,
    nombre: "Dashboard Analytics - BI Empresarial",
    descripcion: "Panel de control con visualización de KPIs en tiempo real",
    fechaInicio: "2024-02-01",
    fechaFin: "2024-06-30",
    estado: "En Progreso" as const,
    progreso: 60,
    categoria: "Business Intelligence",
    miembros: [
      { id: 4, nombre: "Luis Martín", avatar: "https://i.pravatar.cc/150?img=7", rol: "Data Analyst" },
      { id: 5, nombre: "Elena Torres", avatar: "https://i.pravatar.cc/150?img=9", rol: "UI/UX Designer" }
    ],
    tareas: 8,
    tareasCompletadas: 5,
    linkDocumento: "https://docs.google.com/document/d/1example-document-id/edit",
    tareasIniciales: [
      {
        id: 4,
        titulo: "Conectar a base de datos",
        descripcion: "Configurar conexión con SQL Server y crear queries",
        prioridad: "Alta" as const,
        asignados: ["Luis Martín"],
        diasRestantes: 2,
        estado: "enProgreso" as const
      }
    ]
  },
  {
    id: 3,
    nombre: "App Móvil - Gestión de Inventario",
    descripcion: "Aplicación móvil para control de stock en tiempo real",
    fechaInicio: "2024-03-10",
    fechaFin: "2024-09-15",
    estado: "Planificado" as const,
    progreso: 25,
    categoria: "Desarrollo Móvil",
    miembros: [
      { id: 6, nombre: "Jorge Ramos", avatar: "https://i.pravatar.cc/150?img=11", rol: "Mobile Developer" },
      { id: 7, nombre: "Sofía Díaz", avatar: "https://i.pravatar.cc/150?img=13", rol: "Backend Developer" }
    ],
    tareas: 15,
    tareasCompletadas: 4,
    tareasIniciales: []
  },
  {
    id: 4,
    nombre: "Portal Web Corporativo",
    descripcion: "Sitio web institucional con CMS integrado",
    fechaInicio: "2024-01-05",
    fechaFin: "2024-05-20",
    estado: "Completado" as const,
    progreso: 100,
    categoria: "Desarrollo Web",
    miembros: [
      { id: 2, nombre: "Carlos Ruiz", avatar: "https://i.pravatar.cc/150?img=3", rol: "Full Stack Developer" },
      { id: 5, nombre: "Elena Torres", avatar: "https://i.pravatar.cc/150?img=9", rol: "UI/UX Designer" }
    ],
    tareas: 10,
    tareasCompletadas: 10,
    tareasIniciales: []
  }
];

export const USUARIOS_INICIALES = [
  {
    id: 1,
    nombre: "Ana García",
    email: "ana.garcia@sempiterno.com",
    fechaCreacion: "2023-01-15",
    estado: "Activo" as const,
    avatar: "https://i.pravatar.cc/150?img=1",
    rol: "Project Manager"
  },
  {
    id: 2,
    nombre: "Carlos Ruiz",
    email: "carlos.ruiz@sempiterno.com",
    fechaCreacion: "2023-02-20",
    estado: "Activo" as const,
    avatar: "https://i.pravatar.cc/150?img=3",
    rol: "Developer"
  },
  {
    id: 3,
    nombre: "María López",
    email: "maria.lopez@sempiterno.com",
    fechaCreacion: "2023-03-10",
    estado: "Activo" as const,
    avatar: "https://i.pravatar.cc/150?img=5",
    rol: "QA Tester"
  },
  {
    id: 4,
    nombre: "Luis Martín",
    email: "luis.martin@sempiterno.com",
    fechaCreacion: "2023-04-05",
    estado: "Activo" as const,
    avatar: "https://i.pravatar.cc/150?img=7",
    rol: "Data Analyst"
  },
  {
    id: 5,
    nombre: "Elena Torres",
    email: "elena.torres@sempiterno.com",
    fechaCreacion: "2023-05-12",
    estado: "Activo" as const,
    avatar: "https://i.pravatar.cc/150?img=9",
    rol: "UI/UX Designer"
  },
  {
    id: 6,
    nombre: "Jorge Ramos",
    email: "jorge.ramos@sempiterno.com",
    fechaCreacion: "2023-06-18",
    estado: "Activo" as const,
    avatar: "https://i.pravatar.cc/150?img=11",
    rol: "Mobile Developer"
  },
  {
    id: 7,
    nombre: "Sofía Díaz",
    email: "sofia.diaz@sempiterno.com",
    fechaCreacion: "2023-07-22",
    estado: "Activo" as const,
    avatar: "https://i.pravatar.cc/150?img=13",
    rol: "Backend Developer"
  },
  {
    id: 8,
    nombre: "Pedro Sánchez",
    email: "pedro.sanchez@sempiterno.com",
    fechaCreacion: "2023-08-30",
    estado: "Inactivo" as const,
    avatar: "https://i.pravatar.cc/150?img=15",
    rol: "DevOps Engineer"
  }
];

export const USUARIO_PRINCIPAL = {
  nombre: "Diego Cross",
  rol: "Administrador",
  email: "diego.cross@sempiterno.com",
  telefono: "+51 987 654 321",
  estado: "Activo",
  avatar: "https://i.pravatar.cc/150?img=33"
};
