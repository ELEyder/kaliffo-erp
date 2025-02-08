import { apiClient } from "../apiClient";
import { apiClientFiles } from "../apiClient";

// Obtener todas las telas
export const getTelas = async (setData) => {
  try {
    const response = await apiClient.get(`/tela/`);
    setData(response.data);
  } catch (error) {
    console.error("Error al obtener las telas:", error);
    return("error", "Error al obtener las telas");
  }
};

// Obtener telas activas por tipo
export const getTelasActivas = async (tipo, setData) => {
  try {
    const response = await apiClient.get(`/tela/${tipo}`, {
      params: { estado: 1 },
    });

    let count = 0;
    const data = response.data.map((tela) => {
      const fecha_compra = new Date(tela.fecha_compra);
      count += 1;
      return {
        ...tela,
        fecha_compra: fecha_compra.toLocaleDateString("es-ES"),
        n: count,
      };
    });

    setData(data);
  } catch (error) {
    console.error("Error al obtener telas activas:", error);
    return("error", "Error al obtener telas activas");
  }
};

// Obtener telas inactivas por tipo
export const getTelasInactivas = async (tipo, setData) => {
  try {
    const response = await apiClient.get(`/tela/${tipo}`, {
      params: { estado: 0 },
    });

    let count = 0;
    const data = response.data.map((tela) => {
      const fecha_compra = new Date(tela.fecha_compra);
      count += 1;
      return {
        ...tela,
        fecha_compra: fecha_compra.toLocaleDateString("es-ES"),
        n: count,
      };
    });

    setData(data);
  } catch (error) {
    console.error("Error al obtener telas inactivas:", error);
    return("error", "Error al obtener telas inactivas");
  }
};


// Obtener tipos de tela
export const getTelaID = async (id) => {
  try {
    const response = await apiClient.get(`/tela/codigos/${id}`);
    return response.data
  } catch (error) {
    console.error("Error al obtener tipos de tela:", error);
    return("error", "Error al obtener tipos de tela");
  }
};

// Obtener tipos de tela
export const getTiposTela = async (setTelas) => {
  try {
    const response = await apiClient.get(`/tela/tipo`);
    setTelas(response.data);
  } catch (error) {
    console.error("Error al obtener tipos de tela:", error);
    return("error", "Error al obtener tipos de tela");
  }
};

// Agregar una nueva tela
export const addTelas = async (Archivos) => {
  const formdata = new FormData();
  formdata.append("file",Archivos[0])
  try {
    const response = await apiClientFiles.post(`/tela/create`, formdata);
    return response;
  } catch (error) {
    console.error("Error al agregar la tela:", error);
  }
};

// Desactivar (eliminar lógicamente) tela por ID
export const deleteTelaById = async (id) => {
  try {
    await apiClient.put(`/tela/desactivar/${id}`);
    return("delete", "Tela desactivada correctamente");
  } catch (error) {
    console.error("Error al desactivar la tela:", error);
    return("error", "Error al desactivar la tela");
  }
};

//obtener pdf con los codigos de barras
export const getCodigosBarras = async(id_lote)=>{
  try {
    const response = await apiClient.get(`/tela/imprimir/${id_lote}`, { responseType: 'blob' });

    const pdf = response.data;
    const url = window.URL.createObjectURL(pdf);
    window.open(url);
    return response.status;
  } catch (error) {
    console.log(error)
  }
}

