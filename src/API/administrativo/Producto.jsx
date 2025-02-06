import { apiClient } from '../apiClient';

// Añadir un producto http://localhost:3000/producto/create
export const addProducto = async (values) => {
  let Producto = {
    nombre: values.nombre,
    precioBase: values.precioBase,
    descuento: values.descuento,
    stockTotal: 0
  }
  try {
    await apiClient.post(`/producto/create`, Producto)
  } catch (error) {
    console.log(`Error al añadir un nuevo producto:`,error);
  }
}

// Obtener un producto por su ID http://localhost:3000/producto/1
export const getProductoById = async (id, setProducto) => {
  const response = await apiClient.get(`/producto/${id}`)
  setProducto(response.data)
}

// Actualiza un producto http://localhost:3000/producto/update/1
export const updateProducto = async (id, values) => {
  const Producto = {
    nombre  : values.nombre,
    precioBase : values.precioBase,
    descuento : values.descuento,
  }
  try{
    await apiClient.put(`/producto/update/${id}`, Producto)
  } catch (error) {
    console.log(`Error al actualizar el producto con ID ${id}:`, error);
  }
}

// Eliminar un producto http://localhost:3000/producto/delete/1
export const deleteProductoById = async (id, values) => {
  if (values.campo != "ACEPTO") return
  try {
    await apiClient.put(`/producto/desactivar/${id}`)
  } catch (error) {
    console.log(`Error al eliminar el producto ID ${id}:`, error)
  }
}

// Obtener los productos http://localhost:3000/producto
export const getProductos = async (setProductos) => {
  try {
    const response = await apiClient.get(`/producto`)
    setProductos(response.data)
  } catch (error) {
    console.log(`Error al obtener los productos:`, error)
  }
}
 
// Obtener los productos de una tienda http://localhost:3000/producto?tienda_id=1
export const getProductosByTienda = async (id, setProductos) => {
  try {
    const response = await apiClient.get(`/producto?tienda_id=${id}`)
    setProductos(response.data)
  } catch (error) {
    console.log(`Error al obtener los productos de la tienda ID ${id}:`, error)
  }
}

// Obtener los productos nuevos a agregar http://localhost:3000/producto?loose_id=1 (Descontinuado)
export const getProductosNuevos = async (id, setProductos) => {
  try {
    const response = await apiClient.get(`/producto?loose_id=${id}`);
    setProductos(response.data);
  } catch (error) {
    console.log(`Error al obtener los productos nuevos de la tienda ID ${id}:`, error)
  }
}

// Añade el detalle a los productos http://localhost:3000/producto/create/detalle?tienda_id=1 (Descontinuado)
export const addProductoDetalle = async (tiendaId, Producto) => {
  try {
    await apiClient.post(`/producto/create/detalle?tienda_id=${tiendaId}`, Producto)
  } catch (error) {
    console.log(`Error al añadir detaller a los productos de la tienda ID ${tiendaId}:`, error)
  }
}

// Obtiene los detalles de un producto (Stock por colores de un producto en una tienda)
// http://localhost:3000/producto/detalle/1?tipo=colores&tienda_id=1
export const getColoresDetalleProducto = async (tipo,id,idp, setDetalles) => {
  try {
    const response = await apiClient.get(`/producto/detalle/${idp}?tipo=colores&${tipo}=${id}`);
    setDetalles(response.data);
  } catch (error) {
    console.log(`Error al obtener los colores detallados del producto ID ${idp} de la tienda ID ${id}:`, error)
  }
};

// Obtiene los detalles de un producto (Stock por talla de los colores (funcion anterior))
// http://localhost:3000/producto/talla/1
export const getTallasColoresProductos = async (idD, setTallas) => {
  try {
    const response = await apiClient.get(`/producto/talla/${idD}`);
    setTallas(response.data);
  } catch (error) {
    console.log(`Error al obtener las tallas de los colores del producto detalle ${idD}:`, error)
  }
};

// Obtiene los colores por talla por producto
// http://localhost:3000/producto/detalle/1?tipo=tallas&talla=32
export const getColoresTallaProducto = async (id,talla, setColores) => {
  try {
    const response = await apiClient.get(`/producto/detalle/${id}?tipo=tallas&talla=${talla}`);
    setColores(response.data);
  } catch (error) {
    console.log(`Error al obtener los colores de la talla ${talla} del producto ID ${id}:`, error)
  }
};

// Obtiene los productos de un Lote http://localhost:3000/lotes/productos/1
export const getProductoByLote = async (id, setProductos) => {
  const response = await apiClient.get(`/lotes/productos/${id}`)
  setProductos(response.data)
}

//obtener producto simple usando el codigo 
export const getProductoSimpleCodigoBarras = async (codigo,tipo,id)=>{
  try {
    const response = await apiClient.get(`/producto/codigo_simple/${codigo}?${tipo}=${id}`)
    return response.data
  } catch (error) {    
    return("error","ERROR AL OBTENER LOS DATOS")
  }
}

//obtener producto detalle usando el codigo 
export const getProductoCompletoCodigoBarras = async (codigo)=>{
  try {
    const response = await apiClient.get(`/producto/codigo_completo/${codigo}`)
    return response.data
  } catch (error) {    
    return("error","ERROR AL OBTENER LOS DATOS")
  }
}

// Prepara el actualizar producto http://localhost:3000/producto/1
export const setUpdateProducto = async (id, form) => {
  try {
    const response = await apiClient.get(`/producto/${id}`);
    const data = response.data;
    form.setFieldsValue({
      ["nombre"]: data.nombre,
      ["precioBase"]: data.precioBase,
      ["descuento"]: data.descuento,
    });
  } catch (error) {
    console.log("Error al obtener los detalles del producto para el formulario", error);
  }
};