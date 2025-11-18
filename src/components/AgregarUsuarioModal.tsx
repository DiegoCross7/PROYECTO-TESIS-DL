import { useState } from 'react';
import './AgregarUsuarioModal.css';

interface NuevoUsuario {
  nombre: string;
  correo: string;
  password: string;
  rol: string;
}

interface AgregarUsuarioModalProps {
  onClose: () => void;
  onAdd: (usuario: NuevoUsuario & { avatar: string }) => void;
}

/**
 * Componente: AgregarUsuarioModal
 * 
 * Descripción: Modal para agregar nuevo usuario al sistema
 * 
 * Características:
 * - Formulario completo con validación
 * - Selector de rol
 * - Validación de correo y contraseña
 * - Avatar generado automáticamente
 * - Diseño profesional
 */
export default function AgregarUsuarioModal({ onClose, onAdd }: AgregarUsuarioModalProps) {
  const [formData, setFormData] = useState<NuevoUsuario>({
    nombre: '',
    correo: '',
    password: '',
    rol: 'Desarrollador RPA'
  });

  const [avatarPreview, setAvatarPreview] = useState(
    'https://api.dicebear.com/7.x/avataaars/svg?seed=default'
  );

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

    // Generar avatar basado en el nombre
    if (name === 'nombre' && value.trim()) {
      setAvatarPreview(`https://api.dicebear.com/7.x/avataaars/svg?seed=${value}`);
    }

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

    // Validar contraseña
    if (!formData.password) {
      nuevosErrores.password = 'La contraseña es requerida';
      esValido = false;
    } else if (formData.password.length < 6) {
      nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres';
      esValido = false;
    }

    setErrores(nuevosErrores);
    return esValido;
  };

  // Manejar cambio de foto
  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else if (file) {
      alert('Por favor selecciona un archivo de imagen válido');
    }
  };

  // Agregar usuario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    // Crear nuevo usuario
    const nuevoUsuario = {
      ...formData,
      avatar: avatarPreview
    };

    // TODO: Enviar al backend
    // await fetch('/api/usuarios', { method: 'POST', body: JSON.stringify(nuevoUsuario) })

    onAdd(nuevoUsuario);
    onClose();
  };

  return (
    <div className="agregar-usuario-overlay" onClick={onClose}>
      <div className="agregar-usuario-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header del modal */}
        <div className="agregar-usuario-header">
          <h2 className="agregar-usuario-title">Agregar Usuario</h2>
          <button className="btn-close-modal" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="agregar-usuario-form">
          <div className="agregar-usuario-content">
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
                  placeholder="Nombre completo del usuario"
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
                  placeholder="usuario@empresa.com"
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
                  placeholder="Mínimo 6 caracteres"
                />
                {errores.password && <span className="error-message">{errores.password}</span>}
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
                  src={avatarPreview} 
                  alt="Avatar preview"
                  className="avatar-preview"
                />
                <input
                  type="file"
                  id="avatar-input-agregar"
                  accept="image/*"
                  onChange={handleFotoChange}
                  style={{ display: 'none' }}
                />
                <button 
                  type="button"
                  className="btn-cambiar-foto"
                  onClick={() => document.getElementById('avatar-input-agregar')?.click()}
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
