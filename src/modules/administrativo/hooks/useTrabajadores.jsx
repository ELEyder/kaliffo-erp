import { useEffect, useState } from "react"
import { apiClient } from "../../../API/apiClient";

const useTrabajadores = ( params ) => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tiposTrabajador = { 1: "Ventas", 2 : "Talleres", 3: "Miscelaneos", 4: "Costureros" };

  const getTrabajadores = async () => {
    setLoading(true);
    try {
      let url = `/trabajador${params}`;
      
      const response = await apiClient.get(url);
      const data = response.data.map((trabajador) =>{
        return {
          ...trabajador,
          rol : tiposTrabajador[trabajador.rol],
          tienda : trabajador.tienda ?? "Sin tienda"
        }
      })
      setTrabajadores(data);
    
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

  }, [params]);
  
  return { trabajadores, loading, error, getTrabajadores };
}

export default useTrabajadores;