import { ApiClient } from "../ApiClient";

// Obtener Fase del Lote
export const getFaseLote = async (id, setData) => {
  try {
    const response = await ApiClient.get(`/lotes/${id}`);
    const data = response.data;
    console.log("Fase:", data.estado);
    setData(data.estado);
  } catch (error) {
    console.error("Error al obtener la fase del lote:", error);
  }
};

export const getStatus = async (id, fase , setStatus) => {

  const routes = {
    1: `/corte/lote/${id}`,
    2: `/lavanderia/lote/${id}`,
    3: `/taller/lote/${id}`,
  };

  const url = routes[fase]; // Busca la URL según la fase
  if (!url) return setStatus(0);

  try {
    const response = await ApiClient.get(url);
    const data = response.data;

    if (data.length === 0) {
      setStatus(0);
    } else {
      setStatus(data[0].estado);
      console.log("Estado:", data[0].estado);
    }
  } catch (error) {
    console.error("Error al obtener estado de lavandería:", error);
    setStatus(0);
  }
};

// Eliminar Lote por ID
export const deleteLoteById = async (id) => {
  try {
    await ApiClient.delete(`/lotes/delete/${id}`);
    return("delete", "Lote eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar el lote:", error);
    return("error", "No se pudo eliminar el lote");
  }
};

// Obtener todos los lotes
export const getLotes = async (setData) => {
  try {
    const response = await ApiClient.get(`/lotes`);
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
    return("error", "Error al obtener lotes");
  }
};

// Añadir un Lote
export const addLote = async (values,ids,total) => {
  try {
    const productos = values.productos.join(",");
    const lote = {
      rollos_tela: ids,
      metraje: total,
      productos: productos,
    };

    await ApiClient.post(`/lotes/create`, lote);
    return("add", "Lote añadido correctamente");
  } catch (error) {
    console.error("Error al añadir el lote:", error);
    return("error", "Error al añadir el lote");
  }
};


