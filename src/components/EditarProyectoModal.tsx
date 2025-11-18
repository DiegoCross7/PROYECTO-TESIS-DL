import { useState } from 'react';
import './EditarProyectoModal.css';

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
}

interface EditarProyectoModalProps {
  proyecto: Proyecto;
  onClose: () => void;
  onGuardar: (proyectoActualizado: Proyecto) => void;
}

export default function EditarProyectoModal({ proyecto, onClose, onGuardar }: EditarProyectoModalProps) {
  const [nombre, setNombre] = useState(proyecto.nombre);
  const [descripcion, setDescripcion] = useState(proyecto.descripcion);
  const [fechaInicio, setFechaInicio] = useState(proyecto.fechaInicio);
  const [fechaFin, setFechaFin] = useState(proyecto.fechaFin);
  const [categoria, setCategoria] = useState(proyecto.categoria);
  const [estado, setEstado] = useState(proyecto.estado);
  const [progreso, setProgreso] = useState(proyecto.progreso);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [nombreArchivo, setNombreArchivo] = useState<string>('');

  const handleArchivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setArchivo(file);
      setNombreArchivo(file.name);
    } else {
      alert('Por favor selecciona un archivo PDF válido');
    }
  };

  const eliminarArchivo = () => {
    setArchivo(null);
    setNombreArchivo('');
  };

  const handleGuardar = () => {
    const proyectoActualizado: Proyecto = {
      ...proyecto,
      nombre,
      descripcion,
      fechaInicio,
      fechaFin,
      categoria,
      estado,
      progreso
    };
    
    // Si hay un nuevo archivo, aquí se podría procesar
    if (archivo) {
      console.log('Nuevo archivo PDF seleccionado:', archivo.name);
      // Aquí puedes agregar lógica para subir el archivo o guardarlo
    }
    
    onGuardar(proyectoActualizado);
    onClose();
  };

  return (
    <div className="editar-proyecto-overlay" onClick={onClose}>
      <div className="editar-proyecto-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="editar-proyecto-header">
          <h2>Editar Proyecto</h2>
          <button className="btn-close-editar" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="editar-proyecto-body">
          <div className="form-group-editar">
            <label>Nombre del Proyecto</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre del proyecto"
            />
          </div>

          <div className="form-group-editar">
            <label>Categoría</label>
            <input
              type="text"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              placeholder="Categoría del proyecto"
            />
          </div>

          <div className="form-row-editar">
            <div className="form-group-editar">
              <label>Fecha de Inicio</label>
              <input
                type="text"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                placeholder="DD/MM/YYYY"
              />
            </div>

            <div className="form-group-editar">
              <label>Fecha de Finalización</label>
              <input
                type="text"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                placeholder="DD/MM/YYYY"
              />
            </div>
          </div>

          <div className="form-row-editar">
            <div className="form-group-editar">
              <label>Estado</label>
              <select value={estado} onChange={(e) => setEstado(e.target.value as 'En Progreso' | 'Completado' | 'Pausado' | 'Planificado')}>
                <option value="En Progreso">En Progreso</option>
                <option value="Completado">Completado</option>
                <option value="Pausado">Pausado</option>
                <option value="Planificado">Planificado</option>
              </select>
            </div>

            <div className="form-group-editar">
              <label>Progreso ({progreso}%)</label>
              <input
                type="range"
                min="0"
                max="100"
                value={progreso}
                onChange={(e) => setProgreso(Number(e.target.value))}
                className="progreso-slider"
              />
            </div>
          </div>

          <div className="form-group-editar">
            <label>Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción del proyecto"
              rows={4}
            />
          </div>

          {/* Upload de Archivo PDF */}
          <div className="form-group-editar">
            <label>Documento del Proyecto (PDF)</label>
            <div className="upload-area" onClick={() => document.getElementById('archivo-input-editar')?.click()}>
              <input
                id="archivo-input-editar"
                type="file"
                accept=".pdf"
                onChange={handleArchivoChange}
                style={{ display: 'none' }}
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <p className="upload-text">
                {nombreArchivo || 'Haz clic para seleccionar un nuevo archivo PDF'}
              </p>
              <p className="upload-hint">o arrastra y suelta aquí</p>
            </div>
            
            {nombreArchivo && (
              <div className="archivo-seleccionado">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <span>{nombreArchivo}</span>
                <button type="button" onClick={eliminarArchivo}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="editar-proyecto-footer">
          <button className="btn-cancelar-editar" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-guardar-editar" onClick={handleGuardar}>
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
