export const getUsuarioById = async (id, setUsuario) => {
    const response = await fetch(`http://localhost:3000/usuario/${id}`)
    const usuarioData= await response.json()
    setUsuario(usuarioData)
    console.log(usuarioData)
}

export const getIncidenciasById = async (id, setIncidencias) => {
    const incidencias = ["Familiar", "Salud", "Personal"]
    const response = await fetch(`http://localhost:3000/incidencia/${id}`)
    // const response = await fetch(`http://localhost:3000/incidencia/`)
    const productoData= await response.json()
    let count = 0
    const detallesConNuevoParametro = productoData.map(detalle => {
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

export const getHorarioById = async (id, setHorario) => {
    const response = await fetch(`http://localhost:3000/asistencia/horasTrabajadas/${id}`)
    const productoData= await response.json()
    setHorario(productoData)
    console.log(productoData)
}

export const getPagosById = async (id, setHorario) => {
    const incidencias = ["Pagado", "En Proceso"]
    const response = await fetch(`http://localhost:3000/pago/${id}`)
    const productoData= await response.json()
    const detallesConNuevoParametro = productoData.map(detalle => {
        return {
            ...detalle,
            estado: incidencias[detalle.estado], // Añadir el tipo de incidencia
        };
    });
    setHorario(detallesConNuevoParametro)
    console.log(detallesConNuevoParametro)
}

export const updateIncidenciaById = async (id, values, reload, setReload) => {
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
    console.log(response)
}

export const updateHorarioById = async (id, reload, setReload) => {
    const response = await fetch(`http://localhost:3000/asistencia/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    })
    setReload(reload == true ? false : true)
    console.log(response)
}

export const updatePagoById = async (id, reload, setReload) => {
    const response = await fetch(`http://localhost:3000/pago/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    })
    setReload(reload == true ? false : true)
    console.log(response)
}

export const deleteIncidenciaById = async (id, reload, setReload) => {
    const response = await fetch(`http://localhost:3000/incidencia/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    })
    setReload(reload == true ? false : true)
    console.log(response)
}

export const deleteHorarioById = async (id, reload, setReload) => {
    const response = await fetch(`http://localhost:3000/asistencia/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    })
    setReload(reload == true ? false : true)
    console.log(response)
}

export const deletePagoById = async (id, reload, setReload) => {
    const response = await fetch(`http://localhost:3000/pago/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    })
    setReload(reload == true ? false : true)
    console.log(response)
}