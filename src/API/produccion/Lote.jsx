import { showNotification } from "../../Shared/Notifications"
export const getLotes = async (setData) => {
  try {
    const response = await fetch(`http://localhost:3000/lotes`, {
      method: "GET",
      credentials: "include",
    });
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

  export const addLote = async (values) => {
    let productos = values.productos.join(",");

    const Lote = {
      tipo_tela : values.tipo_tela,
      metraje : values.metraje,
      productos : productos
    }
      const response = await fetch(`http://localhost:3000/lotes/create`, {
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
            
          },
      credentials: "include",
          
          body: JSON.stringify(Lote)
      })
      showNotification("add","Lote añadido correctamente")
      
  }

export const getFaseLote = async (id, setData,setOriginal) => {
  const response = await fetch(`http://localhost:3000/lotes/${id}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  console.log("Fase:" , data.estado)
  setData(data.estado)
  setOriginal(data.estado);
}