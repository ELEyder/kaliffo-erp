import { useEffect, useState } from "react"
import { ApiClient } from "../../../services/ApiClient";

const useTrabajadores = ( filtros = {} ) => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tiposTrabajador = { 1: "Ventas", 2 : "Talleres", 3: "Miscelaneos", 4: "Costureros" };

  const getTrabajadores = async () => {
    setLoading(true);
    try {
      let url = `/trabajador`;
      const queryParams = new URLSearchParams(filtros).toString();
      if (queryParams) url += `?${queryParams}`;
      
      const response = await ApiClient.get(url);
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

  }, [JSON.stringify(filtros)]);
  
  return { trabajadores, loading, error, getTrabajadores };
}

export default useTrabajadores;