import { showNotification } from "../../Shared/Notifications"

export const getLavanderia = async (id, setData) => {
  try {
    const response = await fetch(`http://localhost:3000/lavanderia/lote/${id}`)
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
export const addLavanderia = async (id, data) => {
  console.log(data)
  const response = await fetch(`http://localhost:3000/lavanderia/create/array/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  })
  console.log(response)
  showNotification("add", "Lavanderia añadida")
}

export const getChangeCorte = async (id, setData, form) => {
  try {
    const response = await fetch(`http://localhost:3000/cortes/lote/${id}`)

    if (!response.ok) {
      if (response.status === 404) {
        console.error(`Corte con ID ${id} no encontrado (404).`)
        setData([]);
        form.setFieldsValue({ items: [] });
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
    method: "PUT",
  })
  showNotification("delete", "Corte eliminado")
}

export const getStatusLavanderia = async (id, setData) => {
  const response = await fetch(`http://localhost:3000/lavanderia/lote/${id}`)
  const data = await response.json()
  if (data.length == 0) {
    setData(0)
  } else {
    setData(data[0].estado)
    console.log("Estado:", data[0].estado)
  }
}

export const changeStatusLavanderia = async (id, values = null) => {
  if (values == null) {
    const response = await fetch(`http://localhost:3000/lavanderia/lote/${id}`)
    console.log(response)
    values = await response.json();
  }

  let Lote = {
    detalles: values,
  }
  console.log(JSON.stringify(values))
  const response = await fetch(`http://localhost:3000/lavanderia/sgte/lote/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(Lote),
  })
  console.log(response)
  showNotification("add", "Estado pasado")

}