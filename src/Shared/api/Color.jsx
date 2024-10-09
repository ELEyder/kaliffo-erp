export const getColoresByProducto = async (id, setTallas) => {
    const response = await fetch(`http://localhost:3000/producto/detalle/${id}?tipo=colores`)
    const data = await response.json()
    setTallas(data)
    console.log(data)
    console.log(id)
}