import { notification } from "antd"; // Importamos el componente notification de Ant Design para mostrar notificaciones

// Creamos un objeto de Audio para reproducir un sonido cuando se muestre la notificación
const audio = new Audio('/audio/notification.mp3');

// Función para mostrar notificaciones
export const showNotification = (type, msg, description = null) => {
  switch (type) {
    case 'add': // Si es un caso de adición
      notification.success({
        message: msg, // Mensaje principal de la notificación
        description: description, // Descripción opcional
        placement: 'topRight', // Ubicación de la notificación
        duration: 3, // Duración en segundos
      });
      audio.play(); // Reproducir el sonido de notificación
      break;
    
    case 'update': // Si es un caso de actualización
      notification.info({
        message: msg,
        description: description,
        placement: 'topRight',
        duration: 3,
      });
      audio.play();
      break;

    case 'delete': // Si es un caso de eliminación
      notification.warning({
        message: msg,
        description: description,
        placement: 'topRight',
        duration: 3,
      });
      audio.play();
      break;

    case 'error': // Si es un caso de error
      notification.error({
        message: msg,
        description: description,
        placement: 'topRight',
        duration: 3,
      });
      audio.play();
      break;
  }
};
