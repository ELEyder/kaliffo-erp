import apiClient from '../ApiClient';

export const getAlmacenes = async (setAlmacenes) => {
    try {
      const response = await apiClient.get(`/almacen_productos`);
      setAlmacenes(response.data);
    } catch (error) {
      console.error('Error al obtener colores por producto:', error);
      setAlmacenes([]);
    }
  };