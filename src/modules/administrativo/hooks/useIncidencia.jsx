import useApiRequest from "../../../hooks/useApiRequest";
import { ApiClient } from "../../../services/ApiClient";

const useIncidencia = (onChange) => {
  const { handleRequest, loading, error } = useApiRequest(onChange);

  const addIncidencia = async (id, values) => {
    values = {
      ...values,
      trabajador_id: id,
    }
    console.log("Values", values)
    await handleRequest(() => ApiClient.post(`/incidencia/create`, values), "Incidencia agregada");
  };

  const updateIncidencia = async (id, data) => {
    await handleRequest(() => ApiClient.put(`/incidencia/update/${id}`, data), "Trabajador actualizado");
  };

  const deleteIncidencia = async (id) => {
    await handleRequest(async () => {
      await ApiClient.delete(`/incidencia/delete/${id}`);
    }, "Incidencia eliminada");
  };

  return { loading, error, addIncidencia, updateIncidencia, deleteIncidencia };
};

export default useIncidencia;
