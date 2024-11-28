import apiClient from '../ApiClient';

export const getColores = async (setColores) => {
  try {
    const response = await apiClient.get(`/color`);
    setColores(response.data);
  } catch (error) {
    console.error('Error al obtener colores por producto:', error);
    setColores([]);
  }
};

export const getColoresByProducto = async (idProducto, setColores) => {
  try {
    const response = await apiClient.get(`/producto/detalle/${idProducto}?tipo=colores`);
    setColores(response.data);
  } catch (error) {
    console.error('Error al obtener colores por producto:', error);
    setColores([]);
  }
};

