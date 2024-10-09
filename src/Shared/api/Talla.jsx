export const getTallasByProducto = async (id, setTallas) => {
    const response = await fetch(`http://localhost:3000/producto/detalle/${id}?tipo=tallas`)
    const data = await response.json()
    setTallas(data)
}