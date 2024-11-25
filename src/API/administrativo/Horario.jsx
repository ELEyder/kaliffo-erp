import apiClient from '../ApiClient';
import { showNotification } from "../../Shared/Notifications"

export const getHorariosByTrabajador = async (id, setHorario) => {
  try {
    const { data } = await apiClient.get(`/asistencia?usuario_id=${id}`);

    const formatFecha = (fecha) => {
      const opciones = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(fecha).toLocaleDateString('es-PE', opciones);
    };

    const asistenciasNormalizadas = data.map(({ fecha, ...resto }) => ({
      ...resto,
      fecha: formatFecha(fecha),
    }));

    setHorario(asistenciasNormalizadas);
  } catch (error) {
    console.error("Error al obtener asistencias:", error);
  }
};

export const deleteHorarioById = async (id) => {
  try {
    const response = await apiClient.delete(`/asistencia/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      showNotification("error", `Error al eliminar asistencia: ${response.statusText}`)
    }
  } catch (error) {
    showNotification("error", `Error al eliminar asistencia: ${error.message}`)
  }
};