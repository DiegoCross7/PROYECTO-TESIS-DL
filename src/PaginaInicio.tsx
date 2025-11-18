import { useState } from 'react';
import './PaginaInicio.css';
import imgLogoPequeno from './assets/images/img_logo_login_1_logo SEMPITERNO.png';
import imgLogoMedio from './assets/images/img_logo_login_2_personaje sentado.png';
import imgLogoGrande from './assets/images/img_logo_login_3_cactus.png';

interface PaginaInicioProps {
  onLogin: () => void;
}

/**
 * Componente: PaginaInicio
 * 
 * Descripción: Página de inicio de sesión (Login)
 * 
 * Características:
 * - Validación de correo electrónico en tiempo real
 * - Mostrar/ocultar contraseña
 * - Efectos hover y animaciones suaves
 * - Diseño responsive (adaptable a diferentes pantallas)
 * - Gradiente de fondo personalizado
 */
export default function PaginaInicio({ onLogin }: PaginaInicioProps) {
  // ============================================
  // ESTADOS DEL COMPONENTE
  // ============================================
  
  // Estado para el correo electrónico ingresado
  const [correo, setCorreo] = useState('');
  
  // Estado para la contraseña ingresada
  const [password, setPassword] = useState('');
  
  // Estado para mostrar/ocultar la contraseña (true = visible, false = oculta)
  const [mostrarPassword, setMostrarPassword] = useState(false);
  
  // Estado para la casilla de términos y condiciones
  const [aceptarTerminos, setAceptarTerminos] = useState(false);
  
  // Estado para el foco de los campos (para efectos visuales)
  const [campoActivo, setCampoActivo] = useState<'correo' | 'password' | null>(null);

  // ============================================
  // FUNCIONES DEL COMPONENTE
  // ============================================

  /**
   * Función: manejarSubmit
   * Maneja el envío del formulario de login
   * @param e - Evento del formulario
   */
  const manejarSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir recarga de página
    
    // Validar que los campos no estén vacíos
    if (!correo || !password) {
      alert('Por favor, complete todos los campos');
      return;
    }

    // Validar que se acepten los términos
    if (!aceptarTerminos) {
      alert('Debe aceptar los términos y condiciones');
      return;
    }

    // TODO: Aquí se conectará con el backend para validar credenciales
    console.log('Iniciando sesión con:', { correo, password });
    
    // Llamar a la función onLogin para cambiar al Dashboard
    onLogin();
  };

  /**
   * Función: validarCorreo
   * Valida si el correo tiene un formato válido
   * @returns true si el correo es válido, false si no
   */
  const validarCorreo = () => {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(correo);
  };

  /**
   * Función: alternarVisibilidadPassword
   * Cambia entre mostrar y ocultar la contraseña
   */
  const alternarVisibilidadPassword = () => {
    setMostrarPassword(!mostrarPassword);
  };

  /**
   * Función: manejarRecuperarPassword
   * Muestra mensaje para contactar al administrador
   */
  const manejarRecuperarPassword = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevenir navegación
    alert('Para recuperar su contraseña, póngase en contacto con el administrador');
  };

  // ============================================
  // RENDERIZADO DEL COMPONENTE
  // ============================================
  
  return (
    <div className="pagina-inicio">
      {/* Fondo con gradiente */}
      <div className="fondo-gradiente" />

      {/* Contenedor principal centrado */}
      <div className="contenedor-principal">
        
        {/* Panel blanco principal (formulario) */}
        <div className="panel-formulario">
          
          {/* Panel lateral morado (decorativo) */}
          <div className="panel-lateral" />
          
          {/* ============================================ */}
          {/* LOGOS DECORATIVOS */}
          {/* ============================================ */}
          
          {/* Logo grande - Parte inferior derecha */}
          <img 
            className="logo logo-grande animate-float" 
            src={imgLogoGrande} 
            alt="Logo grande decorativo"
          />
          
          {/* Logo mediano - Centro izquierda */}
          <img 
            className="logo logo-medio animate-float-delayed" 
            src={imgLogoMedio} 
            alt="Logo mediano decorativo"
          />
          
          {/* Logo pequeño - Superior derecha */}
          <img 
            className="logo logo-pequeno animate-pulse-slow" 
            src={imgLogoPequeno} 
            alt="Logo pequeño decorativo"
          />

          {/* ============================================ */}
          {/* FORMULARIO DE LOGIN */}
          {/* ============================================ */}
          
          <div className="contenedor-formulario">
            
            {/* Encabezado del formulario */}
            <div className="encabezado-login">
              <h1 className="titulo-login">Log In</h1>
              <p className="subtitulo-login">
                ¡Bienvenido de nuevo! Introduzca sus datos.
              </p>
            </div>

            {/* Formulario */}
            <form onSubmit={manejarSubmit} className="formulario">
              
              {/* ============================================ */}
              {/* CAMPO: CORREO ELECTRÓNICO */}
              {/* ============================================ */}
              
              <div className="campo-grupo">
                <label 
                  htmlFor="correo" 
                  className="campo-label"
                >
                  Correo
                </label>
                <div 
                  className={`campo-wrapper ${campoActivo === 'correo' ? 'activo' : ''} ${
                    correo && !validarCorreo() ? 'error' : ''
                  } ${correo && validarCorreo() ? 'valido' : ''}`}
                >
                  <input
                    id="correo"
                    type="email"
                    className="campo-input"
                    placeholder="ejemplo@correo.com"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    onFocus={() => setCampoActivo('correo')}
                    onBlur={() => setCampoActivo(null)}
                  />
                  {/* Icono de validación */}
                  {correo && (
                    <span className="icono-validacion">
                      {validarCorreo() ? '✓' : '✗'}
                    </span>
                  )}
                </div>
                {/* Mensaje de error si el correo no es válido */}
                {correo && !validarCorreo() && (
                  <p className="mensaje-error">Por favor, ingrese un correo válido</p>
                )}
              </div>

              {/* ============================================ */}
              {/* CAMPO: CONTRASEÑA */}
              {/* ============================================ */}
              
              <div className="campo-grupo">
                <label 
                  htmlFor="password" 
                  className="campo-label"
                >
                  Contraseña
                </label>
                <div 
                  className={`campo-wrapper ${campoActivo === 'password' ? 'activo' : ''}`}
                >
                  <input
                    id="password"
                    type={mostrarPassword ? 'text' : 'password'}
                    className="campo-input"
                    placeholder="Ingrese su contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setCampoActivo('password')}
                    onBlur={() => setCampoActivo(null)}
                  />
                  {/* Botón para mostrar/ocultar contraseña */}
                  <button
                    type="button"
                    className="boton-toggle-password"
                    onClick={alternarVisibilidadPassword}
                    aria-label={mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {mostrarPassword ? (
                      // Icono de ojo abierto (contraseña visible)
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 4C5 4 1.73 7.11 1 10c.73 2.89 4 6 9 6s8.27-3.11 9-6c-.73-2.89-4-6-9-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                      </svg>
                    ) : (
                      // Icono de ojo cerrado (contraseña oculta)
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 4c3.2 0 6 2.14 7.33 5-1.33 2.86-4.13 5-7.33 5s-6-2.14-7.33-5C4 6.14 6.8 4 10 4m0-2C5 2 1.73 5.11 1 8c.73 2.89 4 6 9 6s8.27-3.11 9-6c-.73-2.89-4-6-9-6zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                        <path d="M2 2l16 16" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* ============================================ */}
              {/* TÉRMINOS Y RECUPERACIÓN */}
              {/* ============================================ */}
              
              <div className="seccion-opciones">
                {/* Checkbox de términos y condiciones */}
                <div className="checkbox-container">
                  <input
                    id="terminos"
                    type="checkbox"
                    className="checkbox-input"
                    checked={aceptarTerminos}
                    onChange={(e) => setAceptarTerminos(e.target.checked)}
                  />
                  <label htmlFor="terminos" className="checkbox-label">
                    Términos y condiciones
                  </label>
                </div>

                {/* Link de recuperación de contraseña */}
                <a 
                  href="#" 
                  className="link-recuperar"
                  onClick={manejarRecuperarPassword}
                >
                  ¿Olvidó la contraseña?
                </a>
              </div>

              {/* ============================================ */}
              {/* BOTÓN DE LOGIN */}
              {/* ============================================ */}
              
              <button 
                type="submit" 
                className="boton-login"
                disabled={!correo || !password || !aceptarTerminos}
              >
                <span className="boton-texto">LOGIN</span>
                <span className="boton-icono">→</span>
              </button>

              {/* ============================================ */}
              {/* REGISTRO */}
              {/* ============================================ */}
              
              <div className="seccion-registro">
                <p className="texto-registro">¿No tienes una cuenta?</p>
                <a href="#" className="link-contacto">
                  Póngase en contacto con el administrador
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
