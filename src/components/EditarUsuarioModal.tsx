import { useState } from 'react';
import './EditarUsuarioModal.css';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  fechaCreacion: string;
  estado: 'Activo' | 'Inactivo';
  avatar: string;
  rol?: string;
}

interface EditarUsuarioModalProps {
  usuario: Usuario;
  onClose: () => void;
  onSave: (usuario: Usuario) => void;
}

/**
 * Componente: EditarUsuarioModal
 * 
 * Descripción: Modal para editar información de usuario
 * 
 * Características:
 * - Formulario completo con validación
 * - Cambio de avatar
 * - Selector de rol con dropdown
 * - Validación de correo electrónico
 * - Diseño profesional inspirado en la imagen
 */
export default function EditarUsuarioModal({ usuario, onClose, onSave }: EditarUsuarioModalProps) {
  const [formData, setFormData] = useState({
    nombre: usuario.nombre,
    correo: usuario.email,
    rol: usuario.rol || 'Desarrollador RPA',
    password: '',
    avatar: usuario.avatar
  });

  const [errores, setErrores] = useState({
    nombre: '',
    correo: '',
    password: ''
  });

  // Lista de roles disponibles
  const roles = [
    'Desarrollador RPA',
    'Project Manager',
    'Scrum Master',
    'QA Tester',
    'Business Analyst',
    'DevOps Engineer',
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer'
  ];

  // Validar correo electrónico
  const validarCorreo = (correo: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Limpiar errores al escribir
    if (errores[name as keyof typeof errores]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validar formulario
  const validarFormulario = (): boolean => {
    const nuevosErrores = {
      nombre: '',
      correo: '',
      password: ''
    };

    let esValido = true;

    // Validar nombre
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es requerido';
      esValido = false;
    } else if (formData.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 3 caracteres';
      esValido = false;
    }

    // Validar correo
    if (!formData.correo.trim()) {
      nuevosErrores.correo = 'El correo es requerido';
      esValido = false;
    } else if (!validarCorreo(formData.correo)) {
      nuevosErrores.correo = 'Correo electrónico inválido';
      esValido = false;
    }

    // Validar contraseña (solo si se ingresó)
    if (formData.password && formData.password.length < 6) {
      nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres';
      esValido = false;
    }

    setErrores(nuevosErrores);
    return esValido;
  };

  // Manejar cambio de foto
  const handleFotoChange = () => {
    // TODO: Implementar subida de imagen real
    const nuevoAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`;
    setFormData(prev => ({ ...prev, avatar: nuevoAvatar }));
  };

  // Guardar cambios
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    // Crear usuario actualizado
    const usuarioActualizado: Usuario = {
      ...usuario,
      nombre: formData.nombre,
      email: formData.correo,
      rol: formData.rol,
      avatar: formData.avatar
    };

    // TODO: Enviar al backend
    // await fetch(`/api/usuarios/${usuario.id}`, { method: 'PUT', body: JSON.stringify(usuarioActualizado) })

    onSave(usuarioActualizado);
    onClose();
  };

  return (
    <div className="editar-usuario-overlay" onClick={onClose}>
      <div className="editar-usuario-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header del modal */}
        <div className="editar-usuario-header">
          <h2 className="editar-usuario-title">Editar perfil</h2>
          <button className="btn-close-modal" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="editar-usuario-form">
          <div className="editar-usuario-content">
            {/* Columna izquierda - Formulario */}
            <div className="form-column">
              {/* Nombre Completo */}
              <div className="form-group">
                <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={`form-input ${errores.nombre ? 'input-error' : ''}`}
                  placeholder="Leonardo Jesus"
                />
                {errores.nombre && <span className="error-message">{errores.nombre}</span>}
              </div>

              {/* Correo */}
              <div className="form-group">
                <label htmlFor="correo" className="form-label">Correo</label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  className={`form-input ${errores.correo ? 'input-error' : ''}`}
                  placeholder="leonardojesus@gmail.com"
                />
                {errores.correo && <span className="error-message">{errores.correo}</span>}
              </div>

              {/* Contraseña */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input ${errores.password ? 'input-error' : ''}`}
                  placeholder="••••••••••••••••"
                />
                {errores.password && <span className="error-message">{errores.password}</span>}
                <span className="input-hint">Dejar en blanco para mantener la contraseña actual</span>
              </div>

              {/* Rol */}
              <div className="form-group">
                <label htmlFor="rol" className="form-label">Rol</label>
                <select
                  id="rol"
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  className="form-select"
                >
                  {roles.map((rol) => (
                    <option key={rol} value={rol}>
                      {rol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Columna derecha - Avatar */}
            <div className="avatar-column">
              <div className="avatar-container">
                <img 
                  src={formData.avatar} 
                  alt={formData.nombre}
                  className="avatar-preview"
                />
                <button 
                  type="button"
                  className="btn-cambiar-foto"
                  onClick={handleFotoChange}
                >
                  Subir Foto
                </button>
              </div>
            </div>
          </div>

          {/* Botón Guardar */}
          <div className="form-actions">
            <button type="submit" className="btn-guardar">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
