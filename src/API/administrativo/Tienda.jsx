import { ApiClient } from '../../services/ApiClient';

// Añadir una tienda http://localhost:3000/tienda/create
export const addTienda = async (values) => {
  let Tienda = {
    tienda: values.tienda,
    direccion: values.direccion,
    telefono: values.telefono
  };

  try {
    await ApiClient.post(`/tienda/create`, Tienda);
  } catch (error) {
    console.log("Error al añadir la tienda", error);
  }
};

// Obtener tienda por ID http://localhost:3000/tienda/1
export const getTiendaById = async (id, setTienda) => {
  try {
    const response = await ApiClient.get(`/tienda/${id}`);
    setTienda(response.data);
  } catch (error) {
    console.log("Error al obtener la tienda", error);
  }
};

// Actualizar una tienda http://localhost:3000/tienda/update/1
export const updateTienda = async (id, values) => {
  const Tienda = {
    nombre: values.nombre,
    direccion: values.direccion,
    telefono: values.telefono,
  };

  try {
    await ApiClient.put(`/tienda/update/${id}`, Tienda);
  } catch (error) {
    console.log(`Error al actualizar la tienda ID ${id}`, error);
  }
};

// Eliminar una tienda por ID http://localhost:3000/tienda/desactivar/1
export const deleteTiendaById = async (id) => {
  try {
    await ApiClient.put(`/tienda/desactivar/${id}`);
  } catch (error) {
    console.log("Error al eliminar la tienda", error);
  }
};

// Obtener todas las tiendas http://localhost:3000/tienda
export const getTiendas = async (setTiendas) => {
  try {
    const response = await ApiClient.get(`/tienda`);
    setTiendas(response.data);
  } catch (error) {
    console.log("Error al obtener las tiendas", error);
  }
};

// Obtener las tiendas asociadas a un producto http://localhost:3000/producto/detalle/1?tipo=tiendas
export const getTiendasByProducto = async (id, setTiendas) => {
  try {
    const response = await ApiClient.get(`/producto/detalle/${id}?tipo=tiendas`);
    setTiendas(response.data);
  } catch (error) {
    console.log(`Error al obtener las tiendas asociadas al producto ID ${id}`, error);
  }
};

// Establecer los valores para actualizar la tienda http://localhost:3000/tienda/1
export const setUpdateTienda = async (id, form) => {
  try {
    const response = await ApiClient.get(`/tienda/${id}`);
    form.setFieldsValue({
      ["nombre"]: response.data.tienda,
      ["direccion"]: response.data.direccion,
      ["telefono"]: response.data.telefono,
    });
  } catch (error) {
    console.log("Error al obtener los detalles de la tienda", error);
  }
};
