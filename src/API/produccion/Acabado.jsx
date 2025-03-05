import { ApiClient } from "../ApiClient";

// Obtener acabados por lote
export const getAcabadoByLote = async (id, setData) => {
  try {
    const response = await ApiClient.get(`/taller/lote/${id}`);
    setData(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      setData([]);
    } else {
      console.error("Error al obtener acabados por lote:", error);
      setData([]);
    }
  }
};

// Añadir acabado
export const addAcabado = async (data) => {
  try {
    await ApiClient.post(`/taller/create`, data);
    return("add", "Lavandería añadida correctamente");
  } catch (error) {
    console.error("Error al añadir acabado:", error);
    return("error", "Error al añadir la lavandería");
  }
};

// Obtener y cambiar detalles de acabado
export const getChangeAcabado = async (id, setData, form) => {
  try {
    const response = await ApiClient.get(`/taller/lote/${id}`);
    const data = response.data;

    const detallesConNuevoParametro = data.map((detalle) => ({
      id: detalle.acabado_id,
      cantidad_recibida: detalle.cantidad_enviada,
    }));

    setData(detallesConNuevoParametro);
    form.setFieldsValue({ items: detallesConNuevoParametro });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error(`Acabado con ID ${id} no encontrado (404).`);
      setData([]);
      form.setFieldsValue({ items: [] });
    } else {
      console.error("Error al obtener detalles de acabado:", error);
      setData([]);
      form.setFieldsValue({ items: [] });
    }
  }
};

// Desactivar (eliminar lógicamente) taller por ID
export const deleteTaller = async (id) => {
  try {
    await ApiClient.put(`/taller/desactivar/${id}`);
    return("delete", "Corte eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar el taller:", error);
    return("error", "Error al eliminar el corte");
  }
};

// Cambiar estado del acabado
export const changeStatusAcabado = async (id, data = null, params = null) => {
  try {
    if (!data) {
      const response = await ApiClient.get(`/taller/lote/${id}`);
      data = response.data;
    }

    const values = data.map((detalle) => ({
      acabado_id: detalle.id || detalle.acabado_id,
      cantidad_recibida: detalle.cantidad_recibida,
    }));

    const Lote = { detalles: values };

    await ApiClient.post(`/taller/sgte/${id}`, Lote, {
      params,
    });

    return("add", "Estado actualizado correctamente");
  } catch (error) {
    console.error("Error al cambiar estado del acabado:", error);
    return("error", `Error: ${error.message}`);
  }
};
