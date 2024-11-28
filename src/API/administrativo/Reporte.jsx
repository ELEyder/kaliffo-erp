import { showNotification } from "../../Shared/Notifications";

export const getReporteUsuario = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/usuario/reporte/${id}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      showNotification("error", "Error al obtener el PDF");
    }

    const pdf = await response.blob();

    const url = window.URL.createObjectURL(pdf);
    window.open(url);
  } catch (error) {
    showNotification("error", "Error al obtener el PDF", error);
  }
};

export const getReporteTienda = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/tienda/reporte/${id}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      showNotification("error", "Error al obtener el PDF");
    }

    const pdf = await response.blob();

    const url = window.URL.createObjectURL(pdf);
    window.open(url);
  } catch (error) {
    showNotification("error", "Error al obtener el PDF", error);
  }
};
