export const getTienda = async (id,seteador) => {
    const response = await fetch(`http://localhost:3000/tienda/${id}`)
    const TiendaData= await response.json()
    seteador(TiendaData)
}

export const getProductosTienda = async (id,seteador) =>{
    try {
        const response = await fetch(
            `http://localhost:3000/producto?tienda_id=${id}`
        )
        const data=await response.json()
        seteador(data)
    } catch (error) {   
        console.log(error)
    }
}

export const getusuariosTienda = async (id,seteador) =>{
    try {
        const response = await fetch(
            `http://localhost:3000/usuario?tienda_id=${id}`
        )
        const data=await response.json()
        seteador(data)
    } catch (error) {   
        console.log(error)
    }
}