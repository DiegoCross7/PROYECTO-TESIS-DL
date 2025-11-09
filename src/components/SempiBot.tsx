import { useState, useRef, useEffect } from 'react';
import './SempiBot.css';

interface Mensaje {
  id: number;
  texto: string;
  esUsuario: boolean;
  timestamp: Date;
}

interface SempiBotProps {
  onClose: () => void;
}

/**
 * Componente: SempiBot
 * 
 * Descripción: Chatbot asistente de proyectos
 * 
 * Características:
 * - Chat interactivo
 * - Respuestas automatizadas (ficticias por ahora)
 * - Scroll automático
 * - Diseño moderno
 * - Listo para conectar con backend/IA
 */
export default function SempiBot({ onClose }: SempiBotProps) {
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      id: 1,
      texto: '¡Hola! Soy SempiBot, tu asistente de proyectos 🤖\n\n¿En qué puedo ayudarte hoy?',
      esUsuario: false,
      timestamp: new Date()
    }
  ]);
  const [inputMensaje, setInputMensaje] = useState('');
  const [escribiendo, setEscribiendo] = useState(false);
  const mensajesEndRef = useRef<HTMLDivElement>(null);

  // Scroll automático al último mensaje
  useEffect(() => {
    mensajesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes]);

  // Respuestas predefinidas del bot (TODO: Conectar con backend/IA)
  const obtenerRespuestaBot = (pregunta: string): string => {
    const preguntaLower = pregunta.toLowerCase();
    
    if (preguntaLower.includes('hola') || preguntaLower.includes('buenos') || preguntaLower.includes('saludos')) {
      return '¡Hola! 👋 ¿Cómo puedo asistirte con tus proyectos hoy?';
    }
    
    if (preguntaLower.includes('proyecto') && preguntaLower.includes('actual')) {
      return 'El estado actual del proyecto "Red Facturada" está en progreso con un 73% de avance. Hay 5 tareas pendientes y 3 en progreso.\n\n¿Necesitas más detalles?';
    }
    
    if (preguntaLower.includes('tarea') || preguntaLower.includes('pendiente')) {
      return 'Tienes las siguientes tareas:\n\n✅ Completado: 32%\n⏳ En espera: 25%\n🔄 En progreso: 25%\n⚠️ Pendiente: 18%\n\n¿Quieres ver alguna tarea específica?';
    }
    
    if (preguntaLower.includes('rendimiento') || preguntaLower.includes('estadística')) {
      return '📊 Rendimiento del equipo:\n\n• 7 proyectos archivados este mes\n• 5 proyectos en objetivo\n• Tendencia positiva en los últimos 3 meses\n\n¿Quieres un informe detallado?';
    }
    
    if (preguntaLower.includes('ayuda') || preguntaLower.includes('qué puedes hacer')) {
      return 'Puedo ayudarte con:\n\n🔹 Consultar estado de proyectos\n🔹 Ver tareas pendientes\n🔹 Revisar rendimiento del equipo\n🔹 Obtener estadísticas\n🔹 Recordatorios de deadlines\n\n¿Qué necesitas?';
    }
    
    if (preguntaLower.includes('gracias')) {
      return '¡De nada! 😊 Estoy aquí para ayudarte. Si necesitas algo más, solo pregunta.';
    }
    
    return 'Interesante pregunta. Actualmente estoy en modo de demostración, pero pronto podré responder a eso con ayuda del backend. 🚀\n\nMientras tanto, ¿puedo ayudarte con información sobre proyectos, tareas o rendimiento?';
  };

  const enviarMensaje = async () => {
    if (!inputMensaje.trim()) return;

    // Agregar mensaje del usuario
    const nuevoMensajeUsuario: Mensaje = {
      id: Date.now(),
      texto: inputMensaje,
      esUsuario: true,
      timestamp: new Date()
    };

    setMensajes(prev => [...prev, nuevoMensajeUsuario]);
    setInputMensaje('');
    setEscribiendo(true);

    // Simular tiempo de respuesta del bot
    setTimeout(() => {
      // TODO: Aquí se conectará con el backend
      // const respuesta = await fetch('/api/chatbot', { 
      //   method: 'POST',
      //   body: JSON.stringify({ mensaje: inputMensaje })
      // });
      
      const respuestaBot: Mensaje = {
        id: Date.now() + 1,
        texto: obtenerRespuestaBot(inputMensaje),
        esUsuario: false,
        timestamp: new Date()
      };

      setMensajes(prev => [...prev, respuestaBot]);
      setEscribiendo(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarMensaje();
    }
  };

  const formatearHora = (fecha: Date) => {
    return fecha.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="sempibot-container">
      {/* Header del chatbot */}
      <div className="sempibot-header">
        <div className="sempibot-header-info">
          <div className="sempibot-avatar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 7.5h-9v9h9v-9z" />
              <path fillRule="evenodd" d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="sempibot-info-text">
            <h3 className="sempibot-nombre">SempiBot</h3>
            <p className="sempibot-estado">
              <span className="status-dot-online"></span>
              En línea
            </p>
          </div>
        </div>

        <button className="btn-close-chatbot" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Mensajes del chat */}
      <div className="sempibot-mensajes">
        {mensajes.map((mensaje) => (
          <div
            key={mensaje.id}
            className={`mensaje ${mensaje.esUsuario ? 'mensaje-usuario' : 'mensaje-bot'}`}
          >
            {!mensaje.esUsuario && (
              <div className="mensaje-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.5 7.5h-9v9h9v-9z" />
                  <path fillRule="evenodd" d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            <div className="mensaje-contenido">
              <p className="mensaje-texto">{mensaje.texto}</p>
              <span className="mensaje-hora">{formatearHora(mensaje.timestamp)}</span>
            </div>
          </div>
        ))}

        {escribiendo && (
          <div className="mensaje mensaje-bot">
            <div className="mensaje-avatar">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 7.5h-9v9h9v-9z" />
                <path fillRule="evenodd" d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="mensaje-contenido">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={mensajesEndRef} />
      </div>

      {/* Input del chat */}
      <div className="sempibot-input-container">
        <textarea
          className="sempibot-input"
          placeholder="Escribe tu mensaje..."
          value={inputMensaje}
          onChange={(e) => setInputMensaje(e.target.value)}
          onKeyPress={handleKeyPress}
          rows={1}
        />
        <button 
          className="btn-enviar-mensaje" 
          onClick={enviarMensaje}
          disabled={!inputMensaje.trim()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </div>

      {/* Sugerencias rápidas */}
      <div className="sempibot-sugerencias">
        <button 
          className="sugerencia-btn"
          onClick={() => setInputMensaje('¿Cuál es el estado actual del proyecto?')}
        >
          Estado del proyecto
        </button>
        <button 
          className="sugerencia-btn"
          onClick={() => setInputMensaje('¿Cuántas tareas tengo pendientes?')}
        >
          Tareas pendientes
        </button>
        <button 
          className="sugerencia-btn"
          onClick={() => setInputMensaje('Muéstrame las estadísticas')}
        >
          Estadísticas
        </button>
      </div>
    </div>
  );
}
