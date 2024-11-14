import { notification } from "antd"

const audio = new Audio('/audio/notification.mp3');

export const showNotification = (type, msg, description = null) => {
  switch (type){
    case 'add':
      notification.success({
        message: msg,
        description: description,
        placement: 'topRight',
        duration: 3,
      });
      audio.play();
      break
    case 'update':
      notification.info({
        message: msg,
        description: description,
        placement: 'topRight',
        duration: 3,
      });
      audio.play();
      break
    case 'delete':
      notification.warning({
        message: msg,
        description: description,
        placement: 'topRight',
        duration: 3,
      });
      audio.play();
      break
    case 'error':
      notification.error({
        message: msg,
        description: description,
        placement: 'topRight',
        duration: 3,
      });
      audio.play();
      break
  }
}