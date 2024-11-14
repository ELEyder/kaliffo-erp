import React, { createContext, useContext, useMemo } from 'react';
import { notification } from 'antd';

const NotificationContext = createContext(undefined);

export const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  // Definir la lógica para mostrar las notificaciones
  const openNotification = (placement) => {
    api.info({
      message: `Notification ${placement}`,
      description: 'Hello, Ant Design!',
      placement,
    });
  };

  const value = useMemo(() => ({ openNotification }), [api]);

  return (
    <NotificationContext.Provider value={value}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};
