import { useEffect, useState } from "react"
import { ApiClient } from "../../../API/ApiClient";

const useVentas = ( tipo = '' ) => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getVentas = async () => {
    setLoading(true);
    try {
      let url = `/venta?tipoComprobante=${tipo==="boleta"?1:2}`;
      const response = await ApiClient.get(url);
      setVentas(data);
    
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchVentas = async () => {
      await getVentas();
    };
    fetchVentas();

  }, [tipo]);
  
  return { ventas, loading, error, getVentas };
}

export default useVentas;