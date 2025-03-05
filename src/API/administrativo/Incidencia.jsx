import { ApiClient } from '../ApiClient';

// Crea una incidencia http://localhost:3000/incidencia/create
export const addIncidencia = async (data) => {
  try {
    await ApiClient.post('/incidencia/create', data);
  } catch (error) {
    console.error("Error al añadir la incidencia:", error);
  }
};

// Obtiene las incidencias de un trabajador http://localhost:3000/incidencia?usuario_id=1
export const getIncidenciasByTrabajador = async (id, setIncidencias) => {
  const incidencias = ["Ninguno", "Familiar", "Salud", "Personal"]
  try {
    const { data } = await ApiClient.get(`/incidencia`, { params: { usuario_id: id } });
    const incidenciasData = data.map((detalle, index) => ({
      ...detalle,
      incidencia: incidencias[detalle.tipo],
      fecha_creacion: new Date(detalle.fecha_creacion).toLocaleDateString("es-ES"),
      id: index + 1,
    }));
    setIncidencias(incidenciasData);
  } catch (error) {
    console.error("Error al obtener incidencias:", error);
  }
};

// Actualiza una Incidencia http://localhost:3000/incidencia/update/1
export const updateIncidenciaById = async (id, values) => {
  try {
    await ApiClient.put(`/incidencia/update/${id}`, values);
  } catch (error) {
    console.error("Error al actualizar incidencia:", error);
  }
};

// Elimina una incidencia http://localhost:3000/incidencia/delete/1
export const deleteIncidenciaById = async (id) => {
  try {
    await ApiClient.delete(`/incidencia/delete/${id}`);
  } catch (error) {
    console.error("Error al eliminar incidencia:", error);
  }
};