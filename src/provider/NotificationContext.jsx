import React, { createContext, useContext, useMemo } from 'react';
import { notification } from 'antd';

// Crear el contexto para las notificaciones
const NotificationContext = createContext(undefined);

// Componente que envuelve a los hijos y proporciona el contexto de notificaciones
export const NotificationProvider = ({ children }) => {
  // Usamos el hook de notificaciones de Ant Design para obtener el objeto API y el contenedor de contexto
  const [api, contextHolder] = notification.useNotification();

  // Lógica para mostrar las notificaciones con un mensaje y descripción
  const openNotification = (placement) => {
    api.info({
      message: `Notification ${placement}`, // Mensaje de la notificación
      description: 'Hello, Ant Design!', // Descripción de la notificación
      placement, // Ubicación de la notificación (topRight, bottomLeft, etc.)
    });
  };

  // Usamos useMemo para memorizar el valor del contexto y evitar recomputaciones innecesarias
  const value = useMemo(() => ({ openNotification }), [api]);

  return (
    <NotificationContext.Provider value={value}>
      {contextHolder} {/* Renderiza el contenedor del contexto de las notificaciones */}
      {children} {/* Renderiza los componentes hijos */}
    </NotificationContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de notificaciones
export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  
  // Si el contexto no está disponible (por ejemplo, si no está dentro de un NotificationProvider), lanzamos un error
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  
  return context;
};

// No usado