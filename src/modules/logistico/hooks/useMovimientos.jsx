import { useState } from "react";
import { ApiClient } from "../../../services/ApiClient";
import { useApiRequest } from "../../../hooks";

const useMovimientos = (onChange) => {
  const { handleRequest, loading, error } = useApiRequest(onChange);
  const [movimientos, setMovimientos] = useState([]);

  const addMovimientos = async (values) => {
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
      () => ApiClient.post(`/movimiento/create`, data),
      "Movimiento agregado"
    );
  };

  const getMovimientos = async (id) => {
    if (!id) return;
    await handleRequest(async () => {
      const response = await ApiClient.get(`/movimiento/${id}`);
      setMovimientos(response.data);
    });
  };

  const updateMovimientos = async (id, data) => {
    data.tienda_id = data.rol != 1 ? 1 : data.rol;
    console.log(data);
    await handleRequest(
      () => ApiClient.put(`/movimiento/update/${id}`, data),
      "Movimiento actualizado"
    );
  };

  const deleteMovimientos = async (id) => {
    await handleRequest(async () => {
      await ApiClient.delete(`/movimiento/delete/${id}`);
    }, "Movimiento eliminado");
  };

  return {
    movimientos,
    loading,
    error,
    getMovimientos,
    addMovimientos,
    updateMovimientos,
    deleteMovimientos,
  };
};

export default useMovimientos;
