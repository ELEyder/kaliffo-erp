import { useEffect, useState } from "react"
import { apiClient } from "../../../API/apiClient";

const useIncidencias = ( id ) => {
  const [incidencias, setIncidencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getIncidencias = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await apiClient.get(`/incidencia?usuario_id=${id}`);
      setIncidencias(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchIncidencias = async () => {
      await getIncidencias();
    };
  
    fetchIncidencias();
  }, [id]);
  
  return { incidencias, loading, error, getIncidencias };
}

export default useIncidencias;