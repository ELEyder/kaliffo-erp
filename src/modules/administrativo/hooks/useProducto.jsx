import { useEffect, useState } from "react";
import { ApiClient } from "../../../services/ApiClient";
import useApiRequest from "../../../hooks/useApiRequest";

const useProducto = (id, onChange) => {
  const { handleRequest, loading, error } = useApiRequest(onChange);
  const [producto, setProducto] = useState({});

  const addProducto = async (values) => {
    console.log("DATA:", values)
    await handleRequest(() => ApiClient.post(`/producto/create`, values), "Producto agregado");
  };

  const getProducto = async () => {
    if (!id) return;
    await handleRequest(async () => {
      const response = await ApiClient.get(`/producto/${id}`);
      setProducto(response.data);
    });
  };

  const updateProducto = async (id, data) => {
    data.tienda_id = data.rol != 1 ? 0 : data.rol
    console.log( data)
    await handleRequest(() => ApiClient.put(`/producto/update/${id}`, data), "Producto actualizado");
  };

  const deleteProducto = async (id) => {
    await handleRequest(async () => {
      await ApiClient.delete(`/producto/delete/${id}`);
      setProducto({});
    }, "Producto eliminado");
  };

  useEffect(() => {
    getProducto();
  }, [id]);

  return { producto, loading, error, addProducto, updateProducto, deleteProducto };
};

export default useProducto;
