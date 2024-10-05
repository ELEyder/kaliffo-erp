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

export const getTiendaById = async (id, setTienda) => {
    const response = await fetch(`http://localhost:3000/tienda/${id}`);
    const data = await response.json();
    setTienda(data);
};

export const getTiendas = async (setTiendas) => {
    const response = await fetch(`http://localhost:3000/tienda`)
    const data = await response.json()
    setTiendas(data)
}

export const getTiendasByProducto = async (id, setTiendas) => {
    try {
      const response = await fetch(
        `http://localhost:3000/tienda?producto_id=${id}`
      );
      const data = await response.json();
      setTiendas(data);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  export const getProductoTiendaDetalle = async (id,idp, setTiendas) => {
    try {
      const response = await fetch(
        `http://localhost:3000/producto/detalle/${idp}?id_tienda=${id}`
      );
      const data = await response.json();
      setTiendas(data);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };