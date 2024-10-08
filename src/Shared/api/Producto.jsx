export const addProducto = async (values) => {
  let Producto = {
    nombre: values.nombre,
    precioBase: values.precioBase,
    descuento: values.descuento,
    stockTotal: 0
  }
  try {
    const response = await fetch(`http://localhost:3000/producto/create`, {
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
  const productoData = await response.json()
  console.log(productoData[0])
  setProducto(productoData[0])
}

export const deleteProductoById = async (id, id_Tienda, reload, setReload) => {
  const response = await fetch(`http://localhost:3000/producto/delete/${id}?id_tienda=${id_Tienda}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
  setReload(!reload)
  console.log(response)
}

export const getProductos = async (seteador) => {
  const response = await fetch(`http://localhost:3000/producto`)
  const productosData = await response.json()
  seteador(productosData)
}

export const getProductosByTienda = async (id, setTabla) => {
  const response = await fetch(`http://localhost:3000/producto/tienda/${id}`)
  const productoData = await response.json()
  console.log(productoData)
  setTabla(productoData)
}

export const getProductosNuevos = async (id, seteador) => {
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

export const getColoresProductos = async (value, setColores) => {
  try {
    const response = await fetch(`http://localhost:3000/producto/colores/${value}`);
    const data = await response.json();
    setColores(prevColores => ({
      ...prevColores,
      [value]: data
    }));
    console.log(response)
    console.log(data)
  } catch (error) {
    console.log("Error al obtener los colores del producto:", error);
  }
};

export const getProductoTiendaDetalle = async (id, idp, setData) => {
  try {
    const response = await fetch(
      `http://localhost:3000/producto/${idp}?tienda_id=${id}`
    );
    const data = await response.json();
    setData(data);
  } catch (error) {
    console.log(error)
  }
}

export const addProductoDetalle = async (tiendaId, values) => {
  let Producto = {
    nombre: values.nombre,
    precioBase: values.precioBase,
    descuento: values.descuento,
    stockTotal: 0
  }
  try {
    const response = await fetch(`http://localhost:3000/producto/create/detalle?tienda_id=${tiendaId}`, {
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