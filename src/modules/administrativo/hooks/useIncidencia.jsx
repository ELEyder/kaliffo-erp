import { useEffect, useState } from "react";
import { ApiClient } from "../../../API/ApiClient";
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
      open(`Error ${error.status || ""}`, error.response?.data?.errors[0]?.msg || error.response?.data?.error || "Error desconocido");
      console.log(error.response?.data || "Error desconocido")
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
    console.log("Values", values)
    await handleRequest(() => ApiClient.post(`/incidencia/create`, values), "Incidencia agregada");
  };

  const updateIncidencia = async (id, data) => {
    await handleRequest(() => ApiClient.put(`/incidencia/update/${id}`, data), "Trabajador actualizado");
  };

  const deleteIncidencia = async (id) => {
    await handleRequest(async () => {
      await ApiClient.delete(`/incidencia/delete/${id}`);
      setIncidencia({});
    }, "Incidencia eliminada");
  };

  return { loading, error, addIncidencia, updateIncidencia, deleteIncidencia };
};

export default useIncidencia;
