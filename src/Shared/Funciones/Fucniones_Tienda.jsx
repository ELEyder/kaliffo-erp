export const getTienda = async (id,seteador) => {
    const response = await fetch(`http://localhost:3000/tienda/${id}`)
    const TiendaData= await response.json()
    seteador(TiendaData)
}