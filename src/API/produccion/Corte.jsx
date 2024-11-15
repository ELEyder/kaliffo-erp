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
    console.log(data)
    const response = await fetch(`http://localhost:3000/cortes/create/array/${id}`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data),
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
        setData([]);
        form.setFieldsValue({ items: [] });
        return;
      }
      throw new Error(`Error de servidor: ${response.status}`);
    }

    const data = await response.json();

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

export const getAddTaller = async (id, setData, form) => {
  try {
    const response = await fetch(`http://localhost:3000/cortes/lote/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        console.error(`Corte con ID ${id} no encontrado (404).`);
        setData([]);
        form.setFieldsValue({ items: [] });
        return;
      }
      throw new Error(`Error de servidor: ${response.status}`);
    }

    const data = await response.json();

    const detallesActualizados = data.map((detalle) => ({
      corte_id: detalle.corte_id,
    }));

    setData(detallesActualizados);
    form.setFieldsValue({ items: detallesActualizados });
  } catch (error) {
    console.error('Error al obtener el corte:', error);
    setData([]);
    form.setFieldsValue({ items: [] });
  }
};
  export const deleteCorte = async (id, estado) => {
    if (estado !=1){
      showNotification("error", "No se puede borrar cortes en proceso")
    }  else {
      await fetch(`http://localhost:3000/cortes/desactivar/${id}`, {
          method : "PUT",
      })
      showNotification("delete", "Corte eliminado")
    }
  }

  export const getStatusCorte = async (id, setData) => {
      const response = await fetch(`http://localhost:3000/cortes/lote/${id}`)
      const data = await response.json()
      if (data.length == 0){
        setData(0)
      } else {
        setData(data[0].estado)
        console.log("Estado:", data[0].estado)
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
    console.log(Lote)
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