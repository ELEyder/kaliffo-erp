import apiClient from '../apiClient';

export const getMovimientos = async(setMovimientos) =>{
  try {
    const response = await apiClient.get(`/movimiento/`);
    setMovimientos(response.data)
  } catch (error) {
    setMovimientos([])
  }
}

export const getMovimientoDetalle = async(setMovimiento,tipo,idM)=>{
  try {
    const response = await apiClient.get(`/movimiento/detalle/${idM}?tipo=${tipo}`)
    setMovimiento(response.data)
  } catch (error) {
    setMovimiento([])
  }
}

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