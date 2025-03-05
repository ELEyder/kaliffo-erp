import { ApiClient } from '../ApiClient';

// Función que obtiene la lista de almacenes desde el servidor y actualiza el estado con los datos o un arreglo vacío en caso de error.
// http://localhost:3000/almacen_producto
export const getAlmacenes = async (setAlmacenes) => {
  try {
    const { data } = await ApiClient.get('/almacen_producto');
    setAlmacenes(data);
  } catch (error) {
    console.error('Error al obtener los almacenes:', error);
    setAlmacenes([]);
  }
};
