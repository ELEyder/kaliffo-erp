
export const CargarProductos = async (seteador) => {
    const response = await fetch(`http://localhost:3000/producto`)
    const productosData= await response.json()
    seteador(productosData)
}

export const AñadirTienda = async (values) => {
    let Tienda = {
        tienda:values.tienda,
        direccion:values.direccion,
        telefono:values.telefono    
    }

    try {
        const response = await fetch(`http://localhost:3000/tienda/create`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(Tienda),
        })
    } catch (error) {
        console.log(error)
    }

}