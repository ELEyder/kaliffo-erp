import { useState } from "react";
import { ApiClient } from "../../../services/ApiClient";
import useApiRequest from "../../../hooks/useApiRequest";

const useAlmacen = (onChange) => {
  const { handleRequest, loading, error } = useApiRequest(onChange);
  const [almacen, setAlmacen] = useState({});

  const getAlmacen = async (id) => {
    if (!id) return;
    await handleRequest(async () => {
      const response = await ApiClient.get(`/almacen_producto/${id}`);
      setAlmacen(response.data);
    });
  };

  return { almacen, loading, error, getAlmacen };
};

export default useAlmacen;
