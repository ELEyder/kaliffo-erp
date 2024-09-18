export const CargarProductoPorId = async (id, setProducto) => {
    const response = await fetch(`http://localhost:3000/producto/${id}`)
    const productoData= await response.json()
    setProducto(productoData)
}