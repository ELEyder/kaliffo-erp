import { useEffect, useState } from "react"
import { ApiClient } from "../../../services/ApiClient";

const useEmpresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getEmpresas = async () => {
    setLoading(true);
    try {
      const response = await ApiClient.get(`/compra/empresas`);
      setEmpresas(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchEmpresas = async () => {
      await getEmpresas();
    };
    fetchEmpresas();
  }, []);
  
  return { empresas, loading, error, getEmpresas };
}

export default useEmpresas;