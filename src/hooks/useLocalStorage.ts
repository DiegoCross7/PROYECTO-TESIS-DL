/**
 * Hook personalizado para manejar LocalStorage
 * 
 * Características:
 * - Persistencia automática en el navegador
 * - Sincronización entre pestañas
 * - Datos iniciales precargados
 * - Type-safe con TypeScript
 */

import { useState, useEffect } from 'react';

/**
 * Hook genérico para guardar cualquier dato en LocalStorage
 * @param key - Clave única en LocalStorage
 * @param initialValue - Valor inicial si no existe en LocalStorage
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Estado que sincroniza con LocalStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Intentar leer del LocalStorage
      const item = window.localStorage.getItem(key);
      
      // Si existe, parsearlo, si no, usar valor inicial
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error al leer LocalStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Función para actualizar el valor
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permitir que value sea una función (como useState)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Guardar en estado
      setStoredValue(valueToStore);
      
      // Guardar en LocalStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      
      // Disparar evento para sincronizar entre pestañas
      window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      console.error(`Error al guardar en LocalStorage key "${key}":`, error);
    }
  };

  // Escuchar cambios de otras pestañas
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.error(`Error al sincronizar LocalStorage key "${key}":`, error);
      }
    };

    // Escuchar eventos de storage
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue] as const;
}

/**
 * Función helper para limpiar todos los datos (útil para desarrollo)
 */
export function clearAllData() {
  const keys = ['proyectos', 'usuarios', 'configuracion'];
  keys.forEach(key => {
    window.localStorage.removeItem(key);
  });
  window.location.reload();
}

/**
 * Función helper para exportar datos (backup)
 */
export function exportData() {
  const data = {
    proyectos: localStorage.getItem('proyectos'),
    usuarios: localStorage.getItem('usuarios'),
    configuracion: localStorage.getItem('configuracion'),
    timestamp: new Date().toISOString()
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sempiterno-backup-${Date.now()}.json`;
  a.click();
}

/**
 * Función helper para importar datos (restaurar backup)
 */
export function importData(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        if (data.proyectos) localStorage.setItem('proyectos', data.proyectos);
        if (data.usuarios) localStorage.setItem('usuarios', data.usuarios);
        if (data.configuracion) localStorage.setItem('configuracion', data.configuracion);
        
        window.location.reload();
        resolve(true);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = reject;
    reader.readAsText(file);
  });
}
