export const getUsuarioById = async (id, setUsuario) => {
    const response = await fetch(`http://localhost:3000/usuario/${id}`)
    const productoData= await response.json()
    setUsuario(productoData)
}

export const getIncidenciasById = async (id, setUsuario) => {
    const incidencias = ["Familiar", "Salud", "Personal"]
    // const response = await fetch(`http://localhost:3000/incidencias/${id}`)
    const response = await fetch(`http://localhost:3000/incidencia/`)
    const productoData= await response.json()
    const detallesConNuevoParametro = productoData.map(detalle => ({
        ...detalle,
        incidencia: incidencias[detalle.tipo - 1],
        id: id
    }));
    setUsuario(detallesConNuevoParametro)
    console.log(detallesConNuevoParametro)
}