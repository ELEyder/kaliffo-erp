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

export const getProductoById = async (id, setProducto) => {
    const response = await fetch(`http://localhost:3000/producto/${id}`)
    const productoData= await response.json()
    setProducto(productoData)
}

export const deleteProductoById = async (id, id_Tienda, reload, setReload) => {
    const response = await fetch(`http://localhost:3000/producto/delete/${id}?id_tienda=${id_Tienda}`, {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json"
        }
    })
    setReload(!reload)
    console.log(response)
}

export const getProductosTienda = async (id, seteador) => {
    try {
      const response = await fetch(
        `http://localhost:3000/producto?tienda_id=${id}`
      );
      const data = await response.json();
      seteador(data);
    } catch (error) {
      console.log(error);
    }
  };

export const getProductos = async (seteador) => {
    const response = await fetch(`http://localhost:3000/producto`)
    const productosData= await response.json()
    seteador(productosData)
}

export const getProductosTiendas = async (id, setTabla) => {
    const response = await fetch(`http://localhost:3000/producto/${id}`)
    const productoData= await response.json()

    // Talla por defecto
    const detallesConNuevoParametro = productoData.detalles.map(detalle => ({
        ...detalle,
        precio: productoData.precio
      }));

    setTabla(detallesConNuevoParametro)
}

export const getProductosNuevos = async(id,seteador) =>{
    try {
      const response = await fetch(
        `http://localhost:3000/producto/lose/${id}`
      );
      const data = await response.json();
      seteador(data);
    } catch (error) {
      console.log(error)
    }
  }

  export const getColoresProductos =async (value,setColores)=>{
    try {
      const response = await fetch(`http://localhost:3000/producto/colores/${value}`);
      const data = await response.json();
      setColores(prevColores => ({
        ...prevColores,
        [value] : data
      }));
      console.log(response)
      console.log(data)
    } catch (error) {
      console.log("Error al obtener los colores del producto:", error);
    }
  };

  export const getProductoTiendaDetalle = async (id,idp,seteador) =>{
    try {
      const response = await fetch(
        `http://localhost:3000/producto/${idp}?tienda_id=${id}`
      );
      const data = await response.json();
      seteador(data);
    } catch (error) {
      console.log(error)
    }
  }