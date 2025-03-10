import { useState } from "react";
import { ApiClient } from "../../../services/ApiClient";
import { useApiRequest } from "../../../hooks";

const useTienda = (onChange) => {
  const { handleRequest, loading, error } = useApiRequest(onChange);
  const [tienda, setTienda] = useState({});

  const addTienda = async (values) => {
    const data = {
      tienda: values.tienda,
      direccion: values.direccion,
      telefono: values.telefono,
    };
    return handleRequest(
      () => ApiClient.post(`/tienda/create`, data),
      "Tienda agregada"
    );
  };

  const getTienda = async (id) => {
    if (!id) return;
    console.log("ID:", id, "ONCHANGE:", onChange);
    await handleRequest(async () => {
      const response = await ApiClient.get(`/tienda/${id}`);
      setTienda(response.data);
    });
  };

  const updateTienda = async (id, data) => {
    await handleRequest(
      () => ApiClient.put(`/tienda/update/${id}`, data),
      "Tienda actualizada"
    );
  };

  const deleteTienda = async (id) => {
    await handleRequest(
      () => ApiClient.put(`/tienda/desactivar/${id}`),
      "Tienda eliminada"
    );
  };

  return {
    tienda,
    loading,
    error,
    getTienda,
    addTienda,
    updateTienda,
    deleteTienda,
  };
};

export default useTienda;
