import { useEffect, useState } from "react"
import { apiClient } from "../../../API/apiClient";

const useStockPorTalla = (id) => {
  const [tallas, setTallas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTallas = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`producto/detalle/${id}?tipo=tallas`);
      setTallas(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchTallas = async () => {
      await getTallas();
    };
    fetchTallas();
  }, []);
  
  return { tallas, loading, error, getTallas };
}

export default useStockPorTalla;