import { ApiClient } from '../../services/ApiClient';


// Obtener las tallas de un producto http://localhost:3000/producto/detalle/1?tipo=tallas
export const getTallasByProducto = async (id, setTallas) => {
  try {
    const response = await ApiClient.get(`/producto/detalle/${id}?tipo=tallas`);
    setTallas(response.data);  // Axios automáticamente analiza la respuesta como JSON
  } catch (error) {
    console.log(`Error al obtener las tallas del producto ID ${id}:`, error);
  }
};

// Obtener los detalles de una talla http://localhost:3000/producto/talla/1
export const getTallaDetalle = async (id, setTallas) => {
  try {
    const response = await ApiClient.get(`/producto/talla/${id}`);
    setTallas(response.data);  // Axios automáticamente analiza la respuesta como JSON
  } catch (error) {
    console.log(`Error al obtener los detalles de la talla ID ${id}:`, error);
  }
};
