import { useEffect, useState } from "react"
import { ApiClient } from "../../../services/ApiClient";

const useAlmacenes = () => {
  const [almacenes, setAlmacenes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAlmacenes = async () => {
    setLoading(true);
    try {
      const response = await ApiClient.get(`almacen_producto`);
      setAlmacenes(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchAlmacenes = async () => {
      await getAlmacenes();
    };
    fetchAlmacenes();
  }, []);
  
  return { almacenes, loading, error, getAlmacenes };
}

export default useAlmacenes;