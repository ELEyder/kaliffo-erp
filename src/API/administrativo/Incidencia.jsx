import apiClient from '../ApiClient';
import { showNotification } from "../../Shared/Notifications"

const incidencias = ["Familiar", "Salud", "Personal"]

export const addIncidencia = async (data) => {
    try {
        const response = await apiClient.post('/incidencia/create', data, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.status === 201) {
            showNotification("add", "Incidencia añadida correctamente");
        }
    } catch (error) {
        console.error("Error al añadir la incidencia:", error);
    }
};

export const getIncidenciasByTrabajador = async (id, setIncidencias) => {
    try {
        const { data } = await apiClient.get(`/incidencia`, {
            params: { usuario_id: id }
        });

        const incidenciasData = data.map((detalle, index) => ({
            ...detalle,
            incidencia: incidencias[detalle.tipo - 1],
            fecha_creacion: new Date(detalle.fecha_creacion).toLocaleDateString("es-ES"),
            id: index + 1,
        }));

        setIncidencias(incidenciasData);

    } catch (error) {
        console.error("Error al obtener incidencias:", error);
    }
};

export const updateIncidenciaById = async (id, values) => {
    try {
        const response = await apiClient.put(`/incidencia/update/${id}`, values, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            showNotification("update", "Incidencia actualizada");
        }

    } catch (error) {
        console.error("Error al actualizar incidencia:", error);
    }
};

export const deleteIncidenciaById = async (id) => {
    try {
        const response = await apiClient.delete(`/incidencia/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            showNotification("delete", "Incidencia borrada");
        }
    } catch (error) {
        console.error("Error al eliminar incidencia:", error);
    }
};