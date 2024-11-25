import { showNotification } from "../../Shared/Notifications"

export const getAlmacenProductos = async(setAlmacenes)=>{
    const response = await fetch("http://localhost:3000/almacen_productos")
    const AlmacenData = await response.json();
    setAlmacenes(AlmacenData);
}

export const addAlmacenProductos = async(values) =>{
    let AlmacenProductos = {
        nombre_almacen:values.nombre_almacen,
        direccion:values.direccion
    }
    try {
        const response = await fetch(`http://localhost:3000/almacen_productos/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(AlmacenProductos),
          })
    } catch (error) {
        showNotification("error", "Error al añadir el almacen", error)
    }
}