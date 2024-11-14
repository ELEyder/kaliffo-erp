import { showNotification } from "../../Shared/Notifications"
import moment from "moment";

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
      showNotification("add","Usuario añadido exitosamente")
    } catch (error) {
      showNotification("error","Error al añadir el usuario")
    }
  };

export const getUsuarioById = async (id, setUsuario) => {
    const response = await fetch(`http://localhost:3000/usuario/${id}`)
    const usuarioData= await response.json()
    setUsuario(usuarioData)
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
    showNotification("update","Usuario actualizado exitosamente")
  } catch (error) {
    showNotification("error","Error al actualizar el usuario")
  }

};

export const deleteUsuarioById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/usuario/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    showNotification("delete","Usuario eliminado")
    return true

  } catch (error) {
    showNotification("error","Error al eliminar el usuario")
  }
};

export const getUsuarios = async (tipo, setData) => {
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
      })
    setData(trabajadores);
    console.log("API: 0" , trabajadores)
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
    showNotification("update","Usuario actualizado exitosamente")
  } catch (error) {
    showNotification("error", "Error al actualizar usuario")
  }
};

export const getUsuariosTienda = async (id, setTabla) => {
  try {
    const response = await fetch(
      `http://localhost:3000/usuario?tienda_id=${id}`
    );
    const data = await response.json();
    setTabla(data);
  } catch (error) {
    showNotification("error", "Error al obtener los usuarios por tienda")
  }
  
};

export const setUpdateUsuario = async (id, form,seteadorO) => {
  try {
    const response = await fetch(`http://localhost:3000/usuario/${id}`);
    const data = await response.json();
    seteadorO(data)
    form.setFieldsValue({
      ["nombre"]: data.nombre,
      ["ap_paterno"]: data.ap_paterno,
      ["ap_materno"]: data.ap_materno,
      ["telefono"]: data.telefono,
      ["dni"]: data.dni,
      ["fecha_nacimiento"]: moment(data.fecha_nacimiento),
      ["tienda_id"]:data.tienda_id
    });
  } catch (error) {
    showNotification("error", "Error al obtener el usuario")
  }
};