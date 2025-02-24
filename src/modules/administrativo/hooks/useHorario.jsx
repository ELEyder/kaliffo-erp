import { useState } from "react"
import { apiClient } from "../../../API/apiClient";
import { useNotification } from "../../../provider/NotificationProvider";

const useHorario = ( onChange ) => {
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

  const deleteHorario = async (id) => {
    await handleRequest(async () => {
      await apiClient.delete(`/asistencia/delete/${id}`);
    }, "Horario eliminado");
  };
  
  return { loading, error, deleteHorario };
}

export default useHorario;