import { showNotification } from "../../Shared/Notifications"

export const getCorte = async (id, setData) => {
    try {
      const response = await fetch(`http://localhost:3000/cortes/lote/${id}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          setData([])
          return
        }
      }
  
      const data = await response.json()
      setData(data)
    } catch (error) {
      setData([])
    }
  }

  export const addCorte = async (id, data) => {
    console.log(JSON.stringify(Corte))
    const response = await fetch(`http://localhost:3000/cortes/create/${id}`, {
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
    const response = await fetch(`http://localhost:3000/cortes/lote/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        console.error(`Corte con ID ${id} no encontrado (404).`);
        setData([]);  // Establece un valor vacío en caso de 404
        form.setFieldsValue({ items: [] });  // Restablece el formulario
        return;
      }
      throw new Error(`Error de servidor: ${response.status}`);
    }

    const data = await response.json();

    // Mapeo de detalles, asignando "cantidad_recibida" con "cantidad_enviada"
    const detallesActualizados = data.map((detalle) => ({
      corte_id: detalle.corte_id,
      cantidad_recibida: detalle.cantidad_enviada,
    }));

    setData(detallesActualizados);
    form.setFieldsValue({ items: detallesActualizados });
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
      const data = await response.json()
      if (data == []) return(setData(0))
      setData(data[0].estado)
    } catch (error) {
      console.error('Error al obtener el corte:', error)
      setData(0)
    }
  }

  export const changeStatusCorte = async (id, values=null) => {
    if (values == null) {
      const response = await fetch(`http://localhost:3000/cortes/lote/${id}`)
      console.log(response)
      values = await response.json();
    }

    let Lote = {
      detalles : values,
    }
    console.log(JSON.stringify(values))
    const response = await fetch(`http://localhost:3000/cortes/sgte/lote/${id}`, {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(Lote),
    })
    console.log(response)
    showNotification("add","Estado pasado")

}

export const getTaller = async (id, values=null) => {
  if (values == null) {
    const response = await fetch(`http://localhost:3000/cortes/lote/${id}`)
    console.log(response)
    values = await response.json();
  }

  let Lote = {
    detalles : values,
  }
  console.log(JSON.stringify(values))
  const response = await fetch(`http://localhost:3000/cortes/sgte/lote/${id}`, {
      method : "PUT",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(Lote),
  })
  console.log(response)
  showNotification("add","Estado pasado")

}