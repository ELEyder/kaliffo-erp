import apiClient from '../ApiClient';

// Obtener reporte de un usuario http://localhost:3000/usuario/reporte/1
export const getReporteUsuario = async (id) => {
  try {
    const response = await apiClient.get(`/usuario/reporte/${id}`, { responseType: 'blob' });

    const pdf = response.data;
    const url = window.URL.createObjectURL(pdf);
    window.open(url);
  } catch (error) {
    console.log("Error al obtener el PDF del usuario", error);
  }
};

// Obtener reporte de una tienda http://localhost:3000/tienda/reporte/1
export const getReporteTienda = async (id) => {
  try {
    const response = await apiClient.get(`/tienda/reporte/${id}`, { responseType: 'blob' });

    const pdf = response.data;
    const url = window.URL.createObjectURL(pdf);
    window.open(url);
  } catch (error) {
    console.log("Error al obtener el PDF de la tienda", error);
  }
};
