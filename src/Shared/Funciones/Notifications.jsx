import { CheckCircleOutlined, CloseCircleOutlined, PlusCircleOutlined, StopOutlined } from '@ant-design/icons';
export const showNotificationAdd = (msg, description) => {
    return({
        message: msg,
        description: description,
        icon: <PlusCircleOutlined style={{ color: '#108ee9' }} />,
    })
}

export const showNotificationError = (msg, description) => {
    return({
        message: msg,
        description: description,
        icon: <CloseCircleOutlined style={{ color: '#108ee9' }} />,
    })
}

export const showNotificationUpdate = (msg, description) => {
    return({
        message: msg,
        description: description,
        icon: <CheckCircleOutlined style={{ color: '#108ee9' }} />,
    })
}

export const showNotificationDelete = (msg, description) => {
    return({
        message: msg,
        description: description,
        icon: <StopOutlined style={{ color: 'rgb(245, 66, 66)' }} />,
    })
}