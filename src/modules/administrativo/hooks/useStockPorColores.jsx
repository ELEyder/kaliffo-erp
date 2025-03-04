import { useEffect, useState } from "react"
import { apiClient } from "../../../API/apiClient";

const useStockPorColor = (id) => {
  const [colores, setColores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getColores = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`producto/detalle/${id}?tipo=colores`);
      setColores(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchColores = async () => {
      await getColores();
    };
    fetchColores();
  }, []);
  
  return { colores, loading, error, getColores };
}

export default useStockPorColor;