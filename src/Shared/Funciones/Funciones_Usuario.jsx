export const getUsuarioById = async (id, setUsuario) => {
    const response = await fetch(`http://localhost:3000/usuario/${id}`)
    const productoData= await response.json()
    setUsuario(productoData)
}

export const getIncidenciasById = async (id, setIncidencias) => {
    const incidencias = ["Familiar", "Salud", "Personal"]
    // const response = await fetch(`http://localhost:3000/incidencias/${id}`)
    const response = await fetch(`http://localhost:3000/incidencia/`)
    const productoData= await response.json()

    const detallesConNuevoParametro = productoData.map(detalle => {
        const fecha_creacion = new Date(detalle.fecha_creacion);
        return {
            ...detalle,
            incidencia: incidencias[detalle.tipo - 1],
            fecha_creacion: fecha_creacion.toLocaleDateString("es-ES"),
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