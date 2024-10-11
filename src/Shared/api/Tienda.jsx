import { showNotificationAdd, showNotificationDelete, showNotificationUpdate } from "../Notifications"
export const addTienda = async (values) => {
    let Tienda = {
        tienda:values.tienda,
        direccion:values.direccion,
        telefono:values.telefono    
    }

    try {
        const response = await fetch(`http://localhost:3000/tienda/create`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(Tienda),
        })
        showNotificationAdd("Tienda añadida correctamente")
    } catch (error) {
        console.log(error)
    }

}

export const getTiendaById = async (id, setTienda) => {
    const response = await fetch(`http://localhost:3000/tienda/${id}`);
    const data = await response.json();
    setTienda(data);
};

export const updateTienda = async (id, values) => {
  const Tienda = {
    nombre  : values.nombre,
    direccion : values.direccion,
    telefono : values.telefono,
}
  const response = await fetch(`http://localhost:3000/tienda/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(Tienda),
  })
  showNotificationUpdate("Producto Actualizado")
  console.log(JSON.stringify(Tienda))
  console.log(response)
}

export const deleteTiendaById = async (id, values) => {
  const response = await fetch(`http://localhost:3000/tienda/desactivar/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    }
  })
  showNotificationDelete("Producto Eliminado")
  console.log(response)
}

export const getTiendas = async (setTiendas) => {
    const response = await fetch(`http://localhost:3000/tienda`)
    const data = await response.json()
    console.log(data)
    setTiendas(data)
}

export const getTiendasByProducto = async (id, setTiendas) => {
    try {
      const response = await fetch(
        `http://localhost:3000/producto/detalle/${id}?tipo=tiendas`
      );
      const data = await response.json();
      setTiendas(data);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  export const setUpdateTienda = async (id, form) => {
    try {
      const response = await fetch(`http://localhost:3000/tienda/${id}`);
      const data = await response.json();
      form.setFieldsValue({
        ["nombre"]: data.tienda,
        ["direccion"]: data.direccion,
        ["telefono"]: data.telefono,
      });
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };