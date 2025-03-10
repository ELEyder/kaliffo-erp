import { ApiClientFiles } from "../../../services/ApiClient";
import { useApiRequest } from "../../../hooks";

const useReporte = () => {
  const { handleRequest, loading, error } = useApiRequest();

  const getReporteTienda = async (id) => {
    if (!id) return;
    await handleRequest(async () => {
      const response = await ApiClientFiles.get(`/tienda/reporte/${id}`);
      const pdf = response.data;
      console.log("RESPONSE:", response);
      const url = window.URL.createObjectURL(pdf);
      window.open(url);
    });
  };

  const getReporteTrabajador = async (id, tipo) => {
    if (!id) return;
    await handleRequest(async () => {
      const response = await ApiClientFiles.get(
        `/trabajador/reporte/${id}?tipo=${tipo}`
      );
      const pdf = response.data;
      const url = window.URL.createObjectURL(pdf);
      window.open(url);
    });
  };

  return { loading, error, getReporteTienda, getReporteTrabajador };
};

export default useReporte;
