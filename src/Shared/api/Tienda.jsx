export const addTienda = async (values) => {
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

export const getTienda = async (id, seteador) => {
    const response = await fetch(`http://localhost:3000/tienda/${id}`);
    const TiendaData = await response.json();
    seteador(TiendaData);
};

export const getTiendas = async (setTienda) => {
    const response = await fetch(`http://localhost:3000/tienda`)
    const productosData= await response.json()
    setTienda(productosData)
}