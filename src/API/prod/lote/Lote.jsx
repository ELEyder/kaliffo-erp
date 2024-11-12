import { showNotification } from "../../../Shared/Notifications"
import { getCorte } from "../../Corte";
export const getLotes = async (setData) => {
  try {
    const response = await fetch(`http://localhost:3000/lotes`);
    if (!response.ok) {
      throw new Error('Error fetching lotes');
    }
    const data = await response.json();
    const dataNormal = data.map(lote => ({
      ...lote,
      fecha_creacion: new Date(lote.fecha_creacion).toLocaleDateString('es-PE', { year: 'numeric', month: '2-digit', day: '2-digit' })
    }));
    setData(dataNormal);
  } catch (error) {
    console.error("Error al obtener lotes:", error);
  }
};

  export const addLote = async () => {
      const response = await fetch(`http://localhost:3000/lotes/create`, {
          method : "POST",
      })
      showNotification("add","Lote añadido correctamente")
      
  }

  

export const getFase = async (id, setData) => {
  const response = await fetch(`http://localhost:3000/lotes/${id}`);
  const data = await response.json();
  setData(data.estado);
}