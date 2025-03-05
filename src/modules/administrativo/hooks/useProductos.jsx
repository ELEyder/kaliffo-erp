import { useEffect, useState } from "react"
import { ApiClient } from "../../../API/ApiClient";

const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProductos = async () => {
    setLoading(true);
    try {
      const response = await ApiClient.get(`/producto`);
      setProductos(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchProductos = async () => {
      await getProductos();
    };
    fetchProductos();
  }, []);
  
  return { productos, loading, error, getProductos };
}

export default useProductos;