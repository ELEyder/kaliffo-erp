import { useEffect, useState } from "react"
import { apiClient } from "../../../API/apiClient";

const useHorarios = ( id ) => {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getHorarios = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await apiClient.get(`/asistencia?usuario_id=${id}`);
      setHorarios(response.data);
      setError(error);
    } finally {
      setLoading(false);
    }
  }



  useEffect(() => {
    const fetchHorarios = async () => {
      await getHorarios();
    };
  
    fetchHorarios();
  }, [tipo]);
  
  return { horarios, loading, error, getHorarios };
}

export default useHorarios;