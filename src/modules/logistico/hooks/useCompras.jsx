import { useEffect, useState } from "react"
import { ApiClient } from "../../../services/ApiClient";

const useCompras = () => {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCompras = async () => {
    setLoading(true);
    try {
      const response = await ApiClient.get(`compra`);
      setCompras(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchCompras = async () => {
      await getCompras();
    };
    fetchCompras();
  }, []);
  
  return { compras, loading, error, getCompras };
}

export default useCompras;