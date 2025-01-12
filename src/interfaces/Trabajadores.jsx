import { Flex, Button, Popconfirm } from "antd";
import apiClient from "../API/apiClient";
const tiposTrabajador = { ventas: 1, talleres: 2, miscelaneos: 3, costureros: 4 };

export const getColumnas = (tipoTrabajador, changeModal, setId, reload) => {
  const columnas = [
    {
      title: "Nombre",
      key: "nombre",
      align: "center",
      render: (record) =>
        `${record.nombre} ${record.ap_paterno} ${record.ap_materno}`,
    },
    {
      title: "DNI",
      dataIndex: "dni",
      key: "dni",
      align: "center",
      sorter: (a, b) => a.dni.localeCompare(b.dni),
    },
    {
      title: "Teléfono",
      dataIndex: "telefono",
      key: "telefono",
      align: "center",
      sorter: (a, b) => a.telefono.localeCompare(b.telefono),
    },
    {
      title: "Incidencias",
      dataIndex: "total_incidencias",
      key: "total_incidencias",
      align: "center",
      sorter: (a, b) => a.total_incidencias - b.total_incidencias,
    },
    {
      title: "Sueldo",
      dataIndex: "sueldo",
      key: "sueldo",
      align: "center",
      sorter: (a, b) => a.sueldo - b.sueldo,
    },
  ];

  if (tipoTrabajador === "ventas") {
    columnas.splice(3, 0,
      { title: "Tienda", dataIndex: "tienda", key: "tienda", align: "center" });
  }

  columnas.push({
    title: "Opciones",
    dataIndex: "trabajador_id",
    key: "trabajador_id",
    align: "center",
    render: (trabajador_id) => (
      <Flex gap="small" justify="center" align="middle" wrap="wrap">
        <Button
          type="primary"
          onClick={(e) => {
            e.stopPropagation();  // Evitar que el click llegue al padre
            setId(trabajador_id)
            changeModal("updT", true);
          }}
        >
          Editar
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();  // Evitar que el click llegue al padre
            setId(trabajador_id)
            changeModal("addI", true);
          }}
        >
          + Incidencia
        </Button>
        <Popconfirm
          title="¿ELIMINAR?"
          description="¿Estás seguro de eliminar este usuario?"
          okText="Confirmar"
          cancelText="Cancelar"
          onConfirm={async (e) => {
            e.stopPropagation();  // Evitar que el click llegue al padre
            await apiClient.delete(`/Trabajador/delete/${trabajador_id}`);
            reload();
          }}
        >
          <Button type="primary" danger onClick={(e) => e.stopPropagation()}>
            Eliminar
          </Button>
        </Popconfirm>
      </Flex>
    ),
  }
  );

  return columnas
}

export const getUrl = (tipoTrabajador) => {
  return `/trabajador?rol=${tiposTrabajador[tipoTrabajador]}`
}