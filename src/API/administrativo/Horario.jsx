import apiClient from '../ApiClient';

// Extrae los horarios de un trabajador http://localhost:3000/asistencia?usuario_id=1
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

// Elimina un horario http://localhost:3000/asistencia/delete/1
export const deleteHorarioById = async (id) => {
  try {
    await apiClient.delete(`/asistencia/delete/${id}`);
  } catch {
    console.error(`Error al eliminar el horario con el ID ${id}:`, error);
  }
};
