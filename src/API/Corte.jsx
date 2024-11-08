import { showNotification } from "../Shared/Notifications"

export const getCorte = async (id, setData) => {
    try {
      const response = await fetch(`http://localhost:3000/cortes/lote/${id}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          console.error(`Corte con ID ${id} no encontrado (404).`)
          setData([])
          return
        }
        throw new Error(`Error de servidor: ${response.status}`)
      }
  
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.error('Error al obtener el corte:', error)
      setData([])
    }
  }

  export const addCorte = async (id, data) => {
    const Corte = {
      lote_id: Number(id),
      taller_id: Number(data.taller),
      producto_id: Number(data.producto),
      cantidad_enviada: Number(data.cantidad),
      talla: data.talla,
      metraje_asignado: Number(data.metraje),
      tipo_tela: data.tela,
    };
    const response = await fetch(`http://localhost:3000/cortes/create`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(Corte),
    })
    console.log(response)
    showNotification("add", "Corte añadido")
}

export const getChangeCorte = async (id, setData, form) => {
  try {
      const response = await fetch(`http://localhost:3000/cortes/lote/${id}`)
      
      if (!response.ok) {
          if (response.status === 404) {
              console.error(`Corte con ID ${id} no encontrado (404).`)
              setData([]);  // Establece un valor vacío en caso de 404
              form.setFieldsValue({ items: [] });  // Restablece el formulario
              return;
          }
          throw new Error(`Error de servidor: ${response.status}`);
      }

      const data = await response.json();
      let count = -1;
      
      const detallesConNuevoParametro = data.map(detalle => { 
          count += 1;
          return {
              corte_id: detalle.corte_id,
              cantidad_recibida: detalle.cantidad_enviada,
          };
      });
      
      setData(detallesConNuevoParametro);
      form.setFieldsValue({ items: detallesConNuevoParametro });
  } catch (error) {
      console.error('Error al obtener el corte:', error);
      setData([]);
      form.setFieldsValue({ items: [] });
  }
};

  export const deleteCorte = async (id) => {
    await fetch(`http://localhost:3000/cortes/desactivar/${id}`, {
        method : "PUT",
    })
    showNotification("delete", "Corte eliminado")
  }

  export const getStatusCorte = async (id, setData) => {
    try {
      const response = await fetch(`http://localhost:3000/cortes/lote/${id}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          console.error(`Corte con ID ${id} no encontrado (404).`)
          setData([])
          return
        }
        throw new Error(`Error de servidor: ${response.status}`)
      }
  
      const data = await response.json()
      setData(data[0].estado)
    } catch (error) {
      console.error('Error al obtener el corte:', error)
      setData([])
    }
  }