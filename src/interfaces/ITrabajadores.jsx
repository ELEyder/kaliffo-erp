import { Flex, Button, Popconfirm } from "antd";
import { apiClient }from "../API/apiClient";

const ITrabajadores = (tipoTrabajador, changeModal, setDataTrabajador, reload) => {
  let columnas = [
    {
      title: "Nombre",
      render: (record) =>
        `${record.nombre} ${record.ap_paterno} ${record.ap_materno}`,
    },
    { title: "DNI", dataIndex: "dni" },
    { title: "Teléfono", dataIndex: "telefono" },
    { title: "Incidencias", dataIndex: "total_incidencias" },
    { title: "Sueldo", dataIndex: "sueldo" },
    {
      title: "Opciones",
      render: (record) => (
        <Flex gap="small" justify="center" align="middle" wrap="wrap">
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              setDataTrabajador(record);
              changeModal("updT", true);
            }}
          >
            Editar
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation(); // Evitar que el click llegue al padre
              setDataTrabajador(record);
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
              e.stopPropagation(); // Evitar que el click llegue al padre
              await apiClient.delete(`/trabajador/delete/${record.trabajador_id}`);
              reload();
            }}
          >
            <Button type="primary" danger onClick={(e) => e.stopPropagation()}>
              Eliminar
            </Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  if (tipoTrabajador === "ventas") {
    columnas.splice(3, 0, {
      title: "Tienda",
      dataIndex: "tienda",
      key: "tienda",
    });
  }

  return columnas;
};

export default ITrabajadores;