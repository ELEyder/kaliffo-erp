import { ApiClient } from "../ApiClient";

// Obtener lavandería por lote
export const getLavanderia = async (id, setData) => {
  try {
    const response = await ApiClient.get(`/lavanderia/lote/${id}`);
    setData(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      setData([]);
    } else {
      console.error("Error al obtener lavandería:", error);
      setData([]);
    }
  }
};

// Añadir lavandería
export const addLavanderia = async (id, data) => {
  try {
    await ApiClient.post(`/lavanderia/create/array/${id}`, data, {
      withCredentials: true,
    });
    return("add", "Lavandería añadida correctamente");
  } catch (error) {
    console.error("Error al añadir lavandería:", error);
    return("error", "Error al añadir lavandería");
  }
};

// Obtener y cambiar detalles de lavandería
export const getChangeLavanderia = async (id, setData, form) => {
  try {
    const response = await ApiClient.get(`/lavanderia/lote/${id}`);
    const data = response.data;

    const detallesConNuevoParametro = data.map((detalle) => ({
      id: detalle.lavanderia_id,
      cantidad_recibida: detalle.cantidad_enviada,
    }));

    setData(detallesConNuevoParametro);
    form.setFieldsValue({ items: detallesConNuevoParametro });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error(`Lavandería con ID ${id} no encontrada (404).`);
      setData([]);
      form.setFieldsValue({ items: [] });
    } else {
      console.error("Error al obtener detalles de lavandería:", error);
      setData([]);
      form.setFieldsValue({ items: [] });
    }
  }
};

// Desactivar (eliminar lógicamente) corte
export const deleteCorte = async (id) => {
  try {
    await ApiClient.put(`/cortes/desactivar/${id}`);
    return("delete", "Corte eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar el corte:", error);
    return("error", "Error al eliminar el corte");
  }
};

// Obtener estado de lavandería
export const getStatusLavanderia = async (id, setData) => {
  try {
    const response = await ApiClient.get(`/lavanderia/lote/${id}`, {
      withCredentials: true,
    });
    const data = response.data;

    if (data.length === 0) {
      setData(0);
    } else {
      setData(data[0].estado);
      console.log("Estado:", data[0].estado);
    }
  } catch (error) {
    console.error("Error al obtener estado de lavandería:", error);
    setData(0);
  }
};

// Cambiar estado de lavandería
export const changeStatusLavanderia = async (id, data = null) => {
  try {
    // Si no se pasan datos, obtenerlos desde el API
    if (!data) {
      const response = await ApiClient.get(`/lavanderia/lote/${id}`, {
        withCredentials: true,
      });
      data = response.data;
    }

    // Mapeo de datos para la solicitud PUT
    const values = data.map((detalle) => ({
      lavanderia_id: detalle.id || detalle.lavanderia_id,
      cantidad_recibida: detalle.cantidad_recibida,
    }));

    // Creando el objeto para enviar
    const Lote = { detalles: values };

    console.log("Lavandería:", Lote);

    // Solicitud PUT
    await ApiClient.put(`/lavanderia/sgte/lote/${id}`, Lote);
    return("add", "Estado actualizado correctamente");
  } catch (error) {
    console.error("Error en la función changeStatusLavanderia:", error);
    return("error", `Error: ${error.message}`);
  }
};
