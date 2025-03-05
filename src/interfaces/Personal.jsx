import { Flex, Button, Popconfirm } from "antd";
import { ApiClient }from "../API/ApiClient";

export const getColumnas = (changeModal, setPersonal, reload) => {
  const columnas = [
    {
      title: "Nombre", // Título de la columna para el nombre completo del trabajador
      key: "nombre",
      render: (record) =>
        `${record.nombre} ${record.ap_paterno} ${record.ap_materno}`, // Concatenar nombre, apellido paterno y apellido materno
    },
    {
      title: "DNI", // Título de la columna para el DNI del trabajador
      dataIndex: "dni", // Mapear la columna al campo "dni" en los datos
    },
    {
      title: "Teléfono", // Título de la columna para el teléfono del trabajador
      dataIndex: "telefono", // Mapear la columna al campo "telefono" en los datos
    },
    {
      title: "Opciones", // Título de la columna para opciones (editar y eliminar)
      render: (record) => {
        return (
          <Flex gap="small" justify="center" align="middle" wrap="wrap">
            {/* <Button type="primary"
              onClick={(e) => {
                e.stopPropagation()
                console.log("En reparación")
              }}
            >+</Button> */}
            {/* Botón de Editar: Abre el modal de actualización para el trabajador seleccionado */}
            <Button type="primary" onClick={(e) => {
              e.stopPropagation()
              setPersonal(record); // Establecer el ID del trabajador para editar
              changeModal("updT", true); // Abrir el modal de actualización
            }}>Editar</Button>
            {/* Botón de Eliminar: Muestra la confirmación para eliminar */}
            <Popconfirm
              title="ELIMINAR" // Título de la confirmación
              description="DESEA ELIMINAR A" // Mensaje de confirmación
              okText="Confirmar" // Texto del botón OK
              cancelText="NO" // Texto del botón de cancelar
              onConfirm={async (e) => {
                e.stopPropagation()
                await ApiClient.delete(`/trabajador/delete/${record.trabajador_id}`);
                reload(); // Disparar una recarga después de la eliminación
              }}
            >
              <Button style={{ background: "#f54242", color: "white" }} danger onClick={(e) => e.stopPropagation()}>Eliminar</Button>
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];


  return columnas
}

export const getUrl = (id) => {
  return `Trabajador?tienda_id=${id}`
}