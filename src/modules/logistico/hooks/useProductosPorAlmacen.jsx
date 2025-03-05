import { useEffect, useState } from "react"
import { apiClient } from "../../../API/apiClient";

const useProductosPorAlmacen = ({ id }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProductos = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`producto?almacen_id=${id}`);
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

export default useProductosPorAlmacen;