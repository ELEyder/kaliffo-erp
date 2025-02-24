import { useEffect, useState } from "react";
import { apiClient } from "../../../API/apiClient";
import { useNotification } from "../../../provider/NotificationProvider";

const useIncidencia = (onChange) => {
  const open = useNotification();
  const [ incidencia, setIncidencia ]= useState({});
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

  const updateIncidencia = async (id, data) => {
    await handleRequest(() => apiClient.put(`/incidencia/update/${id}`, data), "Trabajador actualizado");
  };

  const deleteIncidencia = async (id) => {
    await handleRequest(async () => {
      await apiClient.delete(`/incidencia/delete/${id}`);
      setIncidencia({});
    }, "Incidencia eliminada");
  };

  return { loading, error, addIncidencia, updateIncidencia, deleteIncidencia };
};

export default useIncidencia;
