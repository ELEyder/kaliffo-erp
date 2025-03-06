import { useEffect, useState } from "react";
import { ApiClient } from "../../../services/ApiClient";
import useApiRequest from "../../../hooks/useApiRequest";

const useTrabajador = (id, onChange) => {
  const { handleRequest, loading, error } = useApiRequest(onChange);
  const [trabajador, setTrabajador] = useState({});

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
      tienda_id : values.tienda_id ?? 1
    };
    console.log("DATA:", data)
    await handleRequest(() => ApiClient.post(`/trabajador/create`, data), "Trabajador agregado");
  };

  const getTrabajador = async () => {
    if (!id) return;
    await handleRequest(async () => {
      const response = await ApiClient.get(`/trabajador/${id}`);
      setTrabajador(response.data);
    });
  };

  const updateTrabajador = async (id, data) => {
    data.tienda_id = data.rol != 1 ? 1 : data.rol
    console.log( data)
    await handleRequest(() => ApiClient.put(`/trabajador/update/${id}`, data), "Trabajador actualizado");
  };

  const deleteTrabajador = async (id) => {
    await handleRequest(async () => {
      await ApiClient.delete(`/trabajador/delete/${id}`);
      setTrabajador({});
    }, "Trabajador eliminado");
  };

  useEffect(() => {
    getTrabajador();
  }, [id]);

  return { trabajador, loading, error, addTrabajador, updateTrabajador, deleteTrabajador };
};

export default useTrabajador;
