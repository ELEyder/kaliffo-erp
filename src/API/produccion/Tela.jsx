import { showNotification } from "../../Shared/Notifications";
import apiClient from "../ApiClient";

// Obtener todas las telas
export const getTelas = async (setData) => {
  try {
    const response = await apiClient.get(`/telas/`);
    setData(response.data);
  } catch (error) {
    console.error("Error al obtener las telas:", error);
    showNotification("error", "Error al obtener las telas");
  }
};

// Obtener telas activas por tipo
export const getTelasActivas = async (tipo, setData) => {
  try {
    const response = await apiClient.get(`/telas/${tipo}`, {
      params: { estado: 1 },
    });

    let count = 0;
    const data = response.data.map((tela) => {
      const fecha_compra = new Date(tela.fecha_compra);
      count += 1;
      return {
        ...tela,
        fecha_compra: fecha_compra.toLocaleDateString("es-ES"),
        n: count,
      };
    });

    setData(data);
  } catch (error) {
    console.error("Error al obtener telas activas:", error);
    showNotification("error", "Error al obtener telas activas");
  }
};

// Obtener telas inactivas por tipo
export const getTelasInactivas = async (tipo, setData) => {
  try {
    const response = await apiClient.get(`/telas/${tipo}`, {
      params: { estado: 0 },
    });

    let count = 0;
    const data = response.data.map((tela) => {
      const fecha_compra = new Date(tela.fecha_compra);
      count += 1;
      return {
        ...tela,
        fecha_compra: fecha_compra.toLocaleDateString("es-ES"),
        n: count,
      };
    });

    setData(data);
  } catch (error) {
    console.error("Error al obtener telas inactivas:", error);
    showNotification("error", "Error al obtener telas inactivas");
  }
};

// Obtener tipos de tela
export const getTiposTela = async (setTelas) => {
  try {
    const response = await apiClient.get(`/telas/tipo`);
    setTelas(response.data);
  } catch (error) {
    console.error("Error al obtener tipos de tela:", error);
    showNotification("error", "Error al obtener tipos de tela");
  }
};

// Agregar una nueva tela
export const addTelas = async (values) => {
  try {
    await apiClient.post(`/telas/create`, values);
    showNotification("add", "Tela agregada correctamente");
  } catch (error) {
    console.error("Error al agregar la tela:", error);
    showNotification("error", "Error al agregar la tela");
  }
};

// Desactivar (eliminar lógicamente) tela por ID
export const deleteTelaById = async (id) => {
  try {
    await apiClient.put(`/telas/desactivar/${id}`);
    showNotification("delete", "Tela desactivada correctamente");
  } catch (error) {
    console.error("Error al desactivar la tela:", error);
    showNotification("error", "Error al desactivar la tela");
  }
};
