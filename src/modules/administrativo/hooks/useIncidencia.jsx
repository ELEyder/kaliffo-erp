import { useEffect, useState } from "react";
import { apiClient } from "../../../API/apiClient";
import { useNotification } from "../../../provider/NotificationProvider";

const useIncidencia = (onChange) => {
  const open = useNotification();
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
      open(`Error ${error.status || ""}`, error.response?.data?.error || "Error desconocido");
      console.log(error.response?.data?.errors || error.response?.data?.error || "Error desconocido")
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const addIncidencia = async (id, values) => {
    values = {
      ...values,
      trabajador_id: id,
    }
    await handleRequest(() => apiClient.post(`/incidencia/create`, values), "Incidencia agregada");
  };

  return { loading, error, addIncidencia };
};

export default useIncidencia;
