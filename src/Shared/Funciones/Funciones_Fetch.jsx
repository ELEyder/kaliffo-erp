import moment from "moment";
const dTipos = { ventas: 1, talleres: 2, miscelaneos: 3, costureros: 4 };

export const evitarnumeros = (texto) => {
  return texto.replace(/\d/g, "");
};

export const evitarletras = (texto) => {
  return texto.replace(/[a-zA-Z]/g, "");
};

export const manejotexto = (form, nombre) => (event) => {
  form.setFieldsValue({ [nombre]: evitarnumeros(event.target.value) });
};

export const manejonumeros = (form, nombre) => (event) => {
  form.setFieldsValue({ [nombre]: evitarletras(event.target.value) });
};

export const FetchDataTablaTrabajadores = async (tipo, Seteador) => {
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



export const fetchTiendas = async (seteador) => {
  const query = await fetch(`http://localhost:3000/tienda`);
  const tiendasdata = await query.json();
  seteador(tiendasdata);
};

export const CrearTrabajador = async (values) => {
  const rol = dTipos[values.tipo_trabajadorh];

  let Trabajador;
  if (rol === 1) {
    Trabajador = {
      nombre: values.nombre,
      ap_paterno: values.ap_paterno,
      ap_materno: values.ap_materno,
      fecha_nacimiento: values.fecha_nacimiento.format("YYYY-MM-DD"),
      dni: values.dni,
      telefono: values.telefono,
      contraseña: "124",
      rol,
      tienda_id: values.tienda_id,
    };
  } else {
    Trabajador = {
      nombre: values.nombre,
      ap_paterno: values.ap_paterno,
      ap_materno: values.ap_materno,
      fecha_nacimiento: values.fecha_nacimiento.format("YYYY-MM-DD"),
      dni: values.dni,
      telefono: values.telefono,
      contraseña: "124",
      rol,
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
  } catch (error) {
    console.log(error);
  }
};

export const CargarEditar = async (id, form,seteadorO) => {
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
    console.log(error);
  }
};

export const editar = async (values, originales) => {

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
    const response = await fetch(`http://localhost:3000/usuario/update/${values.usuario_id}`,{
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(valoresnuevos),
    })
  } catch (error) {
    console.log(error)
  }

};

export const AñadirIncidencia = async (values) => {
  const Incidencia = {
    tipo: values.tipo,
    descripcion: values.descripcion,
    usuario_id: values.usuario_id,
  };

  try {
    const response = await fetch(`http://localhost:3000/incidencia/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Incidencia),
    });
  } catch (error) {
    console.log(error);
  }
};

export const EliminarUsuario = async (id, refrescar) => {
  try {
    const response = await fetch(`http://localhost:3000/usuario/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return true
  } catch (error) {
    console.log(error);
  }
};
