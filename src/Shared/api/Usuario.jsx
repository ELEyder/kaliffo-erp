import { showNotificationAdd, showNotificationError, showNotificationUpdate, showNotificationDelete } from "../Notifications"
const dTipos = { ventas: 1, talleres: 2, miscelaneos: 3, costureros: 4 };

export const addUsuario = async (tipoTrabajador, values) => {
    const rol = dTipos[tipoTrabajador];
    let Trabajador = {
        nombre: values.nombre,
        ap_paterno: values.ap_paterno,
        ap_materno: values.ap_materno,
        fecha_nacimiento: values.fecha_nacimiento.format("YYYY-MM-DD"),
        dni: values.dni,
        telefono: values.telefono,
        sueldo: values.sueldo,
        contraseña: "124",
        rol: rol,
    };
    if (rol === 1) {
      Trabajador = {
          ...Trabajador,
          tienda_id: values.tienda_id,
      };
  }
    try {
      const response = await fetch(`http://localhost:3000/usuario/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Trabajador),
      });
      showNotificationAdd("Usuario añadido exitosamente")
      console.log(response)
    } catch (error) {
      console.log(error);
      showNotificationError("Error al añadir el usuario")
    }
  };

export const getUsuarioById = async (id, setUsuario) => {
    const response = await fetch(`http://localhost:3000/usuario/${id}`)
    const usuarioData= await response.json()
    setUsuario(usuarioData)
    console.log(usuarioData)
}

export const updateUsuario = async (id, values, originales) => {
  const valoresnuevos={}
  for (const key in originales) {
    if (key === "fecha_nacimientoE") {
      if (values["fecha_nacimientoE"]) {
        values["fecha_nacimientoE"] = moment(values["fecha_nacimientoE"]).format("YYYY-MM-DD");
      }
    }

    if (values[key] !== originales[key]) {
      if (values[key] !== undefined) {
        valoresnuevos[key] = values[key];
      }
    }
  }
  try {
    const response = await fetch(`http://localhost:3000/usuario/update/${id}`,{
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(valoresnuevos),
    })
    console.log(response)
    showNotificationUpdate("Usuario actualizado exitosamente")
  } catch (error) {
    console.log(error)
    showNotificationError("Error al actualizar el usuario")
  }

};

export const deleteUsuario = async (id) => {
  console.log(id)
  try {
    const response = await fetch(`http://localhost:3000/usuario/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response)
    showNotificationDelete("Usuario eliminado")
    return true

  } catch (error) {
    console.log(error);
    showNotificationError("Error al eliminar el usuario")
  }
};

export const getUsuarios = async (tipo, Seteador) => {
  try {
    const response = await fetch(`http://localhost:3000/usuario?rol=${dTipos[tipo]}`);
    const trabajadores = await response.json();
    trabajadores.forEach(trabajador => {
        if (typeof trabajador === 'object' && trabajador !== null) {
          if (trabajador.tienda_id === null) {
            trabajador.tienda_id = 0;
            trabajador.tienda = "Sin asignar  ";
          }
        } else {
          console.warn('Elemento no es un objeto:', trabajador);
        }
      Seteador(trabajadores);
    })
    console.log(trabajadores)
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getTrabajadoresDiferentes = async (id, Seteador) => {
  try {
    const response = await fetch(
      `http://localhost:3000/usuario?rol=1&antiTienda_id=${id}`
    );
    const data = await response.json();
    Seteador(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const updateUsuarioTienda = async (idTienda, values) => {
  try {
    const response = await fetch(
        `http://localhost:3000/usuario/update/${values.personal}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tienda_id: idTienda,
          }),
        }
      );
    showNotificationUpdate("Usuario actualizado exitosamente")
  } catch (error) {
    console.log(error);
    showNotificationError("Error al actualizar usuario")
  }
};

export const getUsuariosTienda = async (id, setTabla) => {
  try {
    const response = await fetch(
      `http://localhost:3000/usuario?tienda_id=${id}`
    );
    const data = await response.json();
    console.log(data)
    setTabla(data);
  } catch (error) {
    console.log(error);
  }
  
};

