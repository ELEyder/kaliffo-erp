import moment from "moment";
import { ApiClient } from '../../services/ApiClient';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';


dayjs.extend(customParseFormat);
const dTipos = { ventas: 1, talleres: 2, miscelaneos: 3, costureros: 4 };

// Añadir un nuevo Trabajador http://localhost:3000/Trabajador/create
export const addTrabajador = async (tipoTrabajador, values) => {
  const rol = dTipos[tipoTrabajador];
  let Trabajador = {
    nombre: values.nombre,
    ap_paterno: values.ap_paterno,
    ap_materno: values.ap_materno,
    fecha_nacimiento: values.fecha_nacimiento.format("YYYY-MM-DD"),
    dni: values.dni,
    telefono: values.telefono,
    sueldo: values.sueldo,
    rol: rol,
    ...(rol === 1 && { tienda_id: values.tienda_id }),
  };

  try {
    await ApiClient.post(`/Trabajador/create`, Trabajador);
  } catch (error) {
    console.log("Error al añadir el Trabajador");
  }
};

// Obtener Trabajador por ID http://localhost:3000/Trabajador/1
export const getTrabajadorById = async (id, setTrabajador) => {
  try {
    const response = await ApiClient.get(`/trabajador/${id}`);
    setTrabajador(response.data);
  } catch (error) {
    console.log("Error al obtener el Trabajador", error);
  }
};

// Actualizar un Trabajador http://localhost:3000/Trabajador/update/1
export const updateTrabajador = async (id, values, originales) => {
  try {
    await ApiClient.put(`/Trabajador/update/${id}`, values);
  } catch (error) {
    console.error("Error al actualizar el Trabajador", error);
  }
};

// Eliminar Trabajador por ID http://localhost:3000/Trabajador/delete/1
export const deleteTrabajadorById = async (id) => {
  try {
    await ApiClient.delete(`/Trabajador/delete/${id}`);
  } catch (error) {
    console.log("Error al eliminar el Trabajador", error);
  }
};

// Obtener Trabajadors por rol http://localhost:3000/Trabajador?rol=1
export const getTrabajadores = async (tipo, setData) => {
  try {
    const response = await ApiClient.get(`/trabajador?rol=${dTipos[tipo]}`);
    const Trabajadores = response.data;

    Trabajadores.forEach(Trabajador => {
      if (typeof Trabajador === 'object' && Trabajador !== null) {
        if (Trabajador.tienda_id === null) {
          Trabajador.tienda_id = 0;
          Trabajador.tienda = "Sin asignar";
        }
      } else {
        console.warn('Elemento no es un objeto:', Trabajador);
      }
    });
    setData(Trabajadores);
  } catch (error) {
    console.log("Error al obtener los Trabajadors", error);
  }
};

// Obtener Trabajadores diferentes a los asignados a una tienda http://localhost:3000/Trabajador?rol=1&antiTienda_id=1
export const getTrabajadoresDiferentes = async (id, Seteador) => {
  try {
    const response = await ApiClient.get(`/Trabajador?rol=1&antiTienda_id=${id}`);
    Seteador(response.data);
  } catch (error) {
    console.log("Error al obtener los Trabajadores", error);
  }
};

// Actualizar Trabajador asignado a una tienda
export const updateTrabajadorTienda = async (idTienda, values) => {
  try {
    await ApiClient.put(`/Trabajador/update/${values.personal}`, {
      tienda_id: idTienda,
    });
    console.log("Trabajador actualizado exitosamente");
  } catch (error) {
    console.log("Error al actualizar Trabajador", error);
  }
};

// Obtener Trabajadors por tienda
export const getTrabajadoresTienda = async (id, setTabla) => {
  try {
    const response = await ApiClient.get(`/Trabajador?tienda_id=${id}`);
    setTabla(response.data);
  } catch (error) {
    console.log("Error al obtener los Trabajadors por tienda", error);
  }
};

// Completar formulario de actualización de Trabajador
export const setUpdateTrabajador = async (id, form, seteadorO) => {
  try {
    const response = await ApiClient.get(`/trabajador/${id}`);
    const data = response.data;
    seteadorO(data);
    form.setFieldsValue({
      ["nombre"]: data.nombre,
      ["ap_paterno"]: data.ap_paterno,
      ["ap_materno"]: data.ap_materno,
      ["telefono"]: data.telefono,
      ["dni"]: data.dni,
      ["fecha_nacimiento"]: dayjs(data.fecha_nacimiento, "DD-MM-YYYY"),
      ["tienda_id"]: data.tienda_id,
    });
  } catch (error) {
    console.log("Error al obtener los detalles del Trabajador", error);
  }
};
