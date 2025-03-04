import { useEffect, useState } from "react";
import { apiClient } from "../../../API/apiClient";
import { useNotification } from "../../../provider/NotificationProvider";

const useProducto = (id, onChange) => {
  const open = useNotification();
  const [producto, setProducto] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleRequest = async (callback, successMessage) => {
    setLoading(true);
    setError(null);
    try {
      await callback();
      onChange && onChange();
      successMessage && open("Éxito", successMessage);
    } catch (error) {
      open(`Error ${error.status || ""}`, error.response?.data?.error || "Error desconocido");
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const addProducto = async (values) => {
    console.log("DATA:", data)
    await handleRequest(() => apiClient.post(`/producto/create`, values), "Producto agregado");
  };

  const getProducto = async () => {
    if (!id) return;
    await handleRequest(async () => {
      const response = await apiClient.get(`/producto/${id}`);
      setProducto(response.data);
    });
  };

  const updateProducto = async (id, data) => {
    data.tienda_id = data.rol != 1 ? 0 : data.rol
    console.log( data)
    await handleRequest(() => apiClient.put(`/producto/update/${id}`, data), "Producto actualizado");
  };

  const deleteProducto = async (id) => {
    await handleRequest(async () => {
      await apiClient.delete(`/producto/delete/${id}`);
      setProducto({});
    }, "Producto eliminado");
  };

  useEffect(() => {
    getProducto();
  }, [id]);

  return { producto, loading, error, addProducto, updateProducto, deleteProducto };
};

export default useProducto;
