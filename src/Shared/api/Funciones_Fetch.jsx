import moment from "moment";

export const evitarnumeros = (texto) => {
  return texto.replace(/[^a-zA-Z ]/g, ""); // Permitir solo letras y espacios
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

export const fetchTiendas = async (seteador) => {
  const query = await fetch(`http://localhost:3000/tienda`);
  const tiendasdata = await query.json();
  seteador(tiendasdata);
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



export const GetReporteUsuario = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/usuario/reporte/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al obtener el PDF");
    }

    const pdf = await response.blob();

    const url = window.URL.createObjectURL(pdf);
    window.open(url);
  } catch (error) {
    console.log("Error:", error);
  }
};

