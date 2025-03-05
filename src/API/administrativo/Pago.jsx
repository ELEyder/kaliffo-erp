import { ApiClient } from '../ApiClient';

// Añadir pago a trabajador http://localhost:3000/pago/create (No creado)
export const addPago = async (id, data) => {
    try {
      const Pago = {
        tipo: data.tipo,
        descripcion: data.descripcion,
        usuario_id: Number(id),
      };
      await ApiClient.post(`/pago/create`, Pago);
    } catch (error) {
      console.error("Error al añadir el pago:", error);
    }
  };

// Extrae pago por trabajador http://localhost:3000/pago/1
export const getPagosByTrabajador = async (id, setPagos)  => {
    try{
        const estados = ["Pagado", "En Proceso"]
        const response = await ApiClient.get(`/pago/${id}`)
        const pagos = response.data
        const pagosNormalizados = pagos.map(detalle => {
            return {
                ...detalle,
                estado: estados[detalle.estado],
            };
        });
        setPagos(pagosNormalizados)
    } catch (error) {
      console.error(`Error al obtener los pagos del trabajador ${id}:`, error);
    }
}

// Elimina un pago http://localhost:3000/pago/delete/1
export const deletePagoById = async (id) => {
    try{
        await ApiClient.delete(`http://localhost:3000/pago/delete/${id}`)
    } catch (error) {
        console.error("Error al eliminar el pago:", error);
    }
}