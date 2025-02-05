import apiClient from '../apiClient'; // Importar cliente de API configurado

// Métodos de pago disponibles
const metodosPago = ["Efectivo", "Yape", "Transferencia"];

// Tipos de venta
const tipoVenta = ["Por Mayor", "Por Menor"];

// Tiendas disponibles
const tienda = ["Almacen", "Tienda 1", "Tienda 2"];

/**
 * Obtiene la lista de ventas desde el servidor, transforma los datos y actualiza el estado.
 * URL de ejemplo: http://localhost:3000/venta
 */
export const getVentas = async (tipo, setTablaDatos) => {
  try {
    const { data } = await apiClient.get('/venta'); // Realizar petición GET al servidor
    let count = 0;

    const detallesConNuevoParametro = data.map(detalle => {
      count += 1;
      const fecha_creacion = new Date(detalle.fecha);
      return {
        ...detalle,
        tipoPago: metodosPago[detalle.tipoPago - 1],
        tipoVenta: tipoVenta[detalle.tipoVenta - 1],
        tienda: tienda[detalle.tienda_id - 1],
        fecha: fecha_creacion.toLocaleDateString("es-ES"),
        id: count,
      };
    });

    setTablaDatos(detallesConNuevoParametro); // Actualizar estado con los datos transformados
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    setTablaDatos([]); // En caso de error, establecer un arreglo vacío
  }
};

/**
 * Muestra una notificación al buscar una venta.
 * URL de ejemplo: No aplica (función local)
 */
export const SearchVenta = async (id) => {
  return("Venta eliminada");
};

/**
 * Muestra una notificación al eliminar una venta.
 * URL de ejemplo: No aplica (función local)
 */
export const deleteVenta = async (id) => {
  return("Venta eliminada");
};

/**
 * Obtiene las ventas filtradas por tienda y actualiza el estado con datos simulados.
 * URL de ejemplo: No aplica (datos simulados)
 */
export const getVentasByTienda = async (id, setTablaDatos) => {

  setTablaDatos(datos); // Actualizar estado con los datos simulados
};

/**
 * Obtiene una venta por su ID desde el servidor, transforma los datos y actualiza el estado.
 * URL de ejemplo: http://localhost:3000/venta/1
 */
export const getVentaById = async (id, setTablaDatos) => {
  try {
    const { data, status } = await apiClient.get(`/venta/${id}`); // Realizar petición GET al servidor
    let count = 0;

    const detallesConNuevoParametro = data.detalles.map(detalle => {
      count += 1;
      const fecha_creacion = new Date(detalle.fecha);
      return {
        ...detalle,
        tipoPago: metodosPago[detalle.tipoPago - 1],
        precioTotal: detalle.cantidad * detalle.precioUnitario,
        tipoVenta: tipoVenta[detalle.tipoVenta - 1],
        fecha: fecha_creacion.toLocaleDateString("es-ES"),
        id: count,
      };
    });

    data.tienda = tienda[data.tienda_id - 1];
    data.tipoPago = metodosPago[data.tipoPago - 1];
    data.detalles = detallesConNuevoParametro;
    setTablaDatos(status != 500 ? data : []) 
  } catch (error) {
    console.error(`Error al obtener la venta con ID ${id}:`, error);
    setTablaDatos([]); // En caso de error, establecer un valor nulo
  }
};

