import { CheckCircleOutlined, CloseCircleOutlined, PlusCircleOutlined, StopOutlined } from '@ant-design/icons';
import {notification} from "antd"

export const showNotificationAdd = (msg, description = null) => {
    notification.success({
        message: msg,
        description: description,
        // icon: <PlusCircleOutlined style={{ color: '#108ee9' }} />,
        placement: 'topRight',
        duration: 3,
      });
}

export const showNotificationError = (msg, description = null) => {
    notification.error({
        message: msg,
        description: description,
        // icon: <PlusCircleOutlined style={{ color: '#108ee9' }} />,
        duration: 3,
        placement: 'topRight',
      });
}

export const showNotificationUpdate = (msg, description = null) => {
    notification.info({
        message: msg,
        description: description,
        // icon: <PlusCircleOutlined style={{ color: '#108ee9' }} />,
        duration: 3,
        placement: 'topRight',
      });
}

export const showNotificationDelete = (msg, description = null) => {
    notification.warning({
        message: msg,
        description: description,
        // icon: <PlusCircleOutlined style={{ color: '#108ee9' }} />,
        duration: 3,
        placement: 'topRight',
      });
}