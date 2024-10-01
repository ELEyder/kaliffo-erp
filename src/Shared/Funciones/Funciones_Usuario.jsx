export const getUsuarioById = async (id, setUsuario) => {
    const response = await fetch(`http://localhost:3000/usuario/${id}`)
    const usuarioData= await response.json()
    setUsuario(usuarioData)
    console.log(usuarioData)
}



export const getHorarioById = async (id, setHorario) => {
    const response = await fetch(`http://localhost:3000/asistencia/horasTrabajadas/${id}`)
    const productoData= await response.json()
    setHorario(productoData)
    console.log(productoData)
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

