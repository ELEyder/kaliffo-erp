import { showNotification } from "../Shared/Notifications"

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
        showNotification("add","Tienda añadida correctamente")
    } catch (error) {
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
  showNotification("update","Producto Actualizado")
}

export const deleteTiendaById = async (id, values) => {
  const response = await fetch(`http://localhost:3000/tienda/desactivar/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    }
  })
  showNotification("delete", "Producto Eliminado")
}

export const getTiendas = async (setTiendas) => {
    const response = await fetch(`http://localhost:3000/tienda`)
    const data = await response.json()
    setTiendas(data)
}

export const getTiendasByProducto = async (id, setTiendas) => {
    try {
      const response = await fetch(
        `http://localhost:3000/producto/detalle/${id}?tipo=tiendas`
      );
      const data = await response.json();
      setTiendas(data);
    } catch (error) {
      showNotification("error", "Error al obtener las tiendas")
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
    } catch (error) {
      showNotification("error", "Error al obtener las tiendas")
    }
  };