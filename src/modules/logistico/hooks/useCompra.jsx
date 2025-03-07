import { useState } from "react";
import { ApiClient } from "../../../services/ApiClient";
import useApiRequest from "../../../hooks/useApiRequest";

const useCompra = (onChange) => {
  const { handleRequest, loading, error } = useApiRequest(onChange);
  const [compra, setCompra] = useState({});

  const addCompra = async (values) => {
    const data = {
      nombre: values.nombre,
      ap_paterno: values.ap_paterno,
      ap_materno: values.ap_materno,
      fecha_nacimiento: values.fecha_nacimiento.format("YYYY-MM-DD"),
      dni: values.dni,
      telefono: values.telefono,
      sueldo: values.sueldo,
      rol: values.rol,
      tienda_id: values.tienda_id ?? 1,
    };
    await handleRequest(
      () => ApiClient.post(`/compra/create`, data),
      "Compra agregado"
    );
  };

  const getCompra = async (id) => {
    if (!id) return;
    await handleRequest(async () => {
      const response = await ApiClient.get(`/compra/${id}`);
      setCompra(response.data);
    });
  };

  const updateCompra = async (id, data) => {
    data.tienda_id = data.rol != 1 ? 1 : data.rol;
    console.log(data);
    await handleRequest(
      () => ApiClient.put(`/compra/update/${id}`, data),
      "Compra actualizado"
    );
  };

  const deleteCompra = async (id) => {
    await handleRequest(async () => {
      await ApiClient.delete(`/compra/delete/${id}`);
      setCompra({});
    }, "Compra eliminado");
  };

  return {
    compra,
    loading,
    error,
    getCompra,
    addCompra,
    updateCompra,
    deleteCompra,
  };
};

export default useCompra;
