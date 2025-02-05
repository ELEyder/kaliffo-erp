import apiClient from '../apiClient';

export const createMovimiento_Almacen_Tienda = async (values, productos) => {
  let movimiento_AT = {
    almacen_id: values.almacen,
    tienda_id: values.tienda,
    detalle: productos,
  };
  try {
    await apiClient.post(`/movimiento/create?tipo=AT`, movimiento_AT);
  } catch (error) {
    console.log("Error al añadir la tienda", error);
  }
};
