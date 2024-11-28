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
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  })
  console.log(response)
  showNotification("add", "Lavanderia añadida")
}

export const getChangeLavanderia = async (id, setData, form) => {
  console.log(id)
  try {
    const response = await fetch(`http://localhost:3000/lavanderia/lote/${id}`)

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

    const detallesConNuevoParametro = data.map(detalle => {
      return {
        id: detalle.lavanderia_id,
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
  const response = await fetch(`http://localhost:3000/lavanderia/lote/${id}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json()
  if (data.length == 0) {
    setData(0)
  } else {
    setData(data[0].estado)
    console.log("Estado:", data[0].estado)
  }
}

export const changeStatusLavanderia = async (id, data = null) => {
  try {
    if (data == null) {
      // Realizando la solicitud GET si no se pasan datos
      const response = await fetch(`http://localhost:3000/lavanderia/lote/${id}`, {
        method: "GET",
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error(`Error al obtener datos: ${response.statusText}`);
      }
      
      data = await response.json();
    }

    // Mapeando los datos para el PUT
    const values = data.map(detalle => {
      return {
        lavanderia_id: detalle.id || detalle.lavanderia_id,
        cantidad_recibida: detalle.cantidad_recibida,
      };
    });

    // Creando el objeto para enviar en el PUT
    let Lote = {
      detalles: values,
    };

    console.log("Lavanderia:", Lote);

    // Realizando la solicitud PUT
    const putResponse = await fetch(`http://localhost:3000/lavanderia/sgte/lote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Lote),
    });

    if (!putResponse.ok) {
      throw new Error(`Error al actualizar estado: ${putResponse.statusText}`);
    }

    console.log(putResponse);

    // Mostrar notificación
    showNotification("add", "Estado pasado");
  } catch (error) {
    console.error("Error en la función changeStatusLavanderia:", error);
    showNotification("error", `Error: ${error.message}`);
  }
};
