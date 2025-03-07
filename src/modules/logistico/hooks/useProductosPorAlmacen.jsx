import { useState } from "react"
import { ApiClient } from "../../../services/ApiClient";

const useProductosPorAlmacen = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProductos = async (id) => {
    setLoading(true);
    try {
      const response = await ApiClient.get(`producto?almacen_id=${id}`);
      setProductos(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { productos, loading, error, getProductos };
}

export default useProductosPorAlmacen;