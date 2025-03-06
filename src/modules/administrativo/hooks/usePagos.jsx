import { useEffect, useState } from "react"
import { ApiClient } from "../../../services/ApiClient";

const usePagos = ( id ) => {
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const estados = ["Pagado", "En Proceso"]

  const getPagos = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await ApiClient.get(`/pago/${id}`);
      setPagos(response.data.map(detalle => ({
        ...detalle,
        estado: estados[detalle.estado],
      })));
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchPagos = async () => {
      await getPagos();
    };
  
    fetchPagos();
  }, [tipo]);
  
  return { pagos, loading, error, getPagos };
}

export default usePagos;