export const getColoresByProducto = async (id, setTallas) => {
    const response = await fetch(`http://localhost:3000/tienda?producto_id=${id}`)
    const data = await response.json()
    setTallas(data)
}