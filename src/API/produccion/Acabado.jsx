import { showNotification } from "../../Shared/Notifications"

export const getAcabadoByLote = async (id, setData) => {
  try {
    const response = await fetch(`http://localhost:3000/talleres/lote/${id}`)
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

export const addAcabado = async (data) => {
  const response = await fetch(`http://localhost:3000/talleres/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  })
  console.log(response)
  console.log(data)
  showNotification("add", "Lavanderia añadida")
}

export const getChangeAcabado = async (id, setData, form) => {
  try {
    const response = await fetch(`http://localhost:3000/talleres/lote/${id}`)
    if (!response.ok) {
      if (response.status === 404) {
        console.error(`Acabado con ID ${id} no encontrado (404).`)
        setData([]);
        form.setFieldsValue({ items: [] });
        return;
      }
      throw new Error(`Error de servidor: ${response.status}`);
    }

    const data = await response.json();

    const detallesConNuevoParametro = data.map(detalle => {
      return {
        id: detalle.acabado_id,
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

export const deleteTaller = async (id) => {
  await fetch(`http://localhost:3000/talleres/desactivar/${id}`, {
    method: "PUT",
  })
  showNotification("delete", "Corte eliminado")
}

export const getStatusAcabado = async (id, setData) => {
  const response = await fetch(`http://localhost:3000/talleres/lote/${id}`)
  const data = await response.json()
  if (data.length == 0) {
    setData(0)
  } else {
    setData(data[0].estado)
    console.log("Estado:", data[0].estado)
  }
}

export const changeStatusAcabado = async (id, data = null, params = null) => {
  try {
    if (data == null) {
      const response = await fetch(`http://localhost:3000/talleres/lote/${id}`);
      
      if (!response.ok) {
        throw new Error(`Error al obtener datos: ${response.statusText}`);
      }
      
      data = await response.json();
    }

    const values = data.map(detalle => {
      return {
        acabado_id: detalle.id || detalle.acabado_id,
        cantidad_recibida: detalle.cantidad_recibida,
      };
    });

    let Lote = {
      detalles: values,
    };

    console.log("acabados: ", Lote)
    console.log("params: ", params)
    const putResponse = await fetch(`http://localhost:3000/talleres/sgte/${id}?${params}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Lote),
    });

    if (!putResponse.ok) {
      throw new Error(`Error al actualizar estado: ${putResponse.statusText}`);
    }

    showNotification("add", "Estado pasado");
  } catch (error) {
    console.error("Error en la función changeStatusLavanderia:", error);
    showNotification("error", `Error: ${error.message}`);
  }
};
