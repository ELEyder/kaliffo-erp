import { ApiClientFiles } from '../../services/ApiClient';

// Obtener reporte de un usuario http://localhost:3000/usuario/reporte/1
export const getReporteUsuario = async (id,tipo) => {
  try {
    const response = await ApiClientFiles.get(`/trabajador/reporte/${id}?tipo=${tipo}`);
    const pdf = response.data;
    const url = window.URL.createObjectURL(pdf);
    window.open(url);
  } catch (error) {
    console.log("Error al obtener el PDF del usuario", error);
  }
};