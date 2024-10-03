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
