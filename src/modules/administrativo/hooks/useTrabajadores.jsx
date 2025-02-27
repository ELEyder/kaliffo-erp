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
      let url = "";
      if (tiposTrabajador[tipo]) {
        url = `/trabajador?rol=${tiposTrabajador[tipo]}`
      } else {
        url = `/trabajador${tipo}`
      }
      const response = await apiClient.get(url);
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
  
  return { trabajadores, loading, error, getTrabajadores };
}

export default useTrabajadores;