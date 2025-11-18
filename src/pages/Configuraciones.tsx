import { useState, useRef } from 'react';
import './Configuraciones.css';

interface Usuario {
  nombre: string;
  rol: string;
  email: string;
  telefono: string;
  estado: string;
  avatar: string;
}

interface ConfiguracionesProps {
  usuario: Usuario;
  onNavigate?: (vista: 'inicio' | 'usuarios' | 'proyectos' | 'configuraciones') => void;
  onAbrirKanban?: (proyectoId: number) => void;
  onActualizarUsuario?: (datos: Partial<Usuario>) => void;
}

interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  fechaFin: string;
  miembros: string[];
  issues: number;
}

export default function Configuraciones({ usuario, onNavigate, onAbrirKanban, onActualizarUsuario }: ConfiguracionesProps) {
  // Estados para el formulario de edición - inicializados con datos del usuario
  const [nombreCompleto, setNombreCompleto] = useState(usuario.nombre);
  const [correo, setCorreo] = useState(usuario.email);
  const [rol, setRol] = useState(usuario.rol);
  const [contrasena, setContrasena] = useState('');
  const [avatar, setAvatar] = useState(usuario.avatar);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Proyectos asignados
  const proyectosAsignados: Proyecto[] = [
    {
      id: 1,
      nombre: 'BotFacturador',
      descripcion: 'Automatiza todo el flujo de facturación electrónica: genera facturas desde sistemas internos (ERP o Excel), las valida con los formatos requeridos por la SUNAT, y finalmente las envía al cliente con el archivo XML y PDF adjunto.',
      fechaFin: '05 Diciembre 2025',
      miembros: [
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Floyd',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Ronald',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Marvin'
      ],
      issues: 14
    },
    {
      id: 2,
      nombre: 'BotRegistro360',
      descripcion: 'Extrae información de clientes desde hojas Excel o formularios web y los ingresa en un CRM o base de datos corporativa. El bot valida campos obligatorios, detecta duplicados y normaliza los formatos.',
      fechaFin: '15 Diciembre 2025',
      miembros: [
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Floyd',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Ronald',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Marvin'
      ],
      issues: 12
    },
    {
      id: 3,
      nombre: 'BotPagosExpress',
      descripcion: 'Automatiza la conciliación de pagos: descarga comprobantes bancarios, los compara con facturas registradas y actualiza su estado en el sistema contable. Además, genera reportes automáticos de pagos pendientes.',
      fechaFin: '20 Diciembre 2025',
      miembros: [
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Floyd',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Ronald',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Marvin'
      ],
      issues: 18
    }
  ];

  const handleGuardar = () => {
    // Actualizar el estado del usuario en el Dashboard
    if (onActualizarUsuario) {
      onActualizarUsuario({
        nombre: nombreCompleto,
        email: correo,
        rol: rol,
        avatar: avatar
      });
    }
    
    // TODO: Conectar con backend para actualizar información
    console.log('Guardando cambios:', {
      nombreCompleto,
      correo,
      rol,
      avatar,
      contrasena: contrasena ? '******' : 'sin cambios'
    });
    alert('Información actualizada correctamente');
  };

  const handleVerTodo = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      // Limpiar selección de proyecto antes de navegar
      if (onAbrirKanban) {
        onAbrirKanban(0); // Enviar 0 para limpiar la selección
      }
      onNavigate('proyectos');
    }
  };

  const handleClickProyecto = (proyectoId: number) => {
    if (onAbrirKanban) {
      onAbrirKanban(proyectoId);
    }
  };

  const handleCambiarAvatar = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="configuraciones-container">
      {/* Panel Izquierdo - Perfil y Edición */}
      <div className="configuraciones-izquierda">
        {/* Card de perfil */}
        <div className="perfil-card">
          <div className="perfil-avatar-container">
            <img src={avatar} alt={nombreCompleto} className="perfil-avatar-grande" />
            <button className="btn-cambiar-avatar" onClick={handleCambiarAvatar}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
              </svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
          
          <div className="perfil-info-principal">
            <div className="perfil-nombre-icono">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
              </svg>
              <h3>{nombreCompleto.toUpperCase()}</h3>
            </div>
            <p className="perfil-rol">{rol}</p>
          </div>

          <div className="perfil-estado">
            <div className="estado-badge activo">
              <div className="estado-dot"></div>
              <span>Activo</span>
            </div>
          </div>

          <div className="perfil-contacto">
            <div className="contacto-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
              </svg>
              <span>{correo}</span>
            </div>
          </div>
        </div>

        {/* Formulario de edición */}
        <div className="edicion-card">
          <h2>Editar perfil</h2>

          <div className="form-group-config">
            <label>Nombre Completo</label>
            <input
              type="text"
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
              placeholder="Nombre completo"
            />
          </div>

          <div className="form-row-config">
            <div className="form-group-config">
              <label>Correo</label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div className="form-group-config">
              <label>Rol</label>
              <select value={rol} onChange={(e) => setRol(e.target.value)}>
                <option value="Desarrollador RPA">Desarrollador RPA</option>
                <option value="Project Manager">Project Manager</option>
                <option value="QA Tester">QA Tester</option>
                <option value="Business Analyst">Business Analyst</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
              </select>
            </div>
          </div>

          <div className="form-group-config">
            <label>Contraseña</label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="••••••••••••••••"
            />
          </div>

          <button className="btn-guardar-config" onClick={handleGuardar}>
            Guardar
          </button>
        </div>
      </div>

      {/* Panel Derecho - Proyectos */}
      <div className="configuraciones-derecha">
        <div className="proyectos-header">
          <h2>Proyectos</h2>
          <a href="#" className="ver-todo-link" onClick={handleVerTodo}>Ver Todo</a>
        </div>

        <div className="proyectos-lista">
          {proyectosAsignados.map((proyecto) => (
            <div 
              key={proyecto.id} 
              className="proyecto-card-mini"
              onClick={() => handleClickProyecto(proyecto.id)}
            >
              <h3>{proyecto.nombre}</h3>
              <p className="proyecto-descripcion">{proyecto.descripcion}</p>
              
              <div className="proyecto-footer">
                <div className="proyecto-fecha">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
                    <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
                  </svg>
                  <span>{proyecto.fechaFin}</span>
                </div>

                <div className="proyecto-miembros">
                  {proyecto.miembros.slice(0, 3).map((avatar, idx) => (
                    <img key={idx} src={avatar} alt="" className="miembro-avatar-mini" />
                  ))}
                  {proyecto.miembros.length > 3 && (
                    <span className="miembros-mas">+{proyecto.miembros.length - 3}</span>
                  )}
                </div>

                <div className="proyecto-issues">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z" clipRule="evenodd" />
                  </svg>
                  <span>{proyecto.issues} issues</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
