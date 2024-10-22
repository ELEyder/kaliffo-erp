import { showNotificationAdd, showNotificationError, showNotificationUpdate, showNotificationDelete } from "../Notifications"
import moment from "moment";

export const getCompras = async (setCompras) =>{
    const response = await fetch(`http://localhost:3000/compras`)
    const comprasData = await response.json()
    setCompras(comprasData)
    console.log(comprasData)
}