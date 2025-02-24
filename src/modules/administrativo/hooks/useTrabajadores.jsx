import { useEffect, useState } from "react"
import { apiClient } from "../../../API/apiClient";

const useTrabajadores = ( tipo ) => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const tiposTrabajador = { ventas: 1, talleres: 2, miscelaneos: 3, costureros: 4 };

  const getTrabajadores = async () => {
    if (!tipo) return;
    setLoading(true);
    try {
      const response = await apiClient.get(`/trabajador/?rol=${tiposTrabajador[tipo]}`);
      setTrabajadores(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchTrabajadores = async () => {
      await getTrabajadores();
    };
  
    fetchTrabajadores();
  }, [tipo]);
  
  return { trabajadores, loading, error };
}

export default useTrabajadores;