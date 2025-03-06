import { useEffect, useState } from "react"
import { ApiClient } from "../../../services/ApiClient";

const useStockPorTienda = (id) => {
  const [tiendas, setTiendas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTiendas = async () => {
    setLoading(true);
    try {
      const response = await ApiClient.get(`producto/detalle/${id}?tipo=tiendas`);
      setTiendas(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchTiendas = async () => {
      await getTiendas();
    };
    fetchTiendas();
  }, []);
  
  return { tiendas, loading, error, getTiendas };
}

export default useStockPorTienda;