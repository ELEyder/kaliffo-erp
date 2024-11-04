import { showNotificationAdd } from "../Notifications"
export const getEmpresas = async (setData) => {
    const response = await fetch(`http://localhost:3000/telas/empresas`)
    const data = await response.json()
    setData(data)
  }