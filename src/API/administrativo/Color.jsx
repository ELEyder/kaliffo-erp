import { ApiClient } from '../../services/ApiClient';

//Extraer todos los colores http://localhost:3000/color
export const getColores = async (setColores) => {
  try {
    const response = await ApiClient.get(`/color`);
    setColores(response.data);
  } catch (error) {
    console.error('Error al obtener colores por producto:', error);
    setColores([]);
  }
};
//Extraer los colores de un producto http://localhost:3000/producto/detalle/1?tipo=colores
export const getColoresByProducto = async (idProducto, setColores) => {
  try {
    const response = await ApiClient.get(`/producto/detalle/${idProducto}?tipo=colores`);
    setColores(response.data);
  } catch (error) {
    console.error('Error al obtener colores por producto:', error);
    setColores([]);
  }
};

// Obtener los colores de los productos http://localhost:3000/producto/colores/1 (Descontinuado)
export const getColoresProductos = async (id, setColores) => {
  try {
    const response = await ApiClient.get(`/producto/colores/${id}`);
    setColores(prevColores => ({
      ...prevColores,
      [id] : response.data
  }))
  } catch (error) {
    console.error('Error al obtener colores del producto:', error);
  }
};