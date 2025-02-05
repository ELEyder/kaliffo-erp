import React, { createContext, useContext } from "react";
import { notification } from "antd";

// Creamos un contexto para manejar las notificaciones
const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const open = (placement) => {
    api.info({
      message: `Notification ${placement}`,
      description: "Hola",
      placement,
    });
  };

  return (
    <NotificationContext.Provider value={open}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

// Hook personalizado para usar la notificación
export const useNotification = () => {
  return useContext(NotificationContext);
};
