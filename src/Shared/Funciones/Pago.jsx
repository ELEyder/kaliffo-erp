import { showNotificationAdd, showNotificationError, showNotificationUpdate, showNotificationDelete } from "./Notifications"
export const addPago = async (id, data, reload, setReload, api) => {
    const Pago = {
        tipo : data.tipo,
        descripcion : data.descripcion,
        usuario_id : Number(id)
    }
    const response = await fetch(`http://localhost:3000/incidencia/create`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(Pago),
    })
    api.open(showNotificationAdd("Pago añadido",""))
    console.log(response)
    setReload(reload == true ? false : true)
}

export const getPagosById = async (id, setPago)  => {
    const estados = ["Pagado", "En Proceso"]
    const response = await fetch(`http://localhost:3000/pago/${id}`)
    const pagoData= await response.json()
    const detallesConNuevoParametro = pagoData.map(detalle => {
        return {
            ...detalle,
            estado: estados[detalle.estado], // Añadir el tipo de incidencia
        };
    });
    setPago(detallesConNuevoParametro)
    console.log(detallesConNuevoParametro)
}

export const updatePagoById = async (id, reload, setReload) => {
    const response = await fetch(`http://localhost:3000/pago/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
    })
    setReload(!reload)
    console.log(response)
}

export const deletePagoById = async (id, reload, setReload, api) => {
    const response = await fetch(`http://localhost:3000/pago/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    })
    setReload(!reload)
    api.open(showNotificationDelete("Pago eliminado",""))
    console.log(response)
}