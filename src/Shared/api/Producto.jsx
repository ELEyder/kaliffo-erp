import { showNotification } from "../Notifications"

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
    showNotification("error", "Error al añadir producto", error)
  }
}

export const getProductoById = async (id, setProducto) => {
  const response = await fetch(`http://localhost:3000/producto/${id}`)
  const productoData = await response.json()
  setProducto(productoData)
}

export const updateProducto = async (id, values) => {
  const producto = {
    nombre  : values.nombre,
    precio : values.precioBase,
    descuento : values.descuento,
}
  const response = await fetch(`http://localhost:3000/producto/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(producto),
  })
  showNotification("update", "Producto Actualizado")
}

export const deleteProductoById = async (id, values) => {
  const response = await fetch(`http://localhost:3000/producto/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
  showNotification("delete","Producto Eliminado")
}

export const deleteProductoByTienda = async (id, id_Tienda) => {
  const response = await fetch(`http://localhost:3000/producto/delete/${id}?id_tienda=${id_Tienda}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
  showNotification("delete","Producto Eliminado")
}

export const getProductos = async (seteador) => {
  const response = await fetch(`http://localhost:3000/producto`)
  const productosData = await response.json()
  seteador(productosData)
}

export const getProductosByTienda = async (id, setTabla) => {
  const response = await fetch(`http://localhost:3000/producto?tienda_id=${id}`)
  const productoData = await response.json()
  setTabla(productoData)
}

export const getProductosNuevos = async (id, setData) => {
  try {
    const response = await fetch(
      `http://localhost:3000/producto?loose_id=${id}`
    );
    const data = await response.json();
    setData(data);
  } catch (error) {
    setData([]);
  }
}

export const getColoresProductos = async (value, setColores) => {
  try {
    const response = await fetch(`http://localhost:3000/producto/colores/${value}`);
    const data = await response.json();
    setColores(prevColores => ({
      ...prevColores,
      [value] : data
  }))
  } catch (error) {
    showNotification("error","Error al obtener los colores del producto", error)
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
    showNotification("error","Error al obtener los detalles del producto por tienda", error)
  }
}

export const addProductoDetalle = async (tiendaId, Producto) => {
  try {
    const response = await fetch(`http://localhost:3000/producto/create/detalle?tienda_id=${tiendaId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Producto)
    })
    showNotification("add","Producto Añadido Correctamente")
  } catch (error) {
    showNotification("error","Error al añadir el producto", "Para mas información, revisa la consola")
  }
}

export const getProductoDetalle = async (id,idp, setTiendas) => {
  try {
    const response = await fetch(
      `http://localhost:3000/producto/detalle/${idp}?tipo=colores&tienda_id=${id}`
    );
    const data = await response.json();
    setTiendas(data);
  } catch (error) {
    showNotification("error","Error al obtener los detalles del producto", error)
  }
};

export const setUpdateUsuario = async (id, form) => {
  try {
    const response = await fetch(`http://localhost:3000/producto/${id}`);
    const data = await response.json();
    form.setFieldsValue({
      ["nombre"]: data.nombre,
      ["precioBase"]: data.precioBase,
      ["descuento"]: data.descuento,
    });
  } catch (error) {
    showNotification("error","Error al obtener los datos", error)
  }
};