import { ApiClient } from "../../../services/ApiClient";
import { useApiRequest } from "../../../hooks";

const useHorario = (onChange) => {
  const { handleRequest, loading, error } = useApiRequest(onChange);

  const deleteHorario = async (id) => {
    await handleRequest(async () => {
      await ApiClient.delete(`/asistencia/delete/${id}`);
    }, "Horario eliminado");
  };

  return { loading, error, deleteHorario };
};

export default useHorario;
