import { useState } from "react";
import { useNotification } from "../provider/NotificationProvider";

const useApiRequest = (onChange) => {
  const open = useNotification();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRequest = async (callback, successMessage) => {
    setLoading(true);
    setError(null);
    try {
      const response = await callback();
      successMessage && open("Éxito", successMessage);
      onChange && onChange(); // Ejecutar onChange solo en éxito
      return response;
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

  return { handleRequest, loading, error };
};

export default useApiRequest