import { apiClient } from '../apiClient';

/**
 * Obtiene la lista de empresas relacionadas con las telas.
 * URL de ejemplo: http://localhost:3000/telas/empresas
 */
export const getEmpresas = async (setData) => {
  try {
    const response = await apiClient.get(`/telas/empresas`, { withCredentials: true });
    setData(response.data || []);
  } catch (error) {
    console.error("Error al obtener las empresas:", error);
    setData([]);
  }
};
