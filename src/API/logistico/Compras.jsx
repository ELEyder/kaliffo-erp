import { ApiClient } from '../ApiClient';

/**
 * Obtiene la lista de compras y actualiza el estado.
 * URL de ejemplo: http://localhost:3000/compras
 */
export const getCompras = async (setCompras) => {
  try {
    const { data } = await ApiClient.get("/compra");
    setCompras(data);
  } catch (error) {
    console.error("Error al obtener las compras:", error);
  }
};

/**
 * Obtiene el detalle de una compra por su ID y actualiza el estado.
 * URL de ejemplo: http://localhost:3000/compra/detalle/1
 */
export const getComprasDetalle = async (setCompraDetalle, id) => {
  try {
    const { data } = await ApiClient.get(`/compra/detalle/${id}`);
    setCompraDetalle(data);
  } catch (error) {
    console.error("Error al obtener el detalle de la compra:", error);
  }
};

/**
 * Obtiene la lista de empresas y actualiza el estado.
 * URL de ejemplo: http://localhost:3000/compra/empresas
 */
export const getEmpresas = async (setEmpresas) => {
  try {
    const { data } = await ApiClient.get("/compra/empresas");
    setEmpresas(data);
  } catch (error) {
    console.error("Error al obtener las empresas:", error);
  }
};

/**
 * Obtiene la lista de productos y actualiza el estado.
 * URL de ejemplo: http://localhost:3000/compra/productos
 */
export const getProductos = async (setProductos) => {
  try {
    const { data } = await ApiClient.get("/compra/productos");
    setProductos(data);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
};

/**
 * Agrega una nueva compra al servidor.
 * URL de ejemplo: http://localhost:3000/compra/create
 */
export const addCompra = async (values) => {
  const compra = {
    empresa_proveedor: values.empresa,
    fecha_compra: values.fecha_compra,
    cantidad: values.cantidad_total,
    total: values.total_neto,
    tienda_id: values.tienda,
    detalle: values.detalle,
  };

  try {
    await ApiClient.post("/compra/create", compra);
    return("add", "Compra añadida exitosamente");
  } catch (error) {
    return("error", "Error al añadir la compra");
  }
};

/**
 * Elimina una compra por su ID.
 * URL de ejemplo: http://localhost:3000/compra/delete/1
 */
export const eliminarCompra = async (compra_id) => {
  try {
    await ApiClient.delete(`/compra/delete/${compra_id}`);
    return("delete", "Compra eliminada exitosamente");
    return true;
  } catch (error) {
    return("error", "Error al eliminar la compra");
  }
};

/**
 * Actualiza una compra por su ID con los valores nuevos.
 * URL de ejemplo: http://localhost:3000/compra/update/1
 */
export const updateCompra = async (id, values, originales) => {
  const valoresNuevos = {};

  for (const key in originales) {
    if (values[key] !== originales[key] && values[key] !== undefined) {
      valoresNuevos[key] = values[key];
      if (key === "detalle") {
        valoresNuevos.detalle = [];
        for (let i = 0; i < originales.detalle.length; i++) {
          const originalDetalle = originales.detalle[i];
          const nuevoDetalle = values.detalle[i];
          const detalleCambios = {};

          for (const detalleKey in originalDetalle) {
            if (nuevoDetalle[detalleKey] !== originalDetalle[detalleKey]) {
              detalleCambios[detalleKey] = nuevoDetalle[detalleKey];
            }
          }

          if (Object.keys(detalleCambios).length > 0) {
            valoresNuevos.detalle.push({
              compraDetalle_id: originalDetalle.compraDetalle_id,
              ...detalleCambios,
            });
          }
        }
      }
    }
  }

  try {
    await ApiClient.put(`/compra/update/${id}`, valoresNuevos);
    console.log("Compra actualizada exitosamente");
  } catch (error) {
    console.log("Error al actualizar la compra");
  }
};
