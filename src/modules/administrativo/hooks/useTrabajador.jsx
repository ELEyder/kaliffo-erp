import { useEffect, useState } from "react";
import { apiClient } from "../../../API/apiClient";
import { useNotification } from "../../../provider/NotificationProvider";

const useTrabajador = (id, onChange) => {
  const open = useNotification();
  const [trabajador, setTrabajador] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const tiposTrabajador = { ventas: 1, talleres: 2, miscelaneos: 3, costureros: 4 };

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

  const addTrabajador = async (values) => {
    const data = {
      nombre: values.nombre,
      ap_paterno: values.ap_paterno,
      ap_materno: values.ap_materno,
      fecha_nacimiento: values.fecha_nacimiento.format("YYYY-MM-DD"),
      dni: values.dni,
      telefono: values.telefono,
      sueldo: values.sueldo,
      rol: values.rol,
      ...(values.rol === 1 && { tienda_id: 1 }),
    };
    await handleRequest(() => apiClient.post(`/trabajador/create`, data), "Trabajador agregado");
  };

  const getTrabajador = async () => {
    if (!id) return;
    await handleRequest(async () => {
      const response = await apiClient.get(`/trabajador/${id}`);
      setTrabajador(response.data);
    });
  };

  const updateTrabajador = async (id, data) => {
    await handleRequest(() => apiClient.put(`/trabajador/update/${id}`, data), "Trabajador actualizado");
  };

  const deleteTrabajador = async (id) => {
    await handleRequest(async () => {
      await apiClient.delete(`/trabajador/delete/${id}`);
      setTrabajador({});
    }, "Trabajador eliminado");
  };

  useEffect(() => {
    getTrabajador();
  }, [id]);

  return { trabajador, loading, error, addTrabajador, updateTrabajador, deleteTrabajador };
};

export default useTrabajador;
