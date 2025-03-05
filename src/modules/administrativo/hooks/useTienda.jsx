import { useState } from "react";
import { apiClient } from "../../../API/apiClient";
import { useNotification } from "../../../provider/NotificationProvider";

const useTienda = (onChange) => {
  const open = useNotification();
  const [tienda, setTienda] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRequest = async (callback, successMessage) => {
    setLoading(true);
    setError(null);
    try {
      await callback();
      onChange && onChange();
      successMessage && open("Éxito", successMessage);
    } catch (error) {
      open(
        `Error ${error.status || ""}`,
        error.response?.data?.error || "Error desconocido"
      );
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const addTienda = async (values) => {
    const data = {
      tienda: values.tienda,
      direccion: values.direccion,
      telefono: values.telefono,
    };
    await handleRequest(
      () => apiClient.post(`/tienda/create`, data),
      "Tienda agregada"
    );
  };

  const getTienda = async (id) => {
    if (!id) return;
    await handleRequest(async () => {
      const response = await apiClient.get(`/tienda/${id}`);
      setTienda(response.data);
    });
  };

  const updateTienda = async (id, data) => {
    await handleRequest(
      () => apiClient.put(`/tienda/update/${id}`, data),
      "Tienda actualizada"
    );
  };

  const deleteTienda = async (id) => {
    await handleRequest(async () => {
      await apiClient.put(`/tienda/desactivar/${id}`);
    }, "Tienda eliminada");
  };

  return { tienda, loading, error, updateTienda, deleteTienda, addTienda, getTienda };
};

export default useTienda;
