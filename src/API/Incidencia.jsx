import { showNotification } from "../Shared/Notifications"

const incidencias = ["Familiar", "Salud", "Personal"]

export const addIncidencia = async (id, data) => {
    const Incidencia = {
        tipo : data.tipo,
        descripcion : data.descripcion,
        usuario_id : Number(id)
    }
    const response = await fetch(`http://localhost:3000/incidencia/create`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(Incidencia),
    })
    showNotification("add","Incidencia añadida correctamente")
}

export const getIncidenciasById = async (id, setIncidencias) => {
    const response = await fetch(`http://localhost:3000/incidencia?usuario_id=${id}`)
    const incidenciasData = await response.json()
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
}

export const updateIncidenciaById = async (id, values) => {
    const incidencia = {
        tipo : values.tipo,
        descripcion : values.descripcion,
    }
    const response = await fetch(`http://localhost:3000/incidencia/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incidencia),
    })
    showNotification("update","Incidencia actualizada")
}

export const deleteIncidenciaById = async (id) => {
    const response = await fetch(`http://localhost:3000/incidencia/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    })
    showNotification("delete", "Incidencia borrada")
}