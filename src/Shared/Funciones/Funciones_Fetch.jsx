
const dTipos = { ventas: 1, talleres: 2, miscelaneos: 3 };

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
  form.setFieldsValue({[nombre]:evitarletras(event.target.value)})
};

export const FetchDataTablaTrabajadores = async (tipo,Seteador) => {
  try {
    const response = await fetch(`http://localhost:3000/usuario?rol_id=${dTipos[tipo]}`);
    const data = await response.json();
    Seteador(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchTiendas = async (seteador) => {
  const query = await fetch(`http://localhost:3000/tienda`);
  const tiendasdata = await query.json();
  seteador(tiendasdata);
};

export const CrearTrabajador= async (values) =>{

  const rol_id=dTipos[values.tipo_trabajadorh]

  let Trabajador
  if(rol_id===1){
    Trabajador = {
      nombre:values.nombre,
      ap_paterno:values.ap_paterno,
      ap_materno:values.ap_materno,
      fecha_nacimiento:"12-12-2024",
      dni:values.dni,
      telefono:values.telefono,
      contraseña:"124",
      rol_id,
      tienda_id:values.tienda_id,
    };
  }
  else{
    Trabajador = {
      nombre:values.nombre,
      ap_paterno:values.ap_paterno,
      ap_materno:values.ap_materno,
      fecha_nacimiento:"12-12-2024",
      dni:values.dni,
      telefono:values.telefono,
      contraseña:"124",
      rol_id
    };
  }

  console.log(Trabajador)

  try {
    const response = await fetch(`http://localhost:3000/usuario/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Trabajador),
    });
    
  } catch (error) {
    console.log(error)
  }

}