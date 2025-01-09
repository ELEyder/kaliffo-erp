import apiClient from '../apiClient';

/**
 * Obtiene los datos de un corte por lote ID.
 * URL de ejemplo: http://localhost:3000/cortes/lote/1
 */
export const getCorte = async (id, setData) => {
  try {
    const response = await apiClient.get(`/corte/lote/${id}`, { withCredentials: true });

    setData(response.data || []);
  } catch (error) {
    if (error.response?.status === 404) {
      setData([]);
    } else {
      console.error("Error al obtener el corte:", error);
      setData([]);
    }
  }
};

/**
 * Agrega un nuevo corte para un lote específico.
 * URL de ejemplo: http://localhost:3000/cortes/create/array/1
 */
export const addCorte = async (id, data) => {
  data.detalles = data.detalles.map(detalle => ({
    cantidad_enviada: detalle.cantidad_enviada,
    talla: detalle.talla,
    taller_id: detalle.taller_id ?? null,
  }));
  console.log(data)
  try {
    var response = await apiClient.post(`/corte/create/array/${id}`, data);
    console.log(response)
  } catch (error) {
    console.error("Error al añadir el corte:", error);
  }
};

/**
 * Actualiza un corte para su visualización y manipulación en un formulario.
 * URL de ejemplo: http://localhost:3000/cortes/lote/1
 */
export const getChangeCorte = async (id, setData, form) => {
  try {
    const response = await apiClient.get(`/corte/lote/${id}`, { withCredentials: true });

    const detallesActualizados = response.data.map(detalle => ({
      detallesCorte: `${detalle.taller} | ${detalle.producto} | ${detalle.talla}`,
      id: detalle.corte_id,
      cantidad_recibida: detalle.cantidad_enviada,
    }));

    setData(detallesActualizados);
    form.setFieldsValue({ items: detallesActualizados });
  } catch (error) {
    console.error("Error al obtener el corte:", error);
    setData([]);
    form.setFieldsValue({ items: [] });
  }
};

/**
 * Obtiene datos para agregar un taller a un corte existente.
 * URL de ejemplo: http://localhost:3000/cortes/lote/1
 */
export const getAddTaller = async (id, setData, form) => {
  try {
    const response = await apiClient.get(`/corte/lote/${id}`, { withCredentials: true });

    const detallesActualizados = response.data.map(detalle => ({
      datos_corte: `Producto: ${detalle.producto} | Cantidad: ${detalle.cantidad_enviada} | Talla: ${detalle.talla}`,
      corte_id: detalle.corte_id,
      taller_id: detalle.taller_id,
    }));

    setData(detallesActualizados.length > 0 ? detallesActualizados : []);
    form.setFieldsValue({ items: detallesActualizados.length > 0 ? detallesActualizados : [] });
  } catch (error) {
    console.error("Error al obtener el corte:", error);
    setData([]);
    form.setFieldsValue({ items: [] });
  }
};

/**
 * Desactiva un corte por su ID si no está en proceso.
 * URL de ejemplo: http://localhost:3000/cortes/desactivar/1
 */
export const deleteCorte = async (id, estado) => {
  if (estado !== 1) {
    return;
  }

  try {
    await apiClient.put(`/corte/desactivar/${id}`);
  } catch (error) {
    console.error("Error al eliminar el corte:", error);
  }
};

/**
 * Obtiene el estado de un corte para un lote específico.
 * URL de ejemplo: http://localhost:3000/cortes/lote/1
 */
export const getStatusCorte = async (id, setData) => {
  try {
    const response = await apiClient.get(`/corte/lote/${id}`);

    if (response.data.length === 0) {
      setData(0);
    } else {
      setData(response.data[0].estado);
    }
  } catch (error) {
    console.error("Error al obtener el estado del corte:", error);
    setData(0);
  }
};

/**
 * Cambia el estado de un corte para un lote específico.
 * URL de ejemplo: http://localhost:3000/cortes/sgte/lote/1
 */
export const changeStatusCorte = async (id, data = null) => {
  try {
    if (!data) {
      const response = await apiClient.get(`/corte/lote/${id}`, { withCredentials: true });
      data = response.data;
    }

    const values = data.map(detalle => ({
      corte_id: detalle.id || detalle.corte_id,
      cantidad_recibida: detalle.cantidad_recibida,
      taller_id: detalle.taller_id,
    }));

    await apiClient.put(`/corte/sgte/lote/${id}`, { detalles: values }, { withCredentials: true });
  } catch (error) {
    console.error("Error al cambiar el estado del corte:", error);
  }
};

/**
 * Envía los datos de un taller para un lote específico.
 * URL de ejemplo: http://localhost:3000/cortes/sgte/lote/1
 */
export const getTaller = async (id, values = null) => {
  try {
    if (!values) {
      const response = await apiClient.get(`/corte/lote/${id}`);
      values = response.data;
    }

    await apiClient.put(`/corte/sgte/lote/${id}`, { detalles: values });
  } catch (error) {
    console.error("Error al enviar los datos del taller:", error);
  }
};
