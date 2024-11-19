export const getColoresByProducto = async (id, setTallas) => {
    const response = await fetch(`http://localhost:3000/producto/detalle/${id}?tipo=colores`)
    const data = await response.json()
    setTallas(data)
}

export const getColores = async (setColores) => {
    const response = await fetch(`http://localhost:3000/color`)
    const data = await response.json()
    setColores(data)
}

