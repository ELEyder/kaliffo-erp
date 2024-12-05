import moment from "moment";
import apiClient from '../ApiClient';

const dTipos = { ventas: 1, talleres: 2, miscelaneos: 3, costureros: 4 };

// Añadir un nuevo trabajador http://localhost:3000/trabajador/create
export const addtrabajador = async (tipoTrabajador, values) => {
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
  };
  
  if (rol === 1) {
    Trabajador = {
      ...Trabajador,
      tienda_id: values.tienda_id,
    };
  }

  try {
    await apiClient.post(`/trabajador/create`, Trabajador);
  } catch (error) {
    console.log("Error al añadir el trabajador");
  }
};

// Obtener trabajador por ID http://localhost:3000/trabajador/1
export const gettrabajadorById = async (id, settrabajador) => {
  try {
    const response = await apiClient.get(`/trabajador/${id}`);
    settrabajador(response.data);
  } catch (error) {
    console.log("Error al obtener el trabajador", error);
  }
};

// Actualizar un trabajador http://localhost:3000/trabajador/update/1
export const updatetrabajador = async (id, values, originales) => {
  // Convertir fecha si existe y es diferente
  if (values.fecha_nacimientoE) {
    values.fecha_nacimientoE = moment(values.fecha_nacimientoE).format("YYYY-MM-DD");
  }

  // Filtrar valores que han cambiado y no son undefined
  const valoresnuevos = Object.keys(values).reduce((nuevos, key) => {
    if (values[key] !== originales[key] && values[key] !== undefined) {
      nuevos[key] = values[key];
    }
    return nuevos;
  }, {});

  try {
    await apiClient.put(`/trabajador/update/${id}`, valoresnuevos);
  } catch (error) {
    console.error("Error al actualizar el trabajador", error);
  }
};

// Eliminar trabajador por ID http://localhost:3000/trabajador/delete/1
export const deletetrabajadorById = async (id) => {
  try {
    await apiClient.delete(`/trabajador/delete/${id}`);
  } catch (error) {
    console.log("Error al eliminar el trabajador", error);
  }
};

// Obtener trabajadors por rol http://localhost:3000/trabajador?rol=ventas
export const gettrabajadors = async (tipo, setData) => {
  try {
    const response = await apiClient.get(`/trabajador?rol=${dTipos[tipo]}`);
    const trabajadores = response.data;

    trabajadores.forEach(trabajador => {
      if (typeof trabajador === 'object' && trabajador !== null) {
        if (trabajador.tienda_id === null) {
          trabajador.tienda_id = 0;
          trabajador.tienda = "Sin asignar";
        }
      } else {
        console.warn('Elemento no es un objeto:', trabajador);
      }
    });
    setData(trabajadores);
  } catch (error) {
    console.log("Error al obtener los trabajadors", error);
  }
};

// Obtener trabajadores diferentes a los asignados a una tienda http://localhost:3000/trabajador?rol=1&antiTienda_id=1
export const getTrabajadoresDiferentes = async (id, Seteador) => {
  try {
    const response = await apiClient.get(`/trabajador?rol=1&antiTienda_id=${id}`);
    Seteador(response.data);
  } catch (error) {
    console.log("Error al obtener los trabajadores", error);
  }
};

// Actualizar trabajador asignado a una tienda
export const updatetrabajadorTienda = async (idTienda, values) => {
  try {
    await apiClient.put(`/trabajador/update/${values.personal}`, {
      tienda_id: idTienda,
    });
    console.log("trabajador actualizado exitosamente");
  } catch (error) {
    console.log("Error al actualizar trabajador", error);
  }
};

// Obtener trabajadors por tienda
export const gettrabajadorsTienda = async (id, setTabla) => {
  try {
    const response = await apiClient.get(`/trabajador?tienda_id=${id}`);
    setTabla(response.data);
  } catch (error) {
    console.log("Error al obtener los trabajadors por tienda", error);
  }
};

// Completar formulario de actualización de trabajador
export const setUpdatetrabajador = async (id, form, seteadorO) => {
  try {
    const response = await apiClient.get(`/trabajador/${id}`);
    const data = response.data;
    seteadorO(data);
    form.setFieldsValue({
      ["nombre"]: data.nombre,
      ["ap_paterno"]: data.ap_paterno,
      ["ap_materno"]: data.ap_materno,
      ["telefono"]: data.telefono,
      ["dni"]: data.dni,
      ["fecha_nacimiento"]: moment(data.fecha_nacimiento),
      ["tienda_id"]: data.tienda_id,
    });
  } catch (error) {
    console.log("Error al obtener los detalles del trabajador", error);
  }
};
