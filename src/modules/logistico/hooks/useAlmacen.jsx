import { useState } from "react";
import { ApiClient } from "../../../API/ApiClient";
import { useNotification } from "../../../provider/NotificationProvider";

const useAlmacen = (onChange) => {
  const open = useNotification();
  const [almacen, setAlmacen] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleRequest = async (callback, successMessage) => {
    setLoading(true);
    setError(null);
    try {
      await callback();
      onChange && onChange();
      successMessage && open("Éxito", successMessage);
    } catch (error) {
      open(`Error ${error.status || ""}`, error.response?.data?.error || "Error desconocido");
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getAlmacen = async (id) => {
    if (!id) return;
    await handleRequest(async () => {
      const response = await ApiClient.get(`/almacen_producto/${id}`);
      setAlmacen(response.data);
    });
  };

  return { almacen, loading, error, getAlmacen };
};

export default useAlmacen;
