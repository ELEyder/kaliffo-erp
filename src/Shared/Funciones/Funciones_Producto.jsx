export const getProductoById = async (id, setProducto) => {
    const response = await fetch(`http://localhost:3000/producto/${id}`)
    const productoData= await response.json()
    setProducto(productoData)
}

export const addProducto = async (values) => {
    let Producto = {
        nombre:values.nombre,
        precio:values.precio,
        descuento:values.descuento,
        detalles:[]
    }
    try {
        const response = await fetch(`http://localhost:3000/producto/create`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(Producto),
        })
    } catch (error) {
        console.log(error)
    }

}