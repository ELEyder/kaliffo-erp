import { showNotificationAdd } from "../Notifications"
export const getCorte = async (id, setData) => {
    const response = await fetch(`http://localhost:3000/cortes/${id}`)

    const productoData = await response.json()
    console.log(productoData)
    setData(productoData)
  }
