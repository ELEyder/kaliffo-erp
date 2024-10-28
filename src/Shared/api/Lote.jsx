import { showNotification } from "../Notifications"
export const getLotes = async (setData) => {
    const response = await fetch(`http://localhost:3000/lotes`)
    const data = await response.json()
    const dataNormal = data.map(lote => {
        const date = new Date(lote.fecha_creacion);
        const opciones = { year: 'numeric', month: '2-digit', day: '2-digit' };
        var fecha = date.toLocaleDateString('es-PE', opciones);
        return {
          ...lote,
          fecha_creacion: fecha
        };
      });
    console.log(dataNormal);
    setData(dataNormal)
  }
  
  export const addLote = async () => {
      const response = await fetch(`http://localhost:3000/lotes/create`, {
          method : "POST",
      })
      console.log(response)
      showNotification("add","Lote añadido correctamente")

  }