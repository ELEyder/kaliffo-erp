import { showNotificationAdd, showNotificationError, showNotificationUpdate, showNotificationDelete } from "./Notifications"

export const addUsuario = async (values) => {
    const rol = dTipos[values.tipo_trabajadorh];
  
    let Trabajador = {
        nombre: values.nombre,
        ap_paterno: values.ap_paterno,
        ap_materno: values.ap_materno,
        fecha_nacimiento: values.fecha_nacimiento.format("YYYY-MM-DD"),
        dni: values.dni,
        telefono: values.telefono,
        contraseña: "124",
        rol,
    };
    if (rol === 1) {
        Trabajador = Trabajador.map(data => {
            return {
                ...data,
                tienda_id: values.tienda_id,
            }
        })
    }
  
    try {
      const response = await fetch(`http://localhost:3000/usuario/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Trabajador),
      });
      showNotificationAdd("Usuario añadido exitosamente", "")
    } catch (error) {
      console.log(error);
    }
  };

export const getUsuarioById = async (id, setUsuario) => {
    const response = await fetch(`http://localhost:3000/usuario/${id}`)
    const usuarioData= await response.json()
    setUsuario(usuarioData)
    console.log(usuarioData)
}

export const deleteUsuario = async (id, refrescar) => {
  try {
    const response = await fetch(`http://localhost:3000/usuario/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response)
    return true

  } catch (error) {
    console.log(error);
  }
};

export const getUsuarios = async (tipo, Seteador) => {
  const dTipos = { ventas: 1, talleres: 2, miscelaneos: 3, costureros: 4 };

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
  } catch (error) {
    console.log(error);
  }
};

export const getUsuariosTienda = async (id, seteador) => {
  try {
    const response = await fetch(
      `http://localhost:3000/usuario?tienda_id=${id}`
    );
    const data = await response.json();
    seteador(data);
  } catch (error) {
    console.log(error);
  }
};

