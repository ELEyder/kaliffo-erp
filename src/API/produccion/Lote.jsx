import { showNotification } from "../../Shared/Notifications";
import apiClient from "../apiClient";

// Eliminar Lote por ID
export const deleteLoteById = async (id) => {
  try {
    await apiClient.delete(`/lotes/delete/${id}`);
    showNotification("delete", "Lote eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar el lote:", error);
    showNotification("error", "No se pudo eliminar el lote");
  }
};

// Obtener todos los lotes
export const getLotes = async (setData) => {
  try {
    const response = await apiClient.get(`/lotes`);
    const data = response.data;
    const dataNormal = data.map((lote) => ({
      ...lote,
      fecha_creacion: new Date(lote.fecha_creacion).toLocaleDateString("es-PE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    }));
    setData(dataNormal);
  } catch (error) {
    console.error("Error al obtener lotes:", error);
    showNotification("error", "Error al obtener lotes");
  }
};

// Añadir un Lote
export const addLote = async (values) => {
  try {
    const productos = values.productos.join(",");
    const lote = {
      tipo_tela: values.tipo_tela,
      metraje: values.metraje,
      productos: productos,
    };

    await apiClient.post(`/lotes/create`, lote);
    showNotification("add", "Lote añadido correctamente");
  } catch (error) {
    console.error("Error al añadir el lote:", error);
    showNotification("error", "Error al añadir el lote");
  }
};

// Obtener Fase del Lote
export const getFaseLote = async (id, setData, setOriginal) => {
  try {
    const response = await apiClient.get(`/lotes/${id}`);
    const data = response.data;
    console.log("Fase:", data.estado);
    setData(data.estado);
    setOriginal(data.estado);
  } catch (error) {
    console.error("Error al obtener la fase del lote:", error);
    showNotification("error", "Error al obtener la fase del lote");
  }
};
