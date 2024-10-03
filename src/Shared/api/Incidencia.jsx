import { showNotificationAdd, showNotificationError, showNotificationUpdate, showNotificationDelete } from "./Notifications"

export const addIncidencia = async (id, data, reload, setReload) => {
    const Incidencia = {
        tipo : data.tipo,
        descripcion : data.descripcion,
        usuario_id : Number(id)
    }
    console.log(Incidencia)
    const response = await fetch(`http://localhost:3000/incidencia/create`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(Incidencia),
    })
    console.log(response)
    setReload(reload == true ? false : true)
}

export const getIncidenciasById = async (id, setIncidencias) => {
    const incidencias = ["Familiar", "Salud", "Personal"]
    const response = await fetch(`http://localhost:3000/incidencia?usuario_id=${id}`)
    const incidenciasData = await response.json()
    console.log(incidenciasData)
    let count = 0
    const detallesConNuevoParametro = incidenciasData.map(detalle => {
        const fecha_creacion = new Date(detalle.fecha_creacion);
        count = count + 1
        return {
            ...detalle,
            incidencia: incidencias[detalle.tipo - 1],
            fecha_creacion: fecha_creacion.toLocaleDateString("es-ES"),
            id: count,
        };
    });
    setIncidencias(detallesConNuevoParametro)
    console.log(detallesConNuevoParametro)
}

export const updateIncidenciaById = async (id, values, reload, setReload, api) => {
    const incidencia = {
        tipo : values.tipo,
        descripcion : values.descripcion,
    }
    console.log(incidencia)
    const response = await fetch(`http://localhost:3000/incidencia/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incidencia),
    })
    setReload(reload == true ? false : true)
    api.open(showNotificationUpdate("Incidencia actualizada", `ID: ${id}`))
    console.log(response)
}

export const deleteIncidenciaById = async (id, reload, setReload, api) => {
    const response = await fetch(`http://localhost:3000/incidencia/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    })
    setReload(reload == true ? false : true)
    api.open(showNotificationDelete("Incidencia borrada", ""))
    console.log(response)
}