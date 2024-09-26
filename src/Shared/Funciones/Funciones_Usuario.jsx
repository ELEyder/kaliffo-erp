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
            incidencia: incidencias[detalle.tipo - 1], // Añadir el tipo de incidencia
            fecha_creacion: fecha_creacion.toLocaleDateString("es-ES"), // Formatear la fecha
            id: id // Añadir el id (este valor ya viene en el parámetro de la función)
        };
    });
    setIncidencias(detallesConNuevoParametro)
    console.log(detallesConNuevoParametro)
}

export const getHorarioById = async (id, setHorario) => {
    const incidencias = ["Familiar", "Salud", "Personal"]
    const response = await fetch(`http://localhost:3000/incidencias/${id}`)
    const productoData= await response.json()
    const detallesConNuevoParametro = productoData.map(detalle => ({
        ...detalle,
        incidencia: incidencias[detalle.tipo - 1],
    }));
    setHorario(detallesConNuevoParametro)
}