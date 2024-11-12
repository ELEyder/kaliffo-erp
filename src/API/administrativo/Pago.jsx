import { showNotification } from "../Shared/Notifications"

export const addPago = async (id, data, reload, setReload) => {
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
    showNotification("add", "Pago añadido")
    setReload(reload == true ? false : true)
}

export const getPagosById = async (id, setPago)  => {
    const estados = ["Pagado", "En Proceso"]
    const response = await fetch(`http://localhost:3000/pago/${id}`)
    const pagoData= await response.json()
    const detallesConNuevoParametro = pagoData.map(detalle => {
        return {
            ...detalle,
            estado: estados[detalle.estado],
        };
    });
    setPago(detallesConNuevoParametro)
}

export const updatePagoById = async (id, reload, setReload) => {
    const response = await fetch(`http://localhost:3000/pago/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
    })
    setReload(!reload)
}

export const deletePagoById = async (id) => {
    const response = await fetch(`http://localhost:3000/pago/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    })
    setReload(!reload)
    showNotification("delete", "Pago eliminado")
}