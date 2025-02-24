import { useEffect, useState } from "react"
import { apiClient } from "../../../API/apiClient";

const useTrabajador = ( id ) => {
  const [trabajador, setTrabajador] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const tiposTrabajador = { ventas: 1, talleres: 2, miscelaneos: 3, costureros: 4 };

  const addTrabajador = async (type, values) => {

    setLoading(true);

    const data = {
      nombre: values.nombre,
      ap_paterno: values.ap_paterno,
      ap_materno: values.ap_materno,
      fecha_nacimiento: values.fecha_nacimiento.format("YYYY-MM-DD"),
      dni: values.dni,
      telefono: values.telefono,
      sueldo: values.sueldo,
      rol: tiposTrabajador[type],
      ...(tiposTrabajador[type] === 1 && { tienda_id: values.tienda_id }),
    };

    try {
      await apiClient.post(`/trabajador/create`, data);
      await getTrabajador();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const getTrabajador = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await apiClient.get(`/trabajador/${id}`);
      setTrabajador(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const updateTrabajador = async (id, data) => {
    setLoading(true);
    try {
      await apiClient.put(`/trabajador/${id}`, data);
      await getTrabajador();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  
  const deleteTrabajador = async (id) => {
    setLoading(true);
    try {
      await apiClient.get(`/trabajador/delete/${id}`);
      setTrabajador({});
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchTrabajador = async () => {
      await getTrabajador();
    };
  
    fetchTrabajador();
  }, [id]);

  return { trabajador, loading, error, addTrabajador, updateTrabajador, deleteTrabajador };
}

export default useTrabajador;