export const addPago = async (id, data, reload, setReload) => {
    const Pago = {
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
        body : JSON.stringify(Pago),
    })
    console.log(response)
    setReload(reload == true ? false : true)
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