import { showNotification } from "../../Shared/Notifications";

/**
 * Obtiene los productos del almacén desde el servidor y actualiza el estado.
 * URL de ejemplo: http://localhost:3000/almacen_productos
 */
export const getAlmacenProductos = async (setAlmacenes) => {
  try {
    const response = await fetch("http://localhost:3000/almacen_productos"); // Realizar petición GET al servidor
    const AlmacenData = await response.json(); // Convertir la respuesta a JSON
    setAlmacenes(AlmacenData); // Actualizar el estado con los datos obtenidos
  } catch (error) {
    console.error('Error al obtener los productos del almacén:', error);
    setAlmacenes([]); // En caso de error, establecer un arreglo vacío
  }
};

/**
 * Añade un nuevo producto al almacén en el servidor.
 * URL de ejemplo: http://localhost:3000/almacen_productos/create
 */
export const addAlmacenProductos = async (values) => {
  let AlmacenProductos = {
    nombre_almacen: values.nombre_almacen,
    direccion: values.direccion,
  };

  try {
    const response = await fetch("http://localhost:3000/almacen_productos/create", {
      method: "POST", // Enviar una petición POST para crear un nuevo producto
      headers: {
        "Content-Type": "application/json", // Definir el tipo de contenido como JSON
      },
      body: JSON.stringify(AlmacenProductos), // Convertir el objeto a JSON en el cuerpo de la solicitud
    });

    if (!response.ok) {
      throw new Error('Error al añadir el producto al almacén');
    }
  } catch (error) {
    showNotification("error", "Error al añadir el almacén", error); // Mostrar notificación en caso de error
  }
};
