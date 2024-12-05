import moment from "moment";
import apiClient from '../ApiClient';

const dTipos = { ventas: 1, talleres: 2, miscelaneos: 3, costureros: 4 };

// Añadir un nuevo usuario http://localhost:3000/usuario/create
export const addUsuario = async (tipoTrabajador, values) => {
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
    await apiClient.post(`/usuario/create`, Trabajador);
  } catch (error) {
    console.log("Error al añadir el usuario");
  }
};

// Obtener usuario por ID http://localhost:3000/usuario/1
export const getUsuarioById = async (id, setUsuario) => {
  try {
    const response = await apiClient.get(`/usuario/${id}`);
    setUsuario(response.data);
  } catch (error) {
    console.log("Error al obtener el usuario", error);
  }
};

// Actualizar un usuario http://localhost:3000/usuario/update/1
export const updateUsuario = async (id, values, originales) => {
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
    await apiClient.put(`/usuario/update/${id}`, valoresnuevos);
  } catch (error) {
    console.error("Error al actualizar el usuario", error);
  }
};

// Eliminar usuario por ID http://localhost:3000/usuario/delete/1
export const deleteUsuarioById = async (id) => {
  try {
    await apiClient.delete(`/usuario/delete/${id}`);
  } catch (error) {
    console.log("Error al eliminar el usuario", error);
  }
};

// Obtener usuarios por rol http://localhost:3000/usuario?rol=ventas
export const getUsuarios = async (tipo, setData) => {
  try {
    const response = await apiClient.get(`/usuario?rol=${dTipos[tipo]}`);
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
    console.log("Error al obtener los usuarios", error);
  }
};

// Obtener trabajadores diferentes a los asignados a una tienda http://localhost:3000/usuario?rol=1&antiTienda_id=1
export const getTrabajadoresDiferentes = async (id, Seteador) => {
  try {
    const response = await apiClient.get(`/usuario?rol=1&antiTienda_id=${id}`);
    Seteador(response.data);
  } catch (error) {
    console.log("Error al obtener los trabajadores", error);
  }
};

// Actualizar usuario asignado a una tienda
export const updateUsuarioTienda = async (idTienda, values) => {
  try {
    await apiClient.put(`/usuario/update/${values.personal}`, {
      tienda_id: idTienda,
    });
    console.log("Usuario actualizado exitosamente");
  } catch (error) {
    console.log("Error al actualizar usuario", error);
  }
};

// Obtener usuarios por tienda
export const getUsuariosTienda = async (id, setTabla) => {
  try {
    const response = await apiClient.get(`/usuario?tienda_id=${id}`);
    setTabla(response.data);
  } catch (error) {
    console.log("Error al obtener los usuarios por tienda", error);
  }
};

// Completar formulario de actualización de usuario
export const setUpdateUsuario = async (id, form, seteadorO) => {
  try {
    const response = await apiClient.get(`/usuario/${id}`);
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
    console.log("Error al obtener los detalles del usuario", error);
  }
};
