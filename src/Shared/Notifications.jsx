import { CheckCircleOutlined, CloseCircleOutlined, PlusCircleOutlined, StopOutlined } from '@ant-design/icons';
import {notification} from "antd"

const audio = new Audio('/audio/notification.mp3');


export const showNotification = (type, msg, description = null) => {
  switch (type){
    case 'add':
      notification.success({
        message: msg,
        description: description,
        // icon: <PlusCircleOutlined style={{ color: '#108ee9' }} />,
        placement: 'topRight',
        duration: 3,
      });
      audio.play();
      break
    case 'update':
      notification.info({
        message: msg,
        description: description,
        // icon: <PlusCircleOutlined style={{ color: '#108ee9' }} />,
        placement: 'topRight',
        duration: 3,
      });
      audio.play();
      break
    case 'delete':
      notification.warning({
        message: msg,
        description: description,
        // icon: <PlusCircleOutlined style={{ color: '#108ee9' }} />,
        placement: 'topRight',
        duration: 3,
      });
      audio.play();
      break
    case 'error':
      notification.error({
        message: msg,
        description: description,
        // icon: <PlusCircleOutlined style={{ color: '#108ee9' }} />,
        placement: 'topRight',
        duration: 3,
      });
      audio.play();
      break
  }
}

export const showNotificationAdd = (msg, description = null) => {
    notification.success({
        message: msg,
        description: description,
        // icon: <PlusCircleOutlined style={{ color: '#108ee9' }} />,
        placement: 'topRight',
        duration: 3,
      });
      audio.play();
}

export const showNotificationError = (msg, description = null) => {
    notification.error({
        message: msg,
        description: description,
        // icon: <PlusCircleOutlined style={{ color: '#108ee9' }} />,
        duration: 3,
        placement: 'topRight',
      });
      audio.play();
}

export const showNotificationUpdate = (msg, description = null) => {
    notification.info({
        message: msg,
        description: description,
        // icon: <PlusCircleOutlined style={{ color: '#108ee9' }} />,
        duration: 3,
        placement: 'topRight',
      });
      audio.play();
}

export const showNotificationDelete = (msg, description = null) => {
    notification.warning({
        message: msg,
        description: description,
        icon: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />,
        duration: 3,
        placement: 'topRight',
      });
      audio.play();
}