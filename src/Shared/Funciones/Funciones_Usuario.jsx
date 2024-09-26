export const getUsuarioById = async (id, setUsuario) => {
    const response = await fetch(`http://localhost:3000/usuario/${id}`)
    const productoData= await response.json()
    setUsuario(productoData)
}

export const getIncidenciasById = async (id, setUsuario) => {
    const response = await fetch(`http://localhost:3000/incidencias/${id}`)
    const productoData= await response.json()
    setUsuario(productoData)
}