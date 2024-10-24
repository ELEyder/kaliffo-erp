import { showNotificationAdd, showNotificationError, showNotificationUpdate, showNotificationDelete } from "../Notifications"
import moment from "moment";

export const getCompras = async (setCompras) =>{
    const response = await fetch(`http://localhost:3000/compras`)
    const comprasData = await response.json()
    setCompras(comprasData)
}

export const getComprasDetalle = async(setCompraDetalle,id) =>{
    const response = await fetch(`http://localhost:3000/compras/detalle/${id}`)
    const compraData = await response.json()
    setCompraDetalle(compraData)
    console.log(compraData)
}

export const getEmpresas = async (setEmpresas) =>{
    const response = await fetch(`http://localhost:3000/compras/empresas`)
    const empresasData = await response.json()
    setEmpresas(empresasData)
}

export const getProductos = async (setProductos) =>{
    const response = await fetch(`http://localhost:3000/compras/productos`)
    const productosData = await response.json()
    setProductos(productosData)
}

export const addCompra = async (values) =>{
    
    let compra ={
        empresa_proveedor:values.empresa,
        fecha_compra:values.fecha_compra,
        cantidad:values.cantidad_total,
        total:values.total_neto,
        tienda_id:values.tienda,
        detalle:values.detalle
    }

    try {
        const response = await fetch(`http://localhost:3000/compras/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(compra),
          });
          showNotificationAdd("Compra añadida exitosamente")
    } catch (error) {
        console.log(error)
        showNotificationAdd("Error al añadir la compra")
    }
}

export const eliminarcompra = async(compra_id) =>{
    try {
        const response = await fetch(`http://localhost:3000/compras/delete/${compra_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response)
        showNotificationDelete("delete","Usuario eliminado")
        return true
    
      } catch (error) {
        console.log(error);
        showNotificationError("error","Error al eliminar el usuario")
      }
}