import { useState, useCallback } from 'react';

export interface Notificacion {
  id: string;
  tipo: 'success' | 'error' | 'warning' | 'info';
  mensaje: string;
  duracion?: number;
}

export const useNotificaciones = () => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);

  const agregarNotificacion = useCallback((
    tipo: 'success' | 'error' | 'warning' | 'info',
    mensaje: string,
    duracion?: number
  ) => {
    const nuevaNotificacion: Notificacion = {
      id: `${Date.now()}-${Math.random()}`,
      tipo,
      mensaje,
      duracion
    };
    setNotificaciones(prev => [...prev, nuevaNotificacion]);
  }, []);

  const cerrarNotificacion = useCallback((id: string) => {
    setNotificaciones(prev => prev.filter(n => n.id !== id));
  }, []);

  return {
    notificaciones,
    agregarNotificacion,
    cerrarNotificacion,
    success: (mensaje: string, duracion?: number) => agregarNotificacion('success', mensaje, duracion),
    error: (mensaje: string, duracion?: number) => agregarNotificacion('error', mensaje, duracion),
    warning: (mensaje: string, duracion?: number) => agregarNotificacion('warning', mensaje, duracion),
    info: (mensaje: string, duracion?: number) => agregarNotificacion('info', mensaje, duracion),
  };
};
