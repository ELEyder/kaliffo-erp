import { showNotification } from "../Notifications"
export const getCorte = async (id, setData) => {
    const response = await fetch(`http://localhost:3000/cortes/${id}`)

    const productoData = await response.json()
    setData(productoData)
  }
  export const addCorte = async (id, data) => {
    const Corte = {
      lote_id: id,
      taller_id: data.taller,
      producto_id: data.producto,
      cantidad_enviada: data.cantidad,
      talla: data.talla,
      metraje_asignado: data.metraje,
      tipo_tela: data.tela,
    };
    const response = await fetch(`http://localhost:3000/cortes/create`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(Corte),
    })
    showNotification("add", "Corte añadido")
}
